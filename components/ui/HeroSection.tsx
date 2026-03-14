'use client';

import { useRef, useEffect } from 'react';
import ScrambleText from './ScrambleText';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Fade up on mount
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);

    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 40px 60px',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Monospace kicker */}
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 24,
          }}
        >
          PORTFOLIO_v2 // SPATIAL CANVAS EDITION
        </p>

        {/* Giant Name */}
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <ScrambleText
            as="h1"
            text="ERIC SWASEY"
            trigger={true}
            delay={400}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(56px, 11vw, 150px)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              display: 'block',
            }}
          />
        </div>

        {/* Subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, marginTop: 20 }}>
          <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            CX & Operations Leader · AI Systems Builder
          </p>
        </div>

        {/* Bio */}
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 15,
            color: 'var(--muted)',
            maxWidth: 560,
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          I build AI products that convert customer signal into measurable impact.
          Support organizations that feel human and run like well-tuned systems.
        </p>

        {/* Headshot placeholder */}
        <div
          style={{
            position: 'absolute',
            right: 'max(40px, 8vw)',
            top: '50%',
            transform: 'translateY(-40%)',
            width: 'clamp(200px, 22vw, 320px)',
            aspectRatio: '1 / 1.1',
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
            [ HEADSHOT ]
          </p>
        </div>

        {/* Stat strip */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '32+', label: 'Team Members Led' },
            { value: '37%', label: 'CSAT Lift · Amazon' },
            { value: '10yr', label: 'CX Leadership' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'var(--text)',
                  lineHeight: 1,
                }}
              >
                {value}
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--faint)', letterSpacing: '0.1em', marginTop: 4 }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, transparent, var(--accent))',
              animation: 'fadeUp 1s ease infinite alternate',
            }}
          />
          <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.25em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            SCROLL TO EXPLORE
          </p>
        </div>
      </div>
    </section>
  );
}
