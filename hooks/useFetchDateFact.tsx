import { useState } from "react";
import { API_KEY } from "@env";

export default function useFetchDateFact() {
	const [dateFact, setDateFact] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	async function fetchDateFact(month: string, day: string) {
		const API_URL = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;

		setLoading(true);
		try {
			const response = await fetch(API_URL, {
				method: "GET",
				headers: {
					"X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
					"X-RapidAPI-Key": API_KEY,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.text();
			setError(null);
			setDateFact(data);
		} catch (error) {
			setError(error as Error);
		} finally {
			setLoading(false);
		}
	}

	return { fetchDateFact, dateFact, loading, error };
}
