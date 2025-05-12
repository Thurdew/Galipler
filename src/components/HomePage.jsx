import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
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
    <div className="space-y-24 font-sans">

      {/* Giriş */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/images/bg1.png')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">GALİPLER YAPI MALZEMELERİ A.Ş</h1>
            <p className="mt-4 text-xl md:text-2xl">1972'den beri Güvenin ve Kalitenin tek adresi</p>
          </div>
        </div>
      </section>

      {/* Hakkımızda */}
      <section className="py-20 bg-white text-gray-800 px-6 md:px-20" id="hakkımızda">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Hakkımızda</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            1972 yılında kurulan firmamız, inşaat sektörüne yüksek kaliteli yapı malzemeleri tedarik etmektedir.
            Güvenilirlik, kalite ve müşteri memnuniyetini ilke edinmiş olan Galipler Yapı Malzemeleri A.Ş.,
            sektördeki öncü firmalardan biri olmayı sürdürmektedir.
          </p>
        </div>
      </section>

      {/* Ürünlerimiz */}
      <section className="py-20 bg-gray-100" id="ürünlerimiz">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">ÜRÜNLERİMİZ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition duration-300 cursor-pointer hover:scale-105"
                onClick={() => openModal(index)}
              >
                <div className="w-full aspect-[4/3] overflow-hidden rounded">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-center text-gray-700">{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 text-gray-700 hover:text-black text-3xl font-bold focus:outline-none"
              onClick={closeModal}
            >
              <X size={32} />
            </button>

            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <ArrowLeft size={28} />
            </button>

            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <ArrowRight size={28} />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full max-h-[80vh] object-contain mx-auto mt-10"
              loading="lazy"
            />
            <h2 className="text-center text-2xl font-semibold mt-4 mb-6 text-gray-800">{selectedProduct.name}</h2>
          </div>
        </div>
      )}

      {/* Teslimat */}
      <section className="py-20 bg-white" id="teslimat">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">KARGO VE TESLİMAT</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 text-center md:text-left text-gray-700">
              <p className="text-lg mb-4">
                Mevcut depolama tesisimiz İstanbul Ataşehir'de bulunmaktadır. İstanbul dışından verilen siparişlerimiz için mesafeye göre bekleme süresi değişkenlik gösterebilir.
              </p>
              <p>
                Tüm siparişleriniz titizlikle hazırlanarak en kısa sürede kargoya verilir. Teslimat sürecinde yaşanabilecek gecikmeleri önlemek adına, sizinle sürekli iletişim halinde kalıyoruz.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/kargo.png"
                alt="Kargo Görseli"
                className="rounded-xl shadow-lg w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="iletisim" className="py-16 bg-white px-4 md:px-16">
  <h2 className="text-4xl font-bold text-center mb-6">İLETİŞİM</h2>
  <p className="text-lg text-center max-w-3xl mx-auto mb-10 text-gray-700">
    Bizimle iletişime geçmekten çekinmeyin! Sorularınız için e-posta veya telefon numaramız üzerinden bize ulaşabilirsiniz.
  </p>

  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
    {/* İletişim Bilgileri */}
    <div className="w-full md:w-1/2 text-gray-700 space-y-6 text-lg">
      <p className="flex items-start gap-2">
        <MapPin className="text-yellow-600 mt-1" />
        <span><strong>Adres:</strong> İçerenköy, Özçelik Sk. No:11, 34752 Ataşehir/İstanbul</span>
      </p>


       <p className="flex items-start gap-2">
        <Phone className="text-blue-600 mt-1" />
        <span>
          
          <a href="tel:+905414894821" className="text-blue-600 hover:underline">+90 541 489 48 21</a>{' '}
          |{' '}
          <a href="https://wa.me/905414894821" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
            WhatsApp
          </a>
        </span>
      </p>

      <p className="flex items-start gap-2">
        <Phone className="text-blue-600 mt-1" />
        <span>
          <a href="tel:+902165724340" className="text-blue-600 hover:underline">+90 216 572 43 40</a>{' '}
          |{' '}
         
        </span>
      </p>

      

      <p className="flex items-start gap-2">
        <Mail className="text-red-600 mt-1" />
        <span>
          <strong>E-posta:</strong>{' '}
          <a href="mailto:info@galipleryapi.com" className="text-blue-600 hover:underline">info@galipleryapi.com</a>
        </span>
      </p>
    </div>

    {/* Harita */}
    <div className="w-full md:w-1/2 flex justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753.1560504597555!2d29.109431720127844!3d40.9678107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac6435b8936cf%3A0xc7b7904776eb5321!2sGalipler%20A.%C5%9E.%20Boru-Profil-Sac!5e0!3m2!1str!2str!4v1746636029684!5m2!1str!2str"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</section>
</div>
  );
};

export default HomePage;
