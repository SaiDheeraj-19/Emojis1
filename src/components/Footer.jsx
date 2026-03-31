import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full mt-auto pt-16 pb-6 relative z-10 font-sans">
      <div className="flex flex-col items-center justify-center space-y-3">
        <p className="text-[12px] text-slate-400/80 tracking-widest uppercase font-[600]">Emoji Translator</p>
        <p className="text-[13px] text-slate-500/80 max-w-lg text-center leading-relaxed tracking-wide font-light">
          Powered by Lightning-Fast Semantic Dictionary Mapping & Gemini Generative AI.<br/>
          Designed and engineered with precision.
        </p>
      </div>
    </footer>
  );
};
