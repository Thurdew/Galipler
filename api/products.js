import { supabase, checkAuth, setCors, productToApi, productToDb } from './_lib.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { param } = req.query;

  if (param) {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', param)
        .single();
      if (error) return res.status(404).json({ error: 'Ürün bulunamadı' });
      return res.json(productToApi(data));
    }

    if (!checkAuth(req)) return res.status(401).json({ error: 'Yetkisiz erişim' });

    if (req.method === 'PUT') {
      const { data, error } = await supabase
        .from('products')
        .update(productToDb(req.body))
        .eq('id', param)
        .select()
        .single();
      if (error) return res.status(404).json({ error: 'Ürün bulunamadı' });
      return res.json(productToApi(data));
    }

    if (req.method === 'DELETE') {
      const { error } = await supabase.from('products').delete().eq('id', param);
      if (error) return res.status(404).json({ error: 'Ürün bulunamadı' });
      return res.json({ success: true });
    }
  } else {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('products').select('*').order('id');
      if (error) return res.status(500).json({ error: error.message });
      return res.json(data.map(productToApi));
    }

    if (!checkAuth(req)) return res.status(401).json({ error: 'Yetkisiz erişim' });

    if (req.method === 'POST') {
      const row = { id: Date.now().toString(), ...productToDb(req.body) };
      const { data, error } = await supabase.from('products').insert(row).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(productToApi(data));
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
