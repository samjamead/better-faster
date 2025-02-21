import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-ribbon": {
          "50": "#eef6ff",
          "100": "#d8eaff",
          "200": "#b9daff",
          "300": "#89c4ff",
          "400": "#52a4ff",
          "500": "#2a7eff",
          "600": "#0d58fd",
          "700": "#0c46e9",
          "800": "#1139bc",
          "900": "#143594",
          "950": "#11225a",
        },
        emerald: {
          "50": "#edfcf3",
          "100": "#d3f8e1",
          "200": "#abefc8",
          "300": "#74e1a9",
          "400": "#3dcb86",
          "500": "#19b06c",
          "600": "#0c8f56",
          "700": "#0a7247",
          "800": "#0b5a3a",
          "900": "#0a4a31",
          "950": "#042a1c",
        },

        background: "hsl(var(--background))",
        "background-secondary": "hsl(var(--background-secondary))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        mutedForeground: "var(--muted-foreground)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-inconsolata)", ...fontFamily.mono],
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
