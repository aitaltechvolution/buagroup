import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { colors, scrollReveal } from "../styles/tokens";
import { useScrollDirection } from "../hooks/useScrollDirection";

const ChairmanStatement = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const textY = useTransform(scrollYProgress, [0,1], [28,-20]);
  const [imgErr, setImgErr] = useState(false);
  const dir = useScrollDirection();

  return (
    <section ref={ref} style={{ background:"var(--bg-base)", paddingTop:"104px", paddingBottom:"104px", overflow:"hidden" }}>
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 32px" }}>
        <div className="chairman-layout">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: dir === "up" ? 2 : -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ position: "relative" }}
          >
            <motion.div aria-hidden="true" animate={{rotate:[0,3,0],scale:[1,1.02,1]}} transition={{duration:8,repeat:Infinity,ease:"easeInOut"}}
              style={{position:"absolute",bottom:"-24px",left:"-24px",width:"55%",height:"55%",background:`${colors.primary}0d`,border:`2px solid ${colors.primary}18`,borderRadius:"20px",zIndex:0}} />

            <div style={{position:"relative",borderRadius:"22px",overflow:"hidden",aspectRatio:"3/4",maxHeight:"660px",zIndex:1,
              /* Fixed attachment for Ken Burns feel on scroll */
              backgroundImage:`url(${imgErr?"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80":"https://buagroup.com/wp-content/uploads/2025/07/Chairman-website-picture.jpg"})`,
              backgroundAttachment:"local", backgroundSize:"cover", backgroundPosition:"center top",
            }}>
              <img src="https://buagroup.com/wp-content/uploads/2025/07/Chairman-website-picture.jpg" alt="Abdul Samad Rabiu"
                onError={()=>setImgErr(true)} style={{opacity:0,position:"absolute",width:1,height:1}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(18,22,26,0.85) 0%,transparent 55%)"}} aria-hidden="true" />
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px"}}>
                <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"15px",color:"#fff",marginBottom:"3px"}}>Abdul Samad Rabiu, CFR, CON</p>
                <p style={{fontSize:"12px",color:colors.primary}}>Chairman / CEO, BUA Group</p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} viewport={{once:false}} transition={{delay:0.5,duration:0.6}}
              className="float-delay"
              style={{position:"absolute",right:"-22px",top:"52px",background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:"14px",padding:"16px 22px",boxShadow:"0 24px 48px rgba(0,0,0,0.12)",zIndex:2}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:"28px",color:colors.primary,letterSpacing:"-0.03em",lineHeight:1}}>36+</div>
              <div style={{fontSize:"11px",color:"var(--text-muted)",marginTop:"4px",lineHeight:1.4}}>Years of Industrial<br/>Leadership</div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: dir === "up" ? -2 : 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.08 }}
            style={{ y: textY }}
          >
            <span className="eyebrow">The Visionary Blueprint</span>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(26px,3vw,44px)",color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1.10,marginBottom:"30px"}}>
              A Legacy Built on Impact,<br/>Integrity, and Scale.
            </h2>

            <blockquote style={{position:"relative",borderLeft:`3px solid ${colors.primary}`,paddingLeft:"24px",marginBottom:"28px"}}>
              <span aria-hidden="true" style={{position:"absolute",top:"-20px",left:"10px",fontFamily:"Georgia,serif",fontSize:"72px",lineHeight:1,color:`${colors.primary}18`,userSelect:"none"}}>"</span>
              <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:false}} transition={{delay:0.4,duration:0.7}}
                style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(16px,1.8vw,21px)",color:"var(--accent-emphasis)",fontWeight:600,fontStyle:"italic",lineHeight:1.55,position:"relative"}}>
                Our corporate strategy is simple: identify critical structural gaps in the African economy and build local, high-capacity industrial solutions to fill them.
              </motion.p>
            </blockquote>

            {["For over three decades, BUA Group has executed on a clear mandate — to manufacture the building blocks of a self-sufficient African economy. Every ton of cement, every bag of sugar, every port berth commissioned is a deliberate investment in Africa's structural transformation.",
              "Our commitment to innovation, sustainable development, and social impact through ASR Africa positions BUA Group as a long-term architect of continental progress."].map((p,i)=>(
              <motion.p key={i} {...scrollReveal(dir, { axis: "y", distance: 16, rotate: 0, scale: 1, delay: 0.1 + i * 0.12, margin: "-40px" })}
                style={{fontSize:"14.5px",color:"var(--text-muted)",lineHeight:1.80,marginBottom:"16px"}}>{p}</motion.p>
            ))}

            <div style={{display:"flex",flexDirection:"column",gap:"4px",marginTop:"28px"}}>
              <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"15px",color:"var(--text-base)"}}>Abdul Samad Rabiu, CFR, CON</p>
              <p style={{fontSize:"12.5px",color:"var(--text-muted)"}}>Founder & Chairman / CEO, BUA Group</p>
              <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:0.7,delay:0.3}}
                style={{width:"80px",height:"2px",background:`linear-gradient(90deg,${colors.primary},transparent)`,borderRadius:"2px",marginTop:"10px",transformOrigin:"left"}} />
            </div>

            <motion.div initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:false}} transition={{delay:0.5,duration:0.5}} style={{marginTop:"32px"}}>
              <Link to="/about" style={{display:"inline-flex",alignItems:"center",gap:"7px",fontSize:"13px",fontWeight:700,color:colors.primary,textDecoration:"none",transition:"gap 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.gap="12px"}
                onMouseLeave={e=>e.currentTarget.style.gap="7px"}>
                Read Full Chairman's Statement
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanStatement;
