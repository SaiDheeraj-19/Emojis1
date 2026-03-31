import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ToggleSwitch = ({ mode, toggleMode }) => {
  return (
    <div className="flex flex-col items-center justify-center my-6 lg:my-0 relative group z-30">
      <motion.button
        whileHover={{ scale: 1.15, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={toggleMode}
        className="p-5 rounded-full bg-white dark:bg-black/80 backdrop-blur-xl border border-black/5 dark:border-white/10 text-indigo-500 dark:text-indigo-400 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.25)] transition-shadow duration-500 z-10 hover:text-indigo-600 dark:hover:text-indigo-300 pointer-events-auto"
        title="Switch Translation Direction"
        aria-label="Toggle mode"
      >
        <ArrowLeftRight className="w-6 h-6" strokeWidth={2.5} />
      </motion.button>
      
      {/* Super subtle connection line */}
      <div className="hidden lg:block absolute top-1/2 -left-12 -right-12 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent -translate-y-1/2 -z-0"></div>
    </div>
  );
};
