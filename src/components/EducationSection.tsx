import React from 'react';
import { GraduationCap, Award, BookCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const educationItems = [
    {
      degree: 'Cử Nhân Tài Chính Doanh Nghiệp & Ngân Hàng',
      school: 'Đại Học Kinh Tế / Tài Chính Hàng Đầu',
      period: 'Tốt nghiệp Xuất Sắc',
      desc: 'Nền tảng học thuật vững chắc về Kinh tế vi mô, Kinh tế vĩ mô, Thị trường vốn, Quản trị tài chính doanh nghiệp và Phân tích báo cáo tài chính quốc tế (IFRS).',
    },
    {
      degree: 'CFA® Charterholder Candidate Track',
      school: 'CFA Institute (Hoa Kỳ)',
      period: 'Cấp độ Chuyên sâu',
      desc: 'Hoàn tất các kỳ thi chuyên môn cao cấp về Định giá tài sản vốn, Phân tích chứng khoán nợ, Báo cáo tài chính doanh nghiệp và Chuẩn mực Đạo đức nghề nghiệp đầu tư toàn cầu.',
    },
    {
      degree: 'Chứng Chỉ Chuyên Sâu M&A & Private Equity Modeling',
      school: 'Chương Trình Đào Tạo Ngân Hàng Đầu Tư Quốc Tế',
      period: 'Chứng chỉ Chuyên môn',
      desc: 'Thành thạo xây dựng mô hình LBO (Leveraged Buyout), Mô hình sáp nhập hợp nhất (M&A Accretion/Dilution), DCF đa kịch bản và Thẩm định tài chính chuyên sâu (Financial Due Diligence).',
    },
    {
      degree: 'Quản Trị Rủi Ro Danh Mục & Phân Bổ Nguồn Vốn',
      school: 'Viện Quản Trị Tài Chính Chiến Lược',
      period: 'Executive Program',
      desc: 'Nghiên cứu cấu trúc tối ưu chi phí vốn WACC, công cụ phái sinh phòng ngừa rủi ro tỷ giá và lãi suất cho các tập đoàn đa quốc gia.',
    },
  ];

  return (
    <section 
      id="education" 
      className="relative py-24 md:py-32 bg-[#050507] text-white overflow-hidden border-t border-neutral-900"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-2">
            <span className="w-5 h-0.5 bg-[#dc2626]" />
            <span>Học Tập & Đào Tạo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Nền Tảng Học Thuật & Chuyên Môn
          </h2>
          <p className="text-sm font-semibold tracking-wider text-neutral-400 mt-1 uppercase">
            Academic Background & Professional Certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationItems.map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-sm luxury-glass border-neutral-800 hover:border-neutral-600 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-[#ef4444]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-sm border border-neutral-800">
                  {item.period}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">
                  {item.degree}
                </h3>
                <div className="text-xs font-semibold text-[#ef4444] mt-0.5">
                  {item.school}
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-normal pt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
