import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, MessageCircle } from 'lucide-react';
import productsData from '../../data/products.json';

const WHATSAPP_URL = 'https://wa.me/905414894821';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    const loadFromLocal = () => {
      const prod = productsData.find((p) => p.slug === slug);
      if (!prod) { setNotFound(true); setLoading(false); return; }
      setProduct(prod);
      const sameCategory = productsData.filter((p) => p.id !== prod.id && p.category === prod.category);
      const others = productsData.filter((p) => p.id !== prod.id && p.category !== prod.category);
      setRelated([...sameCategory, ...others].slice(0, 3));
      setLoading(false);
    };

    Promise.all([
      fetch(`/api/products/${slug}`).then((r) => {
        if (!r.ok) throw new Error('not found');
        return r.json();
      }),
      fetch('/api/products').then((r) => r.json()),
    ])
      .then(([prod, all]) => {
        setProduct(prod);
        const sameCategory = all.filter((p) => p.id !== prod.id && p.category === prod.category);
        const others = all.filter((p) => p.id !== prod.id && p.category !== prod.category);
        setRelated([...sameCategory, ...others].slice(0, 3));
      })
      .catch(loadFromLocal)
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    document.title = product.metaTitle || `${product.name} | Galipler Yapı Malzemeleri`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', product.metaDescription || '');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://galipler.com/urunler/${product.slug}`;

    return () => {
      if (canonical && canonical.parentNode) canonical.parentNode.removeChild(canonical);
    };
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="text-center py-32">
        <p className="text-2xl font-bold text-gray-400 mb-4">Ürün bulunamadı</p>
        <Link to="/#ürünlerimiz" className="text-blue-600 hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Ürünlere dön
        </Link>
      </div>
    );
  }

  const paragraphs = product.paragraphs || [product.shortDescription || product.description || ''];
  const usageAreas = product.usageAreas || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: paragraphs[0],
    image: `https://galipler.com${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'Galipler Yapı Malzemeleri A.Ş.',
    },
    offers: {
      '@type': 'Offer',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'TRY',
      seller: {
        '@type': 'Organization',
        name: 'Galipler Yapı Malzemeleri A.Ş.',
        url: 'https://galipler.com',
      },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://galipler.com/' },
      { '@type': 'ListItem', position: 2, name: 'Ürünlerimiz', item: 'https://galipler.com/urunler' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://galipler.com/urunler/${product.slug}` },
    ],
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
            </li>
            <li className="select-none">/</li>
            <li>
              <Link to="/urunler" className="hover:text-blue-600 transition-colors">Ürünlerimiz</Link>
            </li>
            <li className="select-none">/</li>
            <li className="text-gray-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Üst bölüm: görsel + başlık + CTA */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 md:h-96 object-cover"
              loading="eager"
            />
          </div>

          <div className="flex flex-col justify-center gap-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed">{paragraphs[0]}</p>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Merhaba, ${product.name} ürünü hakkında teklif almak istiyorum.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-200 w-fit"
            >
              <MessageCircle size={20} />
              WhatsApp'tan Teklif Al
            </a>
          </div>
        </div>

        {/* Açıklama paragrafları */}
        {paragraphs.length > 1 && (
          <section className="mb-14">
            <div className="prose prose-lg max-w-none space-y-5">
              {paragraphs.slice(1).map((p, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Kullanım alanları */}
        {usageAreas.length > 0 && (
          <section className="mb-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kullanım Alanları</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {usageAreas.map((area) => (
                <li key={area} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Diğer ürünlerimiz */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Diğer Ürünlerimiz</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/urunler/${p.slug}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-blue-500 font-medium">{p.category}</span>
                    <h3 className="text-lg font-bold text-gray-800 mt-1 group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {p.shortDescription || p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
