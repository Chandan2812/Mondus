import { useState, useEffect } from "react";
import { FiMenu, FiBookmark, FiPlus, FiSun, FiMoon } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/mondus.png";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : true; // default to dark
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
    "Chronicle ",
    "Catalogs",
    "Agents",
  ];

  useEffect(() => {
    const googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
    // Check if the script has already been added
    const loadGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    loadGoogleTranslateScript();
  }, []);

  return (
    <>
      <nav className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin w-full fixed top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Mobile View */}
            <div className="flex items-center w-full justify-between md:hidden">
              <img src={logo} alt="Mondus Logo" className="w-1/3" />
              <div className="flex gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-xl text-inherit"
                  title="Toggle Theme"
                >
                  {darkMode ? <FiSun /> : <FiMoon />}
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-inherit text-2xl"
                >
                  <FiMenu />
                </button>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex w-full justify-between items-center">
              {/* Left logo and menu */}
              <div className="flex items-center space-x-4">
                <div className="h-20 pr-6 mr-6 border-r border-gray-600 dark:border-gray-400 flex items-center">
                  <img src={logo} alt="AX Logo" className="h-24" />
                </div>
                <div className="flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      onClick={() => setActiveItem(item)}
                      className={`relative pb-2 text-sm text-inherit transition-colors hover:text-[var(--primary-color)] ${
                        activeItem === item ? "font-light text-md" : ""
                      }`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center space-x-6">
                <FaWhatsapp className="text-[var(--primary-color)] text-2xl cursor-pointer font-light" />
                <a
                  href="#"
                  className="text-sm text-[var(--primary-color)] hover:underline font-light"
                >
                  FOLLOW US
                </a>
                <a
                  href="#"
                  className="text-sm text-[var(--primary-color)] hover:underline font-light"
                >
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
          <div className="md:hidden fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col pl-2 pr-5 pb-4">
            {/* Header with logo and close */}
            <div className="flex justify-between items-center">
              <img src={logo} alt="Mondus Logo" className="w-48" />
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-inherit"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Navigation items */}
            <div className="flex flex-col space-y-4 px-5">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => {
                    setActiveItem(item);
                    setIsOpen(false);
                  }}
                  className="text-lg text-inherit hover:text-[var(--primary-color)] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Bottom row with icons */}
            <div className="flex mt-5 border border-[var(--primary-color)] dark:border-[var(--primary-color)]">
              <div className="w-1/2 flex justify-center items-center border-r border-[var(--primary-color)] py-3">
                <FiPlus className="text-xl text-[var(--primary-color)]" />
              </div>
              <div className="w-1/2 flex justify-center items-center py-3">
                <FiBookmark className="text-xl text-[var(--primary-color)]" />
              </div>
            </div>
          </div>
        )}
      </nav>
      {!isOpen && (
        <div
          id="google_translate_element"
          className="fixed z-[999] right-[90px] top-6 translate-x-0 md:right-[360px] md:top-[22px] md:-translate-x-1/2"
        />
      )}
    </>
  );
};

export default Navbar;
