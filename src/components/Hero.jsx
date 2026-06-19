import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { colors } from "../styles/tokens";

const slides = [
  {
    id: 1,
    src: "https://buagroup.com/wp-content/uploads/2025/07/Copy-of-2X6A4409_Easy-Resize.com_.jpg",
    label: "BUA Cement — Obu Plant, Edo State",
    tag: "Infrastructure & Cement",
    accent: colors.primary,
  },
  {
    id: 2,
    src: "https://buagroup.com/wp-content/uploads/2025/05/DJI_0964_Easy-Resize.com_.jpg",
    fallback: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=85",
    label: "BUA Foods — Operations, Lagos",
    tag: "Food & FMCG",
    accent: "#15803d",
  },
  {
    id: 3,
    src: "https://buagroup.com/wp-content/uploads/2024/12/BUA-HQ-Drone-Shots-6-edited-1536x1150-1-1024x767.jpg",
    fallback: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85",
    label: "BUA Group Headquarters — Lagos",
    tag: "Corporate",
    accent: "#1d4ed8",
  },
  {
    id: 4,
    src: "https://buagroup.com/wp-content/uploads/2025/05/DJI_0336-1.jpg",
    fallback: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=85",
    label: "BUA Ports & Terminals — Apapa",
    tag: "Ports & Logistics",
    accent: "#0369a1",
  },
];

// Word-by-word reveal
const WordReveal = ({ text, delay = 0, style = {} }) => (
  <span style={{ display: "inline", ...style }}>
    {text.split(" ").map((word, i) => (
      <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: i < text.split(" ").length - 1 ? "0.26em" : 0 }}>
        <motion.span
          style={{ display: "inline-block" }}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.07 }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </span>
);

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const overlayOpa = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const getSrc = s => imgErrors[s.id] ? s.fallback : s.src;

  return (
    <section
      ref={containerRef}
      style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      {/* ── Background slides ──────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <img
            src={getSrc(slides[current])}
            alt={slides[current].label}
            onError={() => setImgErrors(e => ({ ...e, [slides[current].id]: true }))}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center", display: "block",
              animation: "kenBurns 6s ease-out forwards",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlays ───────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1, opacity: overlayOpa,
          background: "linear-gradient(105deg,rgba(12,14,18,0.96) 0%,rgba(12,14,18,0.75) 48%,rgba(12,14,18,0.22) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "260px", zIndex: 2, background: "linear-gradient(to top,rgba(12,14,18,0.85),transparent)" }} />
      {/* Left red accent */}
      <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", zIndex: 3, background: `linear-gradient(to bottom,${colors.primary},${colors.primary}50 60%,transparent)` }} />
      {/* Bottom accent line */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, width: "220px", height: "2px", zIndex: 3, background: `linear-gradient(to right,${colors.primary},transparent)` }} />

      {/* ── Slide tag ──────────────────────────────────────────────────── */}
      <motion.div
        key={`tag-${current}`}
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ position: "absolute", top: "128px", left: "48px", zIndex: 10, display: "flex", alignItems: "center", gap: "10px" }}
      >
        <motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: "7px", height: "7px", borderRadius: "50%", background: slides[current].accent, display: "inline-block", flexShrink: 0 }}
        />
        <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {slides[current].tag}
        </span>
        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em" }}>
          — {slides[current].label}
        </span>
      </motion.div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <motion.div style={{ position: "relative", zIndex: 10, width: "100%", y: contentY }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "148px 32px 80px 48px" }}>

          {/* Over-title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px" }}
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", width: "32px", height: "2px", background: colors.primary, transformOrigin: "left", flexShrink: 0 }}
            />
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: colors.primary, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Industrializing Africa Since 1988
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(38px,5.8vw,84px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.02, marginBottom: "26px", maxWidth: "840px" }}>
            <WordReveal text="Building Africa's" delay={0.22} />
            <br />
            <WordReveal text="Future with" delay={0.40} />
            {" "}
            <WordReveal text="Innovation" delay={0.55} style={{ color: colors.primary }} />
            <br />
            <span style={{ display: "inline-block", overflow: "hidden" }}>
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: 0.74 }}
              >
                &amp; Excellence.
              </motion.span>
            </span>
          </div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.92 }}
            style={{ fontSize: "clamp(14px,1.6vw,17px)", color: "rgba(255,255,255,0.58)", maxWidth: "510px", lineHeight: 1.76, fontWeight: 400, marginBottom: "42px" }}
          >
            A Nigerian-based multinational pioneering industrial excellence across cement, sugar, flour, edible oils, ports, steel, and real estate — creating lasting value across Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
          >
            <Link
              to="/businesses"
              className="btn-primary"
              style={{ fontSize: "14px", padding: "15px 32px", display: "inline-flex", alignItems: "center", gap: "10px" }}
            >
              Explore Our Businesses
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/about" className="btn-ghost" style={{ fontSize: "14px", padding: "15px 30px" }}>
              Who We Are
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "64px" }}
          >
            <div style={{ width: "20px", height: "32px", borderRadius: "12px", border: "1.5px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4px" }}>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "3px", height: "7px", borderRadius: "2px", background: colors.primary }}
              />
            </div>
            <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.26)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Dot nav ─────────────────────────────────────────────────────── */}
      <div style={{ position: "absolute", bottom: "36px", left: "48px", zIndex: 10, display: "flex", gap: "8px" }}>
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? "28px" : "8px",
              height: "3px",
              borderRadius: "2px",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: i === current ? colors.primary : "rgba(255,255,255,0.28)",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        ))}
      </div>

      {/* ── Floating stat cards — desktop ───────────────────────────────── */}
      <div
        className="hidden-mobile"
        style={{ position: "absolute", right: "48px", top: "50%", transform: "translateY(-50%)", zIndex: 10, display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {[
          { val: "11M+",   unit: "MTPA", label: "Cement Capacity"     },
          { val: "₦1.77T", unit: "",     label: "FY25 Foods Revenue"   },
          { val: "1988",   unit: "",     label: "Est. Lagos, Nigeria"  },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
            className="glass-dark"
            style={{ padding: "14px 18px", borderRadius: "12px", minWidth: "150px" }}
          >
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", letterSpacing: "-0.025em", lineHeight: 1 }}>
              {s.val}
              {s.unit && <span style={{ fontSize: "10px", color: colors.primary, fontWeight: 700, marginLeft: "4px" }}>{s.unit}</span>}
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "3px", fontWeight: 500 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
