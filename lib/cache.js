// lib/cache.js (fallback local)
const store = new Map();

export const kv = {
	async get(key) {
		return store.get(key);
	},
	async set(key, value, { ex }) {
		store.set(key, value);
		setTimeout(() => store.delete(key), ex * 1000);
	},
};
