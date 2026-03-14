'use client';

import { useState, useRef, useEffect } from 'react';
import { INSIGHTS } from '@/data/portfolio';

export default function InsightsSection() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const insight = INSIGHTS[current];

  return (
    <section
      ref={sectionRef}
      id="insights"
      style={{
        padding: '100px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="container">
        <div style={{ marginBottom: 60 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>
            03 // CX × AI NOTES
          </p>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            What I'm Learning
          </h2>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginTop: 12, maxWidth: 480 }}>
            Applied AI insights from the Pursuit AI-Native Program — mapped to real CX challenges.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40 }}>
          {/* Navigation list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {INSIGHTS.map((ins, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setExpanded(false); }}
                style={{
                  background: current === i ? 'rgba(125,211,252,0.05)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: 2,
                  borderLeft: `2px solid ${current === i ? 'var(--accent)' : 'transparent'}`,
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: current === i ? 'var(--text)' : 'var(--faint)',
                  letterSpacing: '0.03em',
                  lineHeight: 1.5,
                  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  if (current !== i) (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                }}
                onMouseLeave={e => {
                  if (current !== i) (e.currentTarget as HTMLElement).style.color = 'var(--faint)';
                }}
              >
                {String(i + 1).padStart(2, '0')}. {ins.title}
              </button>
            ))}
          </div>

          {/* Active insight */}
          <div
            key={current}
            style={{ animation: 'fadeUp 0.4s ease both' }}
          >
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.25em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>
              INSIGHT {String(current + 1).padStart(2, '0')} / {String(INSIGHTS.length).padStart(2, '0')}
            </p>

            <h3
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                marginBottom: 20,
              }}
            >
              {insight.title}
            </h3>

            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
              {insight.summary}
            </p>

            {expanded && (
              <div
                style={{
                  borderLeft: '2px solid rgba(125,211,252,0.3)',
                  paddingLeft: 20,
                  marginTop: 20,
                  animation: 'fadeUp 0.3s ease both',
                }}
              >
                <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.9 }}>
                  <strong style={{ color: 'var(--text)' }}>In depth: </strong>
                  {insight.detail}
                </p>
              </div>
            )}

            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                marginTop: 24,
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--muted)',
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '10px 20px',
                borderRadius: 2,
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
              }}
            >
              {expanded ? '↑ Collapse' : '↓ Expand Detail'} 
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
