// src/components/Footer.jsx
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">GALİPLER YAPI MALZEMELERİ A.Ş.</h3>
            <p className="text-sm text-gray-300">
              1972'den beri güvenin ve kalitenin adresi. İnşaat ve sanayi malzemelerinde uzman çözümler.
            </p>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold mb-4">İletişim</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>📍 İçerenköy, Özçelik Sk. No:11, 34752 Ataşehir/İstanbul</li>
              <li>📞 +90 541 489 48 21</li>
              <li>📞 +90 216 572 43 40</li>
              <li>✉️ info@galipleryapi.com</li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li><a href="/" className="hover:underline">Ana Sayfa</a></li>
              <li><a href="#ürünlerimiz" className="hover:underline">Ürünler</a></li>
              <li><a href="#hakkımızda" className="hover:underline">Hakkımızda</a></li>
              <li><a href="#iletisim" className="hover:underline">İletişim</a></li>
            </ul>
          </div>
        </div>
  
        <div className="mt-10 text-center text-sm text-gray-500">
          © 2025 Galipler Yapı Malzemeleri A.Ş. | Tüm Hakları Saklıdır.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  