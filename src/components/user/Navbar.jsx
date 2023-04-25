import logo from "../../assets/logo.png";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import Container from "../Container";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import { useState } from "react";

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  const getTheme = () => {
    return localStorage.getItem("theme");
  };
  const [theme, setTheme] = useState(getTheme || "light");
  const handleThemeButton = () => {
    toggleTheme();
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <button
                className="bg-dark-subtle dark:bg-white p-1 rounded"
                onClick={handleThemeButton}
              >
                {theme === "light" ? (
                  <BsMoonFill className="text-secondary size-{24}" />
                ) : (
                  <BsSunFill className="text-secondary size-{24}" />
                )}
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 bg-transparent text-xl rounded outline-none focus:border-white transition text-white"
                placeholder="search..."
              />
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white font-semibold text-lg"
                >
                  Log out
                </button>
              ) : (
                <Link
                  className="text-white font-semibold text-lg"
                  to="/auth/signin"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
