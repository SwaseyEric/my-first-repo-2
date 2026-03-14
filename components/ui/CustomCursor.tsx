'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const onDown = () => wrapRef.current?.classList.add('clicking');
    const onUp = () => wrapRef.current?.classList.remove('clicking');

    const onEnterInteractive = () => wrapRef.current?.classList.add('hovering');
    const onLeaveInteractive = () => wrapRef.current?.classList.remove('hovering');

    // Smooth ring follow
    let rafId: number;
    const animRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animRing);
    };
    rafId = requestAnimationFrame(animRing);

    // Attach events to interactive elements
    const attachHoverEvents = () => {
      const els = document.querySelectorAll('a, button, [data-cursor-hover]');
      els.forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // Attach after a brief delay for dynamic content
    setTimeout(attachHoverEvents, 500);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className="cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
