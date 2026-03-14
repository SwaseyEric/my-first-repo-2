'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const PASSCODE = '344600';

interface PasscodeGateProps {
  onUnlock: () => void;
}

export default function PasscodeGate({ onUnlock }: PasscodeGateProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [visible, setVisible] = useState(true);
  const [typedTitle, setTypedTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const TITLE = 'SWASEY';

  useEffect(() => {
    // Auto-focus after mount
    setTimeout(() => inputRef.current?.focus(), 100);

    // Typewriter effect for SWASEY
    let i = 0;
    const intervalId = setInterval(() => {
      setTypedTitle(TITLE.slice(0, i + 1));
      i++;
      if (i === TITLE.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const tryUnlock = useCallback(() => {
    if (value === PASSCODE) {
      setError('');
      // Fade out gate
      setVisible(false);
      setTimeout(onUnlock, 600);
    } else {
      setAttempts(a => a + 1);
      setError(`ACCESS_DENIED :: ${attempts + 1} attempt${attempts + 1 > 1 ? 's' : ''}`);
      setValue('');
      inputRef.current?.focus();
    }
  }, [value, attempts, onUnlock]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') tryUnlock();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 8);
    setValue(v);
    if (error) setError('');
  };

  return (
    <div
      className="gate"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Scanline texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ marginBottom: 24, zIndex: 1, position: 'relative' }}>
        <video 
          src="/DeskTop.webm" 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ width: '100%', maxWidth: 400, borderRadius: 8, opacity: 0.8 }} 
        />
      </div>

      <p className="gate-sub" style={{ zIndex: 1 }}>RESTRICTED ACCESS</p>

      <h1 className="gate-title" style={{ zIndex: 1 }}>
        {typedTitle}<span className="blink">_</span>
      </h1>

      <p className="gate-sub" style={{ marginTop: -12, zIndex: 1 }}>
        CX & OPERATIONS LEADER
      </p>

      <div className="gate-input-row" style={{ zIndex: 1 }}>
        <span className="gate-prompt">AUTH &gt;</span>
        <input
          ref={inputRef}
          className="gate-input"
          type="password"
          inputMode="numeric"
          placeholder="••••••"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
        <button className="gate-enter-btn" onClick={tryUnlock} disabled={value.length === 0}>
          ENTER
        </button>
      </div>

      <p className="gate-error" style={{ zIndex: 1 }}>{error || '\u00a0'}</p>

      <p style={{ zIndex: 1, fontSize: 10, color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>
        PORTFOLIO v2.0 // SPATIAL CANVAS EDITION
      </p>
    </div>
  );
}
