import logo from "../../assets/logo.png";
import Container from "../Container";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import ToggleThemeButton from "../ToggleThemeButton";

const Navbar = () => {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <ToggleThemeButton header={false} />
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
