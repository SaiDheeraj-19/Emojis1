import React, { useRef } from 'react';
import { Type, Smile, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InputBox = ({ value, onChange, mode, onClear }) => {
  const isTextToEmoji = mode === 'text-to-emoji';
  const textareaRef = useRef(null);

  const focusInput = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div 
      className="glass-card flex flex-col h-[400px] lg:h-[500px] overflow-hidden group cursor-text transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)] relative focus-within:ring-2 focus-within:ring-indigo-500/20"
      onClick={focusInput}
    >
      {/* Premium Header */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-white/50 dark:border-white/5 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 z-10">
        <div className="flex items-center space-x-3 text-xs font-[600] tracking-widest text-slate-500/80 dark:text-slate-400 uppercase">
          {isTextToEmoji ? <Type className="w-4 h-4 text-slate-400" /> : <Smile className="w-4 h-4 text-slate-400" />}
          <span>{isTextToEmoji ? 'Input Text' : 'Input Emojis'}</span>
        </div>
        
        <AnimatePresence>
          {(value || '').length > 0 && (
            <motion.button 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Elegant Textarea */}
      <textarea
        ref={textareaRef}
        className="flex-1 w-full resize-none px-8 py-6 bg-transparent outline-none text-[32px] md:text-[40px] font-[500] leading-[1.3] placeholder:text-slate-300 dark:placeholder:text-slate-700/50 caret-indigo-500"
        placeholder={isTextToEmoji ? "Type something..." : "Drop emojis here 🚀"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
      
      {/* Floating char count */}
      <div className="absolute bottom-6 right-8 text-[11px] font-[600] text-slate-300 dark:text-slate-700 uppercase tracking-widest pointer-events-none transition-opacity duration-300">
        {(value || '').length} characters
      </div>
    </div>
  );
};
