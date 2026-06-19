// ─── BUA Group Design Tokens ──────────────────────────────────────────────────

export const colors = {
  primary:     "#BC1A22",
  primaryDark: "#870F14",
  onyx:        "#12161A",
  slate:       "#525D6B",
  alabaster:   "#F8F9FA",
  white:       "#FFFFFF",
};

export const shadows = {
  premium: "0 8px 30px rgb(0,0,0,0.04)",
  hover:   "0 20px 40px rgb(0,0,0,0.08)",
  glow:    "0 0 40px rgba(188,26,34,0.20)",
};

export const fonts = {
  display: "'Plus Jakarta Sans', sans-serif",
  body:    "'Inter', sans-serif",
};

// Framer Motion page variants
export const motionVariants = {
  pageEnter: {
    initial:    { opacity: 0, y: 20 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  stagger: { animate: { transition: { staggerChildren: 0.08 } } },
  staggerItem: {
    initial:    { opacity: 0, y: 12 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Direction-aware scroll reveal ────────────────────────────────────────────
// Pairs with the `useScrollDirection()` hook. Produces a punchy, spring-based
// set of framer-motion props (initial / whileInView / viewport / transition)
// that replay every time an element crosses into view — and mirror their
// entrance (offset + tilt flip sign) depending on whether the page is
// currently being scrolled down or back up, so the motion always reads as
// "coming from where you're scrolling from".
//
// Usage:
//   const dir = useScrollDirection();
//   <motion.div {...scrollReveal(dir, { delay: i * 0.08 })}>
export const scrollReveal = (dir = "down", opts = {}) => {
  const {
    distance = 34,
    rotate   = 3,
    scale    = 0.94,
    delay    = 0,
    axis     = "y",
    once     = false,
    margin   = "-60px",
    amount,
    stiffness = 190,
    damping   = 19,
    mass      = 0.7,
  } = opts;

  const sign   = dir === "up" ? -1 : 1;
  const offset = sign * distance;
  const tilt   = sign * rotate;

  const initial = { opacity: 0, scale, rotate: tilt };
  const animate = { opacity: 1, scale: 1, rotate: 0 };
  if (axis === "y") { initial.y = offset; animate.y = 0; }
  else               { initial.x = offset; animate.x = 0; }

  return {
    initial,
    whileInView: animate,
    viewport: { once, margin, ...(amount !== undefined ? { amount } : {}) },
    transition: { type: "spring", stiffness, damping, mass, delay },
  };
};

export default { colors, shadows, fonts, motionVariants, scrollReveal };
