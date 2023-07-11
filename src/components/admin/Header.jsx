import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
// import { useTheme } from "../../hooks";
import ToggleThemeButton from "../ToggleThemeButton";
import AppSearchForm from "../form/AppSearchForm";
import { useNavigate } from "react-router-dom";

const Header = ({ onAddMovieClick, onAddActorClick }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  // const { toggleTheme } = useTheme();

  // const getTheme = () => {
  //   return localStorage.getItem("theme");
  // };
  // const [theme, setTheme] = useState(getTheme || "light");
  // const handleThemeButton = () => {
  //   toggleTheme();
  //   setTheme(theme === "light" ? "dark" : "light");
  // };

  const options = [
    { title: "Add movie", onClick: onAddMovieClick },
    { title: "Add actor", onClick: onAddActorClick },
  ];

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;

    navigate("/search?title=" + query);
  };

  return (
    <div className="flex items-center justify-between relative p-5">
      <AppSearchForm
        placeholder="Search Movies..."
        onSubmit={handleSearchSubmit}
      />
      <div className="flex items-center space-x-3">
        <ToggleThemeButton />
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
          options={options}
          onClose={() => {
            setShowOptions(false);
          }}
        />
      </div>
    </div>
  );
};

const CreateOptions = ({ options, visible, onClose }) => {
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
  const handleClick = (func) => {
    func();
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      id={containerID}
      className="absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale z-50"
      onAnimationEnd={handleAnimationEnd}
      ref={containerRef}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option
            key={title}
            onClick={() => {
              handleClick(onClick);
            }}
          >
            {title}
          </Option>
        );
      })}
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
