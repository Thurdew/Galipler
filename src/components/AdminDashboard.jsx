import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, FileText, LogOut, Plus, Pencil, Trash2,
  X, Check, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';

const API = (path, opts = {}) => {
  const token = localStorage.getItem('adminToken');
  return fetch(path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...opts.headers,
    },
  });
};

const EMPTY_PRODUCT = {
  name: '', slug: '', shortDescription: '',
  image: '', category: '',
  metaTitle: '', metaDescription: '',
  paragraphsText: '',
  usageAreasText: '',
};

const EMPTY_POST = {
  title: '', slug: '', excerpt: '', content: '',
  author: '', tags: '', ogImage: '',
  metaTitle: '', metaDescription: '',
};

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Form state
  const [productForm, setProductForm] = useState(null);
  const [postForm, setPostForm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [blogImageUploading, setBlogImageUploading] = useState(false);

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const loadProducts = useCallback(async () => {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  }, []);

  const loadPosts = useCallback(async () => {
    const res = await fetch('/api/blog?page=1');
    const data = await res.json();
    setPosts(data.posts || []);
  }, []);

  useEffect(() => {
    checkAuth();
    Promise.all([loadProducts(), loadPosts()]).finally(() => setLoading(false));
  }, [checkAuth, loadProducts, loadPosts]);

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // ---- Products ----
  const openProductForm = (product = null) => {
    setEditingId(product?.id || null);
    if (product) {
      setProductForm({
        ...product,
        paragraphsText: (product.paragraphs || []).join('\n\n'),
        usageAreasText: (product.usageAreas || []).join('\n'),
      });
    } else {
      setProductForm({ ...EMPTY_PRODUCT });
    }
  };

  const closeProductForm = () => { setProductForm(null); setEditingId(null); setImageUploading(false); };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('adminToken');
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (res.ok) {
      const { path } = await res.json();
      setProductForm((f) => ({ ...f, image: path }));
    } else {
      showToast('Görsel yüklenemedi', false);
    }
    setImageUploading(false);
  };

  const saveProduct = async () => {
    const { paragraphsText, usageAreasText, ...rest } = productForm;
    const payload = {
      ...rest,
      paragraphs: paragraphsText
        ? paragraphsText.split('\n\n').map((p) => p.trim()).filter(Boolean)
        : [],
      usageAreas: usageAreasText
        ? usageAreasText.split('\n').map((u) => u.trim()).filter(Boolean)
        : [],
    };
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const res = await API(url, { method, body: JSON.stringify(payload) });
    if (!res.ok) { showToast('Kayıt başarısız', false); return; }
    showToast(editingId ? 'Ürün güncellendi' : 'Ürün eklendi');
    closeProductForm();
    loadProducts();
  };

  const deleteProduct = async (id) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    const res = await API(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) { showToast('Ürün silindi'); loadProducts(); }
    else showToast('Silme başarısız', false);
  };

  // ---- Blog Posts ----
  const openPostForm = (post = null) => {
    setEditingId(post?.id || null);
    setPostForm(
      post
        ? { ...post, tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '') }
        : { ...EMPTY_POST }
    );
  };

  const closePostForm = () => { setPostForm(null); setEditingId(null); setBlogImageUploading(false); };

  const handleBlogImageUpload = async (file) => {
    if (!file) return;
    setBlogImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('adminToken');
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (res.ok) {
      const { path } = await res.json();
      setPostForm((f) => ({ ...f, ogImage: path }));
    } else {
      showToast('Görsel yüklenemedi', false);
    }
    setBlogImageUploading(false);
  };

  const savePost = async () => {
    const payload = {
      ...postForm,
      tags: postForm.tags ? postForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/blog/${editingId}` : '/api/blog';
    const res = await API(url, { method, body: JSON.stringify(payload) });
    if (!res.ok) { showToast('Kayıt başarısız', false); return; }
    showToast(editingId ? 'Yazı güncellendi' : 'Yazı eklendi');
    closePostForm();
    loadPosts();
  };

  const deletePost = async (id) => {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
    const res = await API(`/api/blog/${id}`, { method: 'DELETE' });
    if (res.ok) { showToast('Yazı silindi'); loadPosts(); }
    else showToast('Silme başarısız', false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl text-white font-medium transition-all ${toast.ok ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.ok ? <Check size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Paneli</h1>
            <p className="text-xs text-gray-400">Galipler Yapı Malzemeleri</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut size={16} /> Çıkış
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm w-fit">
          <button
            onClick={() => setTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === 'products'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Package size={16} /> Ürünler ({products.length})
          </button>
          <button
            onClick={() => setTab('blog')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === 'blog'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText size={16} /> Blog Yazıları ({posts.length})
          </button>
        </div>

        {/* Products Tab */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-700">Ürünler</h2>
              <button
                onClick={() => openProductForm()}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold shadow hover:shadow-md transition-all"
              >
                <Plus size={16} /> Yeni Ürün
              </button>
            </div>

            {/* Product Form */}
            {productForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
                <h3 className="font-bold text-gray-700 mb-4">{editingId ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Ürün Adı *">
                    <input
                      value={productForm.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setProductForm((f) => ({
                          ...f, name,
                          slug: f.slug === slugify(f.name) ? slugify(name) : f.slug,
                        }));
                      }}
                      className={inputCls}
                      placeholder="Ferforje"
                    />
                  </Field>
                  <Field label="Slug *">
                    <input
                      value={productForm.slug}
                      onChange={(e) => setProductForm((f) => ({ ...f, slug: e.target.value }))}
                      className={inputCls}
                      placeholder="ferforje"
                    />
                  </Field>
                  <Field label="Kategori">
                    <input
                      value={productForm.category}
                      onChange={(e) => setProductForm((f) => ({ ...f, category: e.target.value }))}
                      className={inputCls}
                      placeholder="Demir Ürünleri"
                    />
                  </Field>
                  <Field label="Ürün Görseli" fullWidth>
                    <div className="flex items-center gap-4">
                      {productForm.image && (
                        <img src={productForm.image} alt="önizleme" className="w-16 h-16 object-cover rounded-xl border border-gray-200 flex-shrink-0" />
                      )}
                      <label className={`flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-blue-300 rounded-xl text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-50 transition ${imageUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                        {imageUploading ? 'Yükleniyor...' : 'Bilgisayardan Seç'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e.target.files[0])}
                        />
                      </label>
                      {productForm.image && (
                        <span className="text-xs text-gray-400 truncate max-w-[160px]">{productForm.image}</span>
                      )}
                    </div>
                  </Field>
                  <Field label="Kısa Açıklama (kart görünümü)" fullWidth>
                    <textarea
                      value={productForm.shortDescription}
                      onChange={(e) => setProductForm((f) => ({ ...f, shortDescription: e.target.value }))}
                      rows={2}
                      className={inputCls}
                      placeholder="Ürün kartında görünen kısa açıklama..."
                    />
                  </Field>
                  <Field label="Detay Sayfası Açıklaması (her paragraf arası 1 boş satır bırak)" fullWidth>
                    <textarea
                      value={productForm.paragraphsText}
                      onChange={(e) => setProductForm((f) => ({ ...f, paragraphsText: e.target.value }))}
                      rows={8}
                      className={inputCls}
                      placeholder={"1. paragraf metni...\n\n2. paragraf metni...\n\n3. paragraf metni..."}
                    />
                  </Field>
                  <Field label="Kullanım Alanları (her satıra bir alan)" fullWidth>
                    <textarea
                      value={productForm.usageAreasText}
                      onChange={(e) => setProductForm((f) => ({ ...f, usageAreasText: e.target.value }))}
                      rows={6}
                      className={inputCls}
                      placeholder={"Kapı ve pencere parmaklıkları\nBahçe çitleri ve kapıları\nBalkon ve teras korkulukları"}
                    />
                  </Field>
                  <Field label="Meta Başlık (SEO)">
                    <input
                      value={productForm.metaTitle}
                      onChange={(e) => setProductForm((f) => ({ ...f, metaTitle: e.target.value }))}
                      className={inputCls}
                      placeholder="Ferforje | Galipler"
                    />
                  </Field>
                  <Field label="Meta Açıklama (SEO)">
                    <input
                      value={productForm.metaDescription}
                      onChange={(e) => setProductForm((f) => ({ ...f, metaDescription: e.target.value }))}
                      className={inputCls}
                      placeholder="Ürün meta açıklaması (max 160 karakter)"
                    />
                  </Field>
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={saveProduct}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold shadow"
                  >
                    <Check size={16} /> Kaydet
                  </button>
                  <button
                    onClick={closeProductForm}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200"
                  >
                    <X size={16} /> İptal
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Görsel</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Ad</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Kategori</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        {p.image
                          ? <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                          : <div className="w-10 h-10 bg-gray-100 rounded-lg" />}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-800">{p.name}</td>
                      <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{p.category}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => openProductForm(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <p className="text-center text-gray-400 py-12">Ürün bulunamadı.</p>
              )}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {tab === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-700">Blog Yazıları</h2>
              <button
                onClick={() => openPostForm()}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold shadow hover:shadow-md transition-all"
              >
                <Plus size={16} /> Yeni Yazı
              </button>
            </div>

            {/* Post Form */}
            {postForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
                <h3 className="font-bold text-gray-700 mb-4">{editingId ? 'Yazı Düzenle' : 'Yeni Yazı Ekle'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Başlık *">
                    <input
                      value={postForm.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setPostForm((f) => ({
                          ...f, title,
                          slug: f.slug === slugify(f.title) ? slugify(title) : f.slug,
                        }));
                      }}
                      className={inputCls}
                      placeholder="Yazı başlığı"
                    />
                  </Field>
                  <Field label="Slug *">
                    <input
                      value={postForm.slug}
                      onChange={(e) => setPostForm((f) => ({ ...f, slug: e.target.value }))}
                      className={inputCls}
                      placeholder="yazi-basligi"
                    />
                  </Field>
                  <Field label="Yazar">
                    <input
                      value={postForm.author}
                      onChange={(e) => setPostForm((f) => ({ ...f, author: e.target.value }))}
                      className={inputCls}
                      placeholder="Ad Soyad"
                    />
                  </Field>
                  <Field label="Etiketler (virgülle ayır)">
                    <input
                      value={postForm.tags}
                      onChange={(e) => setPostForm((f) => ({ ...f, tags: e.target.value }))}
                      className={inputCls}
                      placeholder="inşaat, yapı, sac"
                    />
                  </Field>
                  <Field label="Kapak Görseli">
                    <div className="flex items-center gap-4">
                      {postForm.ogImage && (
                        <img src={postForm.ogImage} alt="önizleme" className="w-16 h-16 object-cover rounded-xl border border-gray-200 flex-shrink-0" />
                      )}
                      <label className={`flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-blue-300 rounded-xl text-sm text-blue-600 font-medium cursor-pointer hover:bg-blue-50 transition ${blogImageUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                        {blogImageUploading ? 'Yükleniyor...' : 'Bilgisayardan Seç'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleBlogImageUpload(e.target.files[0])}
                        />
                      </label>
                      {postForm.ogImage && (
                        <span className="text-xs text-gray-400 truncate max-w-[160px]">{postForm.ogImage}</span>
                      )}
                    </div>
                  </Field>
                  <Field label="Meta Başlık (SEO)">
                    <input
                      value={postForm.metaTitle}
                      onChange={(e) => setPostForm((f) => ({ ...f, metaTitle: e.target.value }))}
                      className={inputCls}
                      placeholder="SEO başlığı | Galipler"
                    />
                  </Field>
                  <Field label="Özet" fullWidth>
                    <textarea
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm((f) => ({ ...f, excerpt: e.target.value }))}
                      rows={2}
                      className={inputCls}
                      placeholder="Kısa özet (blog listesinde görünür)"
                    />
                  </Field>
                  <Field label="Meta Açıklama (SEO)" fullWidth>
                    <input
                      value={postForm.metaDescription}
                      onChange={(e) => setPostForm((f) => ({ ...f, metaDescription: e.target.value }))}
                      className={inputCls}
                      placeholder="SEO meta açıklaması (max 160 karakter)"
                    />
                  </Field>
                  <Field label="İçerik (HTML destekli)" fullWidth>
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm((f) => ({ ...f, content: e.target.value }))}
                      rows={8}
                      className={`${inputCls} font-mono text-xs`}
                      placeholder="<p>Yazı içeriği...</p>"
                    />
                  </Field>
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={savePost}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold shadow"
                  >
                    <Check size={16} /> Kaydet
                  </button>
                  <button
                    onClick={closePostForm}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200"
                  >
                    <X size={16} /> İptal
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow overflow-hidden">
              {posts.length === 0 && (
                <p className="text-center text-gray-400 py-12">Henüz blog yazısı yok.</p>
              )}
              {posts.map((post) => (
                <div key={post.id} className="flex items-start gap-4 px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  {post.ogImage
                    ? <img src={post.ogImage} alt={post.title} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                    : <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {post.author && `${post.author} · `}
                      {post.date && new Date(post.date).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => openPostForm(post)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => deletePost(post.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition';

function Field({ label, children, fullWidth }) {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}
