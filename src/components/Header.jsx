const Header = () => {
    return (
      <header className="bg-gradient-to-r from-white via-gray-100 to-white shadow-lg h-28 hidden md:flex items-center px-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-4">
            <img src="/images/logo.jpg" alt="Logo" className="h-16 w-auto object-contain" />
          </div>
          <nav className="flex space-x-6 items-center">
            <a href="#hakkımızda" className="relative group">
              <span className="text-gray-900 font-semibold">Hakkımızda</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-yellow-500"></span>
            </a>
            <a href="#ürünlerimiz" className="relative group">
              <span className="text-gray-900 font-semibold">Ürünlerimiz</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-yellow-500"></span>
            </a>
            <a href="#teslimat" className="relative group">
              <span className="text-gray-900 font-semibold">Teslimat</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-yellow-500"></span>
            </a>
            <a href="#iletisim" className="relative group">
              <span className="text-gray-900 font-semibold">İletişim</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-yellow-500"></span>
            </a>
          </nav>
          <div className="flex space-x-6 items-center">
            {/* Sosyal medya linkleri */}
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  