import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              GALİPLER YAPI MALZEMELERİ A.Ş.
            </h3>
            <p className="text-gray-300 leading-relaxed">
              1972'den beri güvenin ve kalitenin adresi. İnşaat ve sanayi malzemelerinde uzman çözümler.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://wa.me/905414894821"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">İletişim Bilgileri</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">İçerenköy, Özçelik Sk. No:11, 34752 Ataşehir/İstanbul</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <a href="tel:+905414894821" className="block hover:text-blue-400 transition-colors">
                    +90 541 489 48 21
                  </a>
                  <a href="tel:+902165724340" className="block hover:text-blue-400 transition-colors">
                    +90 216 572 43 40
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@galipleryapi.com" className="text-sm hover:text-blue-400 transition-colors">
                  info@galipleryapi.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              {[
                { name: 'Ana Sayfa', href: '/' },
                { name: 'Hakkımızda', href: '#hakkımızda' },
                { name: 'Ürünlerimiz', href: '/urunler', isRoute: true },
                { name: 'Teslimat', href: '#teslimat' },
                { name: 'İletişim', href: '#iletisim' },
                { name: 'Blog', href: '/blog', isRoute: true },

              ].map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-sm relative group"
                    >
                      <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-sm relative group"
                    >
                      <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Galipler Yapı Malzemeleri A.Ş. | Tüm Hakları Saklıdır.
            </p>
            <p className="text-xs text-gray-500">
              1972'den beri kalite ve güvenin adresi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  