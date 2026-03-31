import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InputBox } from './components/InputBox';
import { OutputBox } from './components/OutputBox';
import { ToggleSwitch } from './components/ToggleSwitch';
import { useTranslation } from './hooks/useTranslation';
import { Sparkles, Activity, Brain } from 'lucide-react';

function App() {
  const {
    mode,
    toggleMode,
    input,
    setInput,
    output,
    isTranslating,
    error,
    clear,
    useAI,
    setUseAI,
    hasGeminiConfigured
  } = useTranslation('text-to-emoji');

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fafafa] dark:bg-[#050505] transition-colors duration-700 font-sans relative overflow-hidden text-slate-900 dark:text-slate-100 selection:bg-indigo-300 dark:selection:bg-indigo-500/40">
      
      {/* Absolute Ambient Apple-Style Mesh Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-indigo-300/30 dark:from-indigo-600/20 to-transparent blur-3xl opacity-70 mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
          className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-radial from-violet-300/30 dark:from-purple-600/20 to-transparent blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
          className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-radial from-cyan-200/30 dark:from-cyan-900/20 to-transparent blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen" 
        />
      </div>

      <div className="z-10 w-full max-w-7xl px-4 sm:px-8 py-8 flex flex-col flex-1 h-full min-h-screen pb-16">
        <Header />

        {/* AI Control Panel - Dynamic & Glassmorphic */}
        <AnimatePresence>
          {hasGeminiConfigured && (
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="w-full max-w-[320px] mx-auto mt-6 mb-12 flex items-center justify-center bg-white/40 dark:bg-white/5 p-1.5 rounded-full backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-sm"
            >
              <button
                onClick={() => setUseAI(false)}
                className={`relative flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full transition-all text-sm font-medium ${
                  !useAI 
                    ? 'text-slate-900 dark:text-white shadow-md bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5' 
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Activity className="w-[18px] h-[18px]" strokeWidth={2.5} />
                <span>Local Engine</span>
              </button>
              <button
                onClick={() => setUseAI(true)}
                className={`relative flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full transition-all text-sm font-medium ${
                  useAI 
                    ? 'text-indigo-600 dark:text-indigo-300 shadow-md bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5' 
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Brain className="w-[18px] h-[18px]" strokeWidth={2.5} />
                <span>AI Neural</span>
              </button>
            </motion.div>
          )}

          {!hasGeminiConfigured && (
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-xl mx-auto my-8 bg-amber-500/10 dark:bg-amber-500/5 backdrop-blur-xl border border-amber-500/20 text-amber-800 dark:text-amber-200 text-sm p-4 rounded-2xl flex items-start space-x-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <Sparkles className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="flex flex-col space-y-1">
                <span className="font-semibold text-amber-900 dark:text-amber-100">AI Upgrade Available</span>
                <span className="opacity-90 leading-relaxed font-light">
                  Add <code className="bg-amber-500/20 px-1.5 py-0.5 rounded-md font-mono text-xs font-semibold">VITE_GEMINI_API_KEY</code> to your `.env` to unlock intelligent Neural translations. Currently running on local fallback engine.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 w-full relative mt-4">
          
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
            className="w-full lg:flex-1 h-full"
          >
            <InputBox 
              value={input} 
              onChange={setInput} 
              mode={mode} 
              onClear={clear}
            />
          </motion.div>

          {/* Toggle Switch Button Wrapper */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
            className="shrink-0 z-20 flex items-center justify-center -my-6 lg:my-0 lg:-mx-6"
          >
            <ToggleSwitch mode={mode} toggleMode={toggleMode} />
          </motion.div>

          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
            className="w-full lg:flex-1 h-full"
          >
            <OutputBox 
              value={output} 
              mode={mode} 
              isLoading={isTranslating} 
            />
          </motion.div>
          
        </main>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 p-4 bg-red-500/10 backdrop-blur-md text-red-600 dark:text-red-400 border border-red-500/20 rounded-2xl text-center font-medium max-w-2xl mx-auto w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              {error.message || "An error occurred during translation"}
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
