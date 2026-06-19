import React, { useState } from "react";
import { motion } from "framer-motion";
import { colors } from "../styles/tokens";

const PageHero = ({ eyebrow, heading, subtext, imageSrc, imageFallback, accent, extra, minHeight = "480px" }) => {
  const [imgErr, setImgErr] = useState(false);
  const src = imgErr && imageFallback ? imageFallback : imageSrc;

  return (
    <section style={{
      minHeight, paddingTop: "72px", display: "flex", alignItems: "flex-end",
      position: "relative", overflow: "hidden",
    }}>
      {/* Fixed parallax background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.3s",
      }}>
        {/* Hidden img for error detection */}
        <img src={src} alt="" onError={()=>setImgErr(true)}
          style={{position:"absolute",width:1,height:1,opacity:0,pointerEvents:"none"}} />
      </div>

      {/* Dark overlay */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,rgba(18,22,26,0.94) 0%,rgba(18,22,26,0.70) 55%,rgba(18,22,26,0.32) 100%)" }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(18,22,26,0.88) 0%,transparent 50%)" }} />

      {/* Dot grid */}
      <div aria-hidden="true" style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.025) 1px,transparent 0)", backgroundSize:"36px 36px", zIndex:1 }} />

      {/* Left accent */}
      <div aria-hidden="true" style={{ position:"absolute", left:0, top:0, bottom:0, width:"3px", background:`linear-gradient(to bottom,${accent||colors.primary},transparent 70%)`, zIndex:2 }} />
      <div aria-hidden="true" style={{ position:"absolute", bottom:0, left:0, width:"200px", height:"2px", background:`linear-gradient(to right,${accent||colors.primary},transparent)`, zIndex:2 }} />

      <div style={{ position:"relative", zIndex:10, maxWidth:"1280px", margin:"0 auto", padding:"0 32px 56px", width:"100%" }}>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.68,ease:[0.22,1,0.36,1],delay:0.08}}>
          {eyebrow && <span className="eyebrow" style={{color:accent||colors.primary}}>{eyebrow}</span>}
          <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"clamp(32px,5vw,70px)", color:"#ffffff", letterSpacing:"-0.03em", lineHeight:1.04, maxWidth:"780px", marginBottom:"18px" }}>
            {heading}
          </h1>
          {subtext && <p style={{ fontSize:"clamp(14px,1.6vw,17px)", color:"rgba(255,255,255,0.52)", maxWidth:"540px", lineHeight:1.74, fontWeight:400 }}>{subtext}</p>}
          {extra && <div style={{marginTop:"28px"}}>{extra}</div>}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
