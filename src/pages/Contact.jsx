import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import { colors } from "../styles/tokens";
import { contactInfo, socialLinks } from "../data/siteData";

const EmailIcon    = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const PhoneIcon    = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4.5C3 3.67 3.67 3 4.5 3h2.057a.75.75 0 01.712.513l.96 2.88a.75.75 0 01-.212.808L6.8 8.363A11.04 11.04 0 0011.637 13.2l1.162-1.217a.75.75 0 01.808-.212l2.88.96A.75.75 0 0117 13.443V15.5A1.5 1.5 0 0115.5 17C8.596 17 3 11.404 3 4.5z" stroke="currentColor" strokeWidth="1.5"/></svg>;
const LocationIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>;
const LinkedInIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const XIcon         = () => <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YouTubeIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

const contactCards = [
  { icon:<EmailIcon/>,    title:"Email Us",    lines:["info@buagroup.com"],                                                href:"mailto:info@buagroup.com",            cta:"Send an Email",   color:colors.primary },
  { icon:<PhoneIcon/>,    title:"Call Us",     lines:["+234-1-4610669","+234-1-4610670"],                                  href:"tel:+2341461066970",                  cta:"Call Now",        color:"#1d4ed8"       },
  { icon:<LocationIcon/>, title:"Abuja Office",lines:["Plot 1267 Shehu Shagari Way,","Maitama, Abuja, Nigeria"],            href:contactInfo.locations.abuja,           cta:"Get Directions",  color:"#15803d"       },
  { icon:<LocationIcon/>, title:"Lagos Office",lines:["BUA Towers, PC 32","Churchgate Street, Victoria Island, Lagos"],     href:contactInfo.locations.lagos,           cta:"Get Directions",  color:"#b45309"       },
];

const Field = ({ label, required, children }) => (
  <div>
    <label style={{display:"block",fontSize:"11px",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:"7px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      {label}{required&&<span style={{color:colors.primary,marginLeft:"3px"}}>*</span>}
    </label>
    {children}
  </div>
);

const inputBase = {
  width:"100%", padding:"12px 16px", borderRadius:"9px",
  border:"1px solid var(--border)", background:"var(--bg-surface)",
  fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"14px",
  color:"var(--text-base)", outline:"none",
  transition:"border-color 0.2s, box-shadow 0.2s, background 0.2s",
  boxSizing:"border-box",
};
const onFocus = e => { e.target.style.borderColor=colors.primary; e.target.style.boxShadow=`0 0 0 3px rgba(188,26,34,0.12)`; e.target.style.background="var(--bg-card)"; };
const onBlur  = e => { e.target.style.borderColor="var(--border)"; e.target.style.boxShadow="none"; e.target.style.background="var(--bg-surface)"; };

const ContactForm = () => {
  const [form,setForm] = useState({ name:"", email:"", company:"", subject:"", message:"" });
  const [sent,setSent] = useState(false);
  const [sending,setSending] = useState(false);
  const set = f => e => setForm(p=>({...p,[f]:e.target.value}));

  const handleSubmit = e => {
    e.preventDefault();
    if(!form.name||!form.email||!form.message) return;
    setSending(true);
    setTimeout(()=>{ setSending(false); setSent(true); }, 1600);
  };

  if(sent) return(
    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.5,ease:[0.22,1,0.36,1]}} style={{textAlign:"center",padding:"56px 40px"}}>
      <div style={{width:"72px",height:"72px",borderRadius:"50%",background:`${colors.primary}12`,border:`2px solid ${colors.primary}30`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:"30px"}}>✓</div>
      <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"22px",color:"var(--text-base)",marginBottom:"10px"}}>Message Sent Successfully</h3>
      <p style={{fontSize:"14px",color:"var(--text-muted)",lineHeight:1.7,marginBottom:"28px"}}>Thank you, {form.name}. A member of our team will respond to your enquiry within 2–3 business days.</p>
      <button onClick={()=>{setSent(false);setForm({name:"",email:"",company:"",subject:"",message:""});}} className="btn-primary" style={{border:"none"}}>
        Send Another Message
      </button>
    </motion.div>
  );

  return(
    <form onSubmit={handleSubmit} style={{padding:"44px 40px"}}>
      <div className="contact-field-row" style={{marginBottom:"18px"}}>
        <Field label="Full Name" required><input type="text" value={form.name} onChange={set("name")} placeholder="Abdul Samad" required style={inputBase} onFocus={onFocus} onBlur={onBlur}/></Field>
        <Field label="Email Address" required><input type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" required style={inputBase} onFocus={onFocus} onBlur={onBlur}/></Field>
      </div>
      <div className="contact-field-row" style={{marginBottom:"18px"}}>
        <Field label="Company / Organisation"><input type="text" value={form.company} onChange={set("company")} placeholder="Your company name" style={inputBase} onFocus={onFocus} onBlur={onBlur}/></Field>
        <Field label="Subject" required>
          <div style={{position:"relative"}}>
            <select value={form.subject} onChange={set("subject")} required
              style={{...inputBase,appearance:"none",WebkitAppearance:"none",cursor:"pointer",paddingRight:"36px",color:form.subject?"var(--text-base)":"var(--text-muted)"}}>
              <option value="">Select a topic</option>
              <option>General Enquiry</option><option>Investor Relations</option><option>Media &amp; Press</option>
              <option>Careers &amp; Recruitment</option><option>Business Partnerships</option><option>Sustainability &amp; ESG</option><option>Corporate Governance</option>
            </select>
            <svg style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </Field>
      </div>
      <div style={{marginBottom:"24px"}}>
        <Field label="Message" required>
          <textarea value={form.message} onChange={set("message")} placeholder="Tell us how we can help you..." required rows={6} style={{...inputBase,resize:"vertical",lineHeight:1.65}} onFocus={onFocus} onBlur={onBlur}/>
        </Field>
      </div>
      <motion.button type="submit" disabled={sending}
        whileHover={!sending?{scale:1.02}:{}} whileTap={!sending?{scale:0.98}:{}}
        style={{width:"100%",padding:"14px",borderRadius:"9px",background:sending?`${colors.primary}80`:colors.primary,color:"#fff",border:"none",cursor:sending?"default":"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"15px",fontWeight:700,letterSpacing:"0.01em",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"background 0.2s"}}>
        {sending?(<><svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{animation:"spin 0.8s linear infinite"}}><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/><path d="M8 2a6 6 0 016 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg> Sending…</>):(<> Send Message <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>)}
      </motion.button>
      <p style={{fontSize:"11.5px",color:"var(--text-muted)",marginTop:"12px",textAlign:"center",opacity:0.7}}>Your data is protected. We never share your information with third parties.</p>
    </form>
  );
};

const Contact = () => (
  <>
    <PageHero
      eyebrow="Get in Touch"
      heading={<>We'd love to <span style={{color:colors.primary}}>hear from you.</span></>}
      subtext="Whether you're an investor, business partner, media professional, or prospective employee — our team is ready to assist you."
      imageSrc="https://buagroup.com/wp-content/uploads/2024/12/BUA-HQ-Drone-Shots-6-edited-1536x1150-1-1024x767.jpg"
      imageFallback="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
    />

    <section style={{background:"var(--bg-surface)",padding:"56px 0"}}>
      <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 32px"}}>
        <div className="contact-cards">
          {contactCards.map((card,i)=>(
            <motion.a key={card.title} href={card.href} target={card.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
              initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55,ease:[0.22,1,0.36,1],delay:i*0.08}}
              whileHover={{y:-4,boxShadow:`0 20px 44px rgba(0,0,0,0.10)`}}
              className="card"
              style={{display:"block",padding:"28px 26px",textDecoration:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.04)"}}>
              <div style={{width:"44px",height:"44px",borderRadius:"10px",background:`${card.color}12`,display:"flex",alignItems:"center",justifyContent:"center",color:card.color,marginBottom:"16px"}}>{card.icon}</div>
              <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"15px",color:"var(--text-base)",marginBottom:"8px"}}>{card.title}</h3>
              {card.lines.map((line,j)=><p key={j} style={{fontSize:"13px",color:"var(--text-muted)",lineHeight:1.6,marginBottom:"2px"}}>{line}</p>)}
              <p style={{fontSize:"12px",fontWeight:700,color:card.color,marginTop:"14px"}}>{card.cta} →</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>

    <section style={{background:"var(--bg-base)",paddingTop:"80px",paddingBottom:"96px"}}>
      <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 32px"}}>
        <div className="contact-form-grid">
          <motion.div initial={{opacity:0,x:-28}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}
            style={{borderRadius:"20px",overflow:"hidden",background:"var(--bg-card)",border:"1px solid var(--border)",boxShadow:"0 24px 64px rgba(0,0,0,0.08)"}}>
            <div style={{padding:"32px 40px 24px",borderBottom:"1px solid var(--border)",background:`linear-gradient(135deg,${colors.onyx} 0%,#1e2a36 100%)`,position:"relative",overflow:"hidden"}}>
              <div aria-hidden="true" style={{position:"absolute",top:"-30px",right:"-30px",width:"160px",height:"160px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primary}25 0%,transparent 70%)`}}/>
              <span className="eyebrow" style={{color:colors.primary}}>Contact Form</span>
              <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"24px",color:"#fff",letterSpacing:"-0.02em",lineHeight:1.2}}>Send Us a Message</h2>
              <p style={{fontSize:"13px",color:"rgba(255,255,255,0.48)",marginTop:"6px"}}>We'll respond within 2–3 business days.</p>
            </div>
            <ContactForm/>
          </motion.div>

          <motion.div initial={{opacity:0,x:28}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:[0.22,1,0.36,1],delay:0.1}}>
            <span className="eyebrow">Our Offices</span>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(24px,3vw,36px)",color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1.12,marginBottom:"20px"}}>
              Visit BUA Group headquarters or connect with our team directly.
            </h2>
            <p style={{fontSize:"14.5px",color:"var(--text-muted)",lineHeight:1.78,marginBottom:"36px"}}>
              BUA Group maintains corporate offices in both Lagos and Abuja. Our Lagos HQ at BUA Towers, Victoria Island, houses our principal executive team and investor relations function.
            </p>

            <div style={{borderRadius:"14px",overflow:"hidden",marginBottom:"28px",boxShadow:"0 8px 32px rgba(0,0,0,0.08)",border:"1px solid var(--border)"}}>
              <iframe title="BUA Group Lagos Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6!2d3.4203!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53aec4dd92f%3A0x4a00b2c1e956eb8!2sVictoria%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%" height="240" style={{border:"none",display:"block"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              <div style={{padding:"14px 18px",background:"var(--bg-surface)",borderTop:"1px solid var(--border)"}}>
                <p style={{fontSize:"12.5px",fontWeight:600,color:"var(--text-base)",marginBottom:"2px"}}>Lagos HQ — BUA Towers</p>
                <p style={{fontSize:"12px",color:"var(--text-muted)"}}>PC 32, Churchgate Street, Victoria Island, Lagos</p>
              </div>
            </div>

            <div style={{padding:"24px",borderRadius:"12px",background:"var(--bg-surface)",border:"1px solid var(--border)"}}>
              <p style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:"16px"}}>Follow BUA Group</p>
              <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                {[{icon:<LinkedInIcon/>,label:"LinkedIn",href:socialLinks.linkedin,color:"#0077b5"},
                  {icon:<XIcon/>,label:"X",href:socialLinks.x,color:"#000"},
                  {icon:<YouTubeIcon/>,label:"YouTube",href:socialLinks.youtube,color:"#ff0000"}].map(({icon,label,href,color})=>(
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    whileHover={{y:-2,scale:1.06}} transition={{type:"spring",stiffness:400,damping:15}}
                    style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 16px",borderRadius:"8px",background:"var(--bg-card)",border:"1px solid var(--border)",color:"var(--text-muted)",textDecoration:"none",fontSize:"12.5px",fontWeight:600,transition:"border-color 0.2s,color 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.color=color;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-muted)";}}>
                    <span style={{color}}>{icon}</span>{label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  </>
);

export default Contact;
