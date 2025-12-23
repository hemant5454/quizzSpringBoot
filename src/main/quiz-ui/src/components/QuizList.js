import { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/quizApi";

function QuizList({ onPlay }) {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes().then(setQuizzes);
    }, []);

    return (
        <div>
            <h3>Available Quizzes</h3>
            {quizzes.map(q => (
                <div key={q.id}>
                    <span>{q.title || q.category}</span>
                    <button onClick={() => onPlay(q.id)}>Play</button>
                </div>
            ))}
        </div>
    );
}

export default QuizList;
