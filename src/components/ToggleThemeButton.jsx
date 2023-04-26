import { useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "../hooks";

const ToggleThemeButton = () => {
  const { toggleTheme } = useTheme();
  const getTheme = () => {
    return localStorage.getItem("theme");
  };
  const [theme, setTheme] = useState(getTheme || "light");
  const handleThemeButton = () => {
    toggleTheme();
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      className="dark:text-white text-light-subtle p-1 rounded"
      onClick={handleThemeButton}
    >
      {theme === "light" ? (
        <BsMoonFill className="size-{24}" />
      ) : (
        <BsSunFill className="size-{24}" />
      )}
    </button>
  );
};

export default ToggleThemeButton;
