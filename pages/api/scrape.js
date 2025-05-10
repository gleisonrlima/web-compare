// pages/api/scrape.js
export const config = { runtime: "experimental-edge" };
import axios from "axios";
import cheerio from "cheerio";
import { kv } from "../../lib/cache";

export default async function handler(req) {
	const { url } = req.nextUrl.searchParams;
	if (!url)
		return new Response(JSON.stringify({ error: "Missing url" }), {
			status: 400,
		});

	const cacheKey = `scrape:${url}`;
	const cached = await kv.get(cacheKey);
	if (cached) {
		return new Response(JSON.stringify(cached), {
			headers: { "Cache-Control": "s-maxage=3600" },
		});
	}

	const res = await axios.get(url);
	const $ = cheerio.load(res.data);
	// Example: extract product name and price
	const name = $("h1.product-title").text();
	const price = $("span.price").text();
	const data = { name, price, fetchedAt: Date.now() };

	await kv.set(cacheKey, data, { ex: 3600 });
	return new Response(JSON.stringify(data), {
		headers: { "Cache-Control": "s-maxage=3600" },
	});
}
