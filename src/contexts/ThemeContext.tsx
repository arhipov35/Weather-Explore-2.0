import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { colorIcons, ColorIcon } from "../layouts/Header/ThemeSelection/color";
interface ThemeContextType {
  theme: ColorIcon | undefined;
  themeHandler: (theme: string) => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ColorIcon | undefined>(colorIcons[0]);
  
  function themeHandler(theme: string) {
    const themeIcon = colorIcons.find((icon) => icon.description === theme);
    setTheme(themeIcon);
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
    // Видаляємо всі класи тем
    document.body.classList.remove('theme-white', 'theme-black', 'theme-gray', 'theme-higgs');
    
    if (theme) {
      // Додаємо клас теми
      document.body.classList.add(`theme-${theme.description.toLowerCase()}`);
      
      // Встановлюємо колір фону
      if (theme.background) {
        document.body.style.backgroundColor = theme.background; 
      }
    }
  }, [theme]);

  return null;
};