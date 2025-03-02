import { useState } from "react";
import { RAPIDAPI_KEY } from "@env";

export default function useFetchDateFact() {
    const [dateFact, setDateFact] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    async function fetchDateFact(month: string, day: string): Promise<string | null> {
        const API_URL = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;

        setLoading(true);
        setError(null);
        setDateFact("");

        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
                    "X-RapidAPI-Key": RAPIDAPI_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching data (Status: ${response.status})`);
            }

            const data = await response.text();
            setDateFact(data);
            return data;
        } catch (error) {
            setError(new Error("Error fetching data. Please try again."));
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { fetchDateFact, dateFact, loading, error };
}





	

