import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, MapPin } from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsAudioMuted(muted);
  };

  // Exactly the 6 required tabs
  const navTabs = [
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Kinh nghiệm', href: '#experience' },
    { label: 'Học tập', href: '#education' },
    { label: 'Đam mê', href: '#passions' },
    { label: 'Mạng xã hội', href: '#social' },
    { label: 'Khác', href: '#other' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#050507]/95 backdrop-blur-xl border-b border-neutral-800/90 shadow-2xl'
            : 'py-5 bg-gradient-to-b from-[#030305]/90 via-[#030305]/50 to-transparent'
        }`}
        style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Left: Brand Badge & Tabs */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            <a 
              href="#" 
              onClick={() => soundManager.playClick()}
              className="flex items-center space-x-2.5 group"
            >
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] flex items-center justify-center border border-[#ef4444]/40 shadow-[0_0_12px_rgba(220,38,38,0.4)] group-hover:scale-105 transition-transform">
                <span className="text-xs font-bold tracking-wider text-white">TĐ</span>
              </div>
            </a>

            {/* Desktop 6 Tabs */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
              {navTabs.map((tab) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={() => soundManager.playClick()}
                  className="text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:text-[#ef4444] transition-colors py-1 relative group"
                >
                  <span>{tab.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#dc2626] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Corner Requirement:
              "Ở góc phải màn hình chỉ để Tiến Đạt, Coporate Finance - Investment, ở dưới Quận 9 - TP.HCM" */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div 
                className="text-sm font-bold tracking-wide text-white leading-tight font-times"
                style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
              >
                Tiến Đạt
              </div>
              <div className="text-[11px] font-medium tracking-wider text-[#cbd5e1] leading-tight">
                Corporate Finance - Investment
              </div>
              <div className="text-[10px] text-neutral-400 flex items-center justify-end space-x-1 mt-0.5 leading-tight">
                <MapPin className="w-2.5 h-2.5 text-[#dc2626]" />
                <span>Quận 9 - TP.HCM</span>
              </div>
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isAudioMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              className="p-2 rounded-full luxury-glass border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title={isAudioMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#ef4444]" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-sm luxury-glass text-neutral-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#050507]/98 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
          style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
        >
          <div className="flex flex-col space-y-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-sm bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] flex items-center justify-center border border-[#ef4444]/40 mb-1">
              <span className="text-base font-bold text-white">TĐ</span>
            </div>
            
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white">Tiến Đạt</h2>
              <p className="text-xs font-semibold text-neutral-300 mt-1">Corporate Finance - Investment</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Quận 9 - TP.HCM</p>
            </div>

            <div className="h-px w-24 mx-auto bg-neutral-800 my-3" />

            {navTabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-base font-semibold uppercase tracking-wider text-neutral-300 hover:text-white py-2"
              >
                {tab.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="mt-4 w-full py-3 rounded-sm text-xs uppercase font-bold tracking-wider text-white bg-gradient-to-r from-[#991b1b] to-[#dc2626]"
            >
              Liên Hệ & Mandate Hợp Tác
            </button>
          </div>
        </div>
      )}
    </>
  );
};
