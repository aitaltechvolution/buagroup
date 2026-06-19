import React, { useState } from "react";
import { motion } from "framer-motion";
import { colors, scrollReveal } from "../styles/tokens";
import { useScrollDirection } from "../hooks/useScrollDirection";

const pillars = [
  {
    id: "environmental",
    tag: "Pillar I",
    title: "Environmental Stewardship",
    headline: "Decarbonising industry at the source.",
    body: "Decarbonizing industrial production through advanced kiln optimizations, water recycle systems, and transitioning manufacturing plants to clean LNG power. BUA Group's environmental programme targets measurable Scope 1 and Scope 2 emission reductions across all operating entities by 2030.",
    bullets: [
      "Advanced dry-process kiln technology reducing thermal energy per ton of clinker",
      "Closed-loop water recycling across all cement production sites",
      "Transition from Heavy Fuel Oil to LNG and biomass co-firing systems",
      "Waste heat recovery infrastructure generating on-site captive power",
      "ISO 14001 Environmental Management System certification across key plants",
    ],
    metric: { value: "28%", label: "CO₂ Intensity Reduction Target by 2030" },
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3C8.5 3 4 7.5 4 13c0 4 2.2 7.5 5.7 9.3L14 25l4.3-2.7C21.8 20.5 24 17 24 13c0-5.5-4.5-10-10-10z" fill={`${colors.primary}18`} stroke={colors.primary} strokeWidth="1.4"/>
        <path d="M14 9v5l3 3" stroke={colors.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="1.8" fill={colors.primary}/>
        <path d="M8 11c.9-2.7 3.5-4.5 6-4.5" stroke={`${colors.primary}70`} strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    glowColor: "#22c55e",
    accentFrom: "#15803d",
    accentTo:   "#16a34a",
  },
  {
    id: "social",
    tag: "Pillar II",
    title: "Social Impact & Community",
    headline: "Investing in the communities we operate in.",
    body: "Investing billions in sustainable communal healthcare centres, primary education infrastructure, and vital regional road network expansions. BUA Group's social licence to operate is earned through tangible, measurable investment in the human capital and physical infrastructure of host communities.",
    bullets: [
      "BUA Community Healthcare Centres operational across 6 host states",
      "Scholarship programmes supporting 2,000+ tertiary-level students annually",
      "Rural road network construction and maintenance partnerships with state governments",
      "Graduate Acceleration Programme training 500+ young engineers per cohort",
      "ASR Africa 'She Wins' programme mobilising $4M+ in women's startup financing",
    ],
    metric: { value: "₦12B+", label: "Community Investment Committed (2020–2025)" },
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="10.5" cy="9" r="3.5" stroke={colors.primary} strokeWidth="1.4" fill={`${colors.primary}14`}/>
        <circle cx="19.5" cy="9" r="3.5" stroke={colors.primary} strokeWidth="1.4" fill={`${colors.primary}14`}/>
        <path d="M3 23c0-3.5 3.1-6.5 7-6.5h8c3.9 0 7 2.8 7 6.5" stroke={colors.primary} strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="20" r="2.2" fill={colors.primary}/>
      </svg>
    ),
    glowColor: "#3b82f6",
    accentFrom: "#1d4ed8",
    accentTo:   "#2563eb",
  },
  {
    id: "governance",
    tag: "Pillar III",
    title: "Corporate Governance & Ethos",
    headline: "Accountability frameworks built to last.",
    body: "Enforcing strict internal control architectures, financial accountability frameworks, and multi-layered audit transparency standards. As a dual-listed conglomerate, BUA Group upholds the highest standards of SEC and NGX regulatory compliance, backed by independent board oversight structures.",
    bullets: [
      "Fully independent Audit & Risk Committee chaired by non-executive directors",
      "Quarterly financial disclosures to NGX and public shareholders",
      "SEC-compliant related-party transaction governance frameworks",
      "Whistleblower protection policy with independent reporting channels",
      "Annual integrated ESG reporting aligned to GRI Standards",
    ],
    metric: { value: "100%", label: "Independent Board Audit Committee Composition" },
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="18" height="22" rx="3" stroke={colors.primary} strokeWidth="1.4" fill={`${colors.primary}10`}/>
        <path d="M9 9h10M9 13h10M9 17h7" stroke={colors.primary} strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="4.5" fill={`${colors.primary}22`} stroke={colors.primary} strokeWidth="1.2"/>
        <path d="M18.2 20l1.3 1.3 2.3-2.3" stroke={colors.primary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    glowColor: "#f59e0b",
    accentFrom: "#b45309",
    accentTo:   "#d97706",
  },
];

const PillarCard = ({ pillar, index }) => {
  const [hovered, setHovered] = useState(false);
  const dir = useScrollDirection();
  return (
    <motion.div
      {...scrollReveal(dir, { distance: 30, rotate: 3, scale: 0.95, delay: index * 0.12, margin: "-50px" })}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        background:"var(--bg-surface)",
        borderRadius:"16px",
        padding:"34px 30px 30px",
        border:`1px solid ${hovered?`${colors.primary}22`:"var(--border)"}`,
        boxShadow:hovered?"0 24px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(188,26,34,0.06)":"0 4px 20px rgba(0,0,0,0.04)",
        transform:hovered?"translateY(-5px)":"translateY(0)",
        transition:"transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        display:"flex", flexDirection:"column", position:"relative", overflow:"hidden",
      }}
    >
      {/* Background glow */}
      <div aria-hidden="true" style={{position:"absolute",top:"-32px",right:"-32px",width:"160px",height:"160px",borderRadius:"50%",background:`radial-gradient(circle,${pillar.glowColor}${hovered?"18":"0e"} 0%,transparent 70%)`,transition:"opacity 0.4s",pointerEvents:"none"}} />
      <div aria-hidden="true" style={{position:"absolute",bottom:"-20px",left:"-20px",width:"120px",height:"120px",borderRadius:"50%",background:`radial-gradient(circle,${pillar.glowColor}08 0%,transparent 70%)`,pointerEvents:"none"}} />

      <p style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:colors.primary,marginBottom:"18px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{pillar.tag}</p>

      {/* Icon with glow */}
      <div style={{position:"relative",marginBottom:"20px"}}>
        <div style={{width:"60px",height:"60px",borderRadius:"14px",background:"var(--bg-card)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:hovered?`0 0 0 6px ${pillar.glowColor}14, 0 8px 24px rgba(0,0,0,0.06)`:"0 4px 12px rgba(0,0,0,0.04)",transition:"box-shadow 0.35s"}}>
          {pillar.icon}
        </div>
        <div aria-hidden="true" style={{position:"absolute",top:"-4px",left:"42px",display:"flex",gap:"3px",opacity:hovered?0.85:0.35,transition:"opacity 0.3s"}}>
          {[4,3,2].map((size,i)=><div key={i} style={{width:`${size}px`,height:`${size}px`,borderRadius:"50%",background:colors.primary}}/>)}
        </div>
      </div>

      <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"18px",color:"var(--text-base)",letterSpacing:"-0.02em",lineHeight:1.2,marginBottom:"7px"}}>{pillar.title}</h3>
      <p style={{fontSize:"12.5px",fontWeight:600,color:colors.primary,marginBottom:"13px",letterSpacing:"0.01em"}}>{pillar.headline}</p>
      <p style={{fontSize:"13.5px",color:"var(--text-muted)",lineHeight:1.75,marginBottom:"20px"}}>{pillar.body}</p>

      <ul style={{listStyle:"none",padding:0,margin:"0 0 22px 0",display:"flex",flexDirection:"column",gap:"9px",flex:1}}>
        {pillar.bullets.map((b,i)=>(
          <li key={i} style={{display:"flex",alignItems:"flex-start",gap:"10px"}}>
            <span style={{flexShrink:0,width:"5px",height:"5px",borderRadius:"50%",background:colors.primary,marginTop:"6px"}} aria-hidden="true"/>
            <span style={{fontSize:"12.5px",color:"var(--text-muted)",lineHeight:1.6}}>{b}</span>
          </li>
        ))}
      </ul>

      {/* Metric tile */}
      <div style={{borderRadius:"10px",padding:"14px 18px",background:"var(--bg-card)",border:`1px solid ${hovered?`${colors.primary}20`:"var(--border)"}`,transition:"border-color 0.3s",display:"flex",alignItems:"center",gap:"14px"}}>
        <div style={{width:"3px",height:"40px",borderRadius:"2px",background:`linear-gradient(to bottom,${pillar.accentFrom},${pillar.accentTo})`,flexShrink:0}} aria-hidden="true"/>
        <div>
          <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"22px",fontWeight:800,color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1,marginBottom:"4px"}}>{pillar.metric.value}</div>
          <div style={{fontSize:"11px",color:"var(--text-muted)",fontWeight:500,lineHeight:1.4}}>{pillar.metric.label}</div>
        </div>
      </div>
    </motion.div>
  );
};

const ProgressStrip = () => {
  const dir = useScrollDirection();
  const targets = [
    { label:"Carbon Intensity Reduction",   pct:62, target:"28% by 2030"    },
    { label:"Renewable Energy Integration", pct:38, target:"50% by 2030"    },
    { label:"Community Investment Deploy",  pct:81, target:"₦12B by 2025"   },
    { label:"Governance Score (NGX)",       pct:90, target:"Full Compliance" },
  ];
  return (
    <motion.div {...scrollReveal(dir, { distance: 26, rotate: 1, scale: 0.97, margin: "-40px" })}
      style={{
        marginTop:"48px", borderRadius:"16px", padding:"40px 48px", position:"relative", overflow:"hidden",
        backgroundImage:"url(https://buagroup.com/wp-content/uploads/2025/05/DJI_0964_Easy-Resize.com_.jpg)",
        backgroundAttachment:"fixed", backgroundSize:"cover", backgroundPosition:"center",
      }}>
      <div style={{position:"absolute",inset:0,background:"rgba(12,14,18,0.94)"}} />
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"32px",flexWrap:"wrap",gap:"12px"}}>
        <div>
          <span className="eyebrow">Progress Tracking</span>
          <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"22px",color:"#fff",letterSpacing:"-0.02em"}}>2030 ESG Target Milestones</h3>
        </div>
        <a href="/sustainability" style={{display:"inline-flex",alignItems:"center",gap:"7px",padding:"10px 22px",borderRadius:"8px",background:`${colors.primary}18`,border:`1px solid ${colors.primary}40`,color:colors.primary,fontSize:"12.5px",fontWeight:700,textDecoration:"none",transition:"background 0.2s"}}
          onMouseEnter={e=>e.currentTarget.style.background=`${colors.primary}30`}
          onMouseLeave={e=>e.currentTarget.style.background=`${colors.primary}18`}>
          Full ESG Report →
        </a>
      </div>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:"20px"}}>
        {targets.map((t,i)=>(
          <div key={t.label}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
              <span style={{fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,0.80)",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.label}</span>
              <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                <span style={{fontSize:"11px",color:"rgba(255,255,255,0.38)"}}>Target: {t.target}</span>
                <span style={{fontSize:"13px",fontWeight:800,color:colors.primary,fontFamily:"'Plus Jakarta Sans',sans-serif",minWidth:"36px",textAlign:"right"}}>{t.pct}%</span>
              </div>
            </div>
            <div style={{height:"6px",borderRadius:"100px",background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
              <motion.div initial={{width:0}} whileInView={{width:`${t.pct}%`}} viewport={{once:true}} transition={{duration:1.2,ease:[0.22,1,0.36,1],delay:i*0.1+0.2}}
                style={{height:"100%",borderRadius:"100px",background:`linear-gradient(90deg,${colors.primary},${colors.primaryDark})`}}/>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SustainabilityPanel = () => {
  const dir = useScrollDirection();
  return (
  <section style={{background:"var(--bg-base)",paddingTop:"112px",paddingBottom:"112px",overflow:"hidden"}}>
    <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 32px"}}>
      <motion.div className="text-center" style={{marginBottom:"52px"}} {...scrollReveal(dir, { distance: 20, rotate: 1, scale: 0.98 })}>
        <span className="eyebrow">ESG Strategy</span>
        <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(28px,3.5vw,48px)",color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1.1,marginBottom:"16px",maxWidth:"600px",margin:"0 auto 16px"}}>
          Sustainability at the <span style={{color:colors.primary}}>core of scale.</span>
        </h2>
        <p style={{fontSize:"15px",color:"var(--text-muted)",lineHeight:1.7,maxWidth:"540px",margin:"0 auto 22px"}}>
          BUA Group's ESG framework embeds environmental responsibility, social accountability, and governance integrity into every operational and investment decision.
        </p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",flexWrap:"wrap"}}>
          {["GRI Standards","SEC Regulated","NGX Listed","ISO 14001"].map(b=>(
            <span key={b} style={{padding:"5px 14px",borderRadius:"100px",background:"var(--bg-surface)",border:"1px solid var(--border)",fontSize:"11px",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.03em",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{b}</span>
          ))}
        </div>
      </motion.div>

      <div className="esg-pillars-grid">
        {pillars.map((p,i)=><PillarCard key={p.id} pillar={p} index={i}/>)}
      </div>
      <ProgressStrip/>
    </div>
  </section>
  );
};

export default SustainabilityPanel;
