import API_BASE_URL from "./apiConfig";

export const addQuestion = async (questionData) => {
    const res = await fetch(`${API_BASE_URL}/question/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.text();
};

export const generateQuestionsWithAI = async (requestData) => {
    const res = await fetch(`${API_BASE_URL}/question/generate-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to generate questions with AI");
    }

    return res.json();
};

export const getCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/question/categories`);

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json();
};
