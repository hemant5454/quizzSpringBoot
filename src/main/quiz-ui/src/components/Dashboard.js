import { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/quizApi";
import "./Dashboard.css";

function Dashboard({ onNavigate, onPlayQuiz }) {
    const [stats, setStats] = useState({
        totalQuizzes: 0,
        recentQuizzes: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchQuizzes()
            .then(quizzes => {
                setStats({
                    totalQuizzes: quizzes.length,
                    recentQuizzes: quizzes.slice(0, 3) // Get last 3 quizzes
                });
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="dashboard">
            <div className="welcome-section">
                <h1 className="welcome-title">Welcome to Quiz Master</h1>
                <p className="welcome-subtitle">Test your knowledge and create amazing quizzes</p>
            </div>

            {/* Action Cards */}
            <div className="action-cards">
                <div className="action-card primary" onClick={() => onNavigate("quizzes")}>
                    <div className="action-icon">📚</div>
                    <h3>Browse Quizzes</h3>
                    <p>Explore all available quizzes</p>
                    <div className="action-badge">{stats.totalQuizzes} Available</div>
                </div>

                <div className="action-card success" onClick={() => onNavigate("create")}>
                    <div className="action-icon">➕</div>
                    <h3>Create Quiz</h3>
                    <p>Build your own custom quiz</p>
                </div>

                <div className="action-card info" onClick={() => onNavigate("add-question")}>
                    <div className="action-icon">❓</div>
                    <h3>Add Question</h3>
                    <p>Expand the question bank</p>
                </div>
            </div>

            {/* Recent Quizzes */}
            {!loading && stats.recentQuizzes.length > 0 && (
                <div className="recent-section">
                    <div className="section-header">
                        <h2>Recent Quizzes</h2>
                        <button
                            className="view-all-link"
                            onClick={() => onNavigate("quizzes")}
                        >
                            View All →
                        </button>
                    </div>
                    <div className="recent-grid">
                        {stats.recentQuizzes.map(quiz => (
                            <div key={quiz.id} className="recent-quiz-card">
                                {quiz.createdBy && (
                                    <div className="creator-badge-small" title={`Created by ${quiz.createdBy}`}>
                                        <span className="creator-icon">👤</span>
                                        <span className="creator-name">{quiz.createdBy}</span>
                                    </div>
                                )}
                                <div className="recent-icon">📝</div>
                                <div className="recent-content">
                                    <h4>{quiz.title || "Untitled Quiz"}</h4>
                                    <p className="recent-category">{quiz.category || "General"}</p>
                                </div>
                                <button
                                    className="quick-play-button"
                                    onClick={() => onPlayQuiz(quiz.id)}
                                >
                                    Play ▶
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>{stats.totalQuizzes}</h3>
                        <p>Total Quizzes</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
