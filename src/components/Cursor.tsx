import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

const isTouchDevice = () =>
  window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(pointer: fine)').matches;

const Cursor = () => {
  if (isTouchDevice()) return null;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState('');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
      if (labelRef.current) {
        labelRef.current.style.left = (e.clientX + 22) + 'px';
        labelRef.current.style.top = (e.clientY + 12) + 'px';
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onDown = () => dotRef.current?.classList.add('clicking');
    const onUp = () => dotRef.current?.classList.remove('clicking');

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive = t.closest('a,button,[data-cursor]');
      if (isInteractive) {
        ringRef.current?.classList.add('hovered');
        const lbl = (isInteractive as HTMLElement).dataset?.cursor || '';
        setLabel(lbl);
        if (labelRef.current) labelRef.current.classList.toggle('visible', !!lbl);
      }
    };
    const onLeave = () => {
      ringRef.current?.classList.remove('hovered');
      setLabel('');
      labelRef.current?.classList.remove('visible');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="cursor-dot" />
      <div ref={ringRef} id="cursor-ring" />
      <div ref={labelRef} id="cursor-label">{label}</div>
    </>
  );
};

export default Cursor;
