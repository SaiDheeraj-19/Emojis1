import { GoogleGenerativeAI } from '@google/generative-ai';

// Add error handling if VITE_GEMINI_API_KEY is not defined
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Check if we have an API key configured.
export const hasGeminiConfigured = () => !!API_KEY && API_KEY.length > 0;

let genAI = null;
if (hasGeminiConfigured()) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Uses Gemini AI to translate text into an expressive sequence of emojis.
 * @param {string} text - Input text
 * @returns {Promise<string>} The translated emojis
 */
export const geminiTranslateToEmoji = async (text) => {
  if (!hasGeminiConfigured()) {
    throw new Error('Gemini API key is not configured.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `You are an intelligent emoji translator.

Your task is to convert a given sentence into a small set of meaningful emojis that capture the emotion, intent, and key message.

Rules:
1. Focus on meaning, not literal word-by-word translation.
2. Identify:
   - Emotion (happy, sad, excited, confused, etc.)
   - Action (build, launch, talk, learn, etc.)
   - Context (team, product, success, failure, etc.)
3. Output ONLY 3–6 emojis maximum.
4. Do NOT include any words in the output.
5. Do NOT use random or unrelated emojis (e.g., flags unless explicitly mentioned).
6. Avoid repetition and clutter.
7. Prioritize clarity and human-like expression.
8. If multiple meanings exist, choose the most dominant emotion.

Examples:

Input: "I’m excited to build something amazing with my team"
Output: 🤩🚀👨‍💻🤝✨

Input: "I am feeling confused and stuck with this problem"
Output: 😕🧠🧩❓

Input: "We just launched our product successfully"
Output: 🚀📱🎉✅

Now convert the following input into meaningful emojis:

Input: "${text}"
Output:`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini API Error (Text to Emoji):', error);
    throw error;
  }
};

/**
 * Uses Gemini AI to interpret emojis into a meaningful English phrase.
 * @param {string} emojiString - Sequence of emojis
 * @returns {Promise<string>} Text interpretation
 */
export const geminiTranslateToText = async (emojiString) => {
  if (!hasGeminiConfigured()) {
    throw new Error('Gemini API key is not configured.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `You are an intelligent emoji interpreter.

Your task is to convert a sequence of emojis into a complete, natural, human-like sentence.

Rules:
1. Understand the overall meaning, not each emoji separately.
2. Identify:
   - Emotion (happy, excited, sad, confused, etc.)
   - Action (working, building, celebrating, etc.)
   - Context (team, product, life, problem, etc.)
3. Generate ONE clear, grammatically correct sentence.
4. The sentence must feel natural, like something a person would actually say.
5. Do NOT list meanings or explain emojis.
6. Do NOT output multiple sentences.
7. Fill missing context intelligently (make it complete).
8. Keep it concise (10–20 words max).
9. Prioritize the dominant emotion and intent.
10. Avoid robotic or literal translation.

Examples:

Input: 🤩🚀👨💻🤝✨
Output: I'm excited to build something amazing with my team.

Input: 😕🧠🧩❓
Output: I'm feeling confused and trying to figure this out.

Input: 🚀📱🎉✅
Output: We successfully launched our product and it's a big win.

Input: 😩💻🐛
Output: I'm frustrated dealing with this annoying bug in my code.

Now convert the following emoji sequence into a natural sentence:

Input: "${emojiString}"
Output:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini API Error (Emoji to Text):', error);
    throw error;
  }
};
