import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { colors, scrollReveal } from "../styles/tokens";
import { useScrollDirection } from "../hooks/useScrollDirection";

const milestones = [
  { year:"1988",   title:"The Genesis",                body:"BUA Group is incorporated in Lagos, Nigeria, as an agile trading firm specialising in strategic commodity imports. Under the founding vision of Abdul Samad Rabiu, the company quickly establishes a reputation for reliability and scale across West African commodity markets.", tag:"Foundation",     side:"right" },
  { year:"2000s",  title:"Diversification & Growth",   body:"BUA Group expands its operations beyond trading into manufacturing and infrastructure, establishing early presence in sugar refining, flour milling, and real estate development. This period marks the Group's deliberate transition from merchant to industrial operator.", tag:"Expansion",      side:"left" },
  { year:"2008",   title:"Industrial Shift",           body:"Acquisition of the Cement Company of Northern Nigeria (CCNN) — a landmark pivot from trading to heavy manufacturing. This strategic acquisition signals BUA's intent to own and operate the infrastructure underpinning Nigeria's construction sector.", tag:"Manufacturing",  side:"right" },
  { year:"2015",   title:"Greenfield Expansion",        body:"Commissioning of the ultra-modern Obu Cement Line 1 in Edo State — introducing world-class energy efficiency to domestic cement production. The plant sets new benchmarks for capacity utilisation and clinker-to-cement ratios across sub-Saharan Africa.", tag:"Infrastructure", side:"left" },
  { year:"2020",   title:"BUA Cement NGX Listing",      body:"BUA Cement PLC successfully lists on the Nigerian Exchange Group (NGX) under the ticker BUA-CEMENT, raising significant public capital and establishing a transparent governance framework. Market capitalisation quickly reaches the upper tier of Africa's listed industrials.", tag:"Capital Markets", side:"right" },
  { year:"2022",   title:"BUA Foods NGX Listing",       body:"BUA Foods PLC lists on the Nigerian Exchange (NGX) under the ticker BUAFOODS, unlocking multi-billion-dollar value frameworks for public investors. The listing cements BUA's position as a diversified conglomerate with anchored presence in both heavy industry and essential consumer goods.", tag:"Capital Markets", side:"left" },
  { year:"2025–26",title:"Continental Scale",           body:"BUA Foods posts ₦1.77 Trillion in FY2025 revenue, paying ₦28 per share dividend. Chairman Rabiu aligns with Tony Elumelu on capital and industrial expansion. BUA Group, AD Ports Group, and MAIR Group sign MOU on sugar refining, agro-industrial development, and integrated global logistics.", tag:"Record Performance", side:"right" },
];

const MilestoneCard = ({ milestone, inView }) => (
  <div style={{
    borderRadius:"12px", padding:"24px 26px",
    background: inView ? "var(--bg-card)" : "var(--bg-surface)",
    border:`1px solid ${inView?colors.primary+"20":"var(--border)"}`,
    boxShadow: inView ? `0 8px 32px rgba(188,26,34,0.06),0 2px 8px rgba(0,0,0,0.04)` : "none",
    transition:"all 0.5s ease",
  }}>
    <span style={{display:"inline-block",fontSize:"9.5px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",background:inView?`${colors.primary}12`:"var(--bg-base)",color:inView?colors.primary:"var(--text-muted)",padding:"3px 10px",borderRadius:"100px",marginBottom:"12px",transition:"all 0.4s"}}>{milestone.tag}</span>
    <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"15px",color:"var(--text-base)",letterSpacing:"-0.01em",lineHeight:1.3,marginBottom:"8px"}}>{milestone.title}</h3>
    <p style={{fontSize:"13px",color:"var(--text-muted)",lineHeight:1.72}}>{milestone.body}</p>
    <motion.div initial={{scaleX:0}} animate={inView?{scaleX:1}:{scaleX:0}} transition={{duration:0.6,ease:[0.22,1,0.36,1],delay:0.3}}
      style={{background:`linear-gradient(90deg,${colors.primary},transparent)`,transformOrigin:"left",height:"2px",borderRadius:"2px",marginTop:"14px"}} />
  </div>
);

const MilestoneEntry = ({ milestone }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin:"-15% 0px -15% 0px" });
  const isRight = milestone.side === "right";
  return (
    <div ref={ref} style={{position:"relative",display:"flex",alignItems:"center",minHeight:"140px"}}>
      <div style={{flex:1,paddingRight:"48px",display:"flex",justifyContent:"flex-end"}}>
        {!isRight && (
          <motion.div initial={{opacity:0,x:-44}} animate={inView?{opacity:1,x:0}:{opacity:0,x:-44}} transition={{duration:0.65,ease:[0.22,1,0.36,1],delay:0.1}} style={{maxWidth:"360px",width:"100%"}}>
            <MilestoneCard milestone={milestone} inView={inView}/>
          </motion.div>
        )}
      </div>
      <div style={{position:"relative",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",width:0,zIndex:10}}>
        <motion.div initial={{scale:0.4,opacity:0}} animate={inView?{scale:1,opacity:1}:{scale:0.4,opacity:0}} transition={{duration:0.5,ease:[0.22,1,0.36,1]}} style={{width:"52px",height:"52px",position:"relative"}}>
          <motion.div animate={inView?{scale:[1,1.5,1],opacity:[0.35,0,0.35]}:{}} transition={{duration:2.2,repeat:Infinity}} style={{position:"absolute",inset:0,borderRadius:"50%",background:`${colors.primary}28`}}/>
          <motion.div style={{position:"absolute",inset:"6px",borderRadius:"50%",background:inView?colors.primary:"var(--bg-card)",border:`2px solid ${inView?colors.primary:"var(--border)"}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:inView?`0 0 0 4px ${colors.primary}20`:"none",transition:"all 0.5s ease 0.15s"}}>
            <motion.svg width="13" height="13" viewBox="0 0 13 13" fill="none" initial={{opacity:0,scale:0}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:0.35,duration:0.3}}>
              <path d="M2 6.5l3.5 3.5 5.5-5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.div>
        </motion.div>
        <motion.div initial={{opacity:0,y:5}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.4,delay:0.2}}
          style={{marginTop:"7px",padding:"3px 10px",borderRadius:"100px",fontSize:"10px",fontWeight:800,fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:"0.06em",background:inView?colors.primary:"var(--bg-surface)",color:inView?"#fff":"var(--text-muted)",transition:"all 0.5s ease 0.15s",whiteSpace:"nowrap"}}>{milestone.year}</motion.div>
      </div>
      <div style={{flex:1,paddingLeft:"48px"}}>
        {isRight && (
          <motion.div initial={{opacity:0,x:44}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.65,ease:[0.22,1,0.36,1],delay:0.1}} style={{maxWidth:"360px",width:"100%"}}>
            <MilestoneCard milestone={milestone} inView={inView}/>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const LegacyTimeline = () => {
  const dir = useScrollDirection();
  return (
  <section style={{background:"var(--bg-surface)",paddingTop:"96px",paddingBottom:"96px",overflow:"hidden"}}>
    <div style={{maxWidth:"1000px",margin:"0 auto",padding:"0 32px"}}>
      <motion.div style={{textAlign:"center",marginBottom:"72px"}} {...scrollReveal(dir, { distance: 22, rotate: 1.5, scale: 0.97 })}>
        <span className="eyebrow">Historical Milestones</span>
        <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(26px,3.5vw,46px)",color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1.1,marginBottom:"14px"}}>
          Over Three Decades of <span style={{color:colors.primary}}>Industrial Legacy.</span>
        </h2>
        <p style={{fontSize:"15px",color:"var(--text-muted)",maxWidth:"500px",margin:"0 auto",lineHeight:1.7}}>
          From a Lagos trading desk in 1988 to a dual-listed continental conglomerate — every milestone is a deliberate step.
        </p>
      </motion.div>
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",top:0,bottom:0,left:"50%",width:"1px",transform:"translateX(-50%)",background:"var(--border)",zIndex:0}}/>
        <motion.div style={{position:"absolute",top:0,left:"50%",width:"2px",transform:"translateX(-50%)",background:`linear-gradient(to bottom,${colors.primary},${colors.primaryDark})`,zIndex:1,transformOrigin:"top",height:"100%"}} initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:false,amount:0.05}} transition={{duration:2.4,ease:[0.22,1,0.36,1]}}/>
        <div style={{position:"relative",display:"flex",flexDirection:"column",gap:"56px"}}>
          {milestones.map(m=><MilestoneEntry key={m.year} milestone={m}/>)}
        </div>
      </div>
    </div>
  </section>
  );
};

export default LegacyTimeline;
