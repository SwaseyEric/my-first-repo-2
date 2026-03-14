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
  const [unlocked, setUnlocked] = useState(false);
  const [showGate, setShowGate] = useState(true);

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

  const handleUnlock = useCallback(() => {
    setUnlocked(true);
    setTimeout(() => setShowGate(false), 700);
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

      {/* Passcode gate */}
      {showGate && <PasscodeGate onUnlock={handleUnlock} />}

      {/* Main content — visible after unlock */}
      <div
        style={{
          opacity: unlocked ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
          pointerEvents: unlocked ? 'auto' : 'none',
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
