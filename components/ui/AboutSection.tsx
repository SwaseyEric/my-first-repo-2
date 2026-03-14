'use client';

import { useRef, useEffect, useState } from 'react';
import { EXPERIENCE, TESTIMONIALS } from '@/data/portfolio';

export default function AboutSection() {
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

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: '100px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="container">
        {/* Bio */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, marginBottom: 80 }}>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>
              01 // MY STORY
            </p>
            <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Calm, Practical,<br />Metric-Driven
            </h2>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 20 }}>
              I have spent my career helping customers and teams find clarity fast — especially when situations are messy, urgent, or emotional. Over the years I have led frontline support and operations in high-volume environments, with a steady focus on quality, coaching, escalation management, and thoughtful process design.
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.9 }}>
              Today, I am expanding that foundation through the Pursuit AI-Native Program. My goal is simple: use AI to remove friction, surface patterns faster, and give teams better signals — while keeping empathy, judgment, and trust firmly human.
            </p>
          </div>
        </div>

        {/* Expertise tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 80 }}>
          {[
            'QA Frameworks', 'Omnichannel Support', 'Systems & Analytics',
            'Salesforce', 'Zendesk', 'Qualtrics', 'Freshdesk', 'Kustomer',
            'Coaching & Enablement', 'VOC Programs', 'SLA Management', 'WFM Alignment',
          ].map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Experience timeline */}
        <div style={{ marginBottom: 80 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 32 }}>
            EXPERIENCE
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: 32,
                  padding: '28px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
              >
                <div>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--faint)', letterSpacing: '0.1em' }}>{exp.period}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{exp.role}</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 10 }}>
                    {exp.company}
                  </p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.8 }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 32 }}>
            WHAT COLLEAGUES SAY
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(255,255,255,0.15)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
                  {t.quote}
                </p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--faint)', letterSpacing: '0.1em' }}>
                  — {t.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
