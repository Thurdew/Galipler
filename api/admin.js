import { setCors } from './_lib.js';

export default function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    return res.json({ token });
  }

  res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
}
