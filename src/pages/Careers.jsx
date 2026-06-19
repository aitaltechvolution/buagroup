import React from "react";
import PageHero from "../components/PageHero";
import CareersHub from "../components/CareersHub";
import { colors } from "../styles/tokens";
const Careers = () => (
  <>
    <PageHero
      eyebrow="Careers"
      heading={<>Build Africa's <span style={{color:colors.primary}}>Industrial Future.</span></>}
      subtext="Join BUA Group — a dynamic workplace where innovation thrives, contributions are valued, and talent is nurtured for growth and success across Africa."
      imageSrc="https://buagroup.com/wp-content/uploads/2026/03/Untitled-design-2_Easy-Resize.com_2.jpg"
      imageFallback="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
      extra={
        <div style={{display:"flex",gap:"28px",flexWrap:"wrap"}}>
          {[{val:"35,000+",label:"Group Employees"},{val:"6+",label:"Business Divisions"},{val:"36+",label:"Years in Operation"}].map(s=>(
            <div key={s.label}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"24px",color:"#fff",letterSpacing:"-0.025em",lineHeight:1,marginBottom:"3px"}}>{s.val}</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.42)"}}>{s.label}</div>
            </div>
          ))}
        </div>
      }
    />
    <CareersHub />
  </>
);
export default Careers;
