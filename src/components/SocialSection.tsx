import React, { useState } from 'react';
import { soundManager } from '../utils/audioSynth';
import { 
  Linkedin, 
  Facebook, 
  Send, 
  Mail, 
  Phone, 
  MessageSquare, 
  ExternalLink,
  Copy,
  Check,
  MapPin
} from 'lucide-react';

export const SocialSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const socialLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn Professional',
      handle: 'Tiến Đạt | Corporate Finance',
      url: 'https://linkedin.com',
      icon: Linkedin,
      detail: 'Kết nối mạng lưới chuyên gia tài chính & HĐQT quốc tế',
      color: 'hover:text-[#0a66c2]',
    },
    {
      id: 'facebook',
      name: 'Facebook cá nhân / công vụ',
      handle: 'Tiến Đạt (Corporate Finance)',
      url: 'https://facebook.com',
      icon: Facebook,
      detail: 'Cập nhật tin tức thị trường và nhận định tài chính',
      color: 'hover:text-[#1877f2]',
    },
    {
      id: 'telegram',
      name: 'Telegram Confidential Deal Desk',
      handle: '@tiendat_corpfin',
      url: 'https://t.me',
      icon: Send,
      detail: 'Kênh trao đổi bảo mật mã hóa đầu cuối cho thương vụ',
      color: 'hover:text-[#229ed9]',
    },
    {
      id: 'email',
      name: 'Email Cố Vấn Trực Tiếp',
      handle: 'datluu.16062001@gmail.com',
      copyValue: 'datluu.16062001@gmail.com',
      icon: Mail,
      detail: 'Tiếp nhận hồ sơ chào bán và yêu cầu tư vấn độc quyền',
      color: 'hover:text-[#ef4444]',
    },
  ];

  return (
    <section 
      id="social" 
      className="relative py-24 md:py-32 bg-[#050507] text-white overflow-hidden border-t border-neutral-900"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-2">
            <span className="w-5 h-0.5 bg-[#dc2626]" />
            <span>Tab 05: Mạng Xã Hội & Kết Nối</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Mạng Lưới Kênh Liên Lạc
          </h2>
          <p className="text-sm font-semibold tracking-wider text-neutral-400 mt-1 uppercase">
            Official Channels & Secure Direct Communication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedKey === item.id;
            return (
              <div
                key={item.id}
                className="p-6 rounded-sm luxury-glass border-neutral-800 hover:border-neutral-600 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-sm bg-neutral-900 border border-neutral-800 text-[#ef4444]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {item.name}
                      </h3>
                      <div className="text-xs font-semibold text-neutral-300 mt-0.5">
                        {item.handle}
                      </div>
                    </div>
                  </div>

                  {item.copyValue ? (
                    <button
                      onClick={() => copyToClipboard(item.copyValue!, item.id)}
                      className="p-2 rounded-sm luxury-glass hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center space-x-1"
                      title="Sao chép địa chỉ"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span className="hidden sm:inline text-[10px] uppercase font-bold">{isCopied ? 'Đã sao chép' : 'Copy'}</span>
                    </button>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-sm luxury-glass hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Mở liên kết"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {item.detail}
                </p>

                <div className="pt-2 border-t border-neutral-850 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500">Kênh hoạt động 24/7</span>
                  <span className="text-[#ef4444] font-bold">Phản hồi nhanh</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location Banner: Quận 9 - TP.HCM */}
        <div className="mt-8 p-6 rounded-sm luxury-glass border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-sm bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#ef4444]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Văn Phòng Tiếp Khách Trực Tiếp: Quận 9 - TP.HCM
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Khu vực Khu Công Nghệ Cao / Trung tâm kết nối tài chính doanh nghiệp miền Nam
              </p>
            </div>
          </div>

          <a
            href="mailto:datluu.16062001@gmail.com"
            className="px-5 py-2.5 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0"
          >
            Gửi Email Trực Tiếp
          </a>
        </div>
      </div>
    </section>
  );
};
