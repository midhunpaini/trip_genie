import { useState, useContext } from "react"; 
import ModalContext from "../../utils/context/modalContext";
import UserContext from "../../utils/context/userContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout, setUser } = useContext(UserContext);
  const { setModal } = useContext(ModalContext);
  
  const [showDropdown, setShowDropdown] = useState(false); // Add state for dropdown visibility
  
  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem('trips');
  };
  
  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown); // Toggle dropdown visibility
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
              <li
                onClick={toggleDropdown}
                className={`relative mr-8 cursor-pointer ${showDropdown ? "text-black" : ""}`}
                id="user"
              >
                {user}
                {showDropdown && (
                  <ul className="absolute bg-white  w-[150px] rounded mt-2">
                    <Link to='/trip'><li className="px-4 py-2 shadow-md">Start Trip</li></Link>
                    <Link to='/saved_trips'><li className="px-4 py-2 shadow-md">Your Trips</li></Link>
                    <li className="px-4 py-2 shadow-md" onClick={handleLogout}>Logout</li>
                  </ul>
                )}
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

