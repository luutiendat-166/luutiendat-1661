import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroFerrari3D } from './components/HeroFerrari3D';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { PassionsSection } from './components/PassionsSection';
import { SocialSection } from './components/SocialSection';
import { OtherSection } from './components/OtherSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Intro Ferrari: tự kết thúc sau 5 giây
  const [showIntro, setShowIntro] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
  const audio = introAudioRef.current;
  if (!audio) return;

  audio.volume = 0.8;

  audio.play().catch(() => {
    setAudioBlocked(true);
  });

  const timer = window.setTimeout(() => {
    setShowIntro(false);
    audio.pause();
    audio.currentTime = 0;
  }, 5000);

  return () => {
    window.clearTimeout(timer);
    audio.pause();
  };
}, []);


  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handleExploreWork = () => {
    const expElem = document.getElementById('experience');
    if (expElem) {
      expElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  
  return (
    <div
      className="min-h-screen bg-[#030305] text-[#f1f5f9] flex flex-col selection:bg-[#dc2626] selection:text-white"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
    >
      {/* INTRO FERRARI 458 ITALIA - 5 GIÂY */}
      {showIntro && (
        <div className="ferrari-intro">
          <div className="intro-light intro-light-left" />
          <div className="intro-light intro-light-right" />

          <img
            src="/ferrari-458-italia.jpg"
            alt="Ferrari 458 Italia"
            className="intro-car"
          />

          <div className="intro-vignette" />

          <div className="intro-brand">
            <span>FERRARI</span>
            <span className="intro-line" />
            <small>458 ITALIA · DATFINANCE</small>
          </div>

          <audio
            ref={introAudioRef}
            src="/audio/ferrari-intro.mp3"
            preload="auto"
          />

          {audioBlocked && (
            <button
              className="intro-audio-button"
              onClick={() => {
                const audio = introAudioRef.current;

                if (audio) {
                  audio
                    .play()
                    .then(() => setAudioBlocked(false))
                    .catch(() => setAudioBlocked(true));
                }
              }}
            >
              Bật âm thanh động cơ
            </button>
          )}
        </div>
      )}

      {/* 1. Fixed Navigation Bar (6 Tabs + Right Corner: Tiến Đạt / Corporate Finance / Quận 9 - TP.HCM) */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Centerpiece 3D Hero Stage */}
        <HeroFerrari3D
          onExploreWork={handleExploreWork}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Tab 01: Giới thiệu */}
        <AboutSection onOpenConsultation={handleOpenConsultation} />

        {/* Tab 02: Kinh nghiệm */}
        <ExperienceSection onOpenConsultation={handleOpenConsultation} />

        {/* Tab 03: Học tập */}
        <EducationSection />

        {/* Tab 04: Đam mê */}
        <PassionsSection />

        {/* Tab 05: Mạng xã hội */}
        <SocialSection />

        {/* Tab 06: Khác */}
        <OtherSection onOpenConsultation={handleOpenConsultation} />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* Confidential Mandate Intake Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}
