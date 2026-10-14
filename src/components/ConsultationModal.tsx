import React, { useState } from 'react';
import { soundManager } from '../utils/audioSynth';
import { 
  X, 
  Lock, 
  Send, 
  CheckCircle2, 
  Building, 
  Mail, 
  Phone, 
  MapPin
} from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    mandateType: 'ma-sell',
    dealSize: '25-100m',
    notes: '',
    ndaAgreed: true,
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChime(640, 'triangle', 0.5, 0.1);
    const randomCode = `TD-MANDATE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionId(randomCode);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    soundManager.playClick();
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#030305]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="relative w-full max-w-2xl p-6 sm:p-10 rounded-sm luxury-glass border-neutral-700 shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full luxury-glass text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 pb-4 border-b border-neutral-800">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#dc2626] font-bold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Tiếp Nhận Mandate Cố Vấn &bull; Bảo Mật Tuyệt Đối</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                Khởi Tạo Mandate Hợp Tác
              </h2>
              <p className="text-xs text-neutral-300 mt-1">
                Văn phòng Cố vấn: <strong>Tiến Đạt</strong> &bull; Corporate Finance - Investment &bull; Quận 9 - TP.HCM
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Họ & Tên Đại Diện *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#09090d] border border-neutral-800 focus:border-[#dc2626] text-xs text-white placeholder-neutral-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Doanh Nghiệp / Quỹ Đầu Tư *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Tập đoàn ABC / Quỹ XYZ"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#09090d] border border-neutral-800 focus:border-[#dc2626] text-xs text-white placeholder-neutral-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Email Công Vụ *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ceo@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#09090d] border border-neutral-800 focus:border-[#dc2626] text-xs text-white placeholder-neutral-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Số Điện Thoại / Kênh Liên Lạc *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+84 90 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#09090d] border border-neutral-800 focus:border-[#dc2626] text-xs text-white placeholder-neutral-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Loại Hình Thương Vụ *
                  </label>
                  <select
                    value={formData.mandateType}
                    onChange={(e) => setFormData({ ...formData, mandateType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#09090d] border border-neutral-800 focus:border-[#dc2626] text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="ma-sell">Bên Bán M&A (Sell-side Advisory)</option>
                    <option value="ma-buy">Bên Mua M&A (Buy-side Scouting)</option>
                    <option value="pe-growth">Thu Xếp Vốn Private Equity (Growth Round)</option>
                    <option value="restructure">Tái Cấu Trúc Vốn & Tối Ưu Nợ</option>
                    <option value="valuation">Định Giá Độc Lập / Fairness Opinion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Quy Mô Thương Vụ Dự Kiến *
                  </label>
                  <select
                    value={formData.dealSize}
                    onChange={(e) => setFormData({ ...formData, dealSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#09090d] border border-neutral-800 focus:border-[#dc2626] text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="10-25m">$10M – $25M USD</option>
                    <option value="25-100m">$25M – $100M USD</option>
                    <option value="100-300m">$100M – $300M USD</option>
                    <option value="300m+">Trên $300M+ USD (Large-cap)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                  Mô Tả Nhu Cầu & Bối Cảnh Chiến Lược
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tóm tắt yêu cầu thương vụ, mốc thời gian kỳ vọng hoặc yêu cầu bảo mật..."
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#09090d] border border-neutral-800 focus:border-[#dc2626] text-xs text-white placeholder-neutral-600 outline-none resize-none"
                />
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="ndaCheckboxModal"
                  checked={formData.ndaAgreed}
                  onChange={(e) => setFormData({ ...formData, ndaAgreed: e.target.checked })}
                  className="mt-0.5 rounded border-neutral-700 text-[#dc2626] focus:ring-[#dc2626] accent-[#dc2626]"
                />
                <label htmlFor="ndaCheckboxModal" className="text-xs text-neutral-400 cursor-pointer leading-relaxed">
                  Cam kết thỏa thuận bảo mật hai chiều (Mutual NDA). Mọi thông tin và số liệu tài chính được bảo vệ theo chuẩn mực bảo mật ngân hàng đầu tư quốc tế.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-sm text-xs uppercase font-bold tracking-wider text-white bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#b91c1c] hover:brightness-110 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Hồ Sơ Mandate Bảo Mật</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#dc2626]/20 border border-[#dc2626] flex items-center justify-center text-[#ef4444] shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              Hồ Sơ Đã Được Tiếp Nhận
            </h3>

            <div className="p-4 rounded-sm bg-[#09090d] border border-neutral-800 max-w-md mx-auto text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Mã Hồ Sơ (Reference ID):</span>
                <span className="font-bold text-[#ef4444]">{submissionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Đại Diện:</span>
                <span className="text-white font-medium">{formData.fullName} ({formData.organization})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Văn Phòng:</span>
                <span className="text-[#d4af37]">Tiến Đạt (Quận 9 - TP.HCM)</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Văn phòng cố vấn sẽ liên hệ trực tiếp trong vòng 04 giờ làm việc qua kênh liên lạc đã cung cấp để tiến hành ký kết Non-Disclosure Agreement (NDA).
            </p>

            <button
              onClick={handleResetAndClose}
              className="mt-3 px-6 py-2 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase cursor-pointer"
            >
              Hoàn Tất & Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
