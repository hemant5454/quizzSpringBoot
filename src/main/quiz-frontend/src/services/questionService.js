const API_URL = "http://localhost:8080/question/allQuestions";

export const getAllQuestions = async () => {
    const response = await fetch(API_URL);
    return response.json();
};