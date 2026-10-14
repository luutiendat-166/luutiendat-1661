import React from 'react';
import { ASSETS } from '../config/assets';
import { Gauge, Wind, Flame, Zap, Compass, Flag } from 'lucide-react';

export const PassionsSection: React.FC = () => {
  const passions = [
    {
      icon: Gauge,
      title: 'Kỹ Nghệ Siêu Xe & Tốc Độ Đỉnh Cao',
      desc: 'Nghiên cứu kiến trúc động cơ hút khí tự nhiên V8 và động cơ Twin-Turbo của Ferrari (458 Italia, 488 Pista). Trân trọng từng chi tiết cơ khí chính xác, âm thanh ống xả và phản hồi chân ga tức thì.',
    },
    {
      icon: Wind,
      title: 'Khí Động Học & Tối Ưu Lực Cản',
      desc: 'Say mê cách các kỹ sư Maranello điêu khắc các khe hút gió S-Duct, cánh gió khuếch tán gầm xe để chuyển hóa luồng gió thành lực ép mặt đường (downforce) mà không tạo lực cản thừa thãi.',
    },
    {
      icon: Compass,
      title: 'Kỷ Luật Đường Đua & Kiểm Soát Rủi Ro',
      desc: 'Kỹ năng lái xe hiệu năng cao đòi hỏi sự tập trung tuyệt đối vào điểm phanh (braking point), đỉnh cua (apex) và thời điểm mở ga thoát cua — tương đồng tuyệt đối với việc chọn thời điểm chốt lệnh thương vụ tài chính.',
    },
    {
      icon: Flame,
      title: 'Sự Hoàn Hảo Trong Từng Chuyển Động',
      desc: 'Không chấp nhận sự thỏa hiệp hay giải pháp chắp vá. Dù là một khối động cơ V8 710 mã lực hay một bản kế hoạch tái cấu trúc vốn $500M, giá trị tối thượng luôn nằm ở sự hài hòa và chuẩn xác.',
    },
  ];

  return (
    <section 
      id="passions" 
      className="relative py-24 md:py-32 bg-[#030305] text-white overflow-hidden border-t border-neutral-900"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-2">
            <span className="w-5 h-0.5 bg-[#dc2626]" />
            <span>Tab 04: Đam Mê & Cảm Hứng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Đam Mê Kỹ Nghệ & Khí Động Học
          </h2>
          <p className="text-sm font-semibold tracking-wider text-neutral-400 mt-1 uppercase">
            Automotive Aerodynamics & High-Performance Philosophy
          </p>
        </div>

        {/* Ferrari Dual Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Ferrari 458 Itali */}
          <div className="p-6 rounded-sm luxury-glass border-neutral-850 space-y-4 group">
            <div className="relative h-64 rounded-sm overflow-hidden border border-neutral-800">
              <img
                src={ASSETS.FERRARI_HERO_BG}
                alt="Ferrari 458 Itali"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-xs font-bold text-white uppercase tracking-wider">
                Ferrari 458 Itali &bull; 4.5L V8 N/A
              </div>
            </div>
            <h3 className="text-lg font-bold text-white">
              Sự Tinh Khiết Của Động Cơ Hút Khí Tự Nhiên
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Biểu tượng tối thượng của sự nhạy bén và âm hưởng máy cơ thuần khiết. Vòng tua máy đạt 9.000 vòng/phút, phản hồi từng milimet ga không có độ trễ turbo.
            </p>
          </div>

          {/* Card 2: Ferrari 488 Pista */}
          <div className="p-6 rounded-sm luxury-glass border-neutral-850 space-y-4 group">
            <div className="relative h-64 rounded-sm overflow-hidden border border-neutral-800">
              <img
                src={ASSETS.FERRARI_488_PISTA}
                alt="Ferrari 488 Pista"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-xs font-bold text-white uppercase tracking-wider">
                Ferrari 488 Pista &bull; 3.9L Twin-Turbo 710HP
              </div>
            </div>
            <h3 className="text-lg font-bold text-white">
              Đỉnh Cao Khí Động Học & Lực Ép Mặt Đường
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Ứng dụng công nghệ F1 với ống dẫn khí S-Duct trước mũi xe và bộ khuếch tán sợi carbon, tạo ra lực ép downforce vượt trội 20% so với bản tiêu chuẩn trên đường đua.
            </p>
          </div>
        </div>

        {/* 4 Passion Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {passions.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-5 rounded-sm luxury-glass border-neutral-800">
                <Icon className="w-5 h-5 text-[#ef4444] mb-3" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  {p.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
