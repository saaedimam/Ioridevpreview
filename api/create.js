// Create a new preview and return its URL
import { randomUUID } from 'node:crypto';
import { put } from '../lib/store.js';

const HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.HOST || 'http://localhost:3000';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

  const { html = defaultHtml(), css = '', js = '' } = req.body || {};
  const id = randomUUID();

  await put(id, { html, css, js, updatedAt: Date.now() });

  const preview_url = `${HOST}/editor.html?preview_id=${encodeURIComponent(id)}`;
  return res.status(200).json({ preview_id: id, preview_url });
}

function defaultHtml() {
  return `<div class="hero">
    <h1>🚀 Editable Hero</h1>
    <p>Drag & drop blocks from the left panel, then click Save.</p>
    <a class="btn" href="#">Get Started</a>
  </div>`;
}
