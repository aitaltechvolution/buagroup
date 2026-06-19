import { useState, useEffect, useRef } from "react";

/**
 * Animates a number from 0 → target when the ref element enters the viewport.
 *
 * @param {number}  target      - Final integer value
 * @param {number}  duration    - Animation duration in ms (default 2000)
 * @param {string}  threshold   - IntersectionObserver threshold (default 0.3)
 * @returns {{ count, ref }}
 */
export function useCountUp(target, duration = 2000, threshold = 0.3) {
  const [count, setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const ref                 = useRef(null);

  // Intersection observer — fires once when element enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started, threshold]);

  // Count-up animation with ease-out
  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let raf;

    const easeOutExpo = (t) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutExpo(progress);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(target); // ensure exact final value
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

export default useCountUp;
