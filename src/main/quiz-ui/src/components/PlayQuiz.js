import { useEffect, useState } from "react";
import { fetchQuizById, submitQuiz, getLeaderboard } from "../api/quizApi";
import { useAuth } from "../context/AuthContext";
import "./PlayQuiz.css";

function PlayQuiz({ quizId }) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showPlayerForm, setShowPlayerForm] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [leaderboard, setLeaderboard] = useState([]);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    useEffect(() => {
        if (quizId) {
            setLoading(true);
            setError(null);
            fetchQuizById(quizId)
                .then(data => {
                    setQuestions(data);
                    setResponses([]);
                    setResult(null);
                    setCurrentQuestion(0);
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [quizId]);

    const handleSelect = (questionId, option) => {
        setResponses(prev => {
            const filtered = prev.filter(r => r.id !== questionId);
            return [...filtered, { id: questionId, response: option }];
        });
    };

    const handleSubmit = async () => {
        if (responses.length !== questions.length) {
            setError("Please answer all questions");
            return;
        }
        setShowPlayerForm(true);
    };

    const handleFinalSubmit = async () => {
        if (!playerName.trim()) {
            setError("Please enter your name");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const response = await submitQuiz(quizId, responses, user?.username || 'guest', playerName);
            setResult(response);
            await loadLeaderboard();
            setShowPlayerForm(false);
        } catch (err) {
            setError(err.message || "Failed to submit quiz");
        } finally {
            setSubmitting(false);
        }
    };

    const loadLeaderboard = async () => {
        try {
            const data = await getLeaderboard(quizId);
            setLeaderboard(data);
        } catch (err) {
            console.error("Failed to load leaderboard:", err);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleQuestionJump = (index) => {
        setCurrentQuestion(index);
    };

    if (!quizId) {
        return (
            <div className="play-quiz-container">
                <div className="empty-state">
                    <span className="empty-icon">🎮</span>
                    <h3>No Quiz Selected</h3>
                    <p>Please select a quiz from the Available Quizzes tab</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="play-quiz-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="play-quiz-container">
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <h3>Failed to Load Quiz</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="play-quiz-container">
                <div className="empty-state">
                    <span className="empty-icon">📝</span>
                    <h3>No Questions Available</h3>
                    <p>This quiz doesn't have any questions yet.</p>
                </div>
            </div>
        );
    }

    if (result !== null) {
        const percentage = result.percentage || Math.round((result.score / questions.length) * 100);
        const score = typeof result === "object" ? result.score : result;

        let message = "Keep practicing!";
        let emoji = "📚";

        if (percentage >= 90) {
            message = "Outstanding! You're a star! 🌟";
            emoji = "🏆";
        } else if (percentage >= 70) {
            message = "Great job! Well done! 👏";
            emoji = "🎉";
        } else if (percentage >= 50) {
            message = "Good effort! Keep it up! 💪";
            emoji = "👍";
        }

        return (
            <div className="play-quiz-container">
                <div className="result-card">
                    <div className="result-emoji">{emoji}</div>
                    <h2 className="result-title">Quiz Complete!</h2>
                    <div className="result-score">
                        <span className="score-number">{score}</span>
                        <span className="score-total">/ {questions.length}</span>
                    </div>
                    <div className="result-percentage">{percentage}%</div>
                    <p className="result-message">{message}</p>

                    <div className="result-actions">
                        <button
                            className="retry-button"
                            onClick={() => {
                                setResult(null);
                                setResponses([]);
                                setCurrentQuestion(0);
                                setPlayerName("");
                                setShowLeaderboard(false);
                            }}
                        >
                            🔄 Try Again
                        </button>
                        <button
                            className="leaderboard-toggle-button"
                            onClick={() => setShowLeaderboard(!showLeaderboard)}
                        >
                            {showLeaderboard ? "Hide" : "Show"} Leaderboard 🏆
                        </button>
                    </div>

                    {showLeaderboard && (
                        <div className="leaderboard-section">
                            <h3 className="leaderboard-title">🏆 Leaderboard</h3>
                            {leaderboard.length > 0 ? (
                                <div className="leaderboard-list">
                                    {leaderboard.map((entry, index) => (
                                        <div
                                            key={entry.rank}
                                            className={`leaderboard-entry ${entry.rank <= 3 ? 'top-three' : ''}`}
                                        >
                                            <span className="rank">
                                                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                                            </span>
                                            <span className="player-name">{entry.playerName}</span>
                                            <span className="score">{entry.score}/{entry.totalQuestions}</span>
                                            <span className="percentage">{entry.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-leaderboard">No entries yet. Be the first!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Show player name form before final submission
    if (showPlayerForm) {
        return (
            <div className="play-quiz-container">
                <div className="player-form-card">
                    <h2>🎮 Almost Done!</h2>
                    <p>Enter your name to submit your score to the leaderboard</p>

                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="player-name">Your Name</label>
                        <input
                            id="player-name"
                            type="text"
                            className="player-input"
                            placeholder="Enter your name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            disabled={submitting}
                            autoFocus
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            className="cancel-button"
                            onClick={() => setShowPlayerForm(false)}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            className="submit-final-button"
                            onClick={handleFinalSubmit}
                            disabled={submitting || !playerName.trim()}
                        >
                            {submitting ? (
                                <>
                                    <span className="button-spinner"></span>
                                    Submitting...
                                </>
                            ) : (
                                '🎯 Submit Score'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];
    const currentResponse = responses.find(r => r.id === currentQ.id)?.response;
    const answeredCount = responses.length;

    return (
        <div className="play-quiz-container">
            <div className="quiz-header-info">
                <h2 className="quiz-title">🎮 Quiz in Progress</h2>
                <div className="progress-info">
                    <span className="question-counter">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="answered-counter">
                        Answered: {answeredCount}/{questions.length}
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                ></div>
            </div>

            {/* Question Navigation */}
            <div className="question-nav">
                {questions.map((q, idx) => (
                    <button
                        key={q.id}
                        className={`nav-dot ${idx === currentQuestion ? 'active' : ''} ${
                            responses.find(r => r.id === q.id) ? 'answered' : ''
                        }`}
                        onClick={() => handleQuestionJump(idx)}
                        title={`Question ${idx + 1}`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>

            {/* Current Question */}
            <div className="question-card">
                <h3 className="question-text">{currentQ.QuestionTitle || "Question text not available"}</h3>

                <div className="options-container">
                    {[currentQ.option1, currentQ.option2, currentQ.option3, currentQ.option4]
                        .filter(opt => opt) // Filter out null/undefined options
                        .map((opt, idx) => (
                            <button
                                key={idx}
                                className={`option-button ${currentResponse === opt ? 'selected' : ''}`}
                                onClick={() => handleSelect(currentQ.id, opt)}
                            >
                                <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                                <span className="option-text">{opt}</span>
                                {currentResponse === opt && <span className="check-mark">✓</span>}
                            </button>
                        ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="quiz-controls">
                <button
                    className="control-button secondary"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                >
                    ← Previous
                </button>

                {currentQuestion < questions.length - 1 ? (
                    <button
                        className="control-button primary"
                        onClick={handleNext}
                    >
                        Next →
                    </button>
                ) : (
                    <button
                        className="control-button submit"
                        onClick={handleSubmit}
                        disabled={responses.length !== questions.length || submitting}
                    >
                        {submitting ? (
                            <>
                                <span className="button-spinner"></span>
                                Submitting...
                            </>
                        ) : (
                            <>🎯 Submit Quiz</>
                        )}
                    </button>
                )}
            </div>

            {responses.length !== questions.length && (
                <div className="warning-message">
                    ⚠️ Please answer all questions before submitting
                </div>
            )}
        </div>
    );
}

export default PlayQuiz;
