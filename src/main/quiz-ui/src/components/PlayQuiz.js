import { useEffect, useState } from "react";
import { fetchQuizById, submitQuiz } from "../api/quizApi";

function PlayQuiz({ quizId }) {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (quizId) {
            fetchQuizById(quizId).then(setQuestions);
        }
    }, [quizId]);

    const handleSelect = (questionId, option) => {
        setResponses(prev => {
            const filtered = prev.filter(r => r.id !== questionId);
            return [...filtered, { id: questionId, response: option }];
        });
    };

    const handleSubmit = async () => {
        const score = await submitQuiz(quizId, responses);
        setResult(score);
    };



    if (!quizId) return <p>Select a quiz</p>;
    if (!questions.length) return <p>Loading...</p>;

    return (
        <div>
            <h3>Quiz</h3>

            {questions.map(q => (
                <div key={q.id}>
                    <p>{q.questionTitle}</p>

                    {[q.option1, q.option2, q.option3, q.option4].map(opt => (
                        <button
                            key={opt}
                            onClick={() => handleSelect(q.id, opt)}
                            style={{
                                background:
                                    responses.find(r => r.id === q.id)?.response === opt
                                        ? "lightblue"
                                        : ""
                            }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            ))}

            <button
                disabled={responses.length !== questions.length}
                onClick={handleSubmit}
            >
                Submit Quiz
            </button>

            {result !== null && <h4>Your Score: {result}</h4>}
        </div>
    );
}

export default PlayQuiz;
