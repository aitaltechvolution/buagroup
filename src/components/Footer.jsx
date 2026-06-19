import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import BUALogo from "./BUALogo";
import { colors } from "../styles/tokens";
import { quickLinks, companyLinks, newsMediaLinks, footerLegal, contactInfo, socialLinks } from "../data/siteData";

const FacebookIcon  = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const LinkedInIcon  = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const XIcon         = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YouTubeIcon   = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const TikTokIcon    = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.81 1.54V6.79a4.85 4.85 0 01-1.04-.1z"/></svg>;

const socials = [
  {Icon:FacebookIcon,label:"Facebook",href:socialLinks.facebook},
  {Icon:XIcon,       label:"X",       href:socialLinks.x},
  {Icon:LinkedInIcon,label:"LinkedIn",href:socialLinks.linkedin},
  {Icon:YouTubeIcon, label:"YouTube", href:socialLinks.youtube},
  {Icon:TikTokIcon,  label:"TikTok",  href:socialLinks.tiktok},
];

const NewsletterForm = () => {
  const [email,setEmail]=useState("");
  const [done,setDone]=useState(false);
  if(done) return(
    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
      style={{padding:"13px 16px",borderRadius:"9px",background:`rgba(188,26,34,0.12)`,border:`1px solid rgba(188,26,34,0.28)`,color:colors.primary,fontSize:"13px",fontWeight:600}}>
      ✓ Subscribed! Thank you.
    </motion.div>
  );
  return(
    <div>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&email.includes("@")&&setDone(true)}
        placeholder="Your email address" className="newsletter-input" style={{marginBottom:"9px"}}/>
      <motion.button onClick={()=>email.includes("@")&&setDone(true)}
        whileHover={{scale:1.02,backgroundColor:colors.primaryDark}} whileTap={{scale:0.97}}
        style={{width:"100%",padding:"11px",borderRadius:"8px",background:colors.primary,color:"#fff",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"13px",fontWeight:700}}>
        Subscribe to Newsletter
      </motion.button>
    </div>
  );
};

const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end end"] });
  const y       = useTransform(scrollYProgress, [0,1], [48,0]);
  const opacity = useTransform(scrollYProgress, [0,0.25], [0,1]);

  return (
    <motion.footer ref={ref} style={{ y, opacity, position:"relative", overflow:"hidden", fontFamily:"'Plus Jakarta Sans',sans-serif",
      backgroundImage:"url(https://buagroup.com/wp-content/uploads/2025/05/731A9162_Easy-Resize.com_.jpg)",
      backgroundAttachment:"fixed", backgroundSize:"cover", backgroundPosition:"center",
    }}>
      {/* Heavy dark overlay over the fixed bg */}
      <div style={{position:"absolute",inset:0,background:"rgba(12,14,18,0.96)"}} />
      {/* Red glow */}
      <div aria-hidden="true" style={{position:"absolute",bottom:"-80px",right:"-80px",width:"500px",height:"500px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primary}0a 0%,transparent 70%)`,pointerEvents:"none"}} />

      {/* Top accent */}
      <div style={{position:"relative",height:"3px",background:`linear-gradient(90deg,${colors.primary} 0%,${colors.primaryDark} 50%,transparent 100%)`,zIndex:1}} />

      <div style={{position:"relative",zIndex:1,maxWidth:"1280px",margin:"0 auto",padding:"64px 32px 0"}}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <BUALogo light />
            <p style={{marginTop:"18px",fontSize:"13px",lineHeight:1.78,color:"rgba(255,255,255,0.46)",maxWidth:"270px"}}>
              A leading Nigerian conglomerate with investments in food, infrastructure, mining, and manufacturing across Africa.
            </p>
            <div style={{marginTop:"14px",display:"flex",flexDirection:"column",gap:"6px"}}>
              <a href={`mailto:${contactInfo.email}`} style={{fontSize:"12px",color:"rgba(255,255,255,0.38)",textDecoration:"none",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.38)"}>✉ {contactInfo.email}</a>
              <a href={`tel:${contactInfo.phone}`} style={{fontSize:"12px",color:"rgba(255,255,255,0.38)",textDecoration:"none",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.38)"}>📞 +{contactInfo.phone}</a>
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"20px"}}>
              {socials.map(({Icon,label,href})=>(
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="social-icon" whileHover={{y:-3}} transition={{type:"spring",stiffness:400,damping:15}}>
                  <Icon/>
                </motion.a>
              ))}
            </div>
          </div>
          {/* About */}
          <div>
            <h4 style={{fontSize:"9.5px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:colors.primary,marginBottom:"18px"}}>About</h4>
            <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"8px"}}>
              {quickLinks.map(l=><li key={l.label}><Link to={l.href} className="footer-link">{l.label}</Link></li>)}
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 style={{fontSize:"9.5px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:colors.primary,marginBottom:"18px"}}>Company</h4>
            <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"8px"}}>
              {companyLinks.map(l=><li key={l.label}><a href={l.href} target={l.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" className="footer-link">{l.label}</a></li>)}
            </ul>
          </div>
          {/* Media + Locations */}
          <div>
            <h4 style={{fontSize:"9.5px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:colors.primary,marginBottom:"18px"}}>News &amp; Media</h4>
            <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"8px",marginBottom:"22px"}}>
              {newsMediaLinks.map(l=><li key={l.label}><Link to={l.href} className="footer-link">{l.label}</Link></li>)}
            </ul>
            <h4 style={{fontSize:"9.5px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:colors.primary,marginBottom:"12px"}}>Offices</h4>
            <a href={contactInfo.locations.abuja} target="_blank" rel="noopener noreferrer" className="footer-link">📍 Abuja</a>
            <a href={contactInfo.locations.lagos} target="_blank" rel="noopener noreferrer" className="footer-link">📍 Lagos</a>
          </div>
          {/* Newsletter */}
          <div>
            <h4 style={{fontSize:"9.5px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:colors.primary,marginBottom:"18px"}}>Newsletter</h4>
            <p style={{fontSize:"12.5px",color:"rgba(255,255,255,0.40)",lineHeight:1.7,marginBottom:"14px"}}>Stay updated with BUA Group's latest news and insights.</p>
            <NewsletterForm/>
          </div>
        </div>

        <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"0",padding:"22px 0",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.24)"}}>Copyright © {new Date().getFullYear()} BUA Group | All Rights Reserved</p>
          <div style={{display:"flex",gap:"20px"}}>
            {footerLegal.map(l=>(
              <Link key={l.label} to={l.href} style={{fontSize:"12px",color:"rgba(255,255,255,0.28)",textDecoration:"none",transition:"color 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.28)"}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
