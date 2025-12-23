import { useState } from "react";
import { createQuiz } from "../api/quizApi";

function CreateQuiz({ onQuizCreated }) {
    const [category, setCategory] = useState("");
    const [numQuestions, setNumQuestions] = useState(5);
    const [title, setTitle] = useState("");


    const submit = async () => {

        const payload = {
            category,
            numQ: numQuestions,
            title: title,
        };

        console.log("Payload sent to backend:", payload);
        await createQuiz({ category, numQuestions, title });
        alert("Quiz created");
        onQuizCreated && onQuizCreated();
    };

    return (
        <div>
            <h3>Create Quiz</h3>
            <input placeholder="Category" onChange={e => setCategory(e.target.value)} />
            <input
                type="number"
                value={numQuestions}
                onChange={e => setNumQuestions(e.target.value)}
            />
            <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <button onClick={submit}>Create</button>
        </div>
    );
}

export default CreateQuiz;