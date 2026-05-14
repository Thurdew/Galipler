import busboy from 'busboy';
import { extname } from 'path';
import { supabase, checkAuth, setCors } from './_lib.js';

export const config = {
  api: { bodyParser: false },
};

export default function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!checkAuth(req)) return res.status(401).json({ error: 'Yetkisiz erişim' });

  const bb = busboy({ headers: req.headers });
  const chunks = [];
  let fileName = '';
  let mimeType = '';

  bb.on('file', (_field, file, info) => {
    if (!info.mimeType.startsWith('image/')) {
      file.resume();
      return;
    }
    fileName = `${Date.now()}${extname(info.filename)}`;
    mimeType = info.mimeType;
    file.on('data', (chunk) => chunks.push(chunk));
  });

  bb.on('close', async () => {
    if (!fileName) return res.status(400).json({ error: 'Dosya yüklenemedi' });

    const buffer = Buffer.concat(chunks);
    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, buffer, { contentType: mimeType, upsert: true });

    if (error) return res.status(500).json({ error: error.message });

    const { data } = supabase.storage.from('images').getPublicUrl(fileName);
    res.json({ path: data.publicUrl });
  });

  req.pipe(bb);
}
