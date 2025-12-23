import { useState } from "react";
import { addQuestion } from "../api/questionApi";

function AddQuestion({ onQuestionAdded }) {
    const [form, setForm] = useState({
        questionTitle: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
        difficultyLevel: "Easy",
    });

    const [category, setCategory] = useState("");

    const submit = async () => {
        const payload = {
            QuestionTitle: form.questionTitle,
            option1: form.option1,
            option2: form.option2,
            option3: form.option3,
            option4: form.option4,
            correctAnswer: form.correctAnswer,
            difficultyLevel: form.difficultyLevel,
            category,
        };

        await addQuestion(payload);
        onQuestionAdded && onQuestionAdded();
        alert("Question added");
    };

    return (
        <div>
            <h3>Add Question</h3>
            <input placeholder="Title" onChange={e => setForm({...form, questionTitle:e.target.value})}/>
            <input placeholder="Option 1" onChange={e => setForm({...form, option1:e.target.value})}/>
            <input placeholder="Option 2" onChange={e => setForm({...form, option2:e.target.value})}/>
            <input placeholder="Option 3" onChange={e => setForm({...form, option3:e.target.value})}/>
            <input placeholder="Option 4" onChange={e => setForm({...form, option4:e.target.value})}/>
            <input placeholder="Correct Answer" onChange={e => setForm({...form, correctAnswer:e.target.value})}/>
            <input placeholder="Category" onChange={e => setCategory(e.target.value)}/>
            <button onClick={submit}>Save</button>
        </div>
    );
}

export default AddQuestion;
