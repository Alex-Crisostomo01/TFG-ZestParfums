// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ¡Importante! Aquí le decimos que busque en tus componentes .jsx
  ],
  theme: {
    extend: {
      // Aquí podrías añadir tus colores personalizados como 'primary-pink', etc.
    },
  },
  plugins: [],
}