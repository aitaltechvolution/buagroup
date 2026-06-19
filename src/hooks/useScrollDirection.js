import { useState, useEffect, useRef } from "react";

/**
 * Tracks the current vertical scroll direction of the page.
 *
 * Returns "down" while the user is actively scrolling down, and "up" while
 * the user is actively scrolling up. A small distance threshold prevents
 * the value from flickering on sub-pixel / momentum scroll jitter.
 *
 * Used to drive direction-aware scroll-reveal animations — elements can
 * enter from a different side / with a different flourish depending on
 * whether the page is being scrolled down or back up.
 *
 * @param {number} threshold - minimum px delta before direction flips (default 6)
 * @returns {"up"|"down"}
 */
export function useScrollDirection(threshold = 6) {
  const [direction, setDirection] = useState("down");
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      if (Math.abs(diff) >= threshold) {
        setDirection(diff > 0 ? "down" : "up");
        lastY.current = y;
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}

export default useScrollDirection;
