import React from "react";
import PageHero from "../components/PageHero";
import InvestorDashboard from "../components/InvestorDashboard";
import { colors } from "../styles/tokens";
const kpis=[{val:"NGX",label:"Listed Exchange"},{val:"BUAFOODS",label:"BUA Foods Ticker"},{val:"BUA-CEMENT",label:"BUA Cement Ticker"},{val:"₦1.77T",label:"BUA Foods FY2025 Revenue"},{val:"₦28",label:"Dividend Per Share FY2025"}];
const Investors = () => (
  <>
    <PageHero
      eyebrow="Investor Relations"
      heading={<>Financial Publications <span style={{color:colors.primary}}>&amp; Reports.</span></>}
      subtext="Access all NGX and SEC regulatory filings, audited financial statements, annual reports, and ESG disclosures for BUA Cement PLC and BUA Foods PLC."
      imageSrc="https://buagroup.com/wp-content/uploads/2025/05/731A9162_Easy-Resize.com_.jpg"
      imageFallback="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80"
      extra={
        <div style={{display:"flex",gap:0,borderRadius:"10px",overflow:"hidden",border:"1px solid rgba(255,255,255,0.07)",width:"fit-content",flexWrap:"wrap"}}>
          {kpis.map((k,i)=>(
            <div key={k.label} style={{padding:"12px 20px",background:"rgba(255,255,255,0.05)",borderRight:i<kpis.length-1?"1px solid rgba(255,255,255,0.07)":"none"}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"15px",color:"#fff",marginBottom:"3px"}}>{k.val}</div>
              <div style={{fontSize:"9.5px",color:"rgba(255,255,255,0.40)"}}>{k.label}</div>
            </div>
          ))}
        </div>
      }
    />
    <InvestorDashboard />
  </>
);
export default Investors;
