import { useState, useCallback, useEffect } from 'react';
import { translateTextToEmoji, translateEmojiToText } from '../utils/translator';
import { geminiTranslateToEmoji, geminiTranslateToText, hasGeminiConfigured } from '../utils/gemini';

// Simple debounce
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const useTranslation = (initialMode = 'text-to-emoji') => {
  const [mode, setMode] = useState(initialMode); // 'text-to-emoji' | 'emoji-to-text'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  const [useAI, setUseAI] = useState(hasGeminiConfigured());
  
  // Real-time fallback logic
  const handleStaticTranslation = useCallback((text, currentMode) => {
    try {
      if (currentMode === 'text-to-emoji') {
        return translateTextToEmoji(text);
      } else {
        return translateEmojiToText(text);
      }
    } catch (e) {
      console.error(e);
      return '';
    }
  }, []);

  // AI-powered Logic
  const handleAITranslation = useCallback(async (text, currentMode) => {
    if (!text.trim()) return '';
    
    setIsTranslating(true);
    setError(null);
    try {
      let result = '';
      if (currentMode === 'text-to-emoji') {
        result = await geminiTranslateToEmoji(text);
      } else {
        result = await geminiTranslateToText(text);
      }
      return result;
    } catch (err) {
      console.error("AI Translation Failed, falling back to static:", err);
      // Fallback to static mapping
      return handleStaticTranslation(text, currentMode);
    } finally {
      setIsTranslating(false);
    }
  }, [handleStaticTranslation]);

  // Debounced AI call
  // We use this to prevent API spam while typing.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const processAITranslation = useCallback(
    debounce(async (text, currentMode) => {
      const res = await handleAITranslation(text, currentMode);
      setOutput(res);
    }, 800),
    [handleAITranslation]
  );

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setIsTranslating(false);
      return;
    }

    if (useAI && hasGeminiConfigured()) {
      // First, set sync mapping instantly to feel snappy while AI is loading
      setOutput(handleStaticTranslation(input, mode));
      setIsTranslating(true);
      
      // Then fire the debounced AI call
      processAITranslation(input, mode);
    } else {
      // Real-time translation with static maps only
      setOutput(handleStaticTranslation(input, mode));
    }
  }, [input, mode, useAI, handleStaticTranslation, processAITranslation]);

  const toggleMode = () => {
    // When swapping modes, clear the input/output if desired
    // Or invert them (Input becomes Output)!
    setMode((prev) => {
      const newMode = prev === 'text-to-emoji' ? 'emoji-to-text' : 'text-to-emoji';
      
      // Swap input and output for fluidity
      const prevInput = input;
      const prevOutput = output;
      
      setInput(prevOutput);
      setOutput(prevInput);
      return newMode;
    });
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setIsTranslating(false);
  };

  return {
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
    hasGeminiConfigured: hasGeminiConfigured()
  };
};
