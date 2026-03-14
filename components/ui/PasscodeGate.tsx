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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus after mount
    setTimeout(() => inputRef.current?.focus(), 100);
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

      <p className="gate-sub">RESTRICTED ACCESS</p>

      <h1 className="gate-title">
        SWASEY<span className="blink">_</span>
      </h1>

      <p className="gate-sub" style={{ marginTop: -12 }}>
        CX & OPERATIONS LEADER
      </p>

      <div className="gate-input-row">
        <span className="gate-prompt">$ AUTH &gt;</span>
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

      <p className="gate-error">{error || '\u00a0'}</p>

      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>
        PORTFOLIO v2.0 // SPATIAL CANVAS EDITION
      </p>
    </div>
  );
}
