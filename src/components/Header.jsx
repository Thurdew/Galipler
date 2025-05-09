import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md h-28 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-8 md:px-16 h-full max-w-7xl mx-auto">
        {/* Logo sola hizalı */}
        <div className="flex-shrink-0">
          <img
            src="/images/yenilogo.png"
            alt="Logo"
            className="h-44 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation (Hidden in mobile view) */}
        <nav className="hidden md:flex space-x-10">
          {["Hakkımızda", "Ürünlerimiz", "Teslimat", "İletişim"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-800 font-medium hover:text-yellow-600 transition"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Hamburger Menü Button (Mobile View) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-28 left-0 right-0 py-4 text-center">
          <nav>
            {["Hakkımızda", "Ürünlerimiz", "Teslimat", "İletişim"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-800 font-medium py-2 hover:text-yellow-600"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
