import React, { useState, useMemo } from 'react';
import { soundManager } from '../utils/audioSynth';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Sliders, 
  PieChart, 
  ShieldCheck, 
  ArrowUpRight,
  RefreshCw,
  Info
} from 'lucide-react';

interface ValuationSimulatorProps {
  onOpenConsultation: () => void;
}

export const ValuationSimulator: React.FC<ValuationSimulatorProps> = ({ onOpenConsultation }) => {
  // Input parameters
  const [revenue, setRevenue] = useState<number>(85); // $85M
  const [ebitdaMargin, setEbitdaMargin] = useState<number>(22); // 22%
  const [multiple, setMultiple] = useState<number>(12.5); // 12.5x EV/EBITDA
  const [netDebt, setNetDebt] = useState<number>(25); // $25M
  const [leverageCap, setLeverageCap] = useState<number>(3.5); // 3.5x Senior Debt / EBITDA
  const [growthRate, setGrowthRate] = useState<number>(18); // 18% annual growth

  // Calculations
  const metrics = useMemo(() => {
    const ebitda = (revenue * ebitdaMargin) / 100;
    const enterpriseValue = ebitda * multiple;
    const equityValue = Math.max(0, enterpriseValue - netDebt);
    
    // Capital Structure
    const maxSeniorDebt = Math.min(ebitda * leverageCap, enterpriseValue * 0.65);
    const mezzanine = Math.max(0, Math.min(ebitda * 1.2, (enterpriseValue - maxSeniorDebt) * 0.3));
    const sponsorEquity = Math.max(0, enterpriseValue - maxSeniorDebt - mezzanine);

    // Projected 5-Year exit calculation
    const year5Revenue = revenue * Math.pow(1 + growthRate / 100, 5);
    const year5Ebitda = (year5Revenue * ebitdaMargin) / 100;
    const year5EV = year5Ebitda * (multiple * 0.95); // Conservative exit multiple
    const year5DebtRemaining = Math.max(0, maxSeniorDebt * 0.35); // Amortized
    const year5Equity = Math.max(0, year5EV - year5DebtRemaining);
    
    const moic = sponsorEquity > 0 ? year5Equity / sponsorEquity : 1.0;
    const irr = sponsorEquity > 0 ? (Math.pow(moic, 1 / 5) - 1) * 100 : 0;

    return {
      ebitda,
      enterpriseValue,
      equityValue,
      maxSeniorDebt,
      mezzanine,
      sponsorEquity,
      year5EV,
      year5Equity,
      moic,
      irr,
    };
  }, [revenue, ebitdaMargin, multiple, netDebt, leverageCap, growthRate]);

  return (
    <section id="simulator" className="relative py-28 md:py-36 bg-[#030305] text-white overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-[11px] font-sub uppercase tracking-[0.3em] text-[#dc2626] font-semibold mb-3">
            <span className="w-6 h-px bg-[#dc2626]" />
            <span>Mô Phỏng Tài Chính Trực Tuyến</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Mô Hình Định Giá & Cấu Trúc Nguồn Vốn
          </h2>
          <p className="mt-4 text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
            Ước tính Giá trị Doanh nghiệp (Enterprise Value), Vốn chủ sở hữu và Cấu trúc vốn tối ưu theo tiêu chuẩn ngân hàng đầu tư quốc tế.
          </p>
        </div>

        {/* Main Simulator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-sm luxury-glass border-neutral-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center space-x-2 text-xs font-sub uppercase tracking-wider text-neutral-300 font-bold">
                <Sliders className="w-4 h-4 text-[#ef4444]" />
                <span>Tham Số Tài Chính Đầu Vào</span>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setRevenue(85);
                  setEbitdaMargin(22);
                  setMultiple(12.5);
                  setNetDebt(25);
                  setLeverageCap(3.5);
                  setGrowthRate(18);
                }}
                className="text-[10px] font-mono-tech text-neutral-500 hover:text-neutral-300 flex items-center space-x-1 cursor-pointer"
                title="Khôi phục mặc định"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Đặt Lại</span>
              </button>
            </div>

            {/* Parameter 1: Annual Revenue */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-300 font-sub">Doanh Thu Thuần Hàng Năm (LTM Revenue)</span>
                <span className="font-mono text-[#fdfbf7] font-bold text-sm">${revenue}M USD</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={revenue}
                onChange={(e) => {
                  setRevenue(parseFloat(e.target.value));
                  soundManager.playClick(900, 0.015, 0.02);
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#dc2626]"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>$10M</span>
                <span>$250M</span>
                <span>$500M+</span>
              </div>
            </div>

            {/* Parameter 2: EBITDA Margin */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-300 font-sub">Biên Lợi Nhuận EBITDA (%)</span>
                <span className="font-mono text-[#fdfbf7] font-bold text-sm">{ebitdaMargin}% (${metrics.ebitda.toFixed(1)}M EBITDA)</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={ebitdaMargin}
                onChange={(e) => {
                  setEbitdaMargin(parseFloat(e.target.value));
                  soundManager.playClick(900, 0.015, 0.02);
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#dc2626]"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>5%</span>
                <span>25%</span>
                <span>45%</span>
              </div>
            </div>

            {/* Parameter 3: EV/EBITDA Multiple */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-300 font-sub">Bội Số Định Giá Ngành (EV/EBITDA Multiple)</span>
                <span className="font-mono text-[#ef4444] font-bold text-sm">{multiple.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={multiple}
                onChange={(e) => {
                  setMultiple(parseFloat(e.target.value));
                  soundManager.playClick(900, 0.015, 0.02);
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#dc2626]"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>5.0x (Sản Xuất)</span>
                <span>12.5x (Tiêu Chuẩn)</span>
                <span>25.0x (High-Tech/AI)</span>
              </div>
            </div>

            {/* Parameter 4: Net Debt */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-300 font-sub">Nợ Vay Ròng Hiện Hữu (Net Debt)</span>
                <span className="font-mono text-[#fdfbf7] font-bold text-sm">${netDebt}M USD</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                step="5"
                value={netDebt}
                onChange={(e) => {
                  setNetDebt(parseFloat(e.target.value));
                  soundManager.playClick(900, 0.015, 0.02);
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#dc2626]"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>$0M (Cash-rich)</span>
                <span>$75M</span>
                <span>$150M</span>
              </div>
            </div>

            {/* Parameter 5: Growth Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-300 font-sub">Dự Báo Tăng Trưởng Hàng Năm (5-Year CAGR)</span>
                <span className="font-mono text-[#d4af37] font-bold text-sm">+{growthRate}% / năm</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={growthRate}
                onChange={(e) => {
                  setGrowthRate(parseFloat(e.target.value));
                  soundManager.playClick(900, 0.015, 0.02);
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#dc2626]"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>5% (Ổn định)</span>
                <span>20% (Tăng trưởng cao)</span>
                <span>40% (Siêu tốc)</span>
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Valuation Cards */}
            <div className="p-8 rounded-sm luxury-glass border-[#dc2626]/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#dc2626]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#ef4444] font-semibold mb-1">
                Kết Quả Định Giá Doanh Nghiệp (Valuation Output)
              </div>

              {/* Enterprise Value (EV) */}
              <div className="mt-4 pb-6 border-b border-neutral-800">
                <div className="text-xs font-sub uppercase tracking-wider text-neutral-400">
                  Giá Trị Doanh Nghiệp (Enterprise Value - EV)
                </div>
                <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-1">
                  ${metrics.enterpriseValue.toFixed(1)}M <span className="text-base font-sub text-neutral-400 font-normal">USD</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1">
                  &asymp; {(metrics.enterpriseValue * 25.4).toFixed(0)} Tỷ VNĐ (Tỷ giá tham chiếu)
                </div>
              </div>

              {/* Equity Value */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-sub uppercase tracking-wider text-neutral-400">
                    Giá Trị Vốn Chủ Sở Hữu (Equity Value)
                  </div>
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#fdfbf7] mt-1">
                    ${metrics.equityValue.toFixed(1)}M USD
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    Đã trừ nợ ròng ${netDebt}M
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-sub uppercase tracking-wider text-neutral-400">
                    Tỷ Suất Sinh Lời Dự Kiến (5-Year IRR)
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono-tech font-bold text-[#ef4444] mt-1">
                    {metrics.irr.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-[#d4af37] font-mono mt-0.5">
                    MOIC: {metrics.moic.toFixed(2)}x
                  </div>
                </div>
              </div>

              {/* Capital Structure Breakdown Bar */}
              <div className="mt-8 pt-6 border-t border-neutral-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-sub uppercase tracking-wider text-neutral-400">
                  <span>Cấu Trúc Nguồn Vốn Đề Xuất (Capital Stack)</span>
                  <span className="text-neutral-500 font-mono">100% EV</span>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-neutral-900 rounded-sm flex overflow-hidden border border-neutral-800">
                  <div 
                    style={{ width: `${(metrics.maxSeniorDebt / metrics.enterpriseValue) * 100}%` }}
                    className="bg-neutral-600 h-full"
                    title={`Nợ Cao Cấp: $${metrics.maxSeniorDebt.toFixed(1)}M`}
                  />
                  <div 
                    style={{ width: `${(metrics.mezzanine / metrics.enterpriseValue) * 100}%` }}
                    className="bg-[#d4af37] h-full"
                    title={`Vốn Lửng Mezzanine: $${metrics.mezzanine.toFixed(1)}M`}
                  />
                  <div 
                    style={{ width: `${(metrics.sponsorEquity / metrics.enterpriseValue) * 100}%` }}
                    className="bg-[#dc2626] h-full"
                    title={`Vốn Cổ Phần: $${metrics.sponsorEquity.toFixed(1)}M`}
                  />
                </div>

                {/* Legend */}
                <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="inline-block w-2 h-2 bg-neutral-500 mr-1.5 rounded-xs" />
                    <span className="text-neutral-400 font-sub">Senior Debt:</span>
                    <span className="font-mono text-white ml-1 font-semibold">${metrics.maxSeniorDebt.toFixed(1)}M</span>
                  </div>
                  <div>
                    <span className="inline-block w-2 h-2 bg-[#d4af37] mr-1.5 rounded-xs" />
                    <span className="text-neutral-400 font-sub">Mezzanine:</span>
                    <span className="font-mono text-white ml-1 font-semibold">${metrics.mezzanine.toFixed(1)}M</span>
                  </div>
                  <div>
                    <span className="inline-block w-2 h-2 bg-[#dc2626] mr-1.5 rounded-xs" />
                    <span className="text-neutral-400 font-sub">Sponsor Eq:</span>
                    <span className="font-mono text-white ml-1 font-semibold">${metrics.sponsorEquity.toFixed(1)}M</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Consultation CTA */}
            <div className="p-6 rounded-sm luxury-glass border-neutral-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-sub uppercase font-bold text-white tracking-wider">
                  Cần Bản Phân Tích Định Giá Chi Tiết?
                </div>
                <div className="text-xs text-neutral-400 font-light mt-0.5">
                  Nhận báo cáo định giá chuyên sâu 15 trang kèm mô hình DCF & Comps thực tế.
                </div>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenConsultation();
                }}
                className="px-5 py-2.5 rounded-sm text-xs font-sub uppercase font-bold tracking-wider text-white bg-gradient-to-r from-[#991b1b] to-[#dc2626] hover:brightness-110 shadow-md shrink-0 cursor-pointer flex items-center space-x-1.5"
              >
                <span>Tư Vấn HĐQT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
