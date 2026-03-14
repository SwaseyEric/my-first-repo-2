'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface MagneticNavProps {
  onContactClick: () => void;
  onWorkClick: () => void;
  onAboutClick: () => void;
}

export default function MagneticNav({ onContactClick, onWorkClick, onAboutClick }: MagneticNavProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const items = nav.querySelectorAll<HTMLElement>('.mag-item');

    const onMouseMove = (e: MouseEvent) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 80;

        if (dist < maxDist) {
          const strength = (1 - dist / maxDist) * 10;
          item.style.transform = `translate(${(dx / dist) * strength}px, ${(dy / dist) * strength}px)`;
        } else {
          item.style.transform = 'translate(0px, 0px)';
        }
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(8,8,8,0.7)',
      }}
    >
      {/* Logo */}
      <div
        className="mag-item"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        <span style={{ color: 'var(--accent)' }}>//</span> SWASEY
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {[
          { label: '[WORK]', action: onWorkClick },
          { label: '[ABOUT]', action: onAboutClick },
          { label: '[CONTACT]', action: onContactClick },
        ].map(({ label, action }) => (
          <button
            key={label}
            className="mag-item"
            onClick={action}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {label}
          </button>
        ))}

        <a
          className="mag-item"
          href="mailto:eric.swasey@gmail.com"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--bg)',
            background: 'var(--accent)',
            padding: '8px 16px',
            borderRadius: 3,
            transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          EMAIL
        </a>
      </div>
    </nav>
  );
}
