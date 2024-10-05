import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type SidebarSlideProps = {
  children: React.ReactNode;
  isMenuOpen: boolean;
};

const SidebarSlide: React.FC<SidebarSlideProps> = ({ children, isMenuOpen }) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ x: "-100%" }} 
          animate={{ x: isMenuOpen ? 0 : "-100%" }} 
          exit={{ x: "-100%" }} 
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarSlide;
