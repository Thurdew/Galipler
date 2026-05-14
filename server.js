import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const dataPath = (file) => join(__dirname, 'data', file);
const readJSON = (file) => JSON.parse(readFileSync(dataPath(file), 'utf-8'));
const writeJSON = (file, data) => writeFileSync(dataPath(file), JSON.stringify(data, null, 2));

// --- Auth middleware ---
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const config = readJSON('config.json');
  if (token !== Buffer.from(`${config.adminUsername}:${config.adminPassword}`).toString('base64')) {
    return res.status(401).json({ error: 'Yetkisiz erişim' });
  }
  next();
};

// --- Admin login ---
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const config = readJSON('config.json');
  if (username === config.adminUsername && password === config.adminPassword) {
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
app.get('/api/products', (req, res) => {
  res.json(readJSON('products.json'));
});

app.get('/api/products/:slug', (req, res) => {
  const products = readJSON('products.json');
  const product = products.find((p) => p.slug === req.params.slug);
  if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' });
  res.json(product);
});

app.post('/api/products', requireAuth, (req, res) => {
  const products = readJSON('products.json');
  const newProduct = { id: Date.now().toString(), ...req.body };
  products.push(newProduct);
  writeJSON('products.json', products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', requireAuth, (req, res) => {
  const products = readJSON('products.json');
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Ürün bulunamadı' });
  products[idx] = { ...products[idx], ...req.body };
  writeJSON('products.json', products);
  res.json(products[idx]);
});

app.delete('/api/products/:id', requireAuth, (req, res) => {
  const products = readJSON('products.json');
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Ürün bulunamadı' });
  products.splice(idx, 1);
  writeJSON('products.json', products);
  res.json({ success: true });
});

// --- Blog ---
app.get('/api/blog', (req, res) => {
  const posts = readJSON('blog-posts.json');
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const start = (page - 1) * limit;
  res.json({
    posts: posts.slice(start, start + limit),
    total: posts.length,
    pages: Math.ceil(posts.length / limit),
  });
});

app.get('/api/blog/:slug', (req, res) => {
  const posts = readJSON('blog-posts.json');
  const post = posts.find((p) => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Yazı bulunamadı' });
  res.json(post);
});

app.post('/api/blog', requireAuth, (req, res) => {
  const posts = readJSON('blog-posts.json');
  const newPost = { id: Date.now().toString(), date: new Date().toISOString(), ...req.body };
  posts.unshift(newPost);
  writeJSON('blog-posts.json', posts);
  res.status(201).json(newPost);
});

app.put('/api/blog/:id', requireAuth, (req, res) => {
  const posts = readJSON('blog-posts.json');
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Yazı bulunamadı' });
  posts[idx] = { ...posts[idx], ...req.body };
  writeJSON('blog-posts.json', posts);
  res.json(posts[idx]);
});

app.delete('/api/blog/:id', requireAuth, (req, res) => {
  const posts = readJSON('blog-posts.json');
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Yazı bulunamadı' });
  posts.splice(idx, 1);
  writeJSON('blog-posts.json', posts);
  res.json({ success: true });
});

// --- Sitemap ---
app.get('/api/sitemap', (req, res) => {
  const config = readJSON('config.json');
  const products = readJSON('products.json');
  const posts = readJSON('blog-posts.json');
  const base = config.siteUrl;
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    `<url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority><lastmod>${today}</lastmod></url>`,
    ...products.map(
      (p) =>
        `<url><loc>${base}/urunler/${p.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    ),
    ...posts.map(
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
