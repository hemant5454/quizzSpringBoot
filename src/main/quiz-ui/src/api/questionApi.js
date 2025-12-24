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
