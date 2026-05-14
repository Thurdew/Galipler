import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: join(__dirname, 'public', 'images'),
    filename: (req, file, cb) => cb(null, Date.now() + extname(file.originalname)),
  }),
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/')),
});

// --- Auth middleware ---
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const expected = Buffer.from(
    `${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`
  ).toString('base64');
  if (token !== expected) return res.status(401).json({ error: 'Yetkisiz erişim' });
  next();
};

// --- DB row ↔ API shape helpers ---
const productToApi = (row) => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  shortDescription: row.short_description,
  paragraphs: row.paragraphs,
  usageAreas: row.usage_areas,
  price: row.price,
  image: row.image,
  category: row.category,
  inStock: row.in_stock,
  metaTitle: row.meta_title,
  metaDescription: row.meta_description,
});

const productToDb = (body) => ({
  name: body.name,
  slug: body.slug,
  short_description: body.shortDescription,
  paragraphs: body.paragraphs,
  usage_areas: body.usageAreas,
  price: body.price ?? 0,
  image: body.image,
  category: body.category,
  in_stock: body.inStock ?? true,
  meta_title: body.metaTitle,
  meta_description: body.metaDescription,
});

const postToApi = (row) => ({
  id: row.id,
  date: row.date,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  content: row.content,
  author: row.author,
  tags: row.tags,
  ogImage: row.og_image,
  metaTitle: row.meta_title,
  metaDescription: row.meta_description,
});

const postToDb = (body) => ({
  title: body.title,
  slug: body.slug,
  excerpt: body.excerpt,
  content: body.content,
  author: body.author,
  tags: body.tags,
  og_image: body.ogImage,
  meta_title: body.metaTitle,
  meta_description: body.metaDescription,
});

// --- Admin login ---
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
  }
});

// --- Image Upload ---
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Dosya yüklenemedi' });
  res.json({ path: `/images/${req.file.filename}` });
});

// --- Products ---
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*').order('id');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map(productToApi));
});

app.get('/api/products/:slug', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', req.params.slug)
    .single();
  if (error) return res.status(404).json({ error: 'Ürün bulunamadı' });
  res.json(productToApi(data));
});

app.post('/api/products', requireAuth, async (req, res) => {
  const row = { id: Date.now().toString(), ...productToDb(req.body) };
  const { data, error } = await supabase.from('products').insert(row).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(productToApi(data));
});

app.put('/api/products/:id', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .update(productToDb(req.body))
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(404).json({ error: 'Ürün bulunamadı' });
  res.json(productToApi(data));
});

app.delete('/api/products/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('products').delete().eq('id', req.params.id);
  if (error) return res.status(404).json({ error: 'Ürün bulunamadı' });
  res.json({ success: true });
});

// --- Blog ---
app.get('/api/blog', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const start = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .order('date', { ascending: false })
    .range(start, start + limit - 1);

  if (error) return res.status(500).json({ error: error.message });
  res.json({
    posts: data.map(postToApi),
    total: count,
    pages: Math.ceil(count / limit),
  });
});

app.get('/api/blog/:slug', async (req, res) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', req.params.slug)
    .single();
  if (error) return res.status(404).json({ error: 'Yazı bulunamadı' });
  res.json(postToApi(data));
});

app.post('/api/blog', requireAuth, async (req, res) => {
  const row = { id: Date.now().toString(), date: new Date().toISOString(), ...postToDb(req.body) };
  const { data, error } = await supabase.from('blog_posts').insert(row).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(postToApi(data));
});

app.put('/api/blog/:id', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(postToDb(req.body))
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(404).json({ error: 'Yazı bulunamadı' });
  res.json(postToApi(data));
});

app.delete('/api/blog/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('blog_posts').delete().eq('id', req.params.id);
  if (error) return res.status(404).json({ error: 'Yazı bulunamadı' });
  res.json({ success: true });
});

// --- Sitemap ---
app.get('/api/sitemap', async (req, res) => {
  const [{ data: products }, { data: posts }] = await Promise.all([
    supabase.from('products').select('slug'),
    supabase.from('blog_posts').select('slug'),
  ]);

  const base = process.env.SITE_URL || 'https://galipler.com';
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    `<url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority><lastmod>${today}</lastmod></url>`,
    ...(products || []).map(
      (p) =>
        `<url><loc>${base}/urunler/${p.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    ),
    ...(posts || []).map(
      (p) =>
        `<url><loc>${base}/blog/${p.slug}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`
    ),
  ];

  res.set('Content-Type', 'application/xml');
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`
  );
});

app.listen(PORT, () => {
  console.log(`Galipler API sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});
