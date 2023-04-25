import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "../../hooks";

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
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
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
        placeholder="Search Movies..."
      />
      <div className="flex items-center space-x-3">
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
        <button
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle border-secondary text-secondary hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
          onClick={() => {
            setShowOptions(true);
          }}
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>
        <CreateOptions
          visible={showOptions}
          onClose={() => {
            setShowOptions(false);
          }}
        />
      </div>
    </div>
  );
};

const CreateOptions = ({ visible, onClose }) => {
  const containerRef = useRef();
  const containerID = "option-container";

  useEffect(() => {
    const handleClose = (event) => {
      if (!visible) return;
      const { parentElement, id } = event.target;
      if (parentElement.id === containerID || id === containerID) return;

      if (containerRef.current) {
        if (!containerRef.current.classList.contains("animate-scale"))
          containerRef.current.classList.add("animate-scale-reverse");
      }
      // containerRef.current.classList.remove("animate-scale");
      // containerRef.current.classList.add("animate-scale-reverse");
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  const handleAnimationEnd = (event) => {
    if (event.target.classList.contains("animate-scale-reverse")) onClose();
    event.target.classList.remove("animate-scale");
  };

  if (!visible) return null;

  return (
    <div
      id={containerID}
      className="absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={handleAnimationEnd}
      ref={containerRef}
    >
      <Option>Add movie</Option>
      <Option>Add actor</Option>
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};
export default Header;
