import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, Smile, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OutputBox = ({ value, mode, isLoading }) => {
  const isTextToEmoji = mode === 'text-to-emoji';
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  // Magical typing effect
  useEffect(() => {
    if (isLoading || !value) {
      setDisplayedText('');
      return;
    }

    let i = 0;
    let localText = '';
    const tokens = Array.from(value);
    
    const intervalId = setInterval(() => {
      if (i < tokens.length) {
        localText += tokens[i];
        setDisplayedText(localText);
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 10); 

    return () => clearInterval(intervalId);
  }, [value, isLoading]);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card flex flex-col h-[400px] lg:h-[500px] overflow-hidden relative group transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)] bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-white/5 dark:to-transparent">
      
      {/* Premium Header */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-white/50 dark:border-white/5 z-10">
        <div className="flex items-center space-x-3 text-xs font-[600] tracking-widest text-slate-500/80 dark:text-slate-400 uppercase">
          {isTextToEmoji ? <Smile className="w-4 h-4 text-slate-400" /> : <Type className="w-4 h-4 text-slate-400" />}
          <span>{isTextToEmoji ? 'Translation' : 'English Text'}</span>
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="ml-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Exquisite Output Box Content */}
      <div className="flex-1 w-full px-8 py-6 text-[32px] md:text-[40px] font-[500] leading-[1.3] text-slate-800 dark:text-slate-100 overflow-y-auto break-words relative scrollbar-hide">
        {isLoading ? (
          <div className="flex space-x-2.5 items-center mt-2 opacity-50 text-indigo-500/80 dark:text-indigo-400/80">
            <span className="w-3 h-3 rounded-full bg-current animate-bounce delay-75 shadow-[0_0_10px_currentColor]"></span>
            <span className="w-3 h-3 rounded-full bg-current animate-bounce delay-150 shadow-[0_0_10px_currentColor]"></span>
            <span className="w-3 h-3 rounded-full bg-current animate-bounce delay-300 shadow-[0_0_10px_currentColor]"></span>
          </div>
        ) : (
          <motion.span 
            className="whitespace-pre-wrap select-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {displayedText}
          </motion.span>
        )}
        
        {/* Soft empty state */}
        <AnimatePresence>
          {!value && !isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-white/10 text-[24px] font-[400] tracking-wide pointer-events-none select-none p-8 text-center"
            >
              <div className="bg-gradient-to-r from-transparent via-current to-transparent bg-clip-text">
                {isTextToEmoji ? "Waiting for creation" : "Waiting for interpretation"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Copy Button (Apple AirDrop style) */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: value && !isLoading ? 0 : 50, opacity: value && !isLoading ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <button
          onClick={handleCopy}
          disabled={!value || isLoading}
          className={`pointer-events-auto flex items-center justify-center space-x-3 px-6 py-3 rounded-full backdrop-blur-xl border font-semibold text-[13px] tracking-wide uppercase transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
          ${copied 
            ? 'bg-emerald-500/90 text-white border-emerald-400 dark:border-emerald-500 shadow-emerald-500/20' 
            : 'bg-white/80 dark:bg-black/60 text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white border-white/60 dark:border-white/10 hover:shadow-indigo-500/20 hover:scale-105 active:scale-95'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied' : 'Copy Result'}</span>
        </button>
      </motion.div>
    </div>
  );
};
