import { useState, useEffect } from "react";
import { createQuiz } from "../api/quizApi";
import { getCategories } from "../api/questionApi";
import { useAuth } from "../context/AuthContext";
import "./CreateQuiz.css";

function CreateQuiz({ onQuizCreated }) {
    const { user } = useAuth();
    const [category, setCategory] = useState("");
    const [numQuestions, setNumQuestions] = useState(5);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.error("Failed to load categories:", err);
        } finally {
            setLoadingCategories(false);
        }
    };

    const submit = async () => {
        if (!category.trim() || !title.trim()) {
            setError("Please fill in all fields");
            return;
        }

        if (numQuestions < 1 || numQuestions > 50) {
            setError("Number of questions must be between 1 and 50");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await createQuiz({ category, numQuestions, title, createdBy: user.username });
            // Reset form
            setCategory("");
            setTitle("");
            setNumQuestions(5);
            // Show success message
            alert("✅ Quiz created successfully!");
            onQuizCreated && onQuizCreated();
        } catch (err) {
            setError(err.message || "Failed to create quiz");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-quiz-container">
            <h2 className="section-title">➕ Create New Quiz</h2>

            <div className="form-card">
                {error && (
                    <div className="alert alert-error">
                        <span className="alert-icon">⚠️</span>
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="quiz-title">Quiz Title</label>
                    <input
                        id="quiz-title"
                        type="text"
                        className="form-input"
                        placeholder="e.g., JavaScript Fundamentals"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quiz-category">Category</label>
                    <select
                        id="quiz-category"
                        className="form-select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        disabled={loading || loadingCategories}
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                            <option key={cat.category} value={cat.category}>
                                {cat.category} ({cat.questionCount} questions)
                            </option>
                        ))}
                    </select>
                    {loadingCategories && <small className="form-hint">Loading categories...</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="num-questions">Number of Questions</label>
                    <input
                        id="num-questions"
                        type="number"
                        className="form-input"
                        min="1"
                        max="50"
                        value={numQuestions}
                        onChange={e => setNumQuestions(parseInt(e.target.value) || 5)}
                        disabled={loading}
                    />
                    <small className="form-hint">Choose between 1 and 50 questions</small>
                </div>

                <button
                    className="submit-button"
                    onClick={submit}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="button-spinner"></span>
                            Creating...
                        </>
                    ) : (
                        <>
                            <span className="button-icon">✨</span>
                            Create Quiz
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default CreateQuiz;