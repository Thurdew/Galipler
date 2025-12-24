import { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg h-20'
          : 'bg-gradient-to-r from-white via-blue-50 to-purple-50 shadow-md h-28'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-16 h-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
          <img
            src="/images/yenilogo.png"
            alt="Galipler Yapı Malzemeleri Logo"
            className={`w-auto object-contain transition-all duration-500 ${
              scrolled ? 'h-16' : 'h-40'
            }`}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 lg:space-x-12">
          {["Hakkımızda", "Ürünlerimiz", "Teslimat", "İletişim"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative text-gray-700 font-semibold text-base lg:text-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
          ))}
        </nav>

        {/* Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-50"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-7 h-7"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg absolute top-full left-0 right-0 border-t border-gray-100 animate-slide-in-left">
          <nav className="py-4">
            {["Hakkımızda", "Ürünlerimiz", "Teslimat", "İletişim"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-700 font-semibold py-3 px-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 border-l-4 border-transparent hover:border-blue-500"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
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
