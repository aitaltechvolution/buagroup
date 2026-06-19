import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { colors, scrollReveal } from "../styles/tokens";
import { useScrollDirection } from "../hooks/useScrollDirection";

// All 4 cards with fallback images so they always render
const cards = [
  {
    id: "foods", sector: "Food & FMCG", name: "BUA Foods PLC", icon: "🌾",
    description: "Spanning sugar refining, flour milling, pasta, edible oils, and rice — nourishing millions across Nigeria.",
    image: "https://buagroup.com/wp-content/uploads/2025/05/DJI_0964_Easy-Resize.com_.jpg",
    fallback: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    href: "https://www.buafoodsplc.com/",
    accent: "#15803d",
  },
  {
    id: "cement", sector: "Infrastructure & Cement", name: "BUA Cement PLC", icon: "🏭",
    description: "11M+ MTPA capacity across Edo and Sokoto — sub-Saharan Africa's premier cement manufacturer.",
    image: "https://buagroup.com/wp-content/uploads/2025/05/731A9162_Easy-Resize.com_.jpg",
    fallback: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    href: "https://www.buacement.com/",
    accent: "#b45309",
  },
  {
    id: "estate", sector: "Real Estate", name: "BUA Estates", icon: "🏙",
    description: "Premium urban residential and commercial real estate across Nigeria's highest-growth corridors.",
    image: "https://buagroup.com/wp-content/uploads/2024/12/BUA-HQ-Drone-Shots-6-edited-1536x1150-1-1024x767.jpg",
    fallback: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    href: "https://www.buaestate.com/",
    accent: "#1d4ed8",
  },
  {
    id: "ports", sector: "Ports & Terminals", name: "BUA Ports & Terminals", icon: "⚓",
    description: "Strategic deepwater terminal infrastructure enabling West African trade and supply chain logistics.",
    image: "https://buagroup.com/wp-content/uploads/2025/05/DJI_0336-1.jpg",
    fallback: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
    href: "https://buagroup.com/infrastructure/",
    accent: "#0369a1",
  },
];

const BusinessCard = ({ card, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [imgErr,  setImgErr]  = useState(false);
  const [tilt,    setTilt]    = useState({ x:0, y:0 });
  const dir = useScrollDirection();

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top)  / r.height - 0.5) * -12,
              y: ((e.clientX - r.left) / r.width  - 0.5) *  12 });
  };

  return (
    <motion.div ref={ref}
      {...scrollReveal(dir, { distance: 46, rotate: 4, scale: 0.92, delay: index*0.10, margin: "-60px" })}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>{ setHovered(false); setTilt({x:0,y:0}); }}
      onMouseMove={onMove}
      style={{ perspective:"1000px", cursor:"pointer" }}
    >
      <motion.div
        animate={{ rotateX:tilt.x, rotateY:tilt.y, scale:hovered?1.025:1 }}
        transition={{ type:"spring", stiffness:260, damping:22 }}
        style={{
          borderRadius:"18px", overflow:"hidden",
          background: hovered ? colors.primary : "var(--bg-card)",
          border:`1px solid ${hovered?"transparent":"var(--border)"}`,
          boxShadow: hovered ? `0 32px 72px rgba(188,26,34,0.28)` : "0 4px 24px rgba(0,0,0,0.05)",
          transition:"background 0.35s, box-shadow 0.35s, border-color 0.35s",
          transformStyle:"preserve-3d",
          display:"flex", flexDirection:"column",
        }}
      >
        {/* Image — crossfades to fallback on error */}
        <div style={{ height:"200px", overflow:"hidden", position:"relative", flexShrink:0 }}>
          <motion.img
            src={imgErr ? card.fallback : card.image}
            alt={card.name}
            onError={()=>setImgErr(true)}
            animate={{ scale: hovered ? 1.09 : 1 }}
            transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          />
          {/* Gradient over image */}
          <motion.div animate={{ opacity: hovered ? 0.55 : 0.20 }} transition={{ duration:0.35 }}
            style={{ position:"absolute", inset:0, background:`linear-gradient(to top, ${hovered?colors.primaryDark:"rgba(18,22,26)"}cc 0%, transparent 60%)` }} />
          {/* Sector pill */}
          <div style={{ position:"absolute", top:"14px", left:"14px" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 10px", borderRadius:"100px", fontSize:"9.5px", fontWeight:700, letterSpacing:"0.10em", textTransform:"uppercase", color:"#fff", background:hovered?"rgba(255,255,255,0.18)":"rgba(18,22,26,0.65)", backdropFilter:"blur(6px)", transition:"background 0.3s" }}>
              {card.icon} {card.sector}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"24px 26px 28px", flex:1, display:"flex", flexDirection:"column" }}>
          <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"17px", color:hovered?"#ffffff":"var(--text-base)", letterSpacing:"-0.015em", lineHeight:1.2, marginBottom:"10px", transition:"color 0.3s" }}>
            {card.name}
          </h3>
          <p style={{ fontSize:"13px", color:hovered?"rgba(255,255,255,0.74)":"var(--text-muted)", lineHeight:1.72, flex:1, marginBottom:"20px", transition:"color 0.3s" }}>
            {card.description}
          </p>
          <motion.a href={card.href} target="_blank" rel="noopener noreferrer"
            onClick={e=>e.stopPropagation()}
            animate={{ opacity: hovered?1:0.65, x: hovered?2:0 }}
            transition={{ duration:0.22 }}
            style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"11.5px", fontWeight:700, color:hovered?"#ffffff":colors.primary, textDecoration:"none", letterSpacing:"0.05em", textTransform:"uppercase" }}>
            {hovered ? "Explore Subsidiary Portal" : "Learn More"}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BusinessesGrid = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], [0,-40]);
  const dir = useScrollDirection();

  return (
    <section ref={ref} style={{ background:"var(--bg-surface)", paddingTop:"96px", paddingBottom:"96px", position:"relative", overflow:"hidden" }}>
      {/* Parallax watermark */}
      <motion.div aria-hidden="true" style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", y:bgY, fontSize:"clamp(80px,14vw,180px)", fontWeight:900, color:"rgba(82,93,107,0.04)", whiteSpace:"nowrap", userSelect:"none", fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-0.05em", pointerEvents:"none" }}>
        BUSINESSES
      </motion.div>

      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 32px", position:"relative" }}>
        <motion.div {...scrollReveal(dir, { distance: 24, rotate: 1.5, scale: 0.97 })} style={{marginBottom:"52px"}}>
          <span className="eyebrow">Our Businesses</span>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"24px",flexWrap:"wrap"}}>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(26px,3.5vw,48px)",color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1.1,maxWidth:"460px"}}>
              We operate across <span style={{color:colors.primary}}>multiple industries.</span>
            </h2>
            <p style={{fontSize:"14.5px",color:"var(--text-muted)",maxWidth:"360px",lineHeight:1.72}}>
              Providing world-class products and services that enhance daily life, power industries, and drive national development.
            </p>
          </div>
        </motion.div>

        {/* 4-column grid */}
        <div className="businesses-snapshot-grid">
          {cards.map((card,i)=><BusinessCard key={card.id} card={card} index={i}/>)}
        </div>

        <motion.div {...scrollReveal(dir, { distance: 16, rotate: 0, scale: 0.98, delay: 0.2 })} style={{textAlign:"center",marginTop:"52px"}}>
          <Link to="/businesses" className="btn-primary" style={{display:"inline-flex",alignItems:"center",gap:"8px"}}>
            View All Subsidiaries
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessesGrid;
