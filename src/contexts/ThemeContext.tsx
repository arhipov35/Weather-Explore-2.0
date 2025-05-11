import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { colorIcons, ColorIcon } from "../layouts/Header/ThemeSelection/color";

interface ThemeContextType {
  theme: ColorIcon | undefined;
  themeHandler: (theme: string) => void;
}


const THEME_STORAGE_KEY = 'weather-explore-theme';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const getInitialTheme = (): ColorIcon | undefined => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      const themeIcon = colorIcons.find((icon) => icon.description === savedTheme);
      return themeIcon || colorIcons[0];
    }
    return colorIcons[0];
  };

  const [theme, setTheme] = useState<ColorIcon | undefined>(getInitialTheme);
  
  function themeHandler(theme: string) {
    const themeIcon = colorIcons.find((icon) => icon.description === theme);
    if (themeIcon) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      setTheme(themeIcon);
    }
  }

  return (
    <>
      <ThemeContext.Provider value={{ theme, themeHandler }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeHandler = () => {
  const { theme } = useTheme(); 

  useEffect(() => {
    document.body.classList.remove('theme-white', 'theme-black', 'theme-gray', 'theme-higgs');
    
    if (theme) {
      document.body.classList.add(`theme-${theme.description.toLowerCase()}`);
      
      if (theme.background) {
        document.body.style.backgroundColor = theme.background; 
      }
    }
  }, [theme]);

  return null;
};