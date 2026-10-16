import React from 'react';
import { soundManager } from '../utils/audioSynth';
import { 
  Linkedin, 
  Facebook, 
  ExternalLink,
  Play,
  Heart,
  Eye,
  MessageCircle,
  Users
} from 'lucide-react';

// Custom TikTok Brand SVG Icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.892-2.891 2.896 2.896 0 0 1 2.892-2.891c.315 0 .618.052.902.146V9.43a6.33 6.33 0 0 0-.902-.066C5.972 9.364 3 12.336 3 15.672 3 19.008 5.972 22 9.482 22c3.51 0 6.388-2.878 6.388-6.388V9.176a8.163 8.163 0 0 0 4.719 1.488V7.22a4.786 4.786 0 0 1-1-.534z" />
  </svg>
);

export const SocialSection: React.FC = () => {
  // Dữ liệu chính xác 100% từ 3 video mới nhất trên kênh TikTok @tiendat_166 (tdatspotting)
  const realTikTokVideos = [
    {
      id: '7642668184260119829',
      title: 'Range Rover biển số phát tài 51K-988.88 cực khủng #porsche #rangerover #biensodep',
      thumbnail: '/video-1-cover.jpg',
      views: '5,052',
      likes: '156',
      comments: '2',
      duration: '0:20',
      url: 'https://www.tiktok.com/@tiendat_166/video/7642668184260119829',
    },
    {
      id: '7641647685325442325',
      title: 'Gặp Porsche 911 Dakar trên đường đi làm #porsche #porsche911 #porschedakar #porscheclub #trending',
      thumbnail: '/porsche-911-dakar.jpg',
      views: '3,258',
      likes: '141',
      comments: '2',
      duration: '0:13',
      url: 'https://www.tiktok.com/@tiendat_166/video/7641647685325442325',
    },
    {
      id: '7640270814490807573',
      title: 'Biển có bằng xe không nhỉ #lexus #biensodep #trending #viral #luxurycars',
      thumbnail: '/lexus-bien-dep.jpg',
      views: '4,389',
      likes: '126',
      comments: '3',
      duration: '0:12',
      url: 'https://www.tiktok.com/@tiendat_166/video/7640270814490807573',
    },
  ];

  return (
    <section 
      id="social" 
      className="relative py-20 md:py-28 bg-[#050507] text-white overflow-hidden border-t border-neutral-900"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10 space-y-10">
        {/* Section Header: Tinh gọn */}
        <div className="pb-4 border-b border-neutral-800">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-1.5">
            <span className="w-5 h-0.5 bg-[#dc2626]" />
            <span>Mạng Xã Hội</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-times">
            Mạng Xã Hội
          </h2>
        </div>

        {/* =========================================================================
            1. TIKTOK: CHÍNH XÁC KÊNH @tiendat_166 (tdatspotting) + 3 VIDEO THỰC TẾ
            ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-sm luxury-glass border-neutral-800 space-y-6">
          {/* Header Profile TikTok thật 100% */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800/80">
            <a 
              href="https://www.tiktok.com/@tiendat_166"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center space-x-4 group cursor-pointer"
            >
              {/* Avatar thật trên kênh TikTok @tiendat_166 */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#dc2626] group-hover:scale-105 transition-transform shadow-xl">
                  <img
                    src="/avatar-tiktok.jpg"
                    alt="tdatspotting (@tiendat_166) TikTok Avatar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black border border-neutral-700 flex items-center justify-center text-white">
                  <TikTokIcon className="w-3 h-3 text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ef4444] transition-colors font-times">
                    tdatspotting
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-[#ef4444] text-[10px] font-bold border border-red-600/30">
                    @tiendat_166
                  </span>
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-0.5">
                  Săn xe chill chill ~~~ 📸 16prm: 4k120fps &bull; No risk - No Ferrari 🐎
                </div>
                <div className="flex items-center space-x-4 text-xs text-neutral-300 font-semibold mt-1">
                  <span><strong>3,767</strong> Follower</span>
                  <span>&bull;</span>
                  <span><strong className="text-[#ef4444]">521.4K</strong> Thích</span>
                  <span>&bull;</span>
                  <span><strong>325</strong> Video</span>
                </div>
              </div>
            </a>

            <a
              href="https://www.tiktok.com/@tiendat_166"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="px-5 py-2.5 rounded-sm bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>Follow @tiendat_166</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3 Video thực tế mới nhất trên kênh TikTok */}
          <div>
            <div className="text-xs uppercase font-bold text-neutral-400 mb-4 tracking-wider flex items-center space-x-1.5">
              <Play className="w-3.5 h-3.5 text-[#ef4444]" />
              <span>3 Video Mới Nhất Trên Kênh TikTok @tiendat_166</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {realTikTokVideos.map((video, idx) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="group rounded-sm overflow-hidden border border-neutral-800 hover:border-[#dc2626] transition-all bg-neutral-950 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl"
                >
                  {/* Thumbnail Video Thật 100% */}
                  <div className="relative h-80 w-full overflow-hidden bg-black">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient phủ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none" />

                    {/* Nút Play trung tâm */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-black/60 group-hover:bg-[#dc2626] group-hover:scale-110 transition-all flex items-center justify-center text-white border border-white/40 shadow-xl">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Badge thời lượng */}
                    <div className="absolute top-3 right-3 text-[11px] font-mono font-bold bg-black/80 px-2 py-0.5 rounded text-white border border-white/10">
                      {video.duration}
                    </div>

                    {/* View & Like thật từ TikTok */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white z-10 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded">
                      <span className="flex items-center space-x-1 font-bold">
                        <Eye className="w-3.5 h-3.5 text-[#ef4444]" />
                        <span>{video.views}</span>
                      </span>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="flex items-center space-x-1 font-bold">
                          <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                          <span>{video.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-neutral-300">
                          <MessageCircle className="w-3 h-3 text-neutral-400" />
                          <span>{video.comments}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title video thật từ TikTok */}
                  <div className="p-4 space-y-3 bg-[#0a0a0e] flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-[#ef4444] uppercase font-bold mb-1">
                        Video 0{idx + 1} &bull; @tiendat_166
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ef4444] transition-colors line-clamp-2 leading-relaxed">
                        {video.title}
                      </h4>
                    </div>

                    <div className="pt-2.5 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white transition-colors">
                      <span className="text-[11px] font-semibold">Xem video trên TikTok</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#ef4444]" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. FACEBOOK & LINKEDIN: CÓ AVATAR THẬT + LINK TRỰC TIẾP, CỰC KỲ TINH GỌN
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Facebook: https://www.facebook.com/luutiendat1606 */}
          <div className="p-6 rounded-sm luxury-glass border-neutral-800 hover:border-[#1877f2]/60 transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center space-x-4">
              {/* Avatar thật */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1877f2] shadow-xl">
                  <img
                    src="/avatar-tiktok.jpg"
                    alt="Lưu Tiến Đạt Facebook Avatar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1877f2] flex items-center justify-center text-white shadow">
                  <Facebook className="w-3 h-3 fill-current" />
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white font-times">
                  Lưu Tiến Đạt
                </h3>
                <div className="text-xs text-neutral-400 font-mono truncate mt-0.5">
                  facebook.com/luutiendat1606
                </div>
                <div className="text-[11px] text-[#1877f2] font-semibold mt-0.5">
                  Facebook Cá Nhân
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-850 flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-times">facebook.com/luutiendat1606</span>
              <a
                href="https://www.facebook.com/luutiendat1606"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="px-4 py-2 rounded-sm bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5 shadow"
              >
                <span>Mở Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card LinkedIn: https://www.linkedin.com/in/luutiendat166/ */}
          <div className="p-6 rounded-sm luxury-glass border-neutral-800 hover:border-[#0a66c2]/60 transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center space-x-4">
              {/* Avatar thật */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#0a66c2] shadow-xl">
                  <img
                    src="/avatar-tiktok.jpg"
                    alt="Lưu Tiến Đạt LinkedIn Avatar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a66c2] flex items-center justify-center text-white shadow">
                  <Linkedin className="w-3 h-3 fill-current" />
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white font-times">
                  Lưu Tiến Đạt
                </h3>
                <div className="text-xs text-neutral-400 font-mono truncate mt-0.5">
                  linkedin.com/in/luutiendat166
                </div>
                <div className="text-[11px] text-[#0a66c2] font-semibold mt-0.5">
                  Corporate Finance - Investment
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-850 flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-times">linkedin.com/in/luutiendat166</span>
              <a
                href="https://www.linkedin.com/in/luutiendat166/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="px-4 py-2 rounded-sm bg-[#0a66c2] hover:bg-[#084e96] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5 shadow"
              >
                <span>Mở LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
