import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { colors } from "../styles/tokens";
import { SECTORS, subsidiaryCards } from "../data/portfolioData";
import SubsidiaryCard from "./SubsidiaryCard";

// ─── Filter Tab Bar ───────────────────────────────────────────────────────────
const FilterTab = ({ sector, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: isActive ? "9px 22px" : "9px 18px",
      borderRadius: "100px",
      border: "none",
      cursor: "pointer",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: "13.5px",
      fontWeight: isActive ? 700 : 500,
      letterSpacing: "0.01em",
      background: isActive ? colors.primary : "transparent",
      color: isActive ? "#ffffff" : "var(--text-muted)",
      transition: "background 0.22s ease, color 0.22s ease, padding 0.22s ease",
      whiteSpace: "nowrap",
      position: "relative",
    }}
    onMouseEnter={(e) => {
      if (!isActive) e.currentTarget.style.color = "var(--text-base)";
    }}
    onMouseLeave={(e) => {
      if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
    }}
    aria-pressed={isActive}
  >
    {sector.label}
    {/* Active pill glow */}
    {isActive && (
      <motion.span
        layoutId="activeTabGlow"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "100px",
          background: colors.primary,
          zIndex: -1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </button>
);

// ─── Result count badge ───────────────────────────────────────────────────────
const ResultsBadge = ({ count, sectorLabel }) => (
  <motion.div
    key={sectorLabel}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center gap-2"
  >
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "26px",
        height: "26px",
        borderRadius: "50%",
        background: `${colors.primary}14`,
        color: colors.primary,
        fontSize: "11px",
        fontWeight: 800,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {count}
    </span>
    <span
      style={{
        fontSize: "12.5px",
        color: "var(--text-muted)",
        fontWeight: 500,
      }}
    >
      {count === 1 ? "subsidiary" : "subsidiaries"} in{" "}
      <strong style={{ color: "var(--text-base)", fontWeight: 700 }}>
        {sectorLabel}
      </strong>
    </span>
  </motion.div>
);

// ─── Business Portfolio Operations Hub ───────────────────────────────────────
const BusinessPortfolioHub = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilter = useCallback((sectorId) => {
    setActiveFilter(sectorId);
  }, []);

  // Filter cards
  const filtered =
    activeFilter === "all"
      ? subsidiaryCards
      : subsidiaryCards.filter((c) => c.sector === activeFilter);

  const activeSector = SECTORS.find((s) => s.id === activeFilter);

  return (
    <section style={{ background: "var(--bg-base)" }} className="pb-28">
      <div className="max-w-8xl mx-auto px-8">

        {/* ── Filter Tab Bar ─────────────────────────────────────────── */}
        <div
          style={{
            position: "sticky",
            top: "72px",
            zIndex: 50,
            background: "var(--glass-bg)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            marginLeft: "-32px",
            marginRight: "-32px",
            paddingLeft: "32px",
            paddingRight: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            {/* Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "5px",
                borderRadius: "100px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                flexWrap: "wrap",
              }}
            >
              {SECTORS.map((sector) => (
                <FilterTab
                  key={sector.id}
                  sector={sector}
                  isActive={activeFilter === sector.id}
                  onClick={() => handleFilter(sector.id)}
                />
              ))}
            </div>

            {/* Results badge */}
            <div className="hidden sm:block">
              <ResultsBadge
                count={filtered.length}
                sectorLabel={activeSector?.label || "All Sectors"}
              />
            </div>
          </div>
        </div>

        {/* ── Cards Grid with Layout Animation ──────────────────────── */}
        <div style={{ paddingTop: "48px" }}>
          <LayoutGroup id="portfolio-grid">
            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((card) => (
                  <SubsidiaryCard key={card.id} card={card} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  textAlign: "center",
                  padding: "80px 32px",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>
                  🔍
                </span>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text-base)",
                    marginBottom: "8px",
                  }}
                >
                  No subsidiaries in this sector yet.
                </p>
                <p style={{ fontSize: "14px" }}>
                  Check back as BUA Group continues to expand its portfolio.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 1100px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default BusinessPortfolioHub;
