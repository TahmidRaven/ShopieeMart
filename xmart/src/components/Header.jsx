import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret, faHouseChimneyWindow, faGhost, faUserPlus } from '@fortawesome/free-solid-svg-icons';  // Importing the correct icon
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false); // State for signup dropdown

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const toggleSignupDropdown = () => {
    setSignupDropdownOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-800 via-indigo-400 to-indigo-900 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4"> 
        {/* Logo */}
        <Link to="/mart">
          <h1 className="font-bold text-2xl sm:text-3xl text-white flex items-center ml-0">
            <img 
              src="src/assets/shopiee_icon.png" 
              alt="Shopiee Mart Logo" 
              className="w-8 h-8 mr-2" 
            />
            <span className="text-cyan-200">Shopiee</span>
            <span className="text-orange-200">Mart</span>
          </h1>
        </Link>

        {/* Navigation Links and Search Bar */}
        <div className="flex items-center gap-6 ml-4">
          <ul className="flex gap-6">
            {/* Signup Dropdown */}
            <div className="relative text-white cursor-pointer" onClick={toggleSignupDropdown}>
              <span className="hover:text-orange-300 transition-colors flex items-center gap-2">
                <FontAwesomeIcon icon={faUserPlus} className="text-lg" />  
                <span className="hidden sm:inline">Sign Up</span>
              </span>

              {signupDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-indigo-700 transition-colors">
                      <Link to="/signup_admin">Admin</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-indigo-700 transition-colors">
                      <Link to="/signup_seller">Seller</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-indigo-700 transition-colors">
                      <Link to="/signup_supplier">Supplier</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link to="/">
              <li className="text-white hover:text-orange-300 cursor-pointer transition-colors">
                <FontAwesomeIcon icon={faHouseChimneyWindow}  className="text-lg mr-2" />  
                <span className="hidden sm:inline">Home</span>
              </li>
            </Link>
            <Link to="/about">
              <li className="text-white hover:text-orange-300 cursor-pointer transition-colors">
                <FontAwesomeIcon icon={faGhost}  className="text-lg mr-2" />  
                <span className="hidden sm:inline">About</span>
              </li>
            </Link>
            {/* <Link to="/profile">
              {currentUser ? (
                <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
              ) : (
                <li className="text-slate-700 hover:underline">Sign in</li>
              )}
            </Link> */}
          </ul>

          {/* Search Bar */}
          <form className="bg-slate-800 p-3 rounded-lg flex items-center w-24 sm:w-64">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white focus:outline-none w-full placeholder-gray-400"
            />
            <FaSearch className="text-white text-xl" />
          </form>

          {/* Account Dropdown */} 
          <div
            className="relative text-white cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="hover:text-orange-300 transition-colors flex items-center gap-2">
              <FontAwesomeIcon icon={faUserSecret} className="text-lg" />
              <span className="hidden sm:inline">Account</span>
            </span>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-indigo-700 transition-colors">
                    <Link to="/profile">Profile</Link>
                  </li>
                
                  <li className="px-4 py-2 hover:bg-indigo-700 transition-colors">
                    <Link to="/signin">Sign In</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-indigo-700 transition-colors">
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
