export const addQuestion = async (questionData) => {
    const res = await fetch("http://localhost:8080/question/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.text();
};
