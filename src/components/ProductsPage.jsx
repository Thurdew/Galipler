import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const FALLBACK = [
  { id: '1',  name: 'Ferforje',        slug: 'ferforje',        image: '/images/11.jpg',   category: 'Demir Ürünleri',      shortDescription: 'Dekoratif ve işlevsel ferforje demir ürünleri.' },
  { id: '2',  name: 'Köşebent',        slug: 'kosebent',        image: '/images/13.jpg',   category: 'Profil Ürünleri',     shortDescription: 'Yapı ve endüstriyel uygulamalar için çelik köşebent profiller.' },
  { id: '3',  name: 'Sac',             slug: 'sac',             image: '/images/9.jpg',    category: 'Sac Ürünleri',        shortDescription: 'Düz ve oluklu sac çeşitleri.' },
  { id: '4',  name: 'İşlemeli Profil', slug: 'islemeli-profil', image: '/images/2.jpg',    category: 'Profil Ürünleri',     shortDescription: 'Özel işlemeli çelik profiller.' },
  { id: '5',  name: 'Boru',            slug: 'boru',            image: '/images/5.jpg',    category: 'Boru Ürünleri',       shortDescription: 'Çelik ve galvaniz boru çeşitleri.' },
  { id: '6',  name: 'I Demiri',        slug: 'i-demiri',        image: '/images/14.jpg',   category: 'Demir Ürünleri',      shortDescription: 'Yüksek dayanımlı I profil demirler.' },
  { id: '7',  name: 'U Demiri',        slug: 'u-demiri',        image: '/images/12.jpg',   category: 'Demir Ürünleri',      shortDescription: 'Endüstriyel U profil çelik ürünler.' },
  { id: '8',  name: 'Trapez Sac',      slug: 'trapez-sac',      image: '/images/4.jpg',    category: 'Sac Ürünleri',        shortDescription: 'Çatı ve cephe kaplama için trapez sac.' },
  { id: '9',  name: 'Elektrot',        slug: 'elektrot',        image: '/images/8.jpg',    category: 'Kaynak Malzemeleri',  shortDescription: 'Kaynak uygulamaları için elektrot çeşitleri.' },
  { id: '10', name: 'OSB Levha',       slug: 'osb-levha',       image: '/images/1.jpg',    category: 'Levha Ürünleri',      shortDescription: 'Yapı ve mobilya için yüksek yoğunluklu OSB levha.' },
  { id: '11', name: 'Tekerlek',        slug: 'tekerlek',        image: '/images/15.jpeg',  category: 'Endüstriyel Ürünler', shortDescription: 'Endüstriyel taşıma ve platform sistemleri için tekerlek.' },
  { id: '12', name: 'Makara',          slug: 'makara',          image: '/images/6.jpg',    category: 'Endüstriyel Ürünler', shortDescription: 'Çelik halat ve kablo sistemleri için makara.' },
];

const ProductsPage = () => {
  const [products, setProducts] = useState(FALLBACK);
  const [activeCategory, setActiveCategory] = useState('Tümü');

  useEffect(() => {
    document.title = 'Ürünlerimiz | Galipler Yapı Malzemeleri';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Ferforje, çelik boru, sac, profil, OSB levha ve daha fazlası. Galipler Yapı Malzemeleri\'nin tüm ürünlerini keşfedin.');

    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length) setProducts(data); })
      .catch(() => {});
  }, []);

  const categories = ['Tümü', ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = activeCategory === 'Tümü' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Ürünlerimiz
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            1972'den bu yana inşaat ve sanayi sektörüne hizmet veren geniş ürün yelpazemizi keşfedin
          </p>
        </div>

        {/* Kategori filtresi */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ürün grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <Link
              key={product.id}
              to={`/urunler/${product.slug}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-blue-500">{product.category}</span>
                <h2 className="text-lg font-bold text-gray-800 mt-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.shortDescription || product.description}
                </p>
                <span className="inline-block mt-3 text-sm font-semibold text-blue-600 group-hover:text-purple-600 transition-colors">
                  Detayları Gör →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-xl font-medium">Bu kategoride ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
