import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../styles/tokens";
import { publications, CATEGORIES, FISCAL_YEARS } from "../data/investorData";

const categoryStyles = {
  "Financials":       { bg:"rgba(219,234,254,0.5)", text:"#1e40af", darkBg:"rgba(29,78,216,0.15)", darkText:"#93c5fd" },
  "Quarterly Report": { bg:"rgba(254,243,199,0.5)", text:"#92400e", darkBg:"rgba(146,64,14,0.15)", darkText:"#fbbf24" },
  "Interim Report":   { bg:"rgba(254,249,195,0.5)", text:"#854d0e", darkBg:"rgba(133,77,14,0.15)", darkText:"#fde68a" },
  "Annual Report":    { bg:"rgba(237,233,254,0.5)", text:"#5b21b6", darkBg:"rgba(91,33,182,0.15)", darkText:"#c4b5fd" },
  "ESG Report":       { bg:"rgba(220,252,231,0.5)", text:"#166534", darkBg:"rgba(22,101,52,0.15)", darkText:"#86efac" },
  "Governance":       { bg:"rgba(252,231,243,0.5)", text:"#9d174d", darkBg:"rgba(157,23,77,0.15)",  darkText:"#f9a8d4" },
  "Prospectus":       { bg:"rgba(224,242,254,0.5)", text:"#075985", darkBg:"rgba(7,89,133,0.15)",   darkText:"#7dd3fc" },
};

// Slug used to scope the per-category CSS class below.
const slugify = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// The bg/text pair above only covers light mode — darkBg/darkText were
// authored but never wired up, so every category chip stayed in its light
// (washed-out pastel) colours even in dark mode, where the pale tint over a
// near-black card reads as a faint, muddy patch. Generate a `.dark` override
// per category so the brighter darkBg/darkText pairing actually applies.
const categoryStyleCSS = Object.entries(categoryStyles).map(([label, s]) => {
  const slug = slugify(label);
  return `.cat-${slug}{background:${s.bg};color:${s.text};} .dark .cat-${slug}{background:${s.darkBg};color:${s.darkText};}`;
}).join("\n");

const inputStyle = {
  width:"100%", padding:"10px 12px 10px 36px", borderRadius:"8px",
  border:"1px solid var(--border)", background:"var(--bg-surface)",
  fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"13px",
  color:"var(--text-base)", outline:"none",
  transition:"border-color 0.2s, box-shadow 0.2s, background 0.2s",
};
const selectStyle = {
  padding:"10px 36px 10px 14px", borderRadius:"8px",
  border:"1px solid var(--border)", background:"var(--bg-surface)",
  fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"13px",
  color:"var(--text-base)", fontWeight:600, cursor:"pointer",
  outline:"none", appearance:"none", WebkitAppearance:"none",
};

const ControlBar = ({ search, onSearch, year, onYear, category, onCategory, total, filtered: filteredCount }) => (
  <div style={{background:"var(--bg-card)",borderBottom:"1px solid var(--border)",padding:"18px 32px",display:"flex",flexWrap:"wrap",gap:"10px",alignItems:"center",justifyContent:"space-between",position:"sticky",top:"72px",zIndex:40,backdropFilter:"blur(14px)"}}>
    <div style={{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center",flex:1}}>
      <div style={{position:"relative",minWidth:"240px",flex:"1 1 240px"}}>
        <svg style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zM0 6a6 6 0 1110.67 3.75l2.79 2.79a.5.5 0 01-.71.71L10 9.96A6 6 0 010 6z" fill="var(--text-muted)" fillOpacity="0.5" fillRule="evenodd" clipRule="evenodd"/></svg>
        <input type="text" placeholder="Search reports, filings, circulars…" value={search} onChange={e=>onSearch(e.target.value)}
          style={inputStyle}
          onFocus={e=>{e.target.style.borderColor=colors.primary;e.target.style.boxShadow=`0 0 0 3px rgba(188,26,34,0.12)`;e.target.style.background="var(--bg-card)";}}
          onBlur={e=>{e.target.style.borderColor="var(--border)";e.target.style.boxShadow="none";e.target.style.background="var(--bg-surface)";}}/>
        {search&&<button onClick={()=>onSearch("")} style={{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",display:"flex",padding:0}}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>}
      </div>
      {[{val:year,onChange:onYear,opts:FISCAL_YEARS,toLabel:y=>y==="All Years"?"All Fiscal Years":`FY ${y}`},
        {val:category,onChange:onCategory,opts:CATEGORIES,toLabel:c=>c}].map((sel,i)=>(
        <div key={i} style={{position:"relative"}}>
          <select value={sel.val} onChange={e=>sel.onChange(e.target.value)} style={selectStyle}
            onFocus={e=>e.target.style.borderColor=colors.primary}
            onBlur={e=>e.target.style.borderColor="var(--border)"}>
            {sel.opts.map(o=><option key={o} value={o}>{sel.toLabel(o)}</option>)}
          </select>
          <svg style={{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 3.5l3.5 3.5 3.5-3.5" stroke="var(--text-muted)" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </div>
      ))}
    </div>
    <div style={{fontSize:"12px",color:"var(--text-muted)",whiteSpace:"nowrap",fontWeight:500}}>
      <strong style={{color:"var(--text-base)"}}>{filteredCount}</strong> of <strong style={{color:"var(--text-base)"}}>{total}</strong> documents
    </div>
  </div>
);

const CategoryChip = ({ label }) => {
  const known = categoryStyles[label];
  const fallback = { bg:`${colors.primary}10`, text:colors.primary };
  const s = known || fallback;
  return (
    <span
      className={known ? `cat-${slugify(label)}` : undefined}
      style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:"100px",fontSize:"9.5px",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",whiteSpace:"nowrap", ...(known ? {} : { background:s.bg, color:s.text })}}
    >
      {label}
    </span>
  );
};

const DocumentRow = ({ pub, index }) => {
  const [hovered,setHovered] = useState(false);
  const [downloading,setDownloading] = useState(false);
  return (
    <motion.tr initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:0.3,ease:[0.22,1,0.36,1],delay:index*0.03}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{background:hovered?`${colors.primary}04`:"transparent",transition:"background 0.2s",borderBottom:"1px solid var(--border)"}}>
      <td style={{padding:"0 0 0 24px",width:"28px"}}>
        {pub.featured&&<span title="Featured" style={{color:colors.primary,fontSize:"12px"}}>★</span>}
      </td>
      <td style={{padding:"16px 16px 16px 8px"}}>
        <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"13.5px",color:hovered?colors.primary:"var(--text-base)",transition:"color 0.2s",lineHeight:1.4,marginBottom:"3px"}}>{pub.title}</div>
        <div style={{fontSize:"11.5px",color:"var(--text-muted)"}}>{pub.entity}</div>
      </td>
      <td style={{padding:"16px",whiteSpace:"nowrap"}}><CategoryChip label={pub.category}/></td>
      <td style={{padding:"16px",whiteSpace:"nowrap"}}><span style={{fontSize:"12.5px",color:"var(--text-muted)",fontWeight:500}}>{pub.date}</span></td>
      <td style={{padding:"16px",whiteSpace:"nowrap"}}>
        <span style={{fontSize:"10.5px",fontWeight:600,color:"var(--text-muted)",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"5px",padding:"3px 8px",display:"inline-flex",alignItems:"center",gap:"4px"}}>
          📄 {pub.size} {pub.format}
        </span>
      </td>
      <td style={{padding:"16px 24px 16px 16px",textAlign:"right"}}>
        <button onClick={()=>{setDownloading(true);setTimeout(()=>setDownloading(false),1800);}} disabled={downloading}
          style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"8px 14px",borderRadius:"7px",border:`1px solid ${hovered?colors.primary:"var(--border)"}`,background:hovered?colors.primary:"transparent",color:hovered?"#fff":"var(--text-muted)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"12px",fontWeight:700,cursor:downloading?"default":"pointer",transition:"all 0.22s",opacity:downloading?0.7:1,whiteSpace:"nowrap"}}>
          {downloading?(
            <><svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{animation:"spin 0.8s linear infinite"}}><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 7"/></svg>Downloading…</>
          ):(
            <>Download Report<svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{transition:"transform 0.2s",transform:hovered?"translateY(2px)":"translateY(0)"}}><path d="M6 1v7M3 6l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>
          )}
        </button>
      </td>
    </motion.tr>
  );
};

const InvestorDashboard = () => {
  const [search,setSearch]     = useState("");
  const [year,setYear]         = useState("All Years");
  const [category,setCategory] = useState("All Categories");

  const filtered = useMemo(()=>publications.filter(p=>{
    const ms = !search||p.title.toLowerCase().includes(search.toLowerCase())||p.entity.toLowerCase().includes(search.toLowerCase())||p.category.toLowerCase().includes(search.toLowerCase());
    const my = year==="All Years"||p.year===year;
    const mc = category==="All Categories"||p.category===category;
    return ms&&my&&mc;
  }),[search,year,category]);

  return(
    <div style={{background:"var(--bg-base)",minHeight:"60vh"}}>
      <ControlBar search={search} onSearch={setSearch} year={year} onYear={setYear} category={category} onCategory={setCategory} total={publications.length} filtered={filtered.length}/>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:"760px"}}>
          <thead>
            <tr style={{borderBottom:`2px solid var(--border)`}}>
              {["","Document Title","Category","Published","File","Action"].map((h,i)=>(
                <th key={i} style={{padding:i===0?"0 0 12px 24px":i===5?"12px 24px 12px 16px":"12px 16px",textAlign:i===5?"right":"left",fontSize:"9.5px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--text-muted)",whiteSpace:"nowrap",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filtered.map((p,i)=><DocumentRow key={p.id} pub={p} index={i}/>)}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length===0&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{textAlign:"center",padding:"72px 32px",color:"var(--text-muted)"}}>
            <div style={{fontSize:"40px",marginBottom:"14px"}}>📄</div>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"16px",fontWeight:700,color:"var(--text-base)",marginBottom:"8px"}}>No documents match your filters.</p>
            <p style={{fontSize:"13px",marginBottom:"18px"}}>Try adjusting your search or year selection.</p>
            <button onClick={()=>{setSearch("");setYear("All Years");setCategory("All Categories");}} className="btn-primary" style={{border:"none"}}>Clear All Filters</button>
          </motion.div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}\n${categoryStyleCSS}`}</style>
    </div>
  );
};

export default InvestorDashboard;
