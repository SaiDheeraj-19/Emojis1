import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Replace } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full pb-8 md:pb-12 z-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-4 group cursor-pointer"
      >
        <div className="relative p-3 bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl shadow-sm transform group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 overflow-hidden">
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <Replace className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-[700] tracking-tight text-slate-900 dark:text-white leading-none mb-1">
            Emoji Translate
          </h1>
          <div className="flex items-center space-x-1.5 opacity-80 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-[600] text-slate-500 dark:text-slate-400 tracking-widest uppercase">Intelligent Processing</span>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ThemeToggle />
      </motion.div>
    </header>
  );
};
