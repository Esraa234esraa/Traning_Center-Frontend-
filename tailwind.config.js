import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007489",
        secondary: "#F4A905",
        text_color: "#004F64",
        background: "#12A4B6",
        background_hover: "#0f8b99",
        blue_Medium: "#3BBCD3",
        blue_Light: "#8BD6E3",
        background2: "#e3f0f2",
        foreground: "#000000",
        card: { DEFAULT: "#ffffff", foreground: "#000000" },
        popover: { DEFAULT: "#ffffff", foreground: "#000000" },
        muted: { DEFAULT: "#f3f4f6", foreground: "#6b7280" },
        accent: { DEFAULT: "#facc15", foreground: "#000000" },
        destructive: { DEFAULT: "#ef4444", foreground: "#ffffff" },
        border: "#e5e7eb",
        input: "#f9fafb",
        ring: "#6366f1",
        chart: {
          "1": "#3b82f6",
          "2": "#10b981",
          "3": "#f59e0b",
          "4": "#f97316",
          "5": "#8b5cf6",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: { fadeIn: "fadeIn 1s ease-out" },
      backgroundImage: {
        "hero-pattern": "url('../assets/images/home_background.png')",
      },
      fontFamily: { cairo: ["Cairo", "sans-serif"] },
      fontSize: { baseMobile: "0.8rem", headingMobile: "1.5rem", buttonMobile: "0.75rem" },
      padding: { buttonMobileY: "0.5rem", buttonMobileX: "1.25rem" },
      screens: { "3xl": "1920px" },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [flowbitePlugin, require("tailwindcss-animate")],
  corePlugins: { preflight: true },
};
