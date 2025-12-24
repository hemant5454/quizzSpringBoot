// src/api.js
import API_BASE_URL from "./api/apiConfig";


export const getQuestions = async (category) => {
    try {
        const url = category
            ? `${API_BASE_URL}/question/${category}`
            : `${API_BASE_URL}/question/allQuestions`;

        const res = await fetch(url);

        if (!res.ok) throw new Error("Network response was not ok");

        return res.json();
    } catch (err) {
        console.error("Error fetching questions:", err);
        return [];
    }
};

export const addQuestion = async (questionData) => {
    try {
        const res = await fetch("${API_BASE_URL}/question/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(questionData),
        });

        if (!res.ok) {
            const text = await res.text(); // get backend error message
            throw new Error(`Failed to add question: ${text}`);
        }

        return res.json();
    } catch (err) {
        console.error("Error adding question:", err);
        throw err;
    }
};

