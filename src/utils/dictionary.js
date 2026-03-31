import lib from 'emojilib';

// Base dictionary for absolute primary fallbacks where emojilib might pick weird alternates
export const emojiDict = {
  // Emotions & States
  happy: "😊", sad: "😢", love: "❤️", angry: "😡", party: "🎉", cool: "😎",
  crying: "😭", laugh: "😂", laughing: "🤣", tired: "😫", sleepy: "😴",
  sick: "🤒", surprised: "😲", shocked: "😱", wink: "😉", thinking: "🤔",
  crazy: "🤪", scared: "😨", hot: "🥵", cold: "🥶", fun: "🤩",

  // Actions
  run: "🏃", running: "🏃", walk: "🚶", walking: "🚶", eat: "🍽️", eating: "🍽️",
  drink: "🥤", drinking: "🍻", sleep: "💤", sleeping: "💤", dance: "💃", dancing: "🕺",
  sing: "🎤", singing: "🎶", work: "💼", working: "💻", code: "👨‍💻", coding: "👩‍💻",
  gym: "🏋️", lifting: "🏋️", workout: "💪", exercise: "🚴", hit: "🎯", hitting: "🎯",
  read: "📖", reading: "📖", write: "✍️", writing: "✍️", drive: "🚗", driving: "🚗",
  swim: "🏊", swimming: "🏊", play: "🎮", playing: "🎮", fly: "✈️", flying: "✈️",
  buy: "🛍️", selling: "💰", sell: "💰",

  // Objects & Nature
  dog: "🐶", cat: "🐱", car: "🚗", house: "🏠", home: "🏡", sun: "☀️",
  moon: "🌙", star: "⭐", fire: "🔥", water: "💧", tree: "🌳", flower: "🌸",
  money: "💰", book: "📖", phone: "📱", computer: "💻", coffee: "☕", 
  food: "🍔", pizza: "🍕", music: "🎵", time: "⏳", idea: "💡", world: "🌍",
  peace: "✌️", winner: "🏆", win: "🏆", gift: "🎁", birthday: "🎂",

  // Common concepts & Slang/Internet expressions (stuff emojilib might omit)
  hello: "👋", hi: "👋", hey: "👋", bye: "👋", goodbye: "👋", yes: "✅",
  no: "❌", good: "👍", bad: "👎", perfect: "👌", ok: "👌", pray: "🙏",
  please: "🙏", thanks: "🙏", thank: "🙏", congratulations: "🎊", congrats: "🎊",
  morning: "🌅", night: "🌃", evening: "🌇", afternoon: "🌞",
  wow: "🤯", omg: "😱", bro: "👊", boy: "👦", girl: "👧", man: "👨", woman: "👩",
  bike: "🚲", bicycle: "🚲", ride: "🚴",
  
  // Internet Slang & Profanity often omitted from official unicode specs
  fuck: "🖕", fucking: "🤬", shit: "💩", bullshit: "💩", bitch: "🐕",
  damn: "🤬", ass: "🍑", dick: "🍆", idiot: "🤡", stupid: "🤦", dumb: "🧱",
  lmao: "🤣", lol: "😂", wtf: "🤨", rofl: "🤣", sus: "🤨",
};

// Dynamically augment vocabulary with over 3,000+ words from standard library
// Lib is an object: { '😀': ['grinning', 'face', 'smile'], ... }
for (const emojiChar in lib) {
  const keywords = lib[emojiChar];
  keywords.forEach((word) => {
    const normalized = word.toLowerCase().trim();
    
    // Ignore any emojilib tags that are <= 2 characters to prevent 
    // country ISO codes (to, my, in, io, is, do) from destroying common grammar.
    if (normalized.length <= 2) return;

    if (!normalized.includes(' ') && !emojiDict[normalized]) {
      emojiDict[normalized] = emojiChar;
    }
    // Handle plural creation passively
    if (!normalized.endsWith('s') && !emojiDict[normalized + 's']) {
      emojiDict[normalized + 's'] = emojiChar + emojiChar;
    }
  });
}

// Create a reverse dictionary for Emoji -> Text translation
export const reverseEmojiDict = Object.entries(emojiDict).reduce((acc, [word, emoji]) => {
  if (!acc[emoji]) {
    acc[emoji] = [];
  }
  acc[emoji].push(word);
  return acc;
}, {});
