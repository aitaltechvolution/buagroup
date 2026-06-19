import React from "react";
import { colors } from "../styles/tokens";

/**
 * BUA Group Logo — uses the real buagroup.com logo image with fallback mark.
 * @param {boolean} light - use light/white text for dark backgrounds
 */
const BUALogo = ({ light = false, className = "" }) => (
  <div className={`flex items-center gap-2.5 no-underline ${className}`} style={{ textDecoration: "none" }}>
    {/* Real BUA Group logo image */}
    <img
      src="https://buagroup.com/wp-content/uploads/2025/04/buagrouplogo-web-min-59x62.png"
      alt="BUA Group"
      style={{ width: "38px", height: "40px", objectFit: "contain", display: "block" }}
      onError={(e) => {
        // Fallback SVG mark if logo fails to load
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
    {/* Fallback mark (hidden by default) */}
    <svg
      width="38" height="40" viewBox="0 0 36 36" fill="none"
      style={{ display: "none", flexShrink: 0 }}
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="4" fill={colors.primary}/>
      <path d="M8 8h8c3.314 0 6 2.686 6 6s-2.686 6-6 6H8V8z" fill="white" opacity="0.95"/>
      <path d="M8 20h9c3.866 0 7 3.134 7 7H8V20z" fill="white" opacity="0.7"/>
      <rect x="24" y="8" width="4" height="20" rx="2" fill="white" opacity="0.5"/>
    </svg>

    <div>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: "17px",
          letterSpacing: "-0.02em",
          color: light ? "#ffffff" : "var(--text-base)",
          lineHeight: 1,
        }}
      >
        BUA <span style={{ color: colors.primary }}>Group</span>
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: "8.5px",
          letterSpacing: "0.13em",
          color: light ? "rgba(255,255,255,0.42)" : "var(--text-muted)",
          textTransform: "uppercase",
          lineHeight: 1,
          marginTop: "2px",
        }}
      >
        CONGLOMERATE
      </div>
    </div>
  </div>
);

export default BUALogo;
