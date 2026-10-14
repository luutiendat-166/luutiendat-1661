import React, { useState } from 'react';
import { soundManager } from '../utils/audioSynth';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  ExternalLink, 
  Filter, 
  Layers, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface TrackRecordProps {
  onOpenConsultation: () => void;
}

interface DealItem {
  id: string;
  codename: string;
  sector: 'tech' | 'mobility' | 'fintech' | 'energy' | 'infra';
  sectorLabel: string;
  type: 'ma' | 'pe' | 'restructuring';
  typeLabel: string;
  dealSize: string;
  role: string;
  year: string;
  summary: string;
  outcome: string;
  irr?: string;
}

export const TrackRecord: React.FC<TrackRecordProps> = ({ onOpenConsultation }) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const deals: DealItem[] = [
    {
      id: 'aurora',
      codename: 'Project Aurora',
      sector: 'tech',
      sectorLabel: 'Công Nghệ Bán Dẫn & AI',
      type: 'ma',
      typeLabel: 'M&A Sáp Nhập Xuyên Biên Giới',
      dealSize: '$480,000,000',
      role: 'Cố Vấn Tài Chính Độc Quyền (Bên Bán)',
      year: '2025',
      summary: 'Thương vụ sáp nhập chiến lược giữa tập đoàn công nghệ thiết kế chip bán dẫn hàng đầu khu vực Đông Nam Á với liên danh bán dẫn quốc tế.',
      outcome: 'Định giá EV/EBITDA đạt 18.5x; cấu trúc thanh toán 70% tiền mặt và 30% hoán đổi cổ phần bảo vệ tối đa quyền lợi sáng lập.',
      irr: '34.2%',
    },
    {
      id: 'velocity',
      codename: 'Project Velocity',
      sector: 'mobility',
      sectorLabel: 'Di Chuyển Thông Minh & Xe Điện',
      type: 'pe',
      typeLabel: 'Thu Xếp Vốn Private Equity Series C',
      dealSize: '$320,000,000',
      role: 'Đơn Vị Thu Xếp Vốn Độc Quyền (Sole Lead Arranger)',
      year: '2024',
      summary: 'Huy động vốn tăng trưởng quy mô cho chuỗi cung ứng linh kiện xe điện cao cấp và hạ tầng trạm sạc siêu tốc thông minh.',
      outcome: 'Đưa Quỹ Sovereign Wealth Fund và 2 định chế đầu tư tư nhân toàn cầu vào cơ cấu cổ đông chiến lược.',
      irr: '29.8%',
    },
    {
      id: 'apex',
      codename: 'Project Apex',
      sector: 'infra',
      sectorLabel: 'Hạ Tầng Công Nghiệp & Logistics',
      type: 'restructuring',
      typeLabel: 'Tái Cấu Trúc Nợ & Tối Ưu Bảng Cân Đối',
      dealSize: '$650,000,000',
      role: 'Cố Vấn Tái Cấu Trúc Vốn HĐQT',
      year: '2024',
      summary: 'Tái tài trợ toàn diện cơ cấu nợ trái phiếu và nợ vay ngân hàng hợp vốn cho tập đoàn hạ tầng công nghiệp liên vùng.',
      outcome: 'Giảm 210 điểm cơ bản (bps) chi phí lãi vay hàng năm; kéo dài kỳ hạn bình quân nợ từ 2.4 năm lên 7.5 năm.',
    },
    {
      id: 'quantum',
      codename: 'Project Quantum',
      sector: 'fintech',
      sectorLabel: 'Fintech & Thanh Toán Doanh Nghiệp',
      type: 'ma',
      typeLabel: 'Thoái Vốn & Bán Chiến Lược (Trade Sale)',
      dealSize: '$210,000,000',
      role: 'Cố Vấn Định Giá & Đàm Phán M&A',
      year: '2023',
      summary: 'Thương vụ mua lại chi phối bởi tập đoàn dịch vụ thanh toán niêm yết tại Singapore đối với nền tảng thanh toán số B2B.',
      outcome: 'Thoái vốn thành công cho toàn bộ cổ đông hạt giống và Quỹ mạo hiểm với bội số vốn đầu tư MOIC đạt 5.8x.',
      irr: '41.5%',
    },
    {
      id: 'solaria',
      codename: 'Project Solaria',
      sector: 'energy',
      sectorLabel: 'Năng Lượng Tái Tạo & Điện Mặt Trời',
      type: 'pe',
      typeLabel: 'Vốn Cổ Phần Tư Nhân & Tín Dụng Xanh',
      dealSize: '$380,000,000',
      role: 'Cố Vấn Cấu Trúc Vốn Liên Danh',
      year: '2023',
      summary: 'Thu xếp gói tài chính hỗn hợp (Mezzanine & Green Debt) cho cụm dự án điện mặt trời mái nhà công nghiệp 450MWp.',
      outcome: 'Đạt chuẩn ESG IFC Performance Standards; hoàn tất giải ngân không phụ thuộc vào bảo lãnh mẹ.',
      irr: '24.1%',
    },
    {
      id: 'horizon',
      codename: 'Project Horizon',
      sector: 'tech',
      sectorLabel: 'Điện Toán Đám Mây & Trung Tâm Dữ Liệu',
      type: 'ma',
      typeLabel: 'Liên Doanh Chiến Lược (Strategic JV)',
      dealSize: '$520,000,000',
      role: 'Đại Diện Đàm Phán Tài Chính',
      year: '2022',
      summary: 'Thành lập liên doanh trung tâm dữ liệu Hyperscale đạt chuẩn Tier III+ giữa tập đoàn viễn thông nội địa và quỹ đầu tư hạ tầng toàn cầu.',
      outcome: 'Cam kết giải ngân vốn theo tiến độ xây dựng; bảo đảm tỷ lệ lấp đầy trước khai thác 80%.',
    },
  ];

  const filteredDeals = deals.filter((deal) => {
    const matchSector = selectedSector === 'all' || deal.sector === selectedSector;
    const matchType = selectedType === 'all' || deal.type === selectedType;
    return matchSector && matchType;
  });

  return (
    <section id="deals" className="relative py-28 md:py-36 bg-[#050507] text-white overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-800/60">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-sub uppercase tracking-[0.3em] text-[#dc2626] font-semibold mb-3">
              <span className="w-6 h-px bg-[#dc2626]" />
              <span>Thương Vụ Tiêu Biểu</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Dấu Ấn Thực Chiến & Thương Vụ Đóng
            </h2>
            <p className="text-sm font-sub tracking-[0.2em] text-neutral-400 mt-2 uppercase">
              Selected Landmark Transactions & Track Record
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center space-x-4">
            <div className="px-4 py-2 rounded-sm luxury-glass border-neutral-800 text-right">
              <div className="text-[10px] font-mono-tech uppercase text-neutral-500">Tổng Quy Mô Cố Vấn</div>
              <div className="text-lg font-mono-tech font-bold text-white">$2.8B+ USD</div>
            </div>
            <div className="px-4 py-2 rounded-sm luxury-glass border-neutral-800 text-right">
              <div className="text-[10px] font-mono-tech uppercase text-neutral-500">Tỷ Lệ Đóng Thành Công</div>
              <div className="text-lg font-mono-tech font-bold text-[#ef4444]">94.2%</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Sector Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-sub">
            <span className="text-[10px] font-mono-tech text-neutral-500 uppercase mr-1">Ngành:</span>
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'tech', label: 'Bán Dẫn & AI' },
              { id: 'mobility', label: 'Di Chuyển & EV' },
              { id: 'fintech', label: 'Fintech' },
              { id: 'energy', label: 'Năng Lượng Sạch' },
              { id: 'infra', label: 'Hạ Tầng & Logistics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSector(tab.id);
                }}
                className={`px-3 py-1.5 rounded-sm tracking-wider uppercase text-[11px] transition-all cursor-pointer ${
                  selectedSector === tab.id
                    ? 'bg-neutral-800 text-white border border-neutral-600 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Deal Type Filter */}
          <div className="flex items-center gap-1.5 text-xs font-sub">
            <span className="text-[10px] font-mono-tech text-neutral-500 uppercase mr-1">Loại Hình:</span>
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'ma', label: 'M&A' },
              { id: 'pe', label: 'Private Equity' },
              { id: 'restructuring', label: 'Tái Cơ Cấu' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedType(tab.id);
                }}
                className={`px-3 py-1.5 rounded-sm tracking-wider uppercase text-[11px] transition-all cursor-pointer ${
                  selectedType === tab.id
                    ? 'bg-[#dc2626] text-white border border-[#ef4444]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-sm luxury-glass border-neutral-800 hover:border-neutral-700/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Year */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-850">
                  <span className="text-[10px] font-mono-tech text-[#ef4444] tracking-widest uppercase font-semibold">
                    {deal.sectorLabel}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">{deal.year}</span>
                </div>

                {/* Deal Codename & Size */}
                <div className="mt-4">
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#fdfbf7] transition-colors">
                    {deal.codename}
                  </h3>
                  <div className="mt-1 flex items-baseline space-x-2">
                    <span className="font-mono-tech text-2xl font-bold text-white tracking-tight">
                      {deal.dealSize}
                    </span>
                    {deal.irr && (
                      <span className="text-[10px] font-mono text-[#d4af37] bg-[#d4af37]/10 px-1.5 py-0.5 rounded border border-[#d4af37]/20">
                        IRR {deal.irr}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-sub text-neutral-400 mt-1 uppercase tracking-wider">
                    {deal.typeLabel}
                  </div>
                </div>

                {/* Role */}
                <div className="mt-4 py-2 px-3 rounded-sm bg-[#09090d] border border-neutral-800/80 text-[11px] text-neutral-300 font-mono-tech">
                  <span className="text-neutral-500 uppercase mr-1">Vai Trò:</span>
                  <span className="text-white">{deal.role}</span>
                </div>

                {/* Summary */}
                <p className="mt-4 text-xs text-neutral-400 font-light leading-relaxed">
                  {deal.summary}
                </p>
              </div>

              {/* Outcome Box */}
              <div className="mt-6 pt-4 border-t border-neutral-850">
                <div className="text-[10px] font-sub uppercase tracking-wider text-neutral-500 mb-1">
                  Kết Quả Chiến Lược:
                </div>
                <div className="text-xs text-neutral-300 font-light leading-snug">
                  {deal.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-8 rounded-sm bg-gradient-to-r from-neutral-900 via-[#0e0c0e] to-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading text-lg font-bold text-white">
              Cần Thẩm Định Độc Lập Cho Thương Vụ Sắp Tới?
            </h4>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Tiến Đạt cam kết quy trình bảo mật tuyệt đối, ký Non-Disclosure Agreement (NDA) trước mọi trao đổi số liệu.
            </p>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenConsultation();
            }}
            className="px-6 py-3 rounded-sm text-xs font-sub uppercase font-bold tracking-wider text-white bg-gradient-to-r from-[#991b1b] to-[#dc2626] hover:brightness-110 shadow-lg cursor-pointer shrink-0 flex items-center space-x-2"
          >
            <span>Gửi Yêu Cầu Đánh Giá Thương Vụ</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
