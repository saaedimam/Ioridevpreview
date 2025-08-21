# Live Website Preview (Vercel)

Create a live drag-and-drop GrapesJS editor from ChatGPT.

## Endpoints
- POST /api/create (with x-api-key)
- POST /api/save (public for browser editor)
- GET /api/export (with x-api-key)

## Deploy
1. Push to GitHub.
2. Import into Vercel, add env var `API_KEY`.
3. Deploy. Base URL: https://YOUR-PROJECT.vercel.app

Connect in GPT Builder schema with:
servers:
  - url: https://YOUR-PROJECT.vercel.app/api
