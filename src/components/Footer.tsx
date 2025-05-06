import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/mondus.png";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white font-raleway text-sm">
      {/* Top horizontal line */}
      <div className="border-t border-gray-300 dark:border-gray-700 w-full" />

      {/* Logo and CONTACTS Title */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 lg:px-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4">
            <div className="w-16 border-t border-[var(--primary-color)]" />
            <img src={logo} alt="Logo" className="w-44 h-auto object-contain" />
            <div className="w-20 border-t border-[var(--primary-color)]" />
          </div>
        </div>
        <h2 className="text-2xl font-thin mt-10 md:mt-0">CONTACTS</h2>
      </div>

      {/* Mid horizontal line */}
      <div className="md:max-w-7xl mx-auto border-t border-gray-300 dark:border-gray-700 w-full mb-8" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between px-6 sm:px-12 lg:px-6 gap-8 pb-10 font-light dark:font-thin ">
        {/* Left: Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            ["Apartments", "Penthouses", "Villas", "Townhouses"],
            ["Off-Plan", "Catalogs", "Area Guides", "Sell"],
            ["Rent", "Developers", "Reviews"],
            ["Careers", "Contact Us"],
          ].map((group, idx) => (
            <ul key={idx} className="space-y-2">
              {group.map((item, i) => (
                <li
                  key={i}
                  className="cursor-pointer hover:text-[var(--primary-color)] transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Right: Contact Info */}
        <div className="space-y-4 lg:text-right">
          <h3 className="text-lg">Dubai, UAE</h3>
          <p className="text-gray-700 dark:text-gray-200">
            Mondus Group Iris Bay 2402 , Business Bay , Dubai
          </p>
          <div className="flex justify-start lg:justify-end gap-4 pt-2 text-[var(--primary-color)] text-xl">
            <FaEnvelope />
            <FaFacebookF />
            <FaLinkedinIn />
            <FaWhatsapp />
            <FaInstagram />
            <FaYoutube />
          </div>
          <button className="mt-4 border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-2 uppercase tracking-wide hover:bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] hover:text-white dark:hover:text-black hover:font-light transition">
            Call Us
          </button>
        </div>
      </div>

      {/* Footer Bottom Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-6 py-6 text-xs text-gray-600 dark:text-gray-400 flex flex-col sm:flex-row justify-between gap-2">
        <span>Mondus ©2025 All Rights Reserved</span>
        <div className="flex gap-4">
          {["Terms of Use", "Privacy Policy", "Sitemap"].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="cursor-pointer hover:text-[var(--primary-color)] transition"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
