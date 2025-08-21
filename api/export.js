// Return the latest saved HTML/CSS for a preview
import { get } from '../lib/store.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

  const { preview_id } = req.query || {};
  if (!preview_id) return res.status(400).json({ error: 'preview_id is required' });

  const data = await get(preview_id);
  if (!data) return res.status(404).json({ error: 'Not found' });

  return res.status(200).json({ html: data.html || '', css: data.css || '' });
}
