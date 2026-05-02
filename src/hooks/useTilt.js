import { useRef, useEffect } from 'react';

export function useTilt(intensity = 7) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) *  intensity;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -intensity;
      el.style.transition = 'none';
      el.style.transform  = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
    };

    const leave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1)';
      el.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [intensity]);

  return ref;
}
