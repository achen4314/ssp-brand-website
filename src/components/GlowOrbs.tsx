import { useEffect, useRef } from 'react';

export default function GlowOrbs() {
  const greenRef = useRef<HTMLDivElement>(null);
  const tealRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (greenRef.current) {
        greenRef.current.style.transform = `translate(${e.clientX * 0.04 - 400}px, ${e.clientY * 0.04 - 400}px)`;
      }
      if (tealRef.current) {
        tealRef.current.style.transform = `translate(${(window.innerWidth - e.clientX) * 0.06 - 300}px, ${e.clientY * 0.06 - 300}px)`;
      }
      if (goldRef.current) {
        goldRef.current.style.transform = `translate(${e.clientX * 0.05 - 250}px, ${(window.innerHeight - e.clientY) * 0.05 - 250}px)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={greenRef} className="glow-orb glow-orb--green" />
      <div ref={tealRef} className="glow-orb glow-orb--teal" />
      <div ref={goldRef} className="glow-orb glow-orb--gold" />
    </>
  );
}
