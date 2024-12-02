/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // ใช้ "Inter" แทนฟอนต์ดีฟอลต์
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-green': '#C8FDCB',
        'custom-red': '#FFDDDD',
        'custom-pink': '#FDDDFF',
        'custom-light-pink': '#FFDCF6',
      },
    },
  },
  plugins: [],
};
