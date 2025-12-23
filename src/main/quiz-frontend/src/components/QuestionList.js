import { useEffect, useState } from "react";
import { getAllQuestions } from "../services/questionService";

function QuestionList() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getAllQuestions().then(setQuestions);
    }, []);

    return (
        <div>
            <h1>Quiz Questions</h1>
            {questions.map(q => (
                <div key={q.id}>
                    <h3>{q.questionTitle}</h3>
                    <p>{q.option1}</p>
                    <p>{q.option2}</p>
                    <p>{q.option3}</p>
                    <p>{q.option4}</p>
                </div>
            ))}
        </div>
    );
}

export default QuestionList;
