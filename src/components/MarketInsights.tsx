import React, { useState } from 'react';
import { soundManager } from '../utils/audioSynth';
import { BookOpen, FileText, ArrowUpRight, Calendar, User, X, ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
}

export const MarketInsights: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'semi-ma-2026',
      title: 'Xu Hướng M&A Bán Dẫn & AI Khu Vực APAC 2026: Kỷ Nguyên Tái Định Giá Dựa Trên Năng Lực Chuỗi Cung Ứng',
      category: 'Báo Cáo Chiến Lược M&A',
      date: 'Tháng 10, 2026',
      readTime: '6 phút đọc',
      summary: 'Phân tích các động lực thúc đẩy dòng vốn M&A từ Mỹ, Nhật Bản và Singapore rót vào các trung tâm thiết kế chip và kiểm thử vi mạch tại Đông Nam Á.',
      content: [
        'Dòng vốn M&A toàn cầu trong lĩnh vực công nghệ cao đang trải qua giai đoạn sàng lọc khắt khe nhất trong một thập kỷ qua. Các nhà đầu tư chiến lược không còn trả phí định giá (valuation premium) chỉ dựa trên kỳ vọng tăng trưởng người dùng, mà tập trung tuyệt đối vào tỷ suất EBITDA thực tế, sở hữu trí tuệ lõi (IP) và vị trí trong chuỗi cung ứng bán dẫn toàn cầu.',
        'Tại Việt Nam và khu vực Đông Nam Á, làn sóng M&A xuyên biên giới đang ghi nhận mức tăng trưởng 34% so với cùng kỳ năm trước. Điểm mấu chốt để chốt thành công các thương vụ trên $100M là khả năng xây dựng cấu trúc Earn-out linh hoạt, đảm bảo đội ngũ kỹ sư sáng lập tiếp tục cam kết cống hiến ít nhất 3 năm sau sáp nhập.',
        'Chiến lược đàm phán tối ưu đòi hỏi bên bán phải chuẩn bị Báo cáo Thẩm định Tài chính Nhà Cung cấp (Vendor Due Diligence) độc lập ít nhất 6 tháng trước khi mở phòng dữ liệu ảo VDR, qua đó nắm thế chủ động định giá và rút ngắn 40% thời gian chốt giao dịch.',
      ],
    },
    {
      id: 'private-credit-yield',
      title: 'Tín Dụng Tư Nhân (Private Credit): Giải Pháp Vốn Linh Hoạt Trong Bối Cảnh Tín Dụng Ngân Hàng Thắt Chặt',
      category: 'Cấu Trúc Nguồn Vốn',
      date: 'Tháng 09, 2026',
      readTime: '8 phút đọc',
      summary: 'Cách các tập đoàn quy mô vừa và lớn sử dụng nợ thứ cấp có cấu trúc để tài trợ mở rộng kinh doanh mà không làm pha loãng quyền biểu quyết của cổ đông.',
      content: [
        'Khi các ngân hàng thương mại siết chặt hạn mức cho vay trung và dài hạn đối với các lĩnh vực đòi hỏi đầu tư vốn lớn (CapEx-heavy), thị trường Tín dụng Tư nhân (Private Credit) đã nổi lên như một công cụ tài chính then chốt.',
        'Khác với trái phiếu phát hành ra công chúng chịu nhiều rủi ro về điều kiện thị trường và kỳ hạn cứng nhắc, các khoản vay tín dụng tư nhân được thiết kế riêng biệt (bespoke) với các điều khoản bảo đảm tài sản linh hoạt, thời gian ân hạn nợ gốc phù hợp với chu kỳ dòng tiền vận hành của doanh nghiệp.',
        'Tiến Đạt đã đồng hành cùng nhiều doanh nghiệp để thu xếp các gói Mezzanine Finance với lãi suất cơ sở cạnh tranh kèm quyền chọn cổ phần (equity kickers), giúp doanh nghiệp tăng trưởng 200% mà không bị mất quyền kiểm soát HĐQT.',
      ],
    },
    {
      id: 'aerodynamic-capital-theory',
      title: 'Triết Lý Khí Động Học Của Nguồn Vốn: Tại Sao Tốc Độ Đóng Giao Dịch Quyết Định Bội Số Định Giá?',
      category: 'Tư Duy Đầu Tư',
      date: 'Tháng 08, 2026',
      readTime: '5 phút đọc',
      summary: 'Tương quan mật thiết giữa tính chuẩn xác của mô hình kỹ thuật siêu xe thể thao và hiệu quả điều hướng nguồn vốn trong ngân hàng đầu tư.',
      content: [
        'Trong ngành công nghiệp siêu xe, mỗi milimet trên thân vỏ Ferrari 458 Italia đều được tạo tác bởi khí động học: triệt tiêu lực nâng ở tốc độ cao mà không làm tăng ma sát bề mặt. Trong tài chính doanh nghiệp, điều này tương đương với việc loại bỏ mọi rào cản đàm phán gây chậm trễ thương vụ.',
        'Dữ liệu từ 150 thương vụ M&A quy mô trên $50M tại Đông Nam Á chỉ ra rằng: cứ mỗi tháng kéo dài trong quá trình Due Diligence, xác suất thương vụ sụp đổ tăng thêm 7.2%, và bội số định giá thực tế bị ép giảm bình quân 4.5%.',
        'Tốc độ không phải là sự vội vã cảm tính, mà là kết quả của sự chuẩn bị dữ liệu tài chính với độ chuẩn xác tuyệt đối ngay từ ngày đầu tiên.',
      ],
    },
  ];

  return (
    <section id="insights" className="relative py-28 md:py-36 bg-[#050507] text-white overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-800/60">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-sub uppercase tracking-[0.3em] text-[#dc2626] font-semibold mb-3">
              <span className="w-6 h-px bg-[#dc2626]" />
              <span>Góc Nhìn Chuyên Môn</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Báo Cáo & Nhận Định Chiến Lược
            </h2>
            <p className="text-sm font-sub tracking-[0.2em] text-neutral-400 mt-2 uppercase">
              Executive Research & Strategic Intelligence
            </p>
          </div>

          <div className="mt-6 md:mt-0 text-xs text-neutral-400 font-mono-tech uppercase tracking-wider">
            Cập nhật định kỳ cho các Quỹ & HĐQT
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedArticle(article);
              }}
              className="p-7 rounded-sm luxury-glass border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-500 mb-4 pb-3 border-b border-neutral-850">
                  <span className="text-[#ef4444] font-semibold uppercase">{article.category}</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#fdfbf7] leading-snug transition-colors">
                  {article.title}
                </h3>

                <p className="mt-4 text-xs text-neutral-400 font-light leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs font-sub uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                <span>{article.readTime}</span>
                <span className="flex items-center space-x-1 text-[#ef4444]">
                  <span>Đọc Báo Cáo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-[#030305]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl p-8 sm:p-12 rounded-sm luxury-glass border-neutral-700 shadow-2xl my-auto">
            {/* Close button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedArticle(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full luxury-glass text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Đóng bài viết"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 text-xs font-mono-tech text-neutral-400 uppercase tracking-widest mb-4">
              <span className="text-[#ef4444] font-bold">{selectedArticle.category}</span>
              <span>&bull;</span>
              <span>{selectedArticle.date}</span>
              <span>&bull;</span>
              <span>Tác giả: Tiến Đạt</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="h-px bg-neutral-800 my-6" />

            {/* Content Body */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {selectedArticle.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Footer action */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-mono-tech">
                Bản quyền &copy; TIẾN ĐẠT Corporate Finance &bull; Nghiêm cấm sao chép trái phép
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-white font-sub uppercase tracking-wider text-xs cursor-pointer"
              >
                Đóng Báo Cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
