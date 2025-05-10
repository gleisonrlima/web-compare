// pages/index.js
import { useState } from "react";

export default function Home() {
	const [url, setUrl] = useState("");
	const [result, setResult] = useState(null);
	const fetchData = async () => {
		const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
		const json = await res.json();
		setResult(json);
	};
	return (
		<div className="p-8">
			<h1 className="text-xl font-bold mb-4">Product Scraper</h1>
			<input
				className="border p-2 w-full"
				placeholder="Enter product URL"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
			/>
			<button
				type="button"
				className="mt-2 p-2 bg-blue-500 text-white rounded"
				onClick={fetchData}
			>
				Scrape
			</button>
			{result && (
				<div className="mt-4">
					<p>
						<strong>Name:</strong> {result.name}
					</p>
					<p>
						<strong>Price:</strong> {result.price}
					</p>
					<p>
						<em>Fetched at: {new Date(result.fetchedAt).toLocaleString()}</em>
					</p>
				</div>
			)}
		</div>
	);
}
