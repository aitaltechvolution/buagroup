import React, { useState } from "react";
import { motion } from "framer-motion";
import { colors } from "../styles/tokens";

// ─── External link arrow icon ─────────────────────────────────────────────────
const ExternalArrow = ({ hovered }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    style={{
      transform: hovered ? "translate(3px, -3px)" : "translate(0,0)",
      transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
      flexShrink: 0,
    }}
  >
    <path
      d="M3 13L13 3M13 3H7M13 3V9"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Subsidiary Card ──────────────────────────────────────────────────────────
const SubsidiaryCard = ({ card }) => {
  const [linkHovered, setLinkHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        background: "var(--bg-card)",
        borderRadius: "14px",
        overflow: "hidden",
        border: `1px solid ${cardHovered ? `${colors.primary}20` : "var(--border)"}`,
        boxShadow: cardHovered
          ? "0 20px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(188,26,34,0.06)"
          : "0 4px 20px rgba(0,0,0,0.04)",
        transform: cardHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      aria-label={card.name}
    >
      {/* ── Block 1: Contextual Header ─────────────────────────────────── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
          padding: "28px 28px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle dot-grid texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Sector pill */}
        <div className="flex items-start justify-between gap-3 mb-4 relative">
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {card.sectorLabel}
          </span>

          {/* Status badge */}
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white"
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: `${card.statusColor}cc`,
              border: `1px solid ${card.statusColor}60`,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--bg-card)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {card.status}
          </span>
        </div>

        {/* Logo icon + Name */}
        <div className="flex items-center gap-3 mb-3 relative">
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {card.logo}
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "17px",
                color: "#ffffff",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                marginBottom: "2px",
              }}
            >
              {card.name}
            </h3>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.50)",
                fontWeight: 400,
              }}
            >
              Est. {card.founded}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            fontWeight: 500,
            position: "relative",
          }}
        >
          {card.tagline}
        </p>
      </div>

      {/* Bio text */}
      <div style={{ padding: "20px 28px 0" }}>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            fontWeight: 400,
          }}
        >
          {card.bio}
        </p>
      </div>

      {/* ── Block 2: Metric Panel Bar ──────────────────────────────────── */}
      <div
        style={{
          margin: "20px 28px",
          borderRadius: "10px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Panel header label */}
        <div
          style={{
            padding: "10px 16px 8px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.7,
            }}
          >
            Operational Metrics
          </span>
        </div>

        {/* Metric grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {card.metrics.map((metric, i) => (
            <div
              key={metric.label}
              style={{
                padding: "12px 16px",
                borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                borderBottom:
                  i < card.metrics.length - 2
                    ? "1px solid var(--border)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--text-base)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.01em",
                  marginBottom: "2px",
                  lineHeight: 1.2,
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer to push footer to bottom */}
      <div style={{ flex: 1 }} />

      {/* ── Block 3: External Link Footer ─────────────────────────────── */}
      <div
        style={{
          margin: "0 28px 28px",
          borderTop: "1px solid var(--border)",
          paddingTop: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Domain text */}
        <span
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {card.website}
        </span>

        {/* CTA button */}
        <a
          href={card.websiteHref}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "9px 18px",
            borderRadius: "7px",
            background: linkHovered ? colors.primary : `${colors.primary}10`,
            color: linkHovered ? "#ffffff" : colors.primary,
            border: `1px solid ${linkHovered ? colors.primary : `${colors.primary}30`}`,
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "background 0.22s ease, color 0.22s ease, border-color 0.22s ease",
            flexShrink: 0,
          }}
          aria-label={`Visit ${card.name} corporate portal`}
        >
          Corporate Portal
          <ExternalArrow hovered={linkHovered} />
        </a>
      </div>
    </motion.article>
  );
};

export default SubsidiaryCard;
