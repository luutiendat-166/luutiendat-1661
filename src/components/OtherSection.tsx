import React from 'react';
import { ValuationSimulator } from './ValuationSimulator';
import { MarketInsights } from './MarketInsights';
import { ShieldCheck, FileText, ArrowUpRight, HelpCircle } from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface OtherSectionProps {
  onOpenConsultation: () => void;
}

export const OtherSection: React.FC<OtherSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section 
      id="other" 
      className="relative py-24 md:py-32 bg-[#030305] text-white overflow-hidden border-t border-neutral-900"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-2">
            <span className="w-5 h-0.5 bg-[#dc2626]" />
            <span>Khác</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Công Cụ Định Giá & Nghiên Cứu
          </h2>
          <p className="text-sm font-semibold tracking-wider text-neutral-400 mt-1 uppercase">
            Valuation Tool, Research Reports & Additional Services
          </p>
        </div>

        {/* Embedded Interactive Valuation Simulator */}
        <div className="mb-16">
          <ValuationSimulator onOpenConsultation={onOpenConsultation} />
        </div>

        {/* Embedded Market Insights & Research */}
        <div>
          <MarketInsights />
        </div>
      </div>
    </section>
  );
};
