import React, { useState, useEffect, createContext, useContext } from "react";

// Theme Context Type
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  activeTheme: string;
  systemTheme: string;
}

// สร้าง Context พร้อมค่า default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("auto");
  const [systemTheme, setSystemTheme] = useState<string>("light");

  // ตรวจสอบ system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // กำหนด active theme
  const getActiveTheme = () => {
    if (theme === "auto") return systemTheme;
    return theme;
  };

  const contextValue = {
    theme,
    setTheme,
    activeTheme: getActiveTheme(),
    systemTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook สำหรับใช้ theme context
const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
