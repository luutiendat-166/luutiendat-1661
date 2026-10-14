import React, { useState } from 'react';
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
      {/* 1. Fixed Navigation Bar (6 Tabs + Right Corner: Tiến Đạt / Corporate Finance / Quận 9 - TP.HCM) */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Centerpiece 3D Hero Stage (Slide 1: 458 Italia | Slide 2: 488 Pista + Fog + Headlights + 2 5s Audio Buttons + Slogan) */}
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
