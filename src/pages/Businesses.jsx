import React from "react";
import PageHero from "../components/PageHero";
import BusinessPortfolioHub from "../components/BusinessPortfolioHub";
import { colors } from "../styles/tokens";
const Businesses = () => (
  <>
    <PageHero
      eyebrow="Business Portfolio"
      heading={<>Our <span style={{color:colors.primary}}>Subsidiaries.</span></>}
      subtext="BUA Group operates across multiple strategic sectors — providing world-class products and services that enhance daily life, power industries, and drive national development across Africa."
      imageSrc="https://buagroup.com/wp-content/uploads/2025/05/731A9162_Easy-Resize.com_.jpg"
      imageFallback="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80"
    />
    <BusinessPortfolioHub />
  </>
);
export default Businesses;
