import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {

    extend: {
      fontFamily: {
        nepali: ['var(--font-nepali)', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          light: '#F5E6E8', // Light maroon tint
          DEFAULT: '#800000', // Deep Maroon
          dark: '#4A0000', // Darker Maroon
        },
        gold: {
          light: '#FDE68A',
          DEFAULT: '#D4AF37', // Metallic Gold
          dark: '#B8860B',
        },
        neutralBase: '#FAFAFA'
      },
    },
  },
  plugins: [],
} satisfies Config;
