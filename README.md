<div align="center">
  <br />
  <h1>✨ Intelligent Emoji Translator ✨</h1>
  <p>
    <strong>A lightning-fast, AI-powered semantic translator that bridges the gap between human language and emoji expression.</strong>
  </p>
  <br />

  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://deepmind.google/technologies/gemini/"><img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" /></a>
  </p>
</div>

---

<br />

## 🌠 Vision

This project reimagines how we map text to emotions. Built for absolute speed and intelligent context-awareness, the **Emoji Translator** seamlessly converts complex sentences into expressive emoji sequences—and vice-versa—using the Google Gemini Generative AI engine. 

Designed with an ultra-premium, "glassmorphic" interface, the visual aesthetic prioritizes beautiful typography, subtle micro-animations, and fluid layout responsiveness.

## ✨ Features

- 🧠 **AI-Powered Interpretation**: Leverages `gemini-2.5-flash` to gracefully convert slang, metaphors, and complex thoughts into accurate emojis.
- ⚡ **Local Fallback Engine**: Instantly translates basic text-to-emoji mapping with zero latency while AI processes context.
- 🔄 **Bidirectional Translation**: Swap effortlessly between Text → Emoji and Emoji → Text generation.
- 🎨 **Apple-inspired UI/UX**: Built using Tailwind CSS and Framer Motion for buttery-smooth transitons, dynamic glowing gradients, and dark/light modes.
- 📋 **Seamless Clipboard**: Single-click "Airdrop-style" copying for fast sharing.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/SaiDheeraj-19/Emojis1.git
cd Emojis1
```

### 2. Install Dependencies
Make sure you have Node installed, then run:

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables
To unlock the intelligent ✨ Neural translations, you will need a Google Gemini API Key. 
Create a `.env` file in the root directory and add your key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*(If no API key is provided, the app will gracefully degrade to its local dictionary fallback engine).*

### 4. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

---

## 🛠 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Generative AI**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)

---

<div align="center">
  <p>Built with ❤️ and ☕️ for the hackathon.</p>
</div>
