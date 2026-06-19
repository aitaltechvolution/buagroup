import React from "react";
import PageHero from "../components/PageHero";
import SustainabilityPanel from "../components/SustainabilityPanel";
import { colors } from "../styles/tokens";
const Sustainability = () => (
  <>
    <PageHero
      eyebrow="Sustainability & ESG"
      heading={<>Building industry <span style={{color:colors.primary}}>responsibly.</span></>}
      subtext="Our commitment to sustainable development, innovation, and social impact is embedded in every investment decision across BUA Group and the ASR Africa philanthropic foundation."
      imageSrc="https://buagroup.com/wp-content/uploads/2025/05/DJI_0964_Easy-Resize.com_.jpg"
      imageFallback="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80"
      accent="#22c55e"
      extra={
        <div style={{display:"flex",gap:"28px",flexWrap:"wrap"}}>
          {[{val:"ASR Africa",label:"Philanthropic Foundation"},{val:"She Wins",label:"Women Entrepreneur Programme"},{val:"$4M+",label:"Startup Financing Mobilized"}].map(s=>(
            <div key={s.label}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"22px",color:"#fff",letterSpacing:"-0.02em",lineHeight:1,marginBottom:"4px"}}>{s.val}</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.42)"}}>{s.label}</div>
            </div>
          ))}
        </div>
      }
    />
    <SustainabilityPanel />
  </>
);
export default Sustainability;
