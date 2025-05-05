import { useState, useEffect } from "react";
import {
  FiPhone,
  FiMenu,
  FiBookmark,
  FiPlus,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/mondus.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navItems = [
    "Buy",
    "Rent",
    "Sell",
    "Off-Plan",
    "AX Journal",
    "Catalogs",
    "Agents",
    "The AX Way",
  ];

  return (
    <nav className="bg-white dark:bg-black text-black dark:text-white font-raleway w-full fixed top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Mobile View */}
          <div className="flex items-center w-full justify-between md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-inherit text-2xl"
            >
              <FiMenu />
            </button>
            <img src={logo} alt="Mondus Logo" className="h-8" />
            <FiPhone className="text-[#ce9c81] text-xl" />
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex w-full justify-between items-center">
            {/* Left logo and menu */}
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="AX Logo"
                className="w-1/4 border-r border-gray-600 dark:border-gray-400 pr-4"
              />
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm font-light text-inherit hover:text-[#ce9c81] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-6">
              <FaWhatsapp className="text-[#ce9c81] text-xl" />
              <a href="#" className="text-sm text-[#ce9c81] hover:underline">
                FOLLOW US
              </a>
              <a href="#" className="text-sm text-[#ce9c81] hover:underline">
                CALL US
              </a>
              <div className="w-px h-6 bg-gray-400 dark:bg-gray-600"></div>
              <FiPlus className="text-inherit text-xl" />
              <FiBookmark className="text-inherit text-xl" />
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-xl text-inherit transition-colors"
                title="Toggle Theme"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black px-4 py-2 space-y-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="block text-inherit hover:text-[#ce9c81] text-base transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
