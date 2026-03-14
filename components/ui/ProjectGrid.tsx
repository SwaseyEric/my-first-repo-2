'use client';

import { useState, useRef, useEffect } from 'react';
import { PROJECTS, type Project } from '@/data/portfolio';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#';

function useHoverScramble(finalText: string) {
  const [displayText, setDisplayText] = useState(finalText);
  const rafRef = useRef<number>(0);

  const scramble = () => {
    let frame = 0;
    const total = finalText.length * 3 + 20;

    const tick = () => {
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        const progress = (frame - i * 3) / 20;
        if (progress >= 1) {
          result += finalText[i];
        } else {
          result += finalText[i] === ' '
            ? ' '
            : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(result);
      frame++;
      if (frame < total) rafRef.current = requestAnimationFrame(tick);
      else setDisplayText(finalText);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    setDisplayText(finalText);
  };

  return { displayText, scramble, reset };
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (p: Project | null) => void;
  isSelected: boolean;
}

function ProjectCard({ project, index, onSelect, isSelected }: ProjectCardProps) {
  const { displayText, scramble, reset } = useHoverScramble(project.title);
  const cardRef = useRef<HTMLDivElement>(null);
  const [fragmenting, setFragmenting] = useState(false);

  const handleSelect = () => {
    if (isSelected) {
      onSelect(null);
      return;
    }
    setFragmenting(true);
    setTimeout(() => {
      onSelect(project);
      setFragmenting(false);
    }, 400);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      onClick={handleSelect}
      style={{
        padding: '28px',
        border: `1px solid ${isSelected ? 'rgba(125,211,252,0.4)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 4,
        background: isSelected
          ? 'rgba(125,211,252,0.04)'
          : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.2s ease, opacity 0.4s ease',
        transform: fragmenting ? 'scale(0.96)' : 'scale(1)',
        opacity: fragmenting ? 0 : 1,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(125,211,252,0.25)';
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        if (!isSelected) {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
        }
      }}
    >
      {/* Index number */}
      <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--faint)', letterSpacing: '0.2em', marginBottom: 16 }}>
        {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
      </p>

      {/* Title with scramble */}
      <h3
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 18,
          fontWeight: 600,
          color: 'var(--text)',
          lineHeight: 1.2,
          marginBottom: project.visual ? 16 : 12,
          letterSpacing: '-0.01em',
        }}
      >
        {displayText}
      </h3>

      {/* Live Visual */}
      {project.visual && (
        <div style={{ marginBottom: 20, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
          {project.visual.type === 'video' ? (
            <video
              src={project.visual.src}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 200 }}
            />
          ) : (
            <img
              src={project.visual.src}
              alt={project.title}
              style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 200 }}
            />
          )}
        </div>
      )}

      {/* Description */}
      <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>
        {project.description}
      </p>

      {/* Metrics */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {project.metrics.map(m => (
          <span
            key={m}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--accent)',
              border: '1px solid rgba(125,211,252,0.2)',
              padding: '3px 8px',
              borderRadius: 2,
              letterSpacing: '0.05em',
            }}
          >
            {m}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 3,
            height: '100%',
            background: 'var(--accent)',
            borderRadius: '0 4px 4px 0',
          }}
        />
      )}
    </div>
  );
}

export default function ProjectGrid() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [visible, setVisible] = useState(false);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={gridRef}
      id="work"
      style={{
        padding: '100px 40px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: 60 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>
            02 // PROFESSIONAL IMPACT
          </p>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Projects & Results
          </h2>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginTop: 16, maxWidth: 480 }}>
            Hover to decode. Click to expand. Every metric is real.
          </p>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16,
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelected}
              isSelected={selected?.id === project.id}
            />
          ))}
        </div>

        {/* Expanded project panel */}
        {selected && (
          <div
            style={{
              marginTop: 24,
              padding: '32px',
              border: '1px solid rgba(125,211,252,0.2)',
              borderRadius: 4,
              background: 'rgba(125,211,252,0.03)',
              animation: 'fadeUp 0.4s ease both',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                  SELECTED INITIATIVE
                </p>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                  {selected.title}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--faint)', fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 12px', borderRadius: 2 }}
              >
                × CLOSE
              </button>
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 640 }}>
              {selected.description}
            </p>

            <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
              {selected.metrics.map(m => (
                <span
                  key={m}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    color: 'var(--accent)',
                    border: '1px solid rgba(125,211,252,0.3)',
                    padding: '6px 14px',
                    borderRadius: 2,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
