import { emojiDict, reverseEmojiDict } from './dictionary';

// Super-fast string distance algorithm to detect typos
const getEditDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i += 1) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, 
        matrix[j - 1][i] + 1, 
        matrix[j - 1][i - 1] + indicator 
      );
    }
  }
  return matrix[b.length][a.length];
};

/**
 * Text to Emoji Translation
 * Converts recognized keywords in a sentence to their corresponding emojis.
 * Mod: The user ONLY wants emojis in the output, so text that fails to map
 * is entirely dropped and discarded from the rendering.
 */
export const translateTextToEmoji = (text) => {
  if (!text) return "";

  const words = text.split(/([\s,.!?]+)/);
  const resultEmojis = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i].trim();
    if (!word) continue;

    // Strip punctuation for matching
    const cleanWord = word.replace(/[^a-zA-Z']/g, '').toLowerCase();
    if (!cleanWord) continue;

    let matchedEmoji = null;

    // 0. Explicit Exception
    if (cleanWord === "i'm" || cleanWord === "im") matchedEmoji = "🙋‍♂️";

    // 1. Exact Match
    else if (emojiDict[cleanWord]) matchedEmoji = emojiDict[cleanWord];
    
    // 2. Plurals
    else if (cleanWord.endsWith('s') && emojiDict[cleanWord.slice(0, -1)]) matchedEmoji = emojiDict[cleanWord.slice(0, -1)];
    else if (cleanWord.endsWith('es') && emojiDict[cleanWord.slice(0, -2)]) matchedEmoji = emojiDict[cleanWord.slice(0, -2)];

    // 3. Verbs
    else if (cleanWord.endsWith('ing')) {
      const root1 = cleanWord.slice(0, -3); 
      const root2 = cleanWord.slice(0, -3) + 'e'; 
      const root3 = cleanWord.slice(0, -4); 
      if (emojiDict[root1]) matchedEmoji = emojiDict[root1];
      else if (emojiDict[root2]) matchedEmoji = emojiDict[root2];
      else if (emojiDict[root3]) matchedEmoji = emojiDict[root3];
    }
    else if (cleanWord.endsWith('ed')) {
      if (emojiDict[cleanWord.slice(0, -2)]) matchedEmoji = emojiDict[cleanWord.slice(0, -2)];
      else if (emojiDict[cleanWord.slice(0, -1)]) matchedEmoji = emojiDict[cleanWord.slice(0, -1)];
    }
    else if (cleanWord.endsWith('ly') && emojiDict[cleanWord.slice(0, -2)]) {
      matchedEmoji = emojiDict[cleanWord.slice(0, -2)];
    }

    // 4. Typos / Levenshtein
    if (!matchedEmoji && cleanWord.length >= 5) {
      let closestMatch = null;
      let minDistance = 2; // 1 typo limit
      
      for (const key in emojiDict) {
        if (key.length < 4) continue;
        if (Math.abs(key.length - cleanWord.length) > 1) continue;

        const dist = getEditDistance(cleanWord, key);
        if (dist < minDistance) {
          minDistance = dist;
          closestMatch = key;
        }
      }
      if (closestMatch) {
         matchedEmoji = emojiDict[closestMatch];
      }
    }

    if (matchedEmoji) {
      resultEmojis.push(matchedEmoji);
    }
  }

  return resultEmojis.join(' ');
};

/**
 * Emoji to Text Translation
 */
export const translateEmojiToText = (text) => {
  if (!text) return "";

  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
  
  return text.replace(emojiRegex, (match) => {
    if (reverseEmojiDict[match]) {
      const meaning = reverseEmojiDict[match][0];
      const cleanMeaning = meaning.replace(/_/g, ' ');
      return ` ${cleanMeaning.charAt(0).toUpperCase() + cleanMeaning.slice(1)} `; 
    }
    // If it's a skin tone modifier or ZWJ component with a weird standalone tag, we can optionally ignore it
    // but returning match is safest.
    return match; 
  }).replace(/\s+/g, ' ').trim(); 
};


