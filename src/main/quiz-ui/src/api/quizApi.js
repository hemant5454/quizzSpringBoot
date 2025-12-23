export const fetchQuizzes = async () => {
    const res = await fetch(`http://localhost:8080/quiz/all`, {
        method: "GET"
    });
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    return res.json();
};

export const createQuiz = async ( {category, numQuestions, title }) => {
    console.log("=== createQuiz API called ===");
    console.log("category:", category);
    console.log("numQuestions:", numQuestions);
    console.log("title:", title);

    // 🔍 PRINT FINAL URL
    const url = `http://localhost:8080/quiz/create?category=${category}&numQ=${numQuestions}&title=${title}`;
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
    const res = await fetch(`http://localhost:8080/quiz/get/${id}`, {
        method: "POST"
    });
    if (!res.ok) throw new Error("Failed to fetch quizzes2");
    return res.json();
};

export const submitQuiz = async (quizId, responses) => {
    const res = await fetch(`http://localhost:8080/quiz/submit/${quizId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responses)
    });

    if (!res.ok) throw new Error("Failed to submit quiz");
    return res.json(); // integer score
};
