/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0f",
        teal: "#7c3aed",
        "teal-light": "#a78bfa",
        "teal-dark": "#0a0a0f",
        coral: "#06b6d4",
        "coral-light": "#67e8f9",
        "coral-dark": "#0891b2",
        lavender: "#a78bfa",
        "lavender-light": "#c4b5fd",
        amber: "#06b6d4",
        "amber-light": "#67e8f9",
        cream: "#f1f5f9",
        offwhite: "#f1f5f9",
        "warm-white": "#f1f5f9",
        "soft-bg": "#111118",
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
        "vibrant": "0 4px 24px rgba(124, 58, 237, 0.35)",
        "vibrant-lg": "0 8px 40px rgba(124, 58, 237, 0.5)",
        "coral": "0 4px 24px rgba(6, 182, 212, 0.3)",
        "coral-lg": "0 8px 40px rgba(6, 182, 212, 0.45)",
        "lavender": "0 4px 20px rgba(167, 139, 250, 0.3)",
        "soft": "0 2px 16px rgba(10, 10, 15, 0.4)",
        "soft-lg": "0 8px 40px rgba(10, 10, 15, 0.6)",
      },
    },
  },
  plugins: [],
};