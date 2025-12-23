import { useEffect, useState } from "react";
import { getQuestions } from "../api";

function QuestionList({ category, refresh }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions(category).then(setQuestions);
    }, [category, refresh]);

    return (
        <div>
            <h3>Questions</h3>

            {questions.map((q, index) => (
                <div key={q.id} className="card">
                    <b>{index + 1}. {q.questionTitle}</b>
                    <ul>
                        <li>{q.option1}</li>
                        <li>{q.option2}</li>
                        <li>{q.option3}</li>
                        <li>{q.option4}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default QuestionList;
