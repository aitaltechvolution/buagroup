import React from "react";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import LegacyTimeline from "../components/LegacyTimeline";
import ExecutiveGrid from "../components/ExecutiveGrid";
import { colors } from "../styles/tokens";

const MissionBlock = () => (
  <section style={{ background:"var(--bg-base)", paddingTop:"96px", paddingBottom:"96px" }}>
    <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 32px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>
        <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}>
          <span className="eyebrow">Our Mission</span>
          <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(24px,3vw,42px)",color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1.12,marginBottom:"20px"}}>
            A leading Nigerian conglomerate with investments across Africa.
          </h2>
          <p style={{fontSize:"14.5px",color:"var(--text-muted)",lineHeight:1.80,marginBottom:"16px"}}>
            BUA Group exists to build the industrial and food infrastructure that sub-Saharan Africa needs to achieve genuine economic sovereignty. Every investment, every plant, and every public listing is a deliberate act of structural development.
          </p>
          <p style={{fontSize:"14.5px",color:"var(--text-muted)",lineHeight:1.80}}>
            Our commitment to sustainable development, innovation, and social impact — through our operational businesses and the ASR Africa philanthropic foundation — positions us as a long-term partner in Africa's industrial transformation.
          </p>
        </motion.div>
        <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            {[{val:"11M+",label:"MTPA Cement Capacity",icon:"🏭",color:colors.primary},
              {val:"1.5M+",label:"MTPA Sugar Capacity",icon:"🌾",color:"#15803d"},
              {val:"₦1.77T",label:"BUA Foods FY25 Revenue",icon:"📊",color:"#1d4ed8"},
              {val:"1988",label:"Year Founded, Lagos",icon:"📅",color:"var(--text-muted)"}].map(s=>(
              <motion.div key={s.label} whileHover={{y:-3,boxShadow:"0 12px 32px rgba(0,0,0,0.10)"}}
                style={{padding:"22px 20px",borderRadius:"12px",background:"var(--bg-surface)",border:"1px solid var(--border)",transition:"box-shadow 0.2s"}}>
                <span style={{fontSize:"22px",display:"block",marginBottom:"8px"}}>{s.icon}</span>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"22px",color:s.color,letterSpacing:"-0.025em",lineHeight:1,marginBottom:"4px"}}>{s.val}</div>
                <div style={{fontSize:"11.5px",color:"var(--text-muted)",fontWeight:500}}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const About = () => (
  <>
    <PageHero
      eyebrow="About BUA Group"
      heading={<>Building Africa's Future with <span style={{color:colors.primary}}>Innovation &amp; Excellence.</span></>}
      subtext="BUA Group is a Nigerian-based multinational company with a strong presence across Africa. For over three decades, we have pioneered industrial excellence across cement, sugar, flour, edible oils, ports, steel, and real estate."
      imageSrc="https://buagroup.com/wp-content/uploads/2024/12/BUA-HQ-Drone-Shots-6-edited-1536x1150-1-1024x767.jpg"
      imageFallback="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
    />
    <MissionBlock />
    <LegacyTimeline />
    <ExecutiveGrid />
  </>
);
export default About;
