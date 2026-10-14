import React, { useState } from 'react';
import { soundManager } from '../utils/audioSynth';
import { 
  Briefcase, 
  Layers, 
  TrendingUp, 
  Scale, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  ShieldAlert,
  Coins
} from 'lucide-react';

interface CoreExpertiseProps {
  onOpenConsultation: () => void;
}

export const CoreExpertise: React.FC<CoreExpertiseProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const practices = [
    {
      id: 'm-and-a',
      icon: Briefcase,
      title: 'M&A & Tư Vấn Sáp Nhập Xuyên Biên Giới',
      subtitle: 'Cross-Border M&A & Strategic Divestitures',
      description: 'Điều phối toàn diện thương vụ M&A từ xác định mục tiêu chiến lược, thẩm định tài chính chuyên sâu (Financial DD), định giá đa kịch bản đến đàm phán hợp đồng mua bán cổ phần (SPA).',
      deliverables: [
        'Xác định & tiếp cận danh mục đối tác chiến lược bảo mật',
        'Lập mô hình hiệp lực tài chính & hoạt động (Synergy Modeling)',
        'Đàm phán cấu trúc thanh toán phức hợp (Earn-outs, Escrow, Stock Swap)',
        'Cố vấn hậu sáp nhập (Post-Merger Financial Integration)',
      ],
      dealRange: '$25M – $500M+',
      highlightMetric: '42+ Mandates Đã Đóng',
    },
    {
      id: 'private-equity',
      icon: Coins,
      title: 'Thu Xếp Vốn Cổ Phần Tư Nhân (Private Equity)',
      subtitle: 'Growth Equity & Structured Mezzanine',
      description: 'Kết nối doanh nghiệp tăng trưởng quy mô với các định chế tài chính toàn cầu, Quỹ đầu tư mạo hiểm (Late-stage VC), Quỹ Tăng Trưởng (Growth Fund) và Quỹ Sovereign Wealth.',
      deliverables: [
        'Xây dựng Hồ sơ Chào bán Bảo mật (Information Memorandum - IM)',
        'Thiết kế cấu trúc công cụ vốn lai (Convertible Notes, Preferred Shares)',
        'Bảo toàn quyền kiểm soát của Cổ đông sáng lập & Tối ưu hóa pha loãng',
        'Chuẩn bị hồ sơ pháp lý & phòng dữ liệu ảo (Virtual Data Room - VDR)',
      ],
      dealRange: '$15M – $200M',
      highlightMetric: '28.4% Average IRR',
    },
    {
      id: 'capital-structure',
      icon: Layers,
      title: 'Tái Cấu Trúc Vốn & Tối Ưu Bảng Cân Đối',
      subtitle: 'Capital Structuring & Debt Refinancing',
      description: 'Tái cấu trúc tỷ lệ nợ/vốn chủ sở hữu (Debt/Equity), thu xếp tín dụng tư nhân (Private Credit), tái đàm phán khế ước nợ (Debt Covenants) và phòng ngừa rủi ro tỷ giá/lãi suất.',
      deliverables: [
        'Đánh giá sức khỏe bảng cân đối & mô phỏng khả năng trả nợ (DSCR)',
        'Phát hành trái phiếu doanh nghiệp cấu trúc bảo mật hoặc bảo lãnh',
        'Tối ưu hóa Chi phí vốn bình quân gia quyền (WACC)',
        'Giải pháp tái tài trợ nợ ngắn hạn thành nợ dài hạn chiến lược',
      ],
      dealRange: '$30M – $350M',
      highlightMetric: 'Giảm Bình Quân 180bps Chi Phí Vốn',
    },
    {
      id: 'valuation-opinions',
      icon: Scale,
      title: 'Định Giá Độc Lập & Ý Kiến Công Bằng (Fairness Opinions)',
      subtitle: 'Rigorous Financial Modeling & Boardroom Advisory',
      description: 'Cung cấp báo cáo định giá độc lập theo chuẩn mực quốc tế IVS cho Hội đồng Quản trị, cổ đông chiến lược, cơ quan thuế và tòa án thương mại.',
      deliverables: [
        'Mô hình chiết khấu dòng tiền đa kịch bản (DCF & APV Model)',
        'Phân tích định giá so sánh tương quan (Comps & Precedent Transactions)',
        'Định giá tài sản vô hình, bằng sáng chế & công nghệ độc quyền',
        'Cung cấp Báo cáo Ý kiến Công bằng (Fairness Opinion) bảo vệ HĐQT',
      ],
      dealRange: 'Toàn bộ quy mô doanh nghiệp',
      highlightMetric: 'Chuẩn IVS & CFA Institute',
    },
  ];

  return (
    <section id="expertise" className="relative py-28 md:py-36 bg-[#030305] text-white overflow-hidden border-t border-neutral-900">
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-[11px] font-sub uppercase tracking-[0.3em] text-[#dc2626] font-semibold mb-3">
            <span className="w-6 h-px bg-[#dc2626]" />
            <span>Năng Lực Trọng Tâm</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Cấu Trúc Giải Pháp Tài Chính Đỉnh Cao Cho Những Thời Khắc Then Chốt
          </h2>
          <p className="mt-4 text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
            Kết hợp tư duy phân tích định lượng khắt khe với kinh nghiệm thực chiến trên bàn đàm phán để bảo vệ và bứt phá giá trị cho doanh nghiệp.
          </p>
        </div>

        {/* Interactive Practice Selector (Desktop & Tablet) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tab Navigation List */}
          <div className="lg:col-span-5 space-y-3">
            {practices.map((practice, index) => {
              const Icon = practice.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={practice.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(index);
                  }}
                  className={`w-full text-left p-5 rounded-sm transition-all duration-300 flex items-start space-x-4 cursor-pointer border ${
                    isActive 
                      ? 'bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border-[#dc2626]/60 shadow-[0_4px_25px_rgba(220,38,38,0.15)]'
                      : 'bg-[#09090d]/60 border-neutral-850/60 hover:border-neutral-700/80 hover:bg-[#0d0e14]'
                  }`}
                >
                  <div className={`p-2.5 rounded-sm shrink-0 mt-0.5 border transition-colors ${
                    isActive 
                      ? 'bg-[#dc2626] text-white border-[#ef4444]' 
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xs font-sub uppercase tracking-wider font-bold truncate ${
                        isActive ? 'text-white' : 'text-neutral-300'
                      }`}>
                        {practice.title}
                      </h3>
                      {isActive && <ChevronRight className="w-4 h-4 text-[#ef4444] shrink-0 ml-1" />}
                    </div>
                    <p className="text-[11px] font-mono-tech text-neutral-500 tracking-wide mt-1 truncate">
                      {practice.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Detail Display Card */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-sm luxury-glass border-neutral-800 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
              <div>
                <span className="text-[10px] font-mono-tech text-[#ef4444] uppercase tracking-widest block">
                  Mandate Specification &bull; 0{activeTab + 1}
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mt-1">
                  {practices[activeTab].title}
                </h3>
                <span className="text-xs font-sub uppercase tracking-widest text-neutral-400">
                  {practices[activeTab].subtitle}
                </span>
              </div>

              <div className="text-right">
                <div className="text-xs font-sub uppercase text-neutral-400">Quy Mô Thương Vụ</div>
                <div className="text-base font-mono-tech font-bold text-[#fdfbf7]">
                  {practices[activeTab].dealRange}
                </div>
                <div className="text-[10px] font-mono text-[#ef4444] font-medium">
                  {practices[activeTab].highlightMetric}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm text-neutral-300 font-light leading-relaxed">
              {practices[activeTab].description}
            </p>

            {/* Key Deliverables */}
            <div className="mt-8 space-y-3.5">
              <h4 className="text-xs font-sub uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                Nhiệm Vụ & Giá Trị Cung Cấp:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {practices[activeTab].deliverables.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-sm bg-[#07070b] border border-neutral-800/80 flex items-start space-x-2.5 text-xs text-neutral-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ef4444] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA inside practice */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 font-light">
                Mọi thông tin thương vụ được ký cam kết bảo mật NDA trước khi tiếp cận.
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenConsultation();
                }}
                className="px-5 py-2.5 rounded-sm text-xs font-sub uppercase font-bold tracking-wider text-white bg-gradient-to-r from-[#991b1b] to-[#dc2626] hover:brightness-110 shadow-lg flex items-center space-x-2 cursor-pointer"
              >
                <span>Thảo Luận Yêu Cầu Mandate Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
