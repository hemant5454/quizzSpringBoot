import { useState } from "react";
import { addQuestion } from "../api/questionApi";
import "./AddQuestion.css";

function AddQuestion({ onQuestionAdded }) {
    const [form, setForm] = useState({
        QuestionTitle: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
        difficultyLevel: "Easy",
        category: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const submit = async () => {
        try {
            await addQuestion(form);
            alert("✅ Question added successfully");
            onQuestionAdded && onQuestionAdded();
            setForm({
                QuestionTitle: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correctAnswer: "",
                difficultyLevel: "Easy",
                category: ""
            });
        } catch (err) {
            alert("❌ Failed to add question");
        }
    };

    return (
        <div className="add-question-container">
            <h2>Add New Question</h2>

            <div className="form-group">
                <label>Question</label>
                <textarea
                    name="QuestionTitle"
                    value={form.QuestionTitle}
                    onChange={handleChange}
                    placeholder="Enter question here"
                />
            </div>

            <div className="options-grid">
                <input name="option1" value={form.option1} onChange={handleChange} placeholder="Option A" />
                <input name="option2" value={form.option2} onChange={handleChange} placeholder="Option B" />
                <input name="option3" value={form.option3} onChange={handleChange} placeholder="Option C" />
                <input name="option4" value={form.option4} onChange={handleChange} placeholder="Option D" />
            </div>

            <div className="form-group">
                <label>Correct Answer</label>
                <select name="correctAnswer" value={form.correctAnswer} onChange={handleChange}>
                    <option value="">Select correct option</option>
                    <option value={form.option1}>Option A</option>
                    <option value={form.option2}>Option B</option>
                    <option value={form.option3}>Option C</option>
                    <option value={form.option4}>Option D</option>
                </select>
            </div>

            <div className="form-row">
                <div>
                    <label>Category</label>
                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="e.g. Current Affairs"
                    />
                </div>

                <div>
                    <label>Difficulty</label>
                    <select
                        name="difficultyLevel"
                        value={form.difficultyLevel}
                        onChange={handleChange}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
            </div>

            <button className="save-btn" onClick={submit}>
                Save Question
            </button>
        </div>
    );
}

export default AddQuestion;
