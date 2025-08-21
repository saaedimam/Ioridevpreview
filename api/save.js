// Save from the browser editor (public endpoint)
import { update } from '../lib/store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { preview_id, html = '', css = '' } = req.body || {};
  if (!preview_id) return res.status(400).json({ error: 'preview_id is required' });

  const ok = await update(preview_id, { html, css, updatedAt: Date.now() });
  if (!ok) return res.status(404).json({ error: 'Not found' });

  return res.status(200).json({ status: 'saved' });
}
