import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { colors, scrollReveal } from "../styles/tokens";
import { articles, NEWS_CATEGORIES } from "../data/mediaData";
import { useScrollDirection } from "../hooks/useScrollDirection";

const CategoryPills = ({ active, onChange }) => (
  <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"36px"}}>
    {NEWS_CATEGORIES.map(cat=>{
      const isActive=active===cat;
      return(
        <motion.button key={cat} onClick={()=>onChange(cat)} aria-pressed={isActive}
          whileHover={{scale:1.04}} whileTap={{scale:0.97}}
          style={{padding:"7px 18px",borderRadius:"100px",border:`1px solid ${isActive?colors.primary:"var(--border)"}`,background:isActive?colors.primary:"transparent",color:isActive?"#fff":"var(--text-muted)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"12.5px",fontWeight:isActive?700:500,cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"}}>
          {cat}
        </motion.button>
      );
    })}
  </div>
);

const FeaturedArticle = ({ article }) => {
  const [hovered,setHovered]=useState(false);
  const [imgErr,setImgErr]=useState(false);
  return(
    <motion.article initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55,ease:[0.22,1,0.36,1]}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      className="news-featured-grid card"
      style={{marginBottom:"32px",cursor:"pointer",border:`1px solid ${hovered?colors.primary+"22":"var(--border)"}`,transition:"box-shadow 0.3s,border-color 0.3s",boxShadow:hovered?"0 24px 52px rgba(0,0,0,0.12)":"0 4px 20px rgba(0,0,0,0.04)"}}>
      <div style={{overflow:"hidden",position:"relative",minHeight:"280px"}}>
        <img src={imgErr?"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80":article.imageSrc} alt={article.title}
          onError={()=>setImgErr(true)}
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block",transform:hovered?"scale(1.05)":"scale(1.0)",transition:"transform 0.65s cubic-bezier(0.22,1,0.36,1)"}}/>
        <div style={{position:"absolute",top:"18px",left:"18px"}}>
          <span style={{padding:"5px 14px",borderRadius:"100px",background:colors.primary,color:"#fff",fontSize:"9.5px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>Featured</span>
        </div>
      </div>
      <div style={{padding:"36px 34px",display:"flex",flexDirection:"column",justifyContent:"center",background:"var(--bg-card)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px",flexWrap:"wrap"}}>
          <span style={{fontSize:"9.5px",fontWeight:700,letterSpacing:"0.10em",textTransform:"uppercase",color:article.categoryColor,background:`${article.categoryColor}14`,border:`1px solid ${article.categoryColor}28`,padding:"3px 10px",borderRadius:"100px"}}>{article.category}</span>
          <span style={{fontSize:"11.5px",color:"var(--text-muted)"}}>{article.date}</span>
        </div>
        <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(17px,2vw,22px)",color:hovered?colors.primary:"var(--text-base)",lineHeight:1.28,letterSpacing:"-0.015em",marginBottom:"14px",transition:"color 0.25s"}}>{article.title}</h2>
        <p style={{fontSize:"13.5px",color:"var(--text-muted)",lineHeight:1.72}}>{article.snippet}</p>
        <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"22px",opacity:hovered?1:0.5,transform:hovered?"translateX(3px)":"translateX(0)",transition:"opacity 0.25s,transform 0.25s"}}>
          <span style={{fontSize:"11.5px",fontWeight:700,color:colors.primary,letterSpacing:"0.04em",textTransform:"uppercase"}}>Read Full Story</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M7 2.5l3.5 3.5L7 9.5" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </motion.article>
  );
};

const ArticleCard = ({ article, index }) => {
  const [hovered,setHovered]=useState(false);
  const [imgErr,setImgErr]=useState(false);
  const dir = useScrollDirection();
  return(
    <motion.article
      {...scrollReveal(dir, { distance: 28, rotate: 3, scale: 0.95, delay: index * 0.06, margin: "-40px" })}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      className="card"
      style={{cursor:"pointer",display:"flex",flexDirection:"column",border:`1px solid ${hovered?colors.primary+"20":"var(--border)"}`,boxShadow:hovered?"0 20px 44px rgba(0,0,0,0.12)":"0 3px 16px rgba(0,0,0,0.04)",transform:hovered?"translateY(-5px)":"translateY(0)",transition:"transform 0.3s,box-shadow 0.3s,border-color 0.3s"}}>
      <div style={{overflow:"hidden",position:"relative",aspectRatio:"16/10",flexShrink:0}}>
        <img src={imgErr?"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=75":article.imageSrc} alt={article.title}
          loading="lazy" onError={()=>setImgErr(true)}
          style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transform:hovered?"scale(1.07)":"scale(1.0)",transition:"transform 0.65s cubic-bezier(0.22,1,0.36,1)"}}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to top,rgba(12,14,18,0.42) 0%,transparent 55%)`,opacity:hovered?0.7:0.35,transition:"opacity 0.3s"}} aria-hidden="true"/>
        <div style={{position:"absolute",bottom:"10px",left:"13px",padding:"3px 9px",borderRadius:"100px",background:"rgba(12,14,18,0.68)",backdropFilter:"blur(5px)",fontSize:"9.5px",fontWeight:600,color:"rgba(255,255,255,0.82)"}}>
          {article.readTime}
        </div>
      </div>
      <div style={{padding:"20px 22px 22px",display:"flex",flexDirection:"column",flex:1,background:"var(--bg-card)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"11px",gap:"8px"}}>
          <span style={{display:"inline-flex",padding:"3px 9px",borderRadius:"100px",fontSize:"9px",fontWeight:700,letterSpacing:"0.10em",textTransform:"uppercase",background:`${article.categoryColor}12`,color:article.categoryColor,border:`1px solid ${article.categoryColor}25`,whiteSpace:"nowrap"}}>{article.category}</span>
          <span style={{fontSize:"11px",color:"var(--text-muted)",whiteSpace:"nowrap"}}>{article.date}</span>
        </div>
        <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"14.5px",color:hovered?colors.primary:"var(--text-base)",lineHeight:1.35,letterSpacing:"-0.01em",marginBottom:"9px",transition:"color 0.25s",flex:"0 0 auto"}}>{article.title}</h3>
        <p style={{fontSize:"12.5px",color:"var(--text-muted)",lineHeight:1.7,flex:1,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{article.snippet}</p>
        <div style={{display:"flex",alignItems:"center",gap:"5px",marginTop:"16px",opacity:hovered?1:0.5,transform:hovered?"translateX(2px)":"translateX(0)",transition:"opacity 0.25s,transform 0.25s"}}>
          <span style={{fontSize:"10.5px",fontWeight:700,color:colors.primary,letterSpacing:"0.06em",textTransform:"uppercase"}}>Read Article</span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M6 2.5l3 3-3 3" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </motion.article>
  );
};

const NewsPortal = () => {
  const [activeCategory,setActiveCategory]=useState("All");
  const featured = articles.find(a=>a.featured);
  const filtered = articles.filter(a=>!a.featured&&(activeCategory==="All"||a.category===activeCategory));
  const dir = useScrollDirection();
  return(
    <section style={{background:"var(--bg-surface)",paddingBottom:"88px"}}>
      <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 32px"}}>
        <motion.div {...scrollReveal(dir, { distance: 24, rotate: 1, scale: 0.98 })} style={{paddingTop:"72px",display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"28px",flexWrap:"wrap",gap:"16px"}}>
          <div>
            <span className="eyebrow">Latest News</span>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(24px,3vw,40px)",color:"var(--text-base)",letterSpacing:"-0.025em",lineHeight:1.1}}>
              Media <span style={{color:colors.primary}}>Newsroom.</span>
            </h2>
          </div>
          <Link to="/media" style={{fontSize:"13px",fontWeight:700,color:colors.primary,textDecoration:"none",display:"flex",alignItems:"center",gap:"5px",transition:"color 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.color=colors.primaryDark}
            onMouseLeave={e=>e.currentTarget.style.color=colors.primary}>
            All stories →
          </Link>
        </motion.div>
        {featured&&<FeaturedArticle article={featured}/>}
        <CategoryPills active={activeCategory} onChange={setActiveCategory}/>
        <div className="news-card-grid">
          {filtered.slice(0,6).map((a,i)=><ArticleCard key={a.id} article={a} index={i}/>)}
        </div>
        {filtered.length===0&&(
          <div style={{textAlign:"center",padding:"60px",color:"var(--text-muted)"}}>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"16px",color:"var(--text-base)",marginBottom:"10px"}}>No articles in this category.</p>
            <button onClick={()=>setActiveCategory("All")} className="btn-primary" style={{border:"none"}}>View All</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsPortal;
