import React, { useState } from "react";
import { useTheme } from "@/component/modals/ThemeProvider";
import { themes } from "@/lib/Theme";
import { Palette } from "lucide-react";

// Theme Selector Component
const ThemeSelector = () => {
  const { theme, setTheme, activeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentColors =
    themes[activeTheme as keyof typeof themes]?.colors || themes.light.colors;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${currentColors.button} ${currentColors.textButton} ${currentColors.border}`}
      >
        <Palette size={18} />
        <span className="font-medium">Theme</span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-12 right-0 w-56 rounded-lg border ${currentColors.cardBg} ${currentColors.border} ${currentColors.shadow} z-50`}
        >
          <div className={`p-2 border-b ${currentColors.border}`}>
            <h3 className={`font-semibold ${currentColors.text} px-2 py-1`}>
              เลือกธีมถนอมสายตา
            </h3>
          </div>
          <div className="p-2 space-y-1">
            {Object.entries(themes).map(([key, themeConfig]) => {
              const Icon = themeConfig.icon;
              const isActive = theme === key;

              return (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? `${currentColors.accent} text-white`
                      : `${currentColors.text} hover:bg-gray-100 dark:hover:bg-gray-700`
                  }`}
                >
                  <Icon size={16} />
                  <span className="font-medium">{themeConfig.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
