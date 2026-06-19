import React from "react";
import PageHero from "../components/PageHero";
import NewsPortal from "../components/NewsPortal";
import { colors } from "../styles/tokens";
const Media = () => (
  <>
    <PageHero
      eyebrow="Media Hub"
      heading={<>Newsroom &amp; <span style={{color:colors.primary}}>Press Centre.</span></>}
      subtext="The latest press releases, operational updates, ESG milestones, and leadership announcements from BUA Group and its subsidiaries."
      imageSrc="https://buagroup.com/wp-content/uploads/2026/04/ASR-TOS-Press-001.jpeg"
      imageFallback="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
      extra={
        <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 17px",borderRadius:"8px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",width:"fit-content"}}>
          <span style={{fontSize:"13px"}}>✉</span>
          <span style={{fontSize:"12px",color:"rgba(255,255,255,0.52)"}}>Press enquiries: <a href="mailto:info@buagroup.com" style={{color:colors.primary,textDecoration:"none",fontWeight:700}}>info@buagroup.com</a></span>
        </div>
      }
    />
    <NewsPortal />
  </>
);
export default Media;
