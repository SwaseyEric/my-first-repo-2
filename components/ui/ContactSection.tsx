'use client';

import { useRef, useEffect, useState } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText('eric.swasey@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding: '100px 40px 120px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="container">
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>
          05 // CONTACT
        </p>

        <h2
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(40px, 7vw, 90px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          Let's Talk
        </h2>

        <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)', maxWidth: 480, lineHeight: 1.8, marginBottom: 56 }}>
          Want to discuss CX strategy, ops, quality, or building AI-native support teams?
          Email works best — or connect on LinkedIn.
        </p>

        {/* Terminal-style contact commands */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
          {/* Email */}
          <div
            style={{
              padding: '20px 24px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.2)')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)')}
          >
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--faint)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>$ EMAIL</p>
              <a
                href="mailto:eric.swasey@gmail.com"
                style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--text)' }}
              >
                eric.swasey@gmail.com
              </a>
            </div>
            <button
              onClick={copyEmail}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                color: copied ? 'var(--accent)' : 'var(--faint)',
                fontFamily: 'var(--mono)',
                fontSize: 9,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                borderRadius: 2,
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {copied ? '✓ COPIED' : 'COPY'}
            </button>
          </div>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ericswasey/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '20px 24px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              transition: 'border-color 0.2s, background 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'rgba(125,211,252,0.3)';
              el.style.background = 'rgba(125,211,252,0.03)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'rgba(255,255,255,0.08)';
              el.style.background = 'rgba(255,255,255,0.02)';
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--faint)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>$ LINKEDIN</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--text)' }}>linkedin.com/in/ericswasey</p>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--faint)', letterSpacing: '0.1em' }}>↗ OPEN</span>
          </a>

          {/* Resume */}
          <div
            style={{
              padding: '20px 24px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.2)')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)')}
          >
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--faint)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>$ RESUME</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)' }}>Eric_Swasey_Resume.pdf</p>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--faint)', letterSpacing: '0.1em', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: 2 }}>
              COMING SOON
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--faint)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} Eric Swasey. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--faint)', letterSpacing: '0.2em' }}>
            SPATIAL CANVAS v2.0
          </p>
        </div>
      </div>
    </section>
  );
}
