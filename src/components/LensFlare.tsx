import { useEffect, useRef } from 'react';

export default function LensFlare() {
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      // Only show in upper 60% of screen
      const show = y < window.innerHeight * 0.6;

      if (ringRef.current) {
        ringRef.current.style.opacity = show ? '1' : '0';
        ringRef.current.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate(${x - 30}px, ${y - 30}px)`;
      }
      if (streakRef.current) {
        streakRef.current.style.transform = `translate(${x - 200}px, ${y - 1}px)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={ringRef} className="lens-flare lens-flare--ring" />
      <div ref={coreRef} className="lens-flare lens-flare--core" />
      <div ref={streakRef} className="lens-flare lens-flare--streak" />
    </>
  );
}
