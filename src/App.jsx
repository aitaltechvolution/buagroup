import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Layout          from "./components/Layout";
import Home            from "./pages/Home";
import About           from "./pages/About";
import Businesses      from "./pages/Businesses";
import Sustainability  from "./pages/Sustainability";
import Investors       from "./pages/Investors";
import Media           from "./pages/Media";
import Careers         from "./pages/Careers";
import Contact         from "./pages/Contact";
import PlaceholderPage from "./pages/PlaceholderPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
};

const pageVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(3px)" },
  enter:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.26, ease: [0.4, 0, 1, 1] } },
};

const PageTransition = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<PageTransition><Home /></PageTransition>}          />
        <Route path="/about"          element={<PageTransition><About /></PageTransition>}         />
        <Route path="/businesses"     element={<PageTransition><Businesses /></PageTransition>}    />
        <Route path="/sustainability" element={<PageTransition><Sustainability /></PageTransition>} />
        <Route path="/investors"      element={<PageTransition><Investors /></PageTransition>}     />
        <Route path="/media"          element={<PageTransition><Media /></PageTransition>}         />
        <Route path="/careers"        element={<PageTransition><Careers /></PageTransition>}       />
        <Route path="/contact"        element={<PageTransition><Contact /></PageTransition>}       />
        <Route path="/governance"     element={<PageTransition><PlaceholderPage title="Corporate Governance" description="Board composition, charter documents, and our commitment to transparent stewardship." /></PageTransition>} />
        <Route path="/privacy"        element={<PageTransition><PlaceholderPage title="Privacy Policy" description="How BUA Group collects, uses, and protects your personal information." /></PageTransition>} />
        <Route path="/terms"          element={<PageTransition><PlaceholderPage title="Terms of Use" description="Terms and conditions governing use of BUA Group's digital platforms." /></PageTransition>} />
        <Route path="*"               element={<PageTransition><PlaceholderPage title="Page Not Found" description="The page you're looking for doesn't exist or has been moved." /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;
