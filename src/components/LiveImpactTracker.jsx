import React from "react";
import { motion } from "framer-motion";
import { colors, scrollReveal } from "../styles/tokens";
import { useCountUp } from "../hooks/useCountUp";
import { useScrollDirection } from "../hooks/useScrollDirection";

const metrics = [
  { id:"cement", countTarget:11,  format:n=>`${n}M+ MT`,             label:"Annual Cement Production Capacity", description:"Across Obu (Edo State) and Sokoto production clusters", icon:"🏗" },
  { id:"food",   countTarget:15,  format:n=>`${(n/10).toFixed(1)}M+ MT`, label:"Combined Food Processing Volume",    description:"Sugar, flour, edible oils, pasta & rice",                  icon:"🌾" },
  { id:"rev",    countTarget:177, format:n=>`₦${(n/100).toFixed(2)}T`,   label:"BUA Foods FY2025 Revenue",          description:"Record revenue with ₦28/share dividend",                  icon:"📊" },
  { id:"years",  countTarget:36,  format:n=>`${n}+`,                  label:"Years of Industrial Leadership",    description:"Operating since 1988 — founded in Lagos",                   icon:"📅" },
];

const MetricCard = ({ metric, index }) => {
  const { count, ref } = useCountUp(metric.countTarget, 2000);
  const dir = useScrollDirection();
  return (
    <motion.div ref={ref}
      {...scrollReveal(dir, { distance: 24, rotate: 3, scale: 0.94, delay: index * 0.1, margin: "-40px" })}
      className="glass-dark"
      style={{padding:"30px 28px",borderRadius:"14px",cursor:"default",transition:"all 0.3s ease"}}
      whileHover={{borderColor:`${colors.primary}50`,background:`rgba(188,26,34,0.10)`}}>
      <span style={{fontSize:"28px",display:"block",marginBottom:"16px",lineHeight:1}} aria-hidden="true">{metric.icon}</span>
      <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(30px,3vw,48px)",color:"#fff",letterSpacing:"-0.03em",lineHeight:1,marginBottom:"8px",fontVariantNumeric:"tabular-nums"}}>
        {metric.format(count)}
      </div>
      <p style={{fontWeight:600,fontSize:"12.5px",color:colors.primary,letterSpacing:"0.01em",marginBottom:"5px"}}>{metric.label}</p>
      <p style={{fontSize:"11.5px",color:"rgba(255,255,255,0.40)",lineHeight:1.55}}>{metric.description}</p>
    </motion.div>
  );
};

// Africa SVG map
const AfricaMap = () => (
  <div style={{position:"relative",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",minHeight:"440px"}}>
    <div aria-hidden="true" style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${colors.primary}14 0%,transparent 70%)`}} />
    <svg viewBox="0 0 400 520" style={{width:"100%",maxWidth:"360px",position:"relative",zIndex:1,filter:`drop-shadow(0 0 20px rgba(188,26,34,0.14))`}} aria-label="BUA Group operational footprint across Africa">
      <path d="M160,20 L240,18 L280,40 L310,70 L330,110 L340,150 L335,190 L340,220 L350,260 L345,300 L330,340 L305,375 L270,405 L235,430 L200,450 L175,440 L145,420 L115,390 L88,355 L72,315 L68,275 L75,235 L70,195 L62,155 L72,120 L90,90 L115,62 L140,40 Z" fill={`${colors.primary}20`} stroke={`${colors.primary}65`} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M100,240 L145,232 L200,236 L255,230 L300,242 L320,280 L315,320 L298,355 L268,385 L230,410 L200,425 L168,412 L135,388 L105,355 L90,318 L88,280 Z" fill={`${colors.primary}30`} stroke={`${colors.primary}75`} strokeWidth="1.3"/>
      {/* Lagos HQ pulse */}
      <g transform="translate(152,292)">
        <circle r="9" fill={colors.primary} opacity="0.92"/>
        <circle r="16" fill={colors.primary} opacity="0.15"><animate attributeName="r" values="9;20;9" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite"/></circle>
        <circle r="24" fill={colors.primary} opacity="0.08"><animate attributeName="r" values="16;30;16" dur="2.4s" begin="0.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.2;0;0.2" dur="2.4s" begin="0.4s" repeatCount="indefinite"/></circle>
      </g>
      {[{x:176,y:234,l:"Kano"},{x:162,y:308,l:"Edo"},{x:138,y:196,l:"Sokoto"},{x:185,y:272,l:"Abuja"}].map(({x,y,l})=>(
        <g key={l} transform={`translate(${x},${y})`}>
          <circle r="5" fill={colors.primary} opacity="0.70"/>
          <circle r="9" fill={colors.primary} opacity="0.12"/>
        </g>
      ))}
      <text x="165" y="316" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700">Lagos HQ</text>
      <text x="148" y="250" fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="'Plus Jakarta Sans',sans-serif">Kano</text>
      <text x="105" y="193" fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="'Plus Jakarta Sans',sans-serif">Sokoto</text>
      <text x="120" y="322" fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="'Plus Jakarta Sans',sans-serif">Edo</text>
      {[100,150,200,250,300,350,400,450,500].map(y=><line key={y} x1="50" y1={y} x2="370" y2={y} stroke="rgba(255,255,255,0.032)" strokeWidth="1"/>)}
      {[80,130,180,230,280,330].map(x=><line key={x} x1={x} y1="10" x2={x} y2="500" stroke="rgba(255,255,255,0.032)" strokeWidth="1"/>)}
    </svg>
    <div style={{position:"absolute",bottom:"20px",left:"20px",fontSize:"10.5px",color:"rgba(255,255,255,0.40)",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      {[{c:colors.primary,l:"BUA Operations"},{c:`${colors.primary}60`,l:"Distribution"}].map(({c,l})=>(
        <div key={l} style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"5px"}}>
          <div style={{width:"7px",height:"7px",borderRadius:"50%",background:c,flexShrink:0}}/>
          <span>{l}</span>
        </div>
      ))}
    </div>
  </div>
);

const LiveImpactTracker = () => {
  const dir = useScrollDirection();
  return (
  <section style={{
    paddingTop:"88px", paddingBottom:"88px", overflow:"hidden", position:"relative",
    backgroundImage:"url(https://buagroup.com/wp-content/uploads/2025/05/DJI_0336-1.jpg)",
    backgroundAttachment:"fixed", backgroundSize:"cover", backgroundPosition:"center",
  }}>
    {/* Near-opaque dark overlay */}
    <div style={{position:"absolute",inset:0,background:"rgba(10,12,16,0.94)"}} />
    <div aria-hidden="true" style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.020) 1px,transparent 0)",backgroundSize:"36px 36px"}} />

    <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 32px",position:"relative",zIndex:1}}>
      <motion.div style={{marginBottom:"52px"}} {...scrollReveal(dir, { distance: 20, rotate: 1, scale: 0.97 })}>
        <span className="eyebrow">Live Impact Tracker</span>
        <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(26px,3.5vw,46px)",color:"#fff",letterSpacing:"-0.025em",maxWidth:"540px"}}>
          Operational milestones at <span style={{color:colors.primary}}>continental scale.</span>
        </h2>
      </motion.div>

      <div className="impact-layout">
        <div className="counter-inner-grid">
          {metrics.map((m,i)=><MetricCard key={m.id} metric={m} index={i}/>)}
        </div>
        <motion.div {...scrollReveal(dir, { axis: "x", distance: 32, rotate: 2, scale: 0.97, delay: 0.12 })}
          className="glass-dark" style={{borderRadius:"18px",overflow:"hidden"}}>
          <AfricaMap/>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default LiveImpactTracker;
