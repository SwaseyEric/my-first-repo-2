'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import CustomCursor from '@/components/ui/CustomCursor';
import PasscodeGate from '@/components/ui/PasscodeGate';
import MagneticNav from '@/components/ui/MagneticNav';
import HeroSection from '@/components/ui/HeroSection';
import ProjectGrid from '@/components/ui/ProjectGrid';
import AboutSection from '@/components/ui/AboutSection';
import InsightsSection from '@/components/ui/InsightsSection';
import ContactSection from '@/components/ui/ContactSection';

// Load SceneCanvas dynamically (WebGL requires browser env)
const SceneCanvas = dynamic(() => import('@/components/canvas/SceneCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const mouseRef = useRef<[number, number]>([0, 0]);

  // Update mouse ref for the particle field
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      mouseRef.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ];
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Always-on custom cursor */}
      <CustomCursor />

      {/* Fixed full-viewport WebGL background */}
      <SceneCanvas mouseRef={mouseRef} />

      {/* Main content */}
      <div
        style={{
          opacity: 1,
          animation: 'fadeUp 1.2s ease 0.2s both',
        }}
      >
        <MagneticNav
          onWorkClick={() => scrollTo('work')}
          onAboutClick={() => scrollTo('about')}
          onContactClick={() => scrollTo('contact')}
        />

        <main className="content-layer">
          <HeroSection />
          <div className="hr" style={{ margin: 0 }} />
          <AboutSection />
          <div className="hr" style={{ margin: 0 }} />
          <ProjectGrid />
          <div className="hr" style={{ margin: 0 }} />
          <InsightsSection />
          <div className="hr" style={{ margin: 0 }} />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
