import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

export function checkAuth(req) {
  const token = req.headers.authorization?.split(' ')[1];
  const expected = Buffer.from(
    `${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`
  ).toString('base64');
  return token === expected;
}

export const productToApi = (row) => ({
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

export const productToDb = (body) => ({
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

export const postToApi = (row) => ({
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

export const postToDb = (body) => ({
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
