'use client';

import { useEffect, useRef, useCallback, CSSProperties } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: 'h1' | 'h2' | 'span' | 'p';
  trigger?: boolean; // if true, run on mount
  delay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

export function useScramble(el: HTMLElement | null, finalText: string, delay = 0) {
  const runRef = useRef(false);

  const scramble = useCallback(() => {
    if (!el || runRef.current) return;
    runRef.current = true;

    let frame = 0;
    const duration = 30; // frames to resolve each char
    const totalFrames = finalText.length * 3 + duration;

    const tick = () => {
      let result = '';
      const progress = frame / totalFrames;

      for (let i = 0; i < finalText.length; i++) {
        const charProgress = (frame - i * 3) / duration;

        if (charProgress >= 1) {
          result += finalText[i];
        } else if (charProgress > 0) {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      el.textContent = result;
      frame++;

      if (frame <= totalFrames) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = finalText;
      }
    };

    setTimeout(() => requestAnimationFrame(tick), delay);
  }, [el, finalText, delay]);

  return scramble;
}

export default function ScrambleText({ text, className = '', style, as: Tag = 'span', trigger = true, delay = 0 }: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !trigger || started.current) return;
    started.current = true;

    let frame = 0;
    const duration = 28;
    const totalFrames = text.length * 3 + duration;

    const tick = () => {
      let result = '';
      for (let i = 0; i < text.length; i++) {
        const charProgress = (frame - i * 3) / duration;
        if (charProgress >= 1) {
          result += text[i];
        } else {
          result += text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      el.textContent = result;
      frame++;

      if (frame <= totalFrames) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = text;
      }
    };

    setTimeout(() => requestAnimationFrame(tick), delay);
  }, [text, trigger, delay]);

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={ref} className={className} style={style}>
      {text}
    </Tag>
  );
}
