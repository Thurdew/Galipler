import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
              scrolled ? 'h-40' : 'h-60'
            }`}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 lg:space-x-12 items-center">
          {!isHome && (
            <Link
              to="/"
              className="group relative text-gray-700 font-semibold text-base lg:text-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
            >
              Ana Sayfa
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          )}
          {[
            { label: "Hakkımızda", anchor: "hakkımızda" },
            { label: "Teslimat", anchor: "teslimat" },
            { label: "İletişim", anchor: "iletisim" },
          ].map(({ label, anchor }) => (
            <a
              key={label}
              href={isHome ? `#${anchor}` : `/#${anchor}`}
              className="group relative text-gray-700 font-semibold text-base lg:text-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
          ))}
          <Link
            to="/urunler"
            className={`group relative font-semibold text-base lg:text-lg transition-all duration-300 ${
              location.pathname === '/urunler' || location.pathname.startsWith('/urunler/')
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                : 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            Ürünlerimiz
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full ${location.pathname === '/urunler' || location.pathname.startsWith('/urunler/') ? 'w-full' : 'w-0'}`}></span>
          </Link>
          <Link
            to="/blog"
            className={`group relative font-semibold text-base lg:text-lg transition-all duration-300 ${
              location.pathname.startsWith('/blog')
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                : 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            Blog
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full ${location.pathname.startsWith('/blog') ? 'w-full' : 'w-0'}`}></span>
          </Link>
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
            {!isHome && (
              <Link
                to="/"
                className="block text-gray-700 font-semibold py-3 px-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 border-l-4 border-transparent hover:border-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Ana Sayfa
              </Link>
            )}
            {[
              { label: "Hakkımızda", anchor: "hakkımızda" },
              { label: "Teslimat", anchor: "teslimat" },
              { label: "İletişim", anchor: "iletisim" },
            ].map(({ label, anchor }, index) => (
              <a
                key={label}
                href={isHome ? `#${anchor}` : `/#${anchor}`}
                className="block text-gray-700 font-semibold py-3 px-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 border-l-4 border-transparent hover:border-blue-500"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {label}
              </a>
            ))}
            <Link
              to="/urunler"
              className="block text-gray-700 font-semibold py-3 px-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 border-l-4 border-transparent hover:border-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Ürünlerimiz
            </Link>
            <Link
              to="/blog"
              className="block text-gray-700 font-semibold py-3 px-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 border-l-4 border-transparent hover:border-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
