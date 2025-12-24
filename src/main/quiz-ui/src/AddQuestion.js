import React, { useState } from "react";
import API_BASE_URL from "./api/apiConfig";

function AddQuestion({ goBack }) {
    const [question, setQuestion] = useState({
        questionTitle: "",
        category: "",
        difficultyLevel: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
    });

    const handleChange = (e) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value,
        });
    };

    const submitQuestion = () => {
        fetch(`${API_BASE_URL}/api/questions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(question),
        })
            .then(() => {
                alert("Question added successfully!");
                goBack();
            })
            .catch(() => alert("Error adding question"));
    };

    return (
        <>
            <h2>Add Question</h2>

            <input name="questionTitle" placeholder="Question" onChange={handleChange} />
            <input name="category" placeholder="Category" onChange={handleChange} />
            <input name="difficultyLevel" placeholder="Difficulty" onChange={handleChange} />
            <input name="option1" placeholder="Option 1" onChange={handleChange} />
            <input name="option2" placeholder="Option 2" onChange={handleChange} />
            <input name="option3" placeholder="Option 3" onChange={handleChange} />
            <input name="option4" placeholder="Option 4" onChange={handleChange} />
            <input name="correctAnswer" placeholder="Correct Answer" onChange={handleChange} />

            <button onClick={submitQuestion}>Save Question</button>
            <button onClick={goBack}>Back</button>
        </>
    );
}

export default AddQuestion;
