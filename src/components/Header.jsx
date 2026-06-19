import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BUALogo from "./BUALogo";
import { MenuIcon, CloseIcon } from "./Icons";
import { useScrolled } from "../hooks/useScrolled";
import { navLinks, megaMenu, contactInfo } from "../data/siteData";
import { colors } from "../styles/tokens";

// ─── Sun / Moon icons ─────────────────────────────────────────────────────────
const SunIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const MoonIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
const ChevronDown = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2.5 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

// ─── Dark mode hook ───────────────────────────────────────────────────────────
export const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("bua-theme") === "dark" ||
      (!localStorage.getItem("bua-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (dark) { document.documentElement.classList.add("dark"); localStorage.setItem("bua-theme","dark"); }
    else       { document.documentElement.classList.remove("dark"); localStorage.setItem("bua-theme","light"); }
  }, [dark]);

  return [dark, () => setDark(d => !d)];
};

// ─── Mega Menu ────────────────────────────────────────────────────────────────
const MegaMenu = ({ onClose, dark }) => (
  <motion.div
    key="mega"
    initial={{ opacity:0, y:-12, scale:0.98 }}
    animate={{ opacity:1, y:0,   scale:1    }}
    exit={  { opacity:0, y:-8,   scale:0.98 }}
    transition={{ duration:0.22, ease:[0.22,1,0.36,1] }}
    className="glass"
    style={{
      position:"fixed", top:"72px", left:0, right:0, zIndex:998,
      borderTop:`3px solid ${colors.primary}`,
      borderBottom:"1px solid rgba(82,93,107,0.10)",
      boxShadow:"0 32px 80px rgba(0,0,0,0.14)",
    }}
    onMouseLeave={onClose}
  >
    <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"44px 32px 48px", display:"grid", gridTemplateColumns:"1fr 1fr 1.1fr", gap:"52px" }}>
      {/* Foods */}
      <div>
        <p className="eyebrow" style={{ display:"flex", alignItems:"center", gap:"7px" }}>
          <span>{megaMenu.foods.icon}</span>{megaMenu.foods.label}
        </p>
        {megaMenu.foods.links.map((l,i)=>(
          <motion.a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer"
            initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05+0.06}}
            className="mega-link" onClick={onClose}>
            <div style={{fontWeight:600,fontSize:"13.5px",color:"var(--text-base)",marginBottom:"2px"}}>{l.name}</div>
            <div style={{fontSize:"11.5px",color:"var(--text-muted)"}}>{l.desc}</div>
          </motion.a>
        ))}
      </div>
      {/* Infrastructure */}
      <div>
        <p className="eyebrow" style={{ display:"flex", alignItems:"center", gap:"7px" }}>
          <span>{megaMenu.infrastructure.icon}</span>{megaMenu.infrastructure.label}
        </p>
        {megaMenu.infrastructure.links.map((l,i)=>(
          <motion.a key={l.name} href={l.href.startsWith("http")?l.href:undefined}
            to={!l.href.startsWith("http")?l.href:undefined}
            target={l.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
            initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05+0.10}}
            className="mega-link" onClick={onClose} style={{textDecoration:"none"}}>
            <div style={{fontWeight:600,fontSize:"13.5px",color:"var(--text-base)",marginBottom:"2px"}}>{l.name}</div>
            <div style={{fontSize:"11.5px",color:"var(--text-muted)"}}>{l.desc}</div>
          </motion.a>
        ))}
      </div>
      {/* About card */}
      <motion.div initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:0.08}}
        style={{ background:`linear-gradient(135deg, ${colors.onyx} 0%, #1e2a36 100%)`, borderRadius:"14px", padding:"28px 26px", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:"240px" }}>
        <div aria-hidden="true" style={{position:"absolute",top:"-24px",right:"-24px",width:"130px",height:"130px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primary}28 0%,transparent 70%)`}}/>
        <div>
          <p className="eyebrow">About BUA Group</p>
          <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"18px",fontWeight:800,lineHeight:1.22,color:"#fff",marginBottom:"10px",letterSpacing:"-0.02em"}}>
            Building Africa's Future with <span style={{color:colors.primary}}>Innovation &amp; Excellence.</span>
          </h3>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.52)",lineHeight:1.7}}>
            Nigerian-based multinational pioneering industrial excellence since 1988.
          </p>
        </div>
        <Link to="/about" onClick={onClose} className="btn-primary" style={{marginTop:"20px",padding:"9px 18px",fontSize:"12.5px",alignSelf:"flex-start"}}>
          Discover BUA Group →
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
const MobileDrawer = ({ open, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
          transition={{duration:0.26,ease:[0.22,1,0.36,1]}}
          className="glass" style={{borderTop:"1px solid var(--border)",overflow:"hidden"}}>
          <div style={{padding:"10px 24px 28px"}}>
            {navLinks.map(link=>(
              <div key={link.label}>
                {link.hasMega ? (
                  <>
                    <button onClick={()=>setExpanded(v=>!v)} style={{width:"100%",background:"none",border:"none",textAlign:"left",padding:"13px 0",fontSize:"14px",fontWeight:600,color:"var(--text-base)",cursor:"pointer",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                      {link.label}
                      <motion.span animate={{rotate:expanded?180:0}} transition={{duration:0.2}} style={{display:"inline-flex"}}>
                        <ChevronDown />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.2}} style={{overflow:"hidden"}}>
                          <div style={{paddingLeft:"12px",paddingBottom:"6px"}}>
                            {[...megaMenu.foods.links,...megaMenu.infrastructure.links].map(l=>(
                              <a key={l.name} href={l.href} target={l.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                                style={{display:"block",padding:"9px 0",fontSize:"13px",color:"var(--text-muted)",textDecoration:"none",borderBottom:"1px solid var(--border)",transition:"color 0.2s"}}
                                onMouseEnter={e=>e.currentTarget.style.color=colors.primary}
                                onMouseLeave={e=>e.currentTarget.style.color="var(--text-muted)"}
                              >{l.name}</a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink to={link.href} onClick={onClose}
                    style={({isActive})=>({display:"block",padding:"13px 0",fontSize:"14px",fontWeight:600,color:isActive?colors.primary:"var(--text-base)",textDecoration:"none",borderBottom:"1px solid var(--border)",transition:"color 0.2s",fontFamily:"'Plus Jakarta Sans',sans-serif"})}
                  >{link.label}</NavLink>
                )}
              </div>
            ))}
            <a href={`mailto:${contactInfo.email}`} className="btn-primary" style={{display:"block",marginTop:"18px",textAlign:"center"}}>Get in Touch</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = () => {
  const scrolled               = useScrolled(50);
  const [megaOpen, setMegaOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, toggleDark]     = useDarkMode();
  const timerRef               = useRef(null);

  const openMega  = useCallback(()=>{ clearTimeout(timerRef.current); setMegaOpen(true);  },[]);
  const closeMega = useCallback(()=>{ timerRef.current = setTimeout(()=>setMegaOpen(false),200); },[]);

  // Scroll-aware header bg
  const headerBg    = scrolled ? (dark ? "rgba(12,14,18,0.90)" : "rgba(255,255,255,0.90)") : "transparent";
  const headerBlur  = scrolled ? "blur(20px) saturate(180%)" : "none";
  const headerBorder= scrolled ? `1px solid var(--border)` : "1px solid transparent";
  const navColor    = scrolled ? "var(--text-base)" : "rgba(255,255,255,0.92)";

  return (
    <>
      <motion.header
        animate={{ backgroundColor: headerBg }}
        transition={{ duration:0.35, ease:"easeOut" }}
        style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,height:"72px", backdropFilter:headerBlur, WebkitBackdropFilter:headerBlur, borderBottom:headerBorder, boxShadow:scrolled?"0 2px 24px rgba(0,0,0,0.08)":"none", transition:"box-shadow 0.35s, border-color 0.35s, backdrop-filter 0.35s" }}
      >
        <div style={{ maxWidth:"1280px",margin:"0 auto",padding:"0 32px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px" }}>
          {/* Logo */}
          <Link to="/" style={{textDecoration:"none",flexShrink:0}}>
            <BUALogo light={!scrolled} />
          </Link>

          {/* Desktop nav — centred */}
          <nav className="hidden-mobile" style={{display:"flex",alignItems:"center",gap:"0",flex:1,justifyContent:"center"}}>
            {navLinks.map(link =>
              link.hasMega ? (
                <div key={link.label} onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <button
                    className={`nav-link${megaOpen?" mega-open":""}`}
                    style={{color:navColor}}
                    onClick={()=>setMegaOpen(v=>!v)}
                  >
                    {link.label}
                    {/* chevron BESIDE the text — inline-flex on parent fixes the bug */}
                    <span className="chevron-icon">
                      <ChevronDown />
                    </span>
                  </button>
                </div>
              ) : (
                <NavLink key={link.label} to={link.href}
                  className={({isActive})=>`nav-link${isActive?" active":""}`}
                  style={({isActive})=>({color:isActive?colors.primary:navColor})}
                >{link.label}</NavLink>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="hidden-mobile" style={{display:"flex",alignItems:"center",gap:"10px",flexShrink:0}}>
            {/* Dark mode toggle */}
            <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={dark?"sun":"moon"} initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.18}} style={{display:"flex"}}>
                  {dark ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </button>
            {/* CTA */}
            <motion.a href={`mailto:${contactInfo.email}`}
              whileHover={{scale:1.04,backgroundColor:colors.primaryDark}}
              whileTap={{scale:0.97}}
              style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"9px 20px",background:colors.primary,color:"#fff",borderRadius:"8px",fontSize:"13px",fontWeight:700,textDecoration:"none",letterSpacing:"0.01em",boxShadow:"0 4px 16px rgba(188,26,34,0.28)",whiteSpace:"nowrap"}}>
              Get in Touch
            </motion.a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="show-mobile" style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <motion.button onClick={()=>setMobileOpen(v=>!v)} aria-label="Toggle menu" whileTap={{scale:0.9}}
              style={{background:"none",border:"none",cursor:"pointer",padding:"6px",color:scrolled?"var(--text-base)":"#fff",display:"flex"}}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={mobileOpen?"c":"o"} initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.15}} style={{display:"flex"}}>
                  {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <MobileDrawer open={mobileOpen} onClose={()=>setMobileOpen(false)} dark={dark} />
      </motion.header>

      <AnimatePresence>
        {megaOpen && (
          <div onMouseEnter={openMega} onMouseLeave={closeMega}>
            <MegaMenu onClose={()=>setMegaOpen(false)} dark={dark} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
