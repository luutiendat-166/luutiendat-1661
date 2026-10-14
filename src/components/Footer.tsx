import React from 'react';
import { soundManager } from '../utils/audioSynth';
import { ArrowUp, MapPin, Globe, Lock, Mail } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative bg-[#020204] text-neutral-400 border-t border-neutral-900 pt-16 pb-12 overflow-hidden"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-850">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] flex items-center justify-center border border-[#ef4444]/40 shadow-[0_0_12px_rgba(220,38,38,0.4)]">
                <span className="text-xs font-bold text-white">TĐ</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Tiến Đạt
                </h3>
                <span className="text-xs font-semibold text-neutral-400 block -mt-0.5">
                  Corporate Finance - Investment &bull; Quận 9 - TP.HCM
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-normal">
              Cố vấn tài chính doanh nghiệp, cấu trúc nguồn vốn chiến lược và điều phối thương vụ M&A quy mô lớn. 
              Hiện thực hóa giá trị doanh nghiệp bằng tính chuẩn xác và tốc độ thượng đỉnh.
            </p>

            <div className="pt-1 flex items-center space-x-2 text-xs text-neutral-400">
              <Lock className="w-3.5 h-3.5 text-[#ef4444]" />
              <span>Bảo Mật Cấp Thể Chế &bull; Thỏa Thuận NDA Song Phương</span>
            </div>
          </div>

          {/* 6 Tabs Quick Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs uppercase font-bold text-white tracking-wider">
              Danh Mục Điều Hướng
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors">1. Giới thiệu</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">2. Kinh nghiệm</a></li>
              <li><a href="#education" className="hover:text-white transition-colors">3. Học tập</a></li>
              <li><a href="#passions" className="hover:text-white transition-colors">4. Đam mê</a></li>
              <li><a href="#social" className="hover:text-white transition-colors">5. Mạng xã hội</a></li>
              <li><a href="#other" className="hover:text-white transition-colors">6. Khác</a></li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase font-bold text-white tracking-wider">
              Trụ Sở & Văn Phòng Tiếp Khách
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">TP. Hồ Chí Minh:</strong> Quận 9 - Khu Công Nghệ Cao TP.HCM
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Globe className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Hà Nội & Singapore:</strong> Mạng lưới đối tác liên kết M&A
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span className="text-white">datluu.16062001@gmail.com</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenConsultation();
                }}
                className="w-full py-2.5 rounded-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                Gửi Yêu Cầu Mandate Cố Vấn
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            Thông báo bảo mật: Website này cung cấp hồ sơ năng lực chuyên môn và không cấu thành lời chào mua bán chứng khoán đại chúng. Mọi hoạt động tư vấn được bảo mật theo cam kết NDA chính thức.
          </p>

          <div className="flex items-center space-x-3 shrink-0">
            <span>&copy; {new Date().getFullYear()} Tiến Đạt. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full luxury-glass hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Về đầu trang"
              title="Về đầu trang"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
