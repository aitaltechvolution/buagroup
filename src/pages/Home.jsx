import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

import Hero              from "../components/Hero";
import BusinessesGrid    from "../components/BusinessesGrid";
import ChairmanStatement from "../components/ChairmanStatement";
import LiveImpactTracker from "../components/LiveImpactTracker";
import NewsPortal        from "../components/NewsPortal";
import { colors, scrollReveal } from "../styles/tokens";
import { useScrollDirection }   from "../hooks/useScrollDirection";

// ── Reveal wrapper — replays every time it crosses into view, mirroring its
//    tilt/offset to whichever direction the page is being scrolled ─────────────
const FadeUp = ({ children, delay=0, style={} }) => {
  const dir = useScrollDirection();
  return (
    <motion.div {...scrollReveal(dir, { distance: 30, rotate: 2, scale: 0.97, delay, margin: "-60px" })} style={style}>
      {children}
    </motion.div>
  );
};

// ── Who We Are ─────────────────────────────────────────────────────────────────
const WhoWeAre = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["-5%","5%"]);
  const [imgErr, setImgErr] = useState(false);
  const dir = useScrollDirection();

  return (
    <section ref={ref} style={{ background:"var(--bg-base)", paddingTop:"104px", paddingBottom:"104px" }}>
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"88px", alignItems:"center" }}>
          <div>
            <FadeUp><span className="eyebrow">Who We Are</span>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"clamp(28px,3.5vw,50px)", color:"var(--text-base)", letterSpacing:"-0.025em", lineHeight:1.1, marginBottom:"22px" }}>
                Building Africa's Future with Innovation &amp; Excellence
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p style={{ fontSize:"15px", color:"var(--text-muted)", lineHeight:1.80, marginBottom:"16px" }}>
                BUA Group is a Nigerian-based multinational company with a strong presence across Africa. For over three decades, we have pioneered industrial excellence, creating value through high-impact investments in cement, sugar, flour, edible oils, ports, steel, and real estate.
              </p>
              <p style={{ fontSize:"15px", color:"var(--text-muted)", lineHeight:1.80, marginBottom:"32px" }}>
                Our commitment to sustainable development, innovation, and social impact positions us as a leader in Africa's industrial transformation.
              </p>
              <Link to="/about" className="btn-primary" style={{display:"inline-flex",alignItems:"center",gap:"8px"}}>
                Discover Our Story
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </FadeUp>
          </div>

          <motion.div {...scrollReveal(dir, { axis: "x", distance: 36, rotate: 2, scale: 0.96, delay: 0.06, margin: "-60px" })}>
            <div style={{ borderRadius:"20px", overflow:"hidden", aspectRatio:"4/3", boxShadow:"0 32px 72px rgba(0,0,0,0.12)", position:"relative", marginBottom:"18px" }}>
              {/* Fixed-background parallax image */}
              <div style={{
                width:"100%", height:"115%", position:"relative", overflow:"hidden",
                backgroundImage:`url(${imgErr?"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80":"https://buagroup.com/wp-content/uploads/2024/12/BUA-HQ-Drone-Shots-6-edited-1536x1150-1-1024x767.jpg"})`,
                backgroundAttachment:"local",
                backgroundSize:"cover",
                backgroundPosition:"center",
              }}>
                <img src="https://buagroup.com/wp-content/uploads/2024/12/BUA-HQ-Drone-Shots-6-edited-1536x1150-1-1024x767.jpg" alt=""
                  onError={()=>setImgErr(true)} style={{opacity:0,position:"absolute",width:1,height:1}} />
              </div>
              <div style={{position:"absolute",bottom:"18px",left:"18px",padding:"10px 16px",borderRadius:"10px",background:"rgba(18,22,26,0.80)",backdropFilter:"blur(8px)"}}>
                <p style={{fontSize:"11px",fontWeight:700,color:"#fff",marginBottom:"1px"}}>BUA Group HQ</p>
                <p style={{fontSize:"10px",color:"rgba(255,255,255,0.55)"}}>Lagos, Nigeria</p>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
              {[{val:"11M+ MTPA",label:"Cement Capacity",c:colors.primary},
                {val:"₦1.77T",label:"BUA Foods FY25 Revenue",c:"#15803d"}].map(s=>(
                <motion.div key={s.label} whileHover={{y:-3,boxShadow:"0 12px 32px rgba(0,0,0,0.09)"}}
                  style={{padding:"18px 20px",borderRadius:"12px",background:"var(--bg-surface)",border:"1px solid var(--border)",transition:"box-shadow 0.2s"}}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"21px",color:s.c,letterSpacing:"-0.025em",lineHeight:1,marginBottom:"4px"}}>{s.val}</div>
                  <div style={{fontSize:"11.5px",color:"var(--text-muted)"}}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:840px){.who-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
};

// ── Why Choose Us ──────────────────────────────────────────────────────────────
const WhyChooseUs = () => {
  const dir = useScrollDirection();
  const pillars=[
    {icon:"💡",title:"Innovation",body:"State-of-the-art technology and processes across every operational division."},
    {icon:"🌿",title:"Sustainability",body:"Environmental and social responsibility embedded in our operations via ASR Africa."},
    {icon:"✅",title:"Quality",body:"ISO-certified products and services meeting world-class international standards."},
    {icon:"🌍",title:"Impact",body:"Contributing to Africa's economic growth — one industrial investment at a time."},
  ];
  return (
    <section style={{
      position:"relative", paddingTop:"88px", paddingBottom:"88px", overflow:"hidden",
      /* Fixed background for parallax depth */
      backgroundImage:"url(https://buagroup.com/wp-content/uploads/2025/05/731A9162_Easy-Resize.com_.jpg)",
      backgroundAttachment:"fixed", backgroundSize:"cover", backgroundPosition:"center",
    }}>
      {/* Dark overlay so text stays legible */}
      <div style={{position:"absolute",inset:0,background:"rgba(12,14,18,0.90)"}} />
      <div aria-hidden="true" style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.022) 1px,transparent 0)",backgroundSize:"36px 36px"}} />
      <div aria-hidden="true" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"600px",height:"600px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primary}0a 0%,transparent 70%)`,pointerEvents:"none"}} />

      <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 32px",position:"relative",zIndex:1}}>
        <FadeUp>
          <div style={{textAlign:"center",marginBottom:"56px"}}>
            <span className="eyebrow">Building Trust. Delivering Excellence.</span>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(26px,3.5vw,46px)",color:"#ffffff",letterSpacing:"-0.025em",lineHeight:1.1}}>Why Choose BUA Group</h2>
          </div>
        </FadeUp>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px"}}>
          {pillars.map((p,i)=>(
            <motion.div key={p.title} {...scrollReveal(dir, { distance: 30, rotate: 3, scale: 0.93, delay: i*0.09, margin: "-40px" })}
              whileHover={{y:-6}}
              className="glass-dark"
              style={{padding:"32px 24px",cursor:"default",borderRadius:"16px"}}>
              <motion.span animate={{y:[0,-5,0]}} transition={{duration:3,repeat:Infinity,delay:i*0.5}} style={{fontSize:"34px",display:"block",marginBottom:"18px",lineHeight:1}} aria-hidden="true">{p.icon}</motion.span>
              <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"17px",color:"#ffffff",letterSpacing:"-0.01em",marginBottom:"10px"}}>{p.title}</h3>
              <p style={{fontSize:"13.5px",color:"rgba(255,255,255,0.50)",lineHeight:1.7}}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Careers CTA ────────────────────────────────────────────────────────────────
const CareersCTA = () => {
  const dir = useScrollDirection();
  return (
    <section style={{background:"var(--bg-surface)",padding:"80px 32px"}}>
      <div style={{maxWidth:"1280px",margin:"0 auto"}}>
        <motion.div {...scrollReveal(dir, { distance: 32, rotate: 1.5, scale: 0.97, margin: "-60px" })}
          whileHover={{boxShadow:"0 40px 80px rgba(0,0,0,0.16)"}}
          style={{
            display:"flex",alignItems:"center",justifyContent:"space-between",gap:"32px",flexWrap:"wrap",
            background:`linear-gradient(135deg,${colors.onyx} 0%,#1a2332 100%)`,
            borderRadius:"22px",padding:"52px 56px",position:"relative",overflow:"hidden",
            boxShadow:"0 24px 56px rgba(0,0,0,0.14)",transition:"box-shadow 0.35s",
          }}>
          <div aria-hidden="true" style={{position:"absolute",right:"-40px",top:"-40px",width:"300px",height:"300px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primary}22 0%,transparent 70%)`}} />
          {/* Fixed bg image layer */}
          <div aria-hidden="true" style={{position:"absolute",inset:0,backgroundImage:"url(https://buagroup.com/wp-content/uploads/2026/03/Untitled-design-2_Easy-Resize.com_2.jpg)",backgroundAttachment:"fixed",backgroundSize:"cover",backgroundPosition:"center",opacity:0.06}} />
          <div style={{position:"relative"}}>
            <span className="eyebrow">Build Your Future With Us</span>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(22px,3vw,38px)",color:"#ffffff",letterSpacing:"-0.025em",lineHeight:1.15,marginBottom:"8px"}}>
              Join a dynamic workplace where<br/>innovation thrives.
            </h2>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.48)",lineHeight:1.65}}>Contributions are valued and talent is nurtured for growth and success.</p>
          </div>
          <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}} style={{position:"relative"}}>
            <Link to="/careers" className="btn-primary" style={{display:"inline-flex",alignItems:"center",gap:"8px",fontSize:"14px",padding:"15px 32px"}}>
              Explore Careers
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => (
  <>
    <Hero />
    <WhoWeAre />
    <BusinessesGrid />
    <ChairmanStatement />
    <WhyChooseUs />
    <LiveImpactTracker />
    <NewsPortal />
    <CareersCTA />
  </>
);

export default Home;
