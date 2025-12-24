import API_BASE_URL from "./apiConfig";

export const fetchQuizzes = async () => {
    const res = await fetch(`${API_BASE_URL}/quiz/all`, {
        method: "GET"
    });
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    return res.json();
};

export const createQuiz = async ( {category, numQuestions, title, createdBy }) => {
    console.log("=== createQuiz API called ===");
    console.log("category:", category);
    console.log("numQuestions:", numQuestions);
    console.log("title:", title);
    console.log("createdBy:", createdBy);

    // 🔍 PRINT FINAL URL
    const url = `${API_BASE_URL}/quiz/create?category=${encodeURIComponent(category)}&numQ=${numQuestions}&title=${encodeURIComponent(title)}&createdBy=${encodeURIComponent(createdBy || 'Anonymous')}`;
    console.log("Final request URL:", url);

    const res = await fetch(url, {
        method: "POST"
    });

    // 🔍 PRINT RESPONSE STATUS
    console.log("Response status:", res.status);

    if (!res.ok) throw new Error(await res.text());
    return res.text();
};

export const fetchQuizById = async (id) => {
    const res = await fetch(`${API_BASE_URL}/quiz/get/${id}`, {
        method: "POST"
    });
    if (!res.ok) throw new Error("Failed to fetch quizzes2");
    return res.json();
};

export const submitQuiz = async (quizId, responses) => {
    const res = await fetch(`${API_BASE_URL}/quiz/submit/${quizId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responses)
    });

    if (!res.ok) throw new Error("Failed to submit quiz");
    return res.json(); // integer score
};

export const deleteQuiz = async (quizId) => {
    const res = await fetch(`${API_BASE_URL}/quiz/delete/${quizId}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete quiz");
    return res.text();
};
