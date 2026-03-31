import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  const changeTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (isDark ? 'dark' : 'light');
    setTheme(currentTheme);
    changeTheme(currentTheme);
  }, []);

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    changeTheme(newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      className={`relative flex h-[36px] w-[64px] items-center rounded-full transition-colors duration-500 ease-in-out cursor-pointer p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] ${
        isDark ? 'bg-indigo-500 justify-end' : 'bg-slate-200 justify-start'
      } border border-black/5 dark:border-white/10`}
      aria-label="Toggle dark mode"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
      >
        <AnimateIcon isDark={isDark} />
      </motion.div>
    </button>
  );
};

const AnimateIcon = ({ isDark }) => (
  <motion.div
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {isDark ? (
      <Moon className="h-[14px] w-[14px] text-indigo-500 flex-shrink-0" strokeWidth={2.5} />
    ) : (
      <Sun className="h-[14px] w-[14px] text-amber-500 flex-shrink-0" strokeWidth={2.5} />
    )}
  </motion.div>
);
