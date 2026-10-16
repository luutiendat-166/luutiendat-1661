import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroFerrari3D } from './components/HeroFerrari3D';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { PassionsSection } from './components/PassionsSection';
import { SocialSection } from './components/SocialSection';
import { OtherSection } from './components/OtherSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Intro Ferrari: tự kết thúc sau 5 giây
  const [showIntro, setShowIntro] = useState(true);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = introAudioRef.current;
    if (!audio) return;

    audio.volume = 0.85;

    // Tự động phát âm thanh ngay lập tức
    const startAudio = () => {
      audio.play().catch(() => {});
    };

    // Thử phát ngay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Nếu trình duyệt yêu cầu cử chỉ người dùng trước khi phát âm thanh (Autoplay policy),
        // tự động mở khóa ngay khi người dùng chạm hoặc di chuột bất kỳ đâu, không cần bấm nút riêng
        const unlock = () => {
          audio.play().catch(() => {});
          window.removeEventListener('pointerdown', unlock);
          window.removeEventListener('touchstart', unlock);
          window.removeEventListener('click', unlock);
          window.removeEventListener('scroll', unlock);
          window.removeEventListener('mousemove', unlock);
        };
        window.addEventListener('pointerdown', unlock, { once: true });
        window.addEventListener('touchstart', unlock, { once: true });
        window.addEventListener('click', unlock, { once: true });
        window.addEventListener('scroll', unlock, { once: true });
        window.addEventListener('mousemove', unlock, { once: true });
      });
    }

    const timer = window.setTimeout(() => {
      setShowIntro(false);
      audio.pause();
      audio.currentTime = 0;
    }, 5000);

    return () => {
      window.clearTimeout(timer);
      audio.pause();
    };
  }, []);

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handleExploreWork = () => {
    const expElem = document.getElementById('experience');
    if (expElem) {
      expElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#030305] text-[#f1f5f9] flex flex-col selection:bg-[#dc2626] selection:text-white"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      {/* INTRO FERRARI 458 ITALIA - 5 GIÂY */}
      {showIntro && (
        <div 
          className="ferrari-intro cursor-pointer"
          onClick={() => {
            const audio = introAudioRef.current;
            if (audio && audio.paused) {
              audio.play().catch(() => {});
            }
          }}
        >
          <div className="intro-light intro-light-left" />
          <div className="intro-light intro-light-right" />

          <img
            src="/ferrari-458-italia.jpg"
            alt="Ferrari 458 Italia"
            className="intro-car"
          />

          <div className="intro-vignette" />

          {/* Chữ to: TIẾN ĐẠT, Chữ nhỏ: FERRARI 458 ITALIA */}
          <div className="intro-brand">
            <span style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}>TIẾN ĐẠT</span>
            <span className="intro-line" />
            <small>FERRARI 458 ITALIA · DATFINANCE</small>
          </div>

          <audio
            ref={introAudioRef}
            src="/audio/ferrari-intro.mp3"
            preload="auto"
            autoPlay
            playsInline
          />
        </div>
      )}

      {/* 1. Fixed Navigation Bar (6 Tabs + Right Corner: Tiến Đạt / Corporate Finance / Quận 9 - TP.HCM) */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Centerpiece 3D Hero Stage */}
        <HeroFerrari3D
          onExploreWork={handleExploreWork}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Giới thiệu */}
        <AboutSection onOpenConsultation={handleOpenConsultation} />

        {/* Kinh nghiệm */}
        <ExperienceSection onOpenConsultation={handleOpenConsultation} />

        {/* Học tập */}
        <EducationSection />

        {/* Đam mê */}
        <PassionsSection />

        {/* Mạng xã hội */}
        <SocialSection />

        {/* Khác */}
        <OtherSection onOpenConsultation={handleOpenConsultation} />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* Confidential Mandate Intake Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}
