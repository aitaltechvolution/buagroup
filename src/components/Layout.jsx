import React from "react";
import { motion, useScroll } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { colors } from "../styles/tokens";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDark})`,
        transformOrigin: "0%", scaleX: scrollYProgress, zIndex: 9999,
        boxShadow: `0 0 8px ${colors.primary}80`,
      }}
    />
  );
};

const Layout = ({ children }) => (
  <div style={{
    minHeight: "100vh", display: "flex", flexDirection: "column",
    fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif",
    background: "var(--bg-base)", color: "var(--text-base)", overflowX: "hidden",
    transition: "background 0.35s, color 0.35s",
  }}>
    <ScrollProgress />
    <Header />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
