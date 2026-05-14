import { supabase } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const [{ data: products }, { data: posts }] = await Promise.all([
    supabase.from('products').select('slug'),
    supabase.from('blog_posts').select('slug'),
  ]);

  const base = process.env.SITE_URL || 'https://galiplerdemir.com';
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    `<url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority><lastmod>${today}</lastmod></url>`,
    ...(products || []).map(
      (p) => `<url><loc>${base}/urunler/${p.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    ),
    ...(posts || []).map(
      (p) => `<url><loc>${base}/blog/${p.slug}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`
    ),
  ];

  res.setHeader('Content-Type', 'application/xml');
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`
  );
}
