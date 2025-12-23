import { useState } from "react";
import AddQuestion from "../components/AddQuestion";
import CreateQuiz from "../components/CreateQuiz";
import QuizList from "../components/QuizList";
import PlayQuiz from "../components/PlayQuiz";

function QuizPage() {
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    return (
        <>
            <AddQuestion />
            <CreateQuiz />
            <QuizList onPlay={setSelectedQuiz} />
            <PlayQuiz quizId={selectedQuiz} />
        </>
    );
}

export default QuizPage;
