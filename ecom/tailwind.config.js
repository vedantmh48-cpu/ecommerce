/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Modern Vibrant Palette
        dark: "#0F172A", // Slate-900 for high-contrast text
        teal: "#0D9488", // Teal-600 vibrant primary
        "teal-light": "#14B8A6", // Teal-500
        "teal-dark": "#0F766E", // Teal-700
        coral: "#F43F5E", // Rose-500 vibrant accent
        "coral-light": "#FB7185", // Rose-400
        "coral-dark": "#E11D48", // Rose-600
        lavender: "#8B5CF6", // Violet-500
        "lavender-light": "#A78BFA", // Violet-400
        amber: "#F59E0B", // Amber-500
        "amber-light": "#FBBF24", // Amber-400
        cream: "#FFF7ED", // Orange-50 warm background
        offwhite: "#F8FAFC", // Slate-50 clean light
        "warm-white": "#FFFBEB", // Amber-50
        "soft-bg": "#F0FDF4", // Emerald-50
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pop": "pop 0.3s ease-out",
        "bounce-in": "bounceIn 0.5s ease-out",
        "wiggle": "wiggle 0.5s ease-in-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-soft": "bounceSoft 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.08)" },
          "70%": { transform: "scale(0.92)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "vibrant": "0 4px 20px rgba(13, 148, 136, 0.2)",
        "vibrant-lg": "0 8px 32px rgba(13, 148, 136, 0.25)",
        "coral": "0 4px 20px rgba(244, 63, 94, 0.2)",
        "coral-lg": "0 8px 32px rgba(244, 63, 94, 0.25)",
        "lavender": "0 4px 20px rgba(139, 92, 246, 0.2)",
        "soft": "0 2px 16px rgba(15, 23, 42, 0.06)",
        "soft-lg": "0 8px 40px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};