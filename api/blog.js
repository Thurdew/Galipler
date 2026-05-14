import { supabase, checkAuth, setCors, postToApi, postToDb } from './_lib.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { param } = req.query;

  if (param) {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', param)
        .single();
      if (error) return res.status(404).json({ error: 'Yazı bulunamadı' });
      return res.json(postToApi(data));
    }

    if (!checkAuth(req)) return res.status(401).json({ error: 'Yetkisiz erişim' });

    if (req.method === 'PUT') {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(postToDb(req.body))
        .eq('id', param)
        .select()
        .single();
      if (error) return res.status(404).json({ error: 'Yazı bulunamadı' });
      return res.json(postToApi(data));
    }

    if (req.method === 'DELETE') {
      const { error } = await supabase.from('blog_posts').delete().eq('id', param);
      if (error) return res.status(404).json({ error: 'Yazı bulunamadı' });
      return res.json({ success: true });
    }
  } else {
    if (req.method === 'GET') {
      const page = parseInt(req.query.page) || 1;
      const limit = 6;
      const start = (page - 1) * limit;

      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .range(start, start + limit - 1);

      if (error) return res.status(500).json({ error: error.message });
      return res.json({
        posts: data.map(postToApi),
        total: count,
        pages: Math.ceil(count / limit),
      });
    }

    if (!checkAuth(req)) return res.status(401).json({ error: 'Yetkisiz erişim' });

    if (req.method === 'POST') {
      const row = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...postToDb(req.body),
      };
      const { data, error } = await supabase.from('blog_posts').insert(row).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(postToApi(data));
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
