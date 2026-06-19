import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { colors } from "../styles/tokens";

const PlaceholderPage = ({ title, description }) => (
  <section style={{
    minHeight:"100vh", paddingTop:"72px", background:"var(--bg-surface)",
    display:"flex", alignItems:"center", justifyContent:"center",
    position:"relative", overflow:"hidden",
  }}>
    <div aria-hidden="true" style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(127,127,127,0.04) 1px,transparent 0)",backgroundSize:"36px 36px"}}/>
    <div aria-hidden="true" style={{position:"absolute",bottom:"-80px",right:"-80px",width:"500px",height:"500px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primary}12 0%,transparent 70%)`,pointerEvents:"none"}}/>
    <div aria-hidden="true" style={{position:"absolute",top:"-60px",left:"-60px",width:"360px",height:"360px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primaryDark}08 0%,transparent 70%)`,pointerEvents:"none"}}/>
    <div aria-hidden="true" style={{position:"absolute",left:0,top:0,bottom:0,width:"3px",background:`linear-gradient(to bottom,${colors.primary},transparent 70%)`}}/>

    <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}}
      style={{textAlign:"center",padding:"0 32px",maxWidth:"580px",position:"relative",zIndex:1}}>
      <motion.div animate={{scaleX:[0,1]}} transition={{duration:0.5,delay:0.2,ease:[0.22,1,0.36,1]}}
        style={{width:"48px",height:"3px",borderRadius:"2px",background:colors.primary,margin:"0 auto 28px",transformOrigin:"left"}}/>
      <span className="eyebrow" style={{textAlign:"center"}}>Coming Soon</span>
      <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(28px,5vw,56px)",color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1.1,marginBottom:"16px"}}>{title}</h1>
      <p style={{fontSize:"15px",color:"var(--text-muted)",lineHeight:1.74,marginBottom:"40px",fontWeight:400}}>
        {description||"This section is under construction. Return to the homepage to explore what BUA Group has built."}
      </p>
      <Link to="/" className="btn-primary">
        Back to BUA Group
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>
    </motion.div>
  </section>
);

export default PlaceholderPage;
