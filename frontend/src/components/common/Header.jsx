import { useContext } from "react";
import { Link } from "react-router-dom";
import ModalContext from "../../utils/context/modalContext";
import UserContext from "../../utils/context/userContext";

const Header = () => {
  const { user, logout, setUser } = useContext(UserContext);
  const { setModal } = useContext(ModalContext);
  const handleLogout = async () => {
    await logout();
    setUser("");
  };
  return (
    <header className="bg-[#a57c48] h-28 text-white fixed top-0 left-0 w-full z-50 px-4 py-2 flex justify-between items-center">
      <Link to="/">
        <div className="logo">
          <h1 className="text-2xl mr-8">Trip Genie</h1>
        </div>
      </Link>
      <nav>
        <ul className="flex items-center">
          <Link to="/about">
            <li className="mr-8">About</li>
          </Link>
          <Link to="/contact">
            <li className="mr-8">Contact</li>
          </Link>

          {user ? (
            <>
              <Link to="/trip">
                <li className="mr-8">Trip</li>
              </Link>
              <li onClick={handleLogout} className="mr-8 cursor-pointer">
                {user}
              </li>
            </>
          ) : (
            <li
              onClick={() => {
                setModal("login");
              }}
              className="mr-8 cursor-pointer"
            >
              Login
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
