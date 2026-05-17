import { createContext, useContext, useState } from 'react';
import {
  ACCENTS,
  ACCENT_OPTIONS,
  BASE_COLORS,
  THEMES,
} from '../constants/theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.DARK);
  const [accent, setAccent] = useState(ACCENTS.PLASMA);

  const activeAccent =
    ACCENT_OPTIONS.find(option => option.id === accent) || ACCENT_OPTIONS[0];

  const toggleTheme = () => {
    setTheme(currentTheme =>
      currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    );
  };

  const changeAccent = accentId => {
    setAccent(accentId);
  };

  const colors = {
    ...BASE_COLORS[theme],
    accent: activeAccent.primary,
    pink: activeAccent.secondary,
  };

  const gradientColors = activeAccent.gradient;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accent,
        colors,
        gradientColors,
        toggleTheme,
        changeAccent,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}