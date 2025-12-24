import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Phone, Mail, MapPin, Truck, Shield, Clock } from 'lucide-react';

const products = [
  { name: 'Ferforje', image: '/images/11.jpg' },
  { name: 'Köşebent', image: '/images/13.jpg' },
  { name: 'Sac', image: '/images/9.jpg' },
  { name: 'İşlemeli Profil', image: '/images/2.jpg' },
  { name: 'Boru', image: '/images/5.jpg' },
  { name: 'I Demiri', image: '/images/14.jpg' },
  { name: 'U Demiri', image: '/images/12.jpg' },
  { name: 'Trapez Sac', image: '/images/4.jpg' },
  { name: 'Elektrot', image: '/images/8.jpg' },
  { name: 'OSB Levha', image: '/images/1.jpg' },
  { name: 'Tekerlek', image: '/images/15.jpeg' },
  { name: 'Makara', image: '/images/6.jpg' },
];

const HomePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setIsModalOpen(false);
  };

  const goPrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const goNext = () => {
    if (selectedIndex < products.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  const selectedProduct = selectedIndex !== null ? products[selectedIndex] : null;

  return (
    <div className="font-sans">

      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/images/bg1.png')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/50 to-purple-900/50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div className="animate-fade-in-up max-w-5xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
              GALİPLER YAPI MALZEMELERİ A.Ş
            </h1>
            <p className="mt-4 text-xl md:text-2xl lg:text-3xl font-light tracking-wide drop-shadow-lg">
              1972'den beri Güvenin ve Kalitenin tek adresi
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a
                href="#ürünlerimiz"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Ürünlerimizi Keşfedin
              </a>
              <a
                href="#iletisim"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                İletişime Geçin
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Kalite Garantisi</h3>
              <p className="text-gray-600">50 yılı aşkın deneyimle en kaliteli ürünler</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600">Tüm Türkiye'ye güvenli kargo hizmeti</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">7/24 Destek</h3>
              <p className="text-gray-600">Her zaman yanınızdayız</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white text-gray-800 px-6 md:px-20" id="hakkımızda">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Hakkımızda
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-center max-w-3xl mx-auto">
            1972 yılında kurulan firmamız, inşaat sektörüne yüksek kaliteli yapı malzemeleri tedarik etmektedir.
            Güvenilirlik, kalite ve müşteri memnuniyetini ilke edinmiş olan Galipler Yapı Malzemeleri A.Ş.,
            sektördeki öncü firmalardan biri olmayı sürdürmektedir.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30" id="ürünlerimiz">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              ÜRÜNLERİMİZ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Geniş ürün yelpazemizle her türlü inşaat ve sanayi ihtiyacınıza çözüm sunuyoruz
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="group bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                onClick={() => openModal(index)}
              >
                <div className="w-full aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-center text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X size={28} />
            </button>

            {selectedIndex > 0 && (
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous product"
              >
                <ArrowLeft size={28} />
              </button>
            )}

            {selectedIndex < products.length - 1 && (
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next product"
              >
                <ArrowRight size={28} />
              </button>
            )}

            <div className="p-8">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full max-h-[70vh] object-contain mx-auto rounded-2xl"
                loading="lazy"
              />
              <h2 className="text-center text-3xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {selectedProduct.name}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Section */}
      <section className="py-24 bg-white" id="teslimat">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              KARGO VE TESLİMAT
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Mevcut depolama tesisimiz <span className="font-semibold text-blue-600">İstanbul Ataşehir'de</span> bulunmaktadır. İstanbul dışından verilen siparişlerimiz için mesafeye göre bekleme süresi değişkenlik gösterebilir.
              </p>
              <p className="text-lg leading-relaxed">
                Tüm siparişleriniz titizlikle hazırlanarak en kısa sürede kargoya verilir. Teslimat sürecinde yaşanabilecek gecikmeleri önlemek adına, sizinle sürekli iletişim halinde kalıyoruz.
              </p>
              <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <Truck className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Hızlı ve Güvenli</h3>
                  <p className="text-gray-600">Profesyonel ekibimiz ve güvenilir kargo ortaklarımızla ürünleriniz güvende</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/images/kargo.png"
                alt="Kargo ve Teslimat"
                className="rounded-3xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 px-4 md:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              İLETİŞİM
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="text-lg text-center max-w-3xl mx-auto mt-6 text-gray-700">
              Bizimle iletişime geçmekten çekinmeyin! Sorularınız için e-posta veya telefon numaramız üzerinden bize ulaşabilirsiniz.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Info */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Adres</h3>
                    <p className="text-gray-600">İçerenköy, Özçelik Sk. No:11, 34752 Ataşehir/İstanbul</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Telefon</h3>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <a href="tel:+905414894821" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                          +90 541 489 48 21
                        </a>
                        <span className="text-gray-400">|</span>
                        <a
                          href="https://wa.me/905414894821"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          WhatsApp
                        </a>
                      </div>
                      <a href="tel:+902165724340" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors block">
                        +90 216 572 43 40
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">E-posta</h3>
                    <a href="mailto:info@galipleryapi.com" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                      info@galipleryapi.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-2 rounded-2xl shadow-xl h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753.1560504597555!2d29.109431720127844!3d40.9678107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac6435b8936cf%3A0xc7b7904776eb5321!2sGalipler%20A.%C5%9E.%20Boru-Profil-Sac!5e0!3m2!1str!2str!4v1746636029684!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  className="rounded-xl min-h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Galipler Yapı Malzemeleri Konum"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
</div>
  );
};

export default HomePage;
