// Simple in-memory store. Swap to Redis/DB in production.
const mem = new Map();

export async function put(id, data) {
  mem.set(id, data);
  return true;
}

export async function get(id) {
  return mem.get(id);
}

export async function update(id, patch) {
  const cur = mem.get(id);
  if (!cur) return false;
  mem.set(id, { ...cur, ...patch });
  return true;
}
