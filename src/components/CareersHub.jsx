import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors, scrollReveal } from "../styles/tokens";
import { useScrollDirection } from "../hooks/useScrollDirection";

const TRACKS=[{value:"",label:"Select an operational track"},{value:"engineering",label:"Engineering & Technical Operations"},{value:"supply-chain",label:"Supply Chain & Logistics Management"},{value:"finance",label:"Corporate Finance & Investor Relations"},{value:"operations",label:"Plant Operations & Manufacturing"},{value:"commercial",label:"Commercial & Business Development"},{value:"legal",label:"Legal, Compliance & Governance"},{value:"hr",label:"Human Resources & Talent Development"}];
const LOCATIONS=[{value:"",label:"Preferred location"},{value:"lagos",label:"Lagos — Corporate HQ"},{value:"abuja",label:"Abuja — Government Affairs"},{value:"edo",label:"Edo State — Cement Operations"},{value:"sokoto",label:"Sokoto — Northern Cement Cluster"},{value:"kano",label:"Kano — Food Processing Hub"},{value:"ph",label:"Port Harcourt — Terminal Operations"},{value:"remote",label:"Remote / Flexible"}];

const inputStyle={width:"100%",padding:"12px 16px",borderRadius:"9px",border:"1px solid var(--border)",background:"var(--bg-surface)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"13.5px",color:"var(--text-base)",outline:"none",transition:"border-color 0.2s,box-shadow 0.2s,background 0.2s",boxSizing:"border-box"};
const labelStyle={display:"block",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:"7px"};
const onF=e=>{e.target.style.borderColor=colors.primary;e.target.style.boxShadow=`0 0 0 3px rgba(188,26,34,0.12)`;e.target.style.background="var(--bg-card)";};
const onB=e=>{e.target.style.borderColor="var(--border)";e.target.style.boxShadow="none";e.target.style.background="var(--bg-surface)";};

const FormInput=({label,type="text",placeholder,value,onChange,required})=>(
  <div>
    <label style={labelStyle}>{label}{required&&<span style={{color:colors.primary,marginLeft:"3px"}}>*</span>}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} style={inputStyle} onFocus={onF} onBlur={onB}/>
  </div>
);
const FormSelect=({label,options,value,onChange,required})=>(
  <div>
    <label style={labelStyle}>{label}{required&&<span style={{color:colors.primary,marginLeft:"3px"}}>*</span>}</label>
    <div style={{position:"relative"}}>
      <select value={value} onChange={onChange} required={required} style={{...inputStyle,appearance:"none",WebkitAppearance:"none",cursor:"pointer",paddingRight:"40px",color:value?"var(--text-base)":"var(--text-muted)"}} onFocus={onF} onBlur={onB}>
        {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <svg style={{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
  </div>
);

const FileDropZone=({file,onChange,label})=>{
  const [drag,setDrag]=useState(false);
  const ref=useRef(null);
  const onDrop=useCallback(e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files[0];if(f)onChange(f);},[onChange]);
  return(
    <div>
      <label style={labelStyle}>{label}<span style={{color:colors.primary,marginLeft:"3px"}}>*</span></label>
      <div onClick={()=>ref.current?.click()} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={onDrop}
        style={{border:`2px dashed ${drag?colors.primary:file?`${colors.primary}60`:"var(--border)"}`,borderRadius:"10px",padding:"28px 20px",textAlign:"center",cursor:"pointer",background:drag?`${colors.primary}06`:file?`${colors.primary}04`:"var(--bg-surface)",transition:"border-color 0.2s,background 0.2s"}}
        onMouseEnter={e=>{if(!drag&&!file)e.currentTarget.style.borderColor=`${colors.primary}70`;}}
        onMouseLeave={e=>{if(!drag&&!file)e.currentTarget.style.borderColor="var(--border)";}}>
        <input ref={ref} type="file" accept=".pdf,.doc,.docx" onChange={e=>onChange(e.target.files[0])} style={{display:"none"}} aria-hidden="true"/>
        {file?(
          <div>
            <div style={{fontSize:"28px",marginBottom:"8px"}}>📎</div>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"13px",color:"var(--text-base)",marginBottom:"4px"}}>{file.name}</p>
            <p style={{fontSize:"11px",color:"var(--text-muted)"}}>{(file.size/1024/1024).toFixed(2)} MB · Click to replace</p>
          </div>
        ):(
          <div>
            <div style={{fontSize:"28px",marginBottom:"10px"}}>📄</div>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"13.5px",color:"var(--text-base)",marginBottom:"5px"}}>Drop your CV here or <span style={{color:colors.primary,fontWeight:700}}>browse files</span></p>
            <p style={{fontSize:"11.5px",color:"var(--text-muted)"}}>PDF, DOC or DOCX · Maximum 10 MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

const STEPS=["Personal","Role & Track","CV Upload","Submit"];
const StepIndicator=({current,total,labels})=>(
  <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:"28px"}}>
    {labels.map((label,i)=>(
      <React.Fragment key={i}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}>
          <div style={{width:"28px",height:"28px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:i<=current?colors.primary:"var(--bg-surface)",color:i<=current?"#fff":"var(--text-muted)",fontSize:"12px",fontWeight:700,border:i===current?`2px solid ${colors.primaryDark}`:`2px solid ${i<current?colors.primary:"var(--border)"}`,transition:"all 0.3s"}}>
            {i<current?<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>:i+1}
          </div>
          <span style={{fontSize:"9px",fontWeight:600,color:i<=current?colors.primary:"var(--text-muted)",letterSpacing:"0.04em",whiteSpace:"nowrap"}}>{label}</span>
        </div>
        {i<total-1&&<div style={{flex:1,height:"2px",marginBottom:"16px",background:i<current?colors.primary:"var(--border)",transition:"background 0.3s",minWidth:"20px"}}/>}
      </React.Fragment>
    ))}
  </div>
);

const ApplicationWizard=()=>{
  const [step,setStep]=useState(0);
  const [submitted,setSubmitted]=useState(false);
  const [form,setForm]=useState({firstName:"",lastName:"",email:"",phone:"",track:"",location:"",experience:"",linkedIn:"",coverLetter:"",cvFile:null});
  const set=field=>e=>setForm(f=>({...f,[field]:typeof e==="object"&&e.target?e.target.value:e}));
  const canNext=()=>{if(step===0)return form.firstName&&form.lastName&&form.email;if(step===1)return form.track;if(step===2)return form.cvFile;return true;};

  if(submitted) return(
    <motion.div initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}} transition={{duration:0.45,ease:[0.22,1,0.36,1]}} style={{textAlign:"center",padding:"48px 32px"}}>
      <div style={{width:"72px",height:"72px",borderRadius:"50%",background:`${colors.primary}12`,border:`2px solid ${colors.primary}30`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:"30px"}}>✓</div>
      <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"22px",color:"var(--text-base)",marginBottom:"10px"}}>Application Submitted</h3>
      <p style={{fontSize:"14px",color:"var(--text-muted)",lineHeight:1.7,maxWidth:"340px",margin:"0 auto 28px"}}>Thank you, {form.firstName}. Our team will review your profile and respond within 7 business days.</p>
      <button onClick={()=>{setSubmitted(false);setStep(0);setForm({firstName:"",lastName:"",email:"",phone:"",track:"",location:"",experience:"",linkedIn:"",coverLetter:"",cvFile:null});}} className="btn-primary" style={{border:"none"}}>Submit Another Application</button>
    </motion.div>
  );

  return(
    <div>
      <StepIndicator current={step} total={STEPS.length} labels={STEPS}/>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}} transition={{duration:0.3,ease:[0.22,1,0.36,1]}}>
          {step===0&&(
            <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                <FormInput label="First Name" placeholder="Abdul" value={form.firstName} onChange={set("firstName")} required/>
                <FormInput label="Last Name" placeholder="Rabiu" value={form.lastName} onChange={set("lastName")} required/>
              </div>
              <FormInput label="Email Address" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required/>
              <FormInput label="Phone Number" type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={set("phone")}/>
              <FormInput label="LinkedIn Profile" placeholder="linkedin.com/in/yourprofile" value={form.linkedIn} onChange={set("linkedIn")}/>
            </div>
          )}
          {step===1&&(
            <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
              <FormSelect label="Operational Track" options={TRACKS} value={form.track} onChange={set("track")} required/>
              <FormSelect label="Preferred Location" options={LOCATIONS} value={form.location} onChange={set("location")}/>
              <div>
                <label style={labelStyle}>Years of Experience</label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>
                  {["0–2 yrs","3–5 yrs","6–10 yrs","10+ yrs"].map(opt=>(
                    <button key={opt} type="button" onClick={()=>setForm(f=>({...f,experience:opt}))}
                      style={{padding:"10px 6px",borderRadius:"8px",border:`1px solid ${form.experience===opt?colors.primary:"var(--border)"}`,background:form.experience===opt?`${colors.primary}10`:"var(--bg-surface)",color:form.experience===opt?colors.primary:"var(--text-muted)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"12px",fontWeight:form.experience===opt?700:500,cursor:"pointer",transition:"all 0.18s",textAlign:"center"}}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Cover Letter <span style={{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0}}>(optional)</span></label>
                <textarea placeholder="Tell us why you want to join BUA Group…" value={form.coverLetter} onChange={e=>setForm(f=>({...f,coverLetter:e.target.value}))} rows={5}
                  style={{...inputStyle,resize:"vertical",lineHeight:1.65}} onFocus={onF} onBlur={onB}/>
              </div>
            </div>
          )}
          {step===2&&(
            <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
              <FileDropZone label="CV / Résumé" file={form.cvFile} onChange={f=>setForm(p=>({...p,cvFile:f}))}/>
              <div style={{padding:"14px 18px",borderRadius:"9px",background:`${colors.primary}08`,border:`1px solid ${colors.primary}22`,fontSize:"12px",color:"var(--text-muted)",lineHeight:1.6}}>
                <strong style={{color:"var(--text-base)"}}>Privacy note:</strong> Your CV is processed securely and used exclusively for recruitment evaluation.
              </div>
            </div>
          )}
          {step===3&&(
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div style={{padding:"20px",borderRadius:"10px",background:"var(--bg-surface)",border:"1px solid var(--border)"}}>
                {[["Full Name",`${form.firstName} ${form.lastName}`],["Email",form.email],["Phone",form.phone||"—"],["Track",TRACKS.find(t=>t.value===form.track)?.label||"—"],["Location",LOCATIONS.find(l=>l.value===form.location)?.label||"—"],["Experience",form.experience||"—"],["CV File",form.cvFile?.name||"—"]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)",gap:"16px"}}>
                    <span style={{fontSize:"11px",fontWeight:700,color:"var(--text-muted)",letterSpacing:"0.04em",textTransform:"uppercase",flexShrink:0}}>{k}</span>
                    <span style={{fontSize:"13px",color:"var(--text-base)",fontWeight:500,textAlign:"right"}}>{v}</span>
                  </div>
                ))}
              </div>
              <p style={{fontSize:"11.5px",color:"var(--text-muted)",lineHeight:1.6,textAlign:"center"}}>By submitting, you confirm all information is accurate and consent to BUA Group processing your data for recruitment.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div style={{display:"flex",justifyContent:"space-between",marginTop:"28px",gap:"12px"}}>
        {step>0?(
          <button onClick={()=>setStep(s=>s-1)} style={{padding:"12px 24px",borderRadius:"9px",border:"1px solid var(--border)",background:"transparent",color:"var(--text-muted)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"13.5px",fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--text-base)";e.currentTarget.style.color="var(--text-base)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-muted)";}}>
            ← Back
          </button>
        ):<div/>}
        <motion.button onClick={()=>step<STEPS.length-1?setStep(s=>s+1):setSubmitted(true)} disabled={!canNext()}
          whileHover={canNext()?{scale:1.02}:{}} whileTap={canNext()?{scale:0.98}:{}}
          style={{padding:"12px 32px",borderRadius:"9px",border:"none",background:canNext()?colors.primary:"var(--bg-surface)",color:canNext()?"#fff":"var(--text-muted)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"13.5px",fontWeight:700,cursor:canNext()?"pointer":"not-allowed",transition:"all 0.22s",letterSpacing:"0.01em"}}>
          {step<STEPS.length-1?"Continue →":"Submit Application ✓"}
        </motion.button>
      </div>
    </div>
  );
};

const CareersHub = () => {
  const dir = useScrollDirection();
  return (
  <section style={{paddingTop:"80px",paddingBottom:"96px",position:"relative",overflow:"hidden",
    backgroundImage:"url(https://buagroup.com/wp-content/uploads/2026/03/Untitled-design-2_Easy-Resize.com_2.jpg)",
    backgroundAttachment:"fixed",backgroundSize:"cover",backgroundPosition:"center",
  }}>
    <div style={{position:"absolute",inset:0,background:"rgba(12,14,18,0.93)"}} />
    <div aria-hidden="true" style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.022) 1px,transparent 0)",backgroundSize:"36px 36px"}} />
    <div aria-hidden="true" style={{position:"absolute",bottom:"-80px",right:"-80px",width:"400px",height:"400px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primary}18 0%,transparent 70%)`}} />

    <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 32px",position:"relative",zIndex:1}}>
      <div className="careers-split-grid">
        {/* Left: talent copy */}
        <motion.div {...scrollReveal(dir, { axis: "x", distance: 32, rotate: 2, scale: 0.97, margin: "-60px" })}>
          <span className="eyebrow">Careers at BUA Group</span>
          <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(28px,3vw,46px)",color:"#ffffff",lineHeight:1.1,letterSpacing:"-0.03em",marginBottom:"20px"}}>
            Shape the Future of <span style={{color:colors.primary}}>African Industry.</span>
          </h2>
          <p style={{fontSize:"15px",color:"rgba(255,255,255,0.60)",lineHeight:1.75,marginBottom:"36px",fontWeight:400}}>
            Join an elite, high-execution ecosystem of engineers, industrial operators, and financial strategists driving Africa's structural economic transformation — one plant, one process, one breakthrough at a time.
          </p>
          {[{icon:"⚙️",title:"Industrial Scale",body:"Work on infrastructure and manufacturing systems that directly impact millions of people across the continent."},
            {icon:"📈",title:"Career Acceleration",body:"BUA's Graduate Acceleration Programme has produced over 500 operational leaders in five years."},
            {icon:"🌍",title:"Continental Mission",body:"Every role contributes to a mission bigger than any single company — industrialising Africa from within."}].map(item=>(
            <div key={item.title} style={{display:"flex",gap:"16px",marginBottom:"24px"}}>
              <div style={{width:"44px",height:"44px",borderRadius:"10px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.10)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0}}>{item.icon}</div>
              <div>
                <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"14px",color:"#fff",marginBottom:"4px",letterSpacing:"-0.01em"}}>{item.title}</p>
                <p style={{fontSize:"13px",color:"rgba(255,255,255,0.50)",lineHeight:1.65}}>{item.body}</p>
              </div>
            </div>
          ))}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1px",background:"rgba(255,255,255,0.06)",borderRadius:"12px",overflow:"hidden",marginTop:"40px",border:"1px solid rgba(255,255,255,0.07)"}}>
            {[{val:"35,000+",label:"Employees"},{val:"6",label:"Subsidiaries"},{val:"500+",label:"Grads/Year"}].map(s=>(
              <div key={s.label} style={{padding:"18px 14px",textAlign:"center",background:"rgba(255,255,255,0.03)"}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"20px",color:"#fff",letterSpacing:"-0.025em",marginBottom:"3px"}}>{s.val}</div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,0.40)",fontWeight:500}}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: wizard */}
        <motion.div {...scrollReveal(dir, { axis: "x", distance: -32, rotate: -2, scale: 0.97, delay: 0.08, margin: "-60px" })}>
          <div style={{background:"var(--bg-card)",borderRadius:"18px",padding:"40px 40px 36px",boxShadow:"0 32px 72px rgba(0,0,0,0.28),0 8px 20px rgba(0,0,0,0.12)"}}>
            <div style={{marginBottom:"28px",paddingBottom:"22px",borderBottom:"1px solid var(--border)",background:`linear-gradient(135deg,${colors.onyx} 0%,#1e2a36 100%)`,margin:"-40px -40px 28px",padding:"28px 40px 24px",borderRadius:"18px 18px 0 0",position:"relative",overflow:"hidden"}}>
              <div aria-hidden="true" style={{position:"absolute",top:"-30px",right:"-30px",width:"160px",height:"160px",borderRadius:"50%",background:`radial-gradient(circle,${colors.primary}25 0%,transparent 70%)`}}/>
              <span className="eyebrow" style={{color:colors.primary}}>Application Portal</span>
              <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"22px",color:"#fff",letterSpacing:"-0.02em",lineHeight:1.2}}>Apply to BUA Group</h3>
              <p style={{fontSize:"12.5px",color:"rgba(255,255,255,0.48)",marginTop:"5px"}}>Complete all required fields and upload your CV to proceed.</p>
            </div>
            <ApplicationWizard/>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default CareersHub;
