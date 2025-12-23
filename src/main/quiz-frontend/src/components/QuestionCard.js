function QuestionCard({ question, index }) {
    return (
        <div className="question-card">
            <h3>
                {index + 1}. {question.questionTitle}
            </h3>

            <div className="options">
                {[question.option1, question.option2, question.option3, question.option4].map(
                    (opt, i) => (
                        <label key={i} className="option">
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={opt}
                            />
                            {opt}
                        </label>
                    )
                )}
            </div>
        </div>
    );
}
