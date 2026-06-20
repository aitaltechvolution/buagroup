import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { colors, scrollReveal } from "../styles/tokens";
import { useScrollDirection } from "../hooks/useScrollDirection";

// ─── Real executive data from buagroup.com/management-team ───────────────────
const executives = [
  {
    id: "asr",
    name: "Abdul Samad Rabiu, CFR, CON",
    title: "Chairman / CEO",
    subtitle: "BUA Group",
    imageUrl: "https://www.buafoodsplc.com/wp-content/uploads/2021/12/Abdul-Samad-RAbiu-1.jpg",
    bioLong: `Abdul Samad Rabiu is the Founder, Chairman, and Chief Executive Officer of BUA Group — one of Nigeria's most diversified and impactful industrial conglomerates. Born in Kano, Nigeria, Mr. Rabiu established BUA Group in 1988 as a trading company, and over three decades has steered it into a multi-sector powerhouse with significant stakes in cement manufacturing, food processing, real estate, ports, mining, and philanthropy.

Mr. Rabiu has been instrumental in reshaping Nigeria's industrial landscape — reducing structural import dependency and building vertically integrated supply chains across cement, sugar, flour, edible oils, and port logistics. His vision: identify critical structural gaps in the African economy and build local, high-capacity industrial solutions to fill them.

Under his stewardship, BUA Group executed the landmark acquisition of the Cement Company of Northern Nigeria (CCNN), commissioned the greenfield Obu Cement plant, and successfully listed both BUA Cement PLC and BUA Foods PLC on the Nigerian Exchange Group (NGX), creating landmark public vehicles for domestic and international capital allocation.

Mr. Rabiu was conferred with Commander of the Order of the Niger (CON) and Commander of the Federal Republic (CFR) by the Federal Government of Nigeria. He founded ASR Africa, a philanthropic foundation focused on education, healthcare, and social development across the continent. In 2026, he aligned with Tony Elumelu on capital deployment and industrial expansion as BUA Foods posted ₦1.77 Trillion in revenue.`,
    credentials: [
      "Commander of the Federal Republic (CFR)",
      "Commander of the Order of the Niger (CON)",
      "Founder, ASR Africa Philanthropic Foundation",
      "Chairman, BUA Cement PLC (NGX: BUA-CEMENT)",
      "Chairman, BUA Foods PLC (NGX: BUAFOODS)",
    ],
  },
  {
    id: "chima",
    name: "Chimaobi Madukwe",
    title: "Group Chief Operating Officer",
    subtitle: "BUA Group",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvPsLNUxE0vyP8XKUInXee-XOXgH65QJ7FQ&s",
    bioLong: `Chimaobi Madukwe serves as Group Chief Operating Officer of BUA Group, responsible for overseeing operational execution across all business divisions — from cement manufacturing and food processing to real estate development and port logistics.

An accomplished operational leader, Mr. Madukwe brings deep cross-sector experience in industrial management, supply chain coordination, and large-scale manufacturing operations. His mandate spans performance management, operational efficiency, and the integration of BUA's diverse business units under a unified execution framework.

He plays a central role in translating BUA Group Chairman Abdul Samad Rabiu's strategic vision into measurable operational outcomes, ensuring that BUA's subsidiaries consistently deliver on their production, quality, and market-reach objectives.`,
    credentials: [
      "Group Chief Operating Officer, BUA Group",
      "Cross-sector Industrial Operations Leadership",
      "Supply Chain & Manufacturing Expert",
    ],
  },
  {
    id: "kabiru",
    name: "Kabiru Rabiu",
    title: "Group Executive Director",
    subtitle: "BUA Group",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQluq_Wc4TNNhIr9YD_-ydE1FPDUACawiO6Xw&s",
    bioLong: `Kabiru Rabiu serves as Group Executive Director of BUA Group, a role in which he oversees cross-subsidiary strategy coordination, new business development, and the Group's long-horizon capital allocation framework.

He has been a central figure in BUA Group's strategic evolution — from its initial pivot from trading to manufacturing, through to the dual public listings of BUA Cement PLC and BUA Foods PLC on the Nigerian Exchange Group. His investment philosophy is rooted in patient capital, long-arc industrialisation themes, and the conviction that Africa's manufacturing market represents one of the most structurally undervalued opportunities in global industrial development.

He represents BUA Group in engagements with multilateral development institutions, sovereign wealth funds, and global infrastructure investors seeking exposure to the Sub-Saharan African growth thesis.`,
    credentials: [
      "Group Executive Director, BUA Group",
      "Multi-subsidiary Board Director",
      "Capital Markets & Investment Strategy",
    ],
  },
  {
    id: "oluseye",
    name: "Oluseye Alayande",
    title: "Group Chief Legal Officer / Company Secretary",
    subtitle: "BUA Group",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAcaGQX1FNHymVqMNv15AzsSJh13ce1MUpA&s",
    bioLong: `Oluseye Alayande serves as Group Chief Legal Officer and Company Secretary of BUA Group, providing legal oversight, regulatory compliance management, and corporate secretarial services across the Group's operations.

With deep expertise in corporate law, regulatory affairs, and listed company governance, Mr. Alayande ensures that BUA Group's operations across all subsidiaries meet the highest standards of legal compliance — from SEC and NGX regulatory requirements to cross-border commercial transactions.

He advises the Board and Executive Management on legal risk, corporate governance obligations, contract management, and regulatory engagement — forming a critical part of BUA's institutional framework as a dual-listed conglomerate.`,
    credentials: [
      "Group Chief Legal Officer, BUA Group",
      "Company Secretary, BUA Group",
      "SEC & NGX Compliance Specialist",
      "Corporate Governance Expert",
    ],
  },
  {
    id: "binji",
    name: "Engr. Yusuf Binji",
    title: "Managing Director",
    subtitle: "BUA Cement PLC",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhRx5eQKpCEvURDCB3cWdzfU5lst6eH5gdirMcccSblY8HD5N-Pk-TU4&s=10",
    bioLong: `Engr. Yusuf Binji serves as Managing Director of BUA Cement PLC, one of sub-Saharan Africa's largest cement manufacturers. He has been the operational architect behind BUA Cement's transformation into a continental-scale producer, overseeing multiple production line commissionings and the integration of advanced kiln and grinding technologies across the company's Edo and Sokoto production clusters.

A licensed Civil Engineer and Fellow of the Nigerian Society of Engineers (FNSE), Engr. Binji combines deep technical expertise with strong commercial acumen. Under his operational direction, BUA Cement has achieved benchmark capacity utilisation rates, delivered consistent earnings growth to public shareholders, and successfully executed the company's NGX listing.

He has been central to BUA Cement's capital market strategy and investor relations programme, working closely with Group Chairman Abdul Samad Rabiu on shareholder value creation and long-term capacity expansion planning.`,
    credentials: [
      "Managing Director, BUA Cement PLC (NGX Listed)",
      "Fellow, Nigerian Society of Engineers (FNSE)",
      "Civil Engineering Professional",
      "25+ years Heavy Manufacturing Leadership",
    ],
  },
  {
    id: "abioye",
    name: "Engr. Ayodele Abioye",
    title: "Managing Director",
    subtitle: "BUA Foods PLC",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQFUGWoJWZiAJA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1707439324138?e=2147483647&v=beta&t=KtfoUU6IPi1oNybDBBwwfCY27IzoYroXJnKU5D6-O70",
    bioLong: `Engr. Ayodele Abioye serves as Managing Director of BUA Foods PLC — one of Nigeria's largest publicly listed food companies with operations spanning sugar refining, flour milling, edible oil processing, pasta manufacturing, and rice processing.

He brings a distinctive combination of engineering precision and commercial leadership to the role, having overseen significant capacity expansions, operational efficiency improvements, and BUA Foods' record FY2025 revenue performance of ₦1.77 Trillion.

Under his leadership, BUA Foods PLC has deepened its agricultural integration, expanded its downstream consumer brand portfolio, and strengthened its ESG reporting framework — meeting the governance standards expected of a top-tier NGX-listed entity.`,
    credentials: [
      "Managing Director, BUA Foods PLC (NGX: BUAFOODS)",
      "Engineering Leadership in FMCG Sector",
      "FY2025 Revenue ₦1.77 Trillion",
      "Listed Company Director, NGX",
    ],
  },
  {
    id: "debo",
    name: "Debo Agbonyin",
    title: "Executive Director, Trade Finance & Logistics",
    subtitle: "BUA Group",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaC5LfCwppxgxfMhBqWUR6UwVKkd_NxcVjC4f7OoOzLzlOctq1P_W2MKM&s=10",
    bioLong: `Debo Agbonyin serves as Executive Director for Trade Finance and Logistics at BUA Group, overseeing the financial structuring of the Group's import and export transactions, commodity financing facilities, and the logistics operations underpinning BUA's port and supply chain assets.

His role bridges BUA Group's banking and capital market relationships with the operational realities of large-scale commodity import — from raw sugar and wheat procurement to the movement of clinker and finished goods across BUA's distribution network.

With significant expertise in trade finance instruments, letters of credit, commodity-backed lending, and supply chain risk management, Mr. Agbonyin plays a critical enabling role in BUA's operational model.`,
    credentials: [
      "Executive Director, Trade Finance & Logistics",
      "Commodity Finance Specialist",
      "Supply Chain Risk Management",
    ],
  },
  {
    id: "dotun",
    name: "Dotun Adako",
    title: "Group Head, Human Resources",
    subtitle: "BUA Group",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQcGPunqTAglLY6jbqrl5jLC5jPJlc2I7sL6njb_Ww&s=10",
    bioLong: `Dotun Adako serves as Group Head of Human Resources at BUA Group, leading the people strategy across a workforce of over 35,000 direct and indirect employees spanning cement manufacturing, food processing, port logistics, and real estate development.

His mandate covers the full spectrum of human capital management — from executive leadership development and succession planning, to frontline capability building in BUA's manufacturing plants and logistics operations. He has been instrumental in designing BUA Group's talent acquisition, employee engagement, and performance management frameworks.

Mr. Adako's approach to human capital is grounded in meritocracy, local capability building, and the belief that Africa's industrial transformation will be led by African talent.`,
    credentials: [
      "Group Head, Human Resources",
      "35,000+ Employee Workforce Oversight",
      "Talent Development & Succession Planning",
    ],
  },

];

// ─── Biography Modal ──────────────────────────────────────────────────────────
const BiographyModal = ({ exec, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center p-4 md:p-8"
      style={{ zIndex: 100000, background: "rgba(10,12,16,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", maxWidth: "860px", maxHeight: "88vh", boxShadow: "0 40px 80px rgba(0,0,0,0.45)", border: "1px solid var(--border)" }}
        role="dialog"
        aria-modal="true"
        aria-label={`Biography of ${exec.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full" style={{ maxHeight: "88vh" }}>
          {/* Portrait */}
          <div
            className="flex-shrink-0 relative hidden md:flex md:flex-col"
            style={{ width: "224px", background: "linear-gradient(165deg, #1c222b 0%, #0f1318 100%)" }}
          >
            <div style={{ padding: "30px 26px 0" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 14px 28px rgba(0,0,0,0.45)",
                }}
              >
                <img
                  src={exec.imageUrl}
                  alt={exec.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div style={{ padding: "20px 26px 28px"}}>
              <p className="font-bold text-white leading-snug mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14.5px" }}>{exec.name}</p>
              <p className="text-xs" style={{ color: colors.primary }}>{exec.title}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{exec.subtitle}</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto" style={{ padding: "44px 40px" }}>
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200"
              style={{ background: "var(--bg-surface)", border: "none", cursor: "pointer", color: "var(--text-muted)", zIndex: 10 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.primary; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; e.currentTarget.style.color = "var(--text-muted)"; }}
              aria-label="Close biography"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>

            {/* Mobile name */}
            <div className="md:hidden mb-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
              <img src={exec.imageUrl} alt={exec.name} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", marginBottom: "12px" }}/>
              <p className="font-bold text-xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text-base)" }}>{exec.name}</p>
              <p className="text-sm" style={{ color: colors.primary }}>{exec.title}</p>
            </div>

            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: colors.primary, marginBottom: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Executive Biography</p>

            <div className="space-y-4 mb-8">
              {exec.bioLong.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: "13.5px", lineHeight: 1.78, color: i === 0 ? "var(--text-base)" : "var(--text-muted)", fontWeight: i === 0 ? 500 : 400 }}>{para}</p>
              ))}
            </div>

            {exec.credentials && (
              <div>
                <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Credentials</p>
                <ul className="space-y-2.5">
                  {exec.credentials.map((cred, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: colors.primary }} aria-hidden="true"/>
                      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 pt-7 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", opacity: 0.7 }}>BUA Group · buagroup.com</p>
              <button onClick={onClose} className="btn-primary" style={{ fontSize: "12.5px", padding: "9px 22px" }}>Close Profile</button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

// ─── Executive card ───────────────────────────────────────────────────────────
const ExecutiveCard = ({ exec, onClick, index }) => {
  const [hovered, setHovered] = useState(false);
  const dir = useScrollDirection();

  return (
    <motion.div
      {...scrollReveal(dir, { delay: index * 0.07, margin: "-40px", distance: 30, rotate: 3, scale: 0.95 })}
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View biography of ${exec.name}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
    >
      <div
        className="rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${hovered ? colors.primary + "25" : "var(--border)"}`,
          boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(188,26,34,0.07)" : "0 4px 16px rgba(0,0,0,0.04)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Portrait */}
        <div className="relative overflow-hidden" style={{maxHeight: "280px" }}>
          <img
            src={exec.imageUrl}
            alt={exec.name}
            className="w-full h-full object-cover object-top"
            style={{
              filter: hovered ? "grayscale(0%) brightness(1.02)" : "grayscale(80%) brightness(0.92)",
              transform: hovered ? "scale(1.04)" : "scale(1.0)",
              transition: "filter 0.5s ease, transform 0.6s ease",
            }}
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: `linear-gradient(to top, #12161Acc 0%, transparent 55%)`, opacity: hovered ? 1 : 0.4 }}
            aria-hidden="true"
          />
          {/* View pill */}
          <div className="absolute top-3 right-3 transition-all duration-300" style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0) scale(1)" : "translateY(-5px) scale(0.9)" }}>
            <span className="inline-flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full" style={{ background: colors.primary, fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" }}>
              View Profile
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="px-5 py-4">
          <h3 className="font-bold leading-snug mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text-base)", fontSize: "14px", letterSpacing: "-0.01em" }}>{exec.name}</h3>
          <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>{exec.title}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{exec.subtitle}</p>
          <div className="flex items-center gap-1.5 mt-3 transition-all duration-300" style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(2px)" : "translateX(-4px)" }}>
            <span style={{ fontSize: "10px", fontWeight: 700, color: colors.primary, letterSpacing: "0.06em", textTransform: "uppercase" }}>Read Biography</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke={colors.primary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Executive Leadership Grid ────────────────────────────────────────────────
const ExecutiveGrid = () => {
  const [activeExec, setActiveExec] = useState(null);
  const handleClose = useCallback(() => setActiveExec(null), []);
  const dir = useScrollDirection();

  return (
    <>
      <section className="py-28" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-8xl mx-auto px-8">
          <motion.div className="mb-16" {...scrollReveal(dir, { distance: 26, rotate: 1.5, scale: 0.97 })}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: colors.primary, marginBottom: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our Leadership</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", color: "var(--text-base)", letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: "480px" }}>
                The team shaping <span style={{ color: colors.primary }}>Africa's industry.</span>
              </h2>
              <p style={{ fontSize: "13.5px", color: "var(--text-muted)", maxWidth: "340px", lineHeight: 1.7 }}>
                At the core of BUA Group's success is a team of visionary leaders bringing strategic insight, integrity, and expertise to drive sustainable growth.
              </p>
            </div>
          </motion.div>

          <div className="executive-grid">
            {executives.map((exec, i) => (
              <ExecutiveCard key={exec.id} exec={exec} index={i} onClick={() => setActiveExec(exec)} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeExec && <BiographyModal exec={activeExec} onClose={handleClose} />}
      </AnimatePresence>

      <style>{`
        .executive-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; }
        @media (max-width: 960px) { .executive-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 560px) { .executive-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
};

export default ExecutiveGrid;
