import { useState, useEffect } from "react";

/**
 * Returns true when window.scrollY exceeds `threshold` pixels.
 * Uses passive scroll listener for performance.
 */
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > threshold);
    // Set immediately in case page loads already scrolled
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold]);

  return scrolled;
}

export default useScrolled;
