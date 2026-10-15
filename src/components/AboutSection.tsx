import React from 'react';
import { ASSETS } from '../config/assets';
import { soundManager } from '../utils/audioSynth';
import { 
  ShieldCheck, 
  Target, 
  Zap, 
  Award, 
  Globe2, 
  Lock,
  ArrowUpRight,
  Briefcase,
  MapPin
} from 'lucide-react';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section 
      id="about" 
      className="relative py-24 md:py-32 bg-[#050507] overflow-hidden border-t border-neutral-900"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-2">
              <span className="w-5 h-0.5 bg-[#dc2626]" />
              <span>Giới Thiệu</span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-times"
              style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
            >
              TIẾN ĐẠT
            </h2>
            <p className="text-sm font-semibold tracking-wider text-neutral-300 mt-1 uppercase">
              Corporate Finance - Investment
            </p>
          </div>

          <div className="mt-4 md:mt-0 max-w-md text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
            Chuyên gia Cố vấn Tài chính Doanh nghiệp & Đầu tư Chiến lược. Đồng hành cùng các tập đoàn, quỹ đầu tư tư nhân và cổ đông sáng lập tối ưu hóa cấu trúc vốn, thẩm định định giá và điều phối các thương vụ M&A quy mô lớn.
          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-sm luxury-glass border-neutral-800 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Triết Lý & Định Hướng Cố Vấn
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Tài chính doanh nghiệp hiện đại đòi hỏi sự kết hợp chặt chẽ giữa <strong>kỷ luật phân tích định lượng khắt khe</strong> và <strong>năng lực thực thi linh hoạt</strong>. Với phương châm lấy giá trị thực làm trọng tâm, Tiến Đạt cung cấp các giải pháp cấu trúc vốn bền vững, giúp doanh nghiệp vượt qua các chu kỳ biến động của thị trường.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Đặt trụ sở tại <strong>Quận 9 - TP.HCM</strong>, kết nối với mạng lưới đối tác tài chính tại Hà Nội, Singapore và khu vực Đông Nam Á, mang đến lợi thế tiếp cận nguồn vốn ngoại và các đối tác chiến lược toàn cầu.
              </p>
            </div>

            {/* 3 Core Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-sm luxury-glass border-neutral-800">
                <Target className="w-5 h-5 text-[#ef4444] mb-2" />
                <h4 className="text-xs uppercase font-bold text-white mb-1">
                  Độ Chuẩn Xác
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Mô hình định giá DCF, LBO và Comps chi tiết, không ước lượng cảm tính.
                </p>
              </div>

              <div className="p-4 rounded-sm luxury-glass border-neutral-800">
                <Zap className="w-5 h-5 text-[#ef4444] mb-2" />
                <h4 className="text-xs uppercase font-bold text-white mb-1">
                  Tốc Độ & Bảo Mật
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Rút ngắn thời gian thẩm định tài chính, cam kết bảo mật thông tin tuyệt đối.
                </p>
              </div>

              <div className="p-4 rounded-sm luxury-glass border-neutral-800">
                <Award className="w-5 h-5 text-[#d4af37] mb-2" />
                <h4 className="text-xs uppercase font-bold text-white mb-1">
                  Hiệu Quả Vượt Trội
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Bảo toàn quyền kiểm soát của sáng lập viên và tối ưu hóa chi phí vốn WACC.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Boardroom Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-sm overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src={ASSETS.FINANCE_SUITE_BG}
                alt="Executive Boardroom Suite"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-sm luxury-glass border-neutral-700/80">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Khu Vực Hoạt Động</span>
                    <strong className="text-white font-bold">Quận 9, TP.HCM & ASEAN Desk</strong>
                  </div>
                  <span className="px-2 py-1 rounded-sm bg-[#dc2626]/20 text-[#ef4444] font-bold text-[10px] border border-[#dc2626]/40">
                    Active Advisory
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenConsultation();
              }}
              className="w-full py-3 rounded-sm text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#991b1b] to-[#dc2626] hover:brightness-110 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Kết Nối Trực Tiếp Cùng Tiến Đạt</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
