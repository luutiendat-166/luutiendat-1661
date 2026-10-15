import React, { useState } from 'react';
import { soundManager } from '../utils/audioSynth';
import { Briefcase, TrendingUp, CheckCircle, ArrowUpRight, DollarSign, Layers } from 'lucide-react';

interface ExperienceSectionProps {
  onOpenConsultation: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenConsultation }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ma' | 'pe' | 'restructuring'>('all');

  const dealMilestones = [
    {
      id: 'd1',
      title: 'Tư Vấn M&A Sáp Nhập Công Nghệ Bán Dẫn',
      type: 'ma',
      typeLabel: 'M&A Xuyên Biên Giới',
      size: '$480,000,000 USD',
      role: 'Cố Vấn Tài Chính Độc Quyền',
      period: '2024 - 2025',
      desc: 'Điều phối toàn diện thương vụ sáp nhập giữa công ty thiết kế chip bán dẫn và tập đoàn vi mạch quốc tế, tối ưu hóa cơ cấu thanh toán và bảo toàn 100% quyền lợi của sáng lập viên.',
    },
    {
      id: 'd2',
      title: 'Thu Xếp Vốn Private Equity Chuỗi Xe Điện & Trạm Sạc',
      type: 'pe',
      typeLabel: 'Vốn Cổ Phần Tư Nhân',
      size: '$320,000,000 USD',
      role: 'Lead Financial Arranger',
      period: '2023 - 2024',
      desc: 'Huy động thành công vòng vốn Series C từ liên minh 2 Quỹ Đầu tư Tư nhân toàn cầu và Quỹ Đầu tư Quốc gia, mở rộng mạng lưới trạm sạc siêu tốc.',
    },
    {
      id: 'd3',
      title: 'Tái Cấu Trúc Nợ & Tối Ưu Bảng Cân Đối Tập Đoàn Hạ Tầng',
      type: 'restructuring',
      typeLabel: 'Tái Cấu Trúc Vốn',
      size: '$650,000,000 USD',
      role: 'Cố Vấn Tái Cơ Cấu Nợ',
      period: '2023 - 2024',
      desc: 'Tái thương thảo danh mục nợ trái phiếu và nợ vay ngân hàng hợp vốn, giảm 210 điểm cơ bản (bps) lãi vay hàng năm, kéo dài kỳ hạn bình quân nợ lên 7.5 năm.',
    },
    {
      id: 'd4',
      title: 'Thoái Vốn Chiến Lược Nền Tảng Fintech Thanh Toán',
      type: 'ma',
      typeLabel: 'Trade Sale / Thoái Vốn',
      size: '$210,000,000 USD',
      role: 'Cố Vấn Định Giá & Đàm Phán',
      period: '2022 - 2023',
      desc: 'Hỗ trợ các nhà đầu tư hạt giống và Quỹ mạo hiểm thoái vốn với bội số vốn đầu tư MOIC đạt 5.8x khi bán lại cho đối tác niêm yết tại Singapore.',
    },
    {
      id: 'd5',
      title: 'Thu Xếp Tín Dụng Xanh & Mezzanine Năng Lượng Tái Tạo',
      type: 'pe',
      typeLabel: 'Mezzanine & Green Debt',
      size: '$380,000,000 USD',
      role: 'Cố Vấn Cấu Trúc Vốn',
      period: '2022 - 2023',
      desc: 'Thiết kế gói tài chính hỗn hợp cho dự án điện mặt trời mái nhà công nghiệp 450MWp đạt chuẩn khắt khe IFC Performance Standards.',
    },
  ];

  const filteredDeals = dealMilestones.filter((deal) => {
    if (selectedFilter === 'all') return true;
    return deal.type === selectedFilter;
  });

  return (
    <section 
      id="experience" 
      className="relative py-24 md:py-32 bg-[#030305] text-white overflow-hidden border-t border-neutral-900"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-2">
              <span className="w-5 h-0.5 bg-[#dc2626]" />
              <span>Kinh Nghiệm Thực Chiến</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Kinh Nghiệm & Thương Vụ
            </h2>
            <p className="text-sm font-semibold tracking-wider text-neutral-400 mt-1 uppercase">
              Corporate Finance & M&A Advisory Track Record
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="p-3 rounded-sm luxury-glass text-right">
              <div className="text-[10px] text-neutral-400 uppercase font-bold">Tổng Quy Mô Cố Vấn</div>
              <div className="text-lg font-black text-white">$2.8B+ USD</div>
            </div>
            <div className="p-3 rounded-sm luxury-glass text-right">
              <div className="text-[10px] text-neutral-400 uppercase font-bold">Thương Vụ Hoàn Tất</div>
              <div className="text-lg font-black text-[#ef4444]">42+ Mandates</div>
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
          {[
            { id: 'all', label: 'Tất Cả Thương Vụ' },
            { id: 'ma', label: 'M&A & Sáp Nhập' },
            { id: 'pe', label: 'Private Equity' },
            { id: 'restructuring', label: 'Tái Cấu Trúc Nợ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedFilter(tab.id as typeof selectedFilter);
              }}
              className={`px-3.5 py-1.5 rounded-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-[#dc2626] text-white border border-[#ef4444] shadow-sm'
                  : 'luxury-glass text-neutral-400 hover:text-white border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Deal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-sm luxury-glass border-neutral-800 hover:border-neutral-600 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-850">
                  <span className="font-bold text-[#ef4444] uppercase tracking-wider text-[11px]">{deal.typeLabel}</span>
                  <span className="text-neutral-400">{deal.period}</span>
                </div>

                <h3 className="text-base font-bold text-white mt-3 leading-snug">
                  {deal.title}
                </h3>

                <div className="text-xl font-black text-white mt-2">
                  {deal.size}
                </div>

                <div className="text-xs text-neutral-300 font-semibold mt-1">
                  Vai trò: <span className="text-neutral-100">{deal.role}</span>
                </div>

                <p className="text-xs text-neutral-400 font-normal leading-relaxed mt-3">
                  {deal.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-850 text-[11px] text-[#ef4444] font-bold flex items-center justify-between">
                <span>Bảo Mật Cấp Thể Chế</span>
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
