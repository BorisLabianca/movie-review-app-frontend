import { useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "../hooks";

const ToggleThemeButton = ({ header }) => {
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
      className={
        !header
          ? "text-secondary p-1 rounded bg-white sm:text-2xl text-lg"
          : "dark:text-white text-light-subtle p-1 rounded sm:text-2xl text-lg"
      }
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
