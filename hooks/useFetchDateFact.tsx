import { useState } from "react";
import { RAPIDAPI_KEY } from "@env";

export default function useFetchDateFact() {
    const [dateFact, setDateFact] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    function isLeapYear(year: number) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    async function fetchDateFact(month: string, day: string) {
        const monthNum = parseInt(month);
        const dayNum = parseInt(day);
        const currentYear = new Date().getFullYear();

        const daysInMonth: { [key: number]: number } = {
            1: 31,  2: isLeapYear(currentYear) ? 29 : 28,  3: 31,
            4: 30,  5: 31,  6: 30,  7: 31,  8: 31,
            9: 30, 10: 31, 11: 30, 12: 31
        };

        if (isNaN(monthNum) || isNaN(dayNum) || dayNum < 1 || dayNum > daysInMonth[monthNum]) {
            setDateFact("");
            setError(new Error(`Please enter a valid day from (1-31) or (1-29) if it's February.`));
            return "";
        }

        const API_URL = `https://numbersapi.p.rapidapi.com/${monthNum}/${dayNum}/date`;

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
            return "";
        } finally {
            setLoading(false);
        }
    }

    return { fetchDateFact, dateFact, loading, error };
}



	

