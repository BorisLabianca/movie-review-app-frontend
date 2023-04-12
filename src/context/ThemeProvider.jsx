import { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";
const getTheme = () => {
  return localStorage.getItem("theme");
};
const updateTheme = (theme, themeToRemove) => {
  if (themeToRemove) {
    document.documentElement.classList.remove(themeToRemove);
  }
  document.documentElement.classList.add(theme);
  localStorage.setItem("theme", theme);
};

const ThemeProvider = ({ children }) => {
  const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === defaultTheme ? darkTheme : defaultTheme;
    updateTheme(newTheme, currentTheme);
  };

  useEffect(() => {
    const theme = getTheme();
    if (!theme) {
      updateTheme(defaultTheme);
    } else {
      updateTheme(theme);
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
