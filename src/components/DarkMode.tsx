import { ComponentProps, createContext, useEffect, useState } from "react";
export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }: ComponentProps<any>) => {
  const [darkMode, setDarkMode] = useState(() => {
    const localDarkMode = localStorage.getItem("darkTheme");

    if (localDarkMode) {
      return JSON.parse(localDarkMode);
    } else {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkMode));
  }, [darkMode]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
};
