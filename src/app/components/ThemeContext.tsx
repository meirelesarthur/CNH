import { createContext, useContext, type ReactNode } from "react";

const ThemeContext = createContext({});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

/* ─── Light-only palette ─── */
export const c = {
  bg: "#f0f4f8",
  bgAlt: "#e8eef4",
  bgCard: "#ffffff",
  bgCardHover: "#f8fafc",
  text: "#0b1a2e",
  textMuted: "#5a7a96",
  textFaint: "#94a8be",
  textGhost: "rgba(11,26,46,0.05)",
  accent: "#0891b2",
  accentHover: "#0e7490",
  accentSoft: "rgba(8,145,178,0.08)",
  accentBorder: "rgba(8,145,178,0.20)",
  border: "rgba(11,26,46,0.08)",
  borderHover: "rgba(11,26,46,0.15)",
  glass: "rgba(255,255,255,0.90)",
  shadow: "rgba(11,26,46,0.08)",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  sidebar: "#ffffff",
  sidebarHover: "rgba(8,145,178,0.06)",
  sidebarActive: "rgba(8,145,178,0.12)",
};

export function useColors() {
  return c;
}
