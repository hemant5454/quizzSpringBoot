import { useState } from "react";
import AddQuestion from "../components/AddQuestion";
import CreateQuiz from "../components/CreateQuiz";
import QuizList from "../components/QuizList";
import PlayQuiz from "../components/PlayQuiz";
import Dashboard from "../components/Dashboard";
import "./QuizPage.css";

function QuizPage({ user, onLogout }) {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [activeView, setActiveView] = useState("home");
    const [refreshKey, setRefreshKey] = useState(0);

    const handleQuizCreated = () => {
        setRefreshKey(prev => prev + 1);
        setActiveView("home");
    };

    const handleQuestionAdded = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handlePlayQuiz = (quizId) => {
        setSelectedQuiz(quizId);
        setActiveView("play");
    };

    const handleBackToHome = () => {
        setSelectedQuiz(null);
        setActiveView("home");
        setRefreshKey(prev => prev + 1);
    };

    const handleNavigate = (view) => {
        setActiveView(view);
        setSelectedQuiz(null);
    };

    return (
        <div className="quiz-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-brand" onClick={() => handleNavigate("home")}>
                        <span className="brand-icon">🎯</span>
                        <span className="brand-text">Quiz Master</span>
                    </div>
                    <ul className="navbar-menu">
                        <li>
                            <button
                                className={`nav-link ${activeView === "home" ? "active" : ""}`}
                                onClick={() => handleNavigate("home")}
                            >
                                <span className="nav-icon">🏠</span>
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                className={`nav-link ${activeView === "quizzes" ? "active" : ""}`}
                                onClick={() => handleNavigate("quizzes")}
                            >
                                <span className="nav-icon">📚</span>
                                All Quizzes
                            </button>
                        </li>
                        <li>
                            <button
                                className={`nav-link ${activeView === "create" ? "active" : ""}`}
                                onClick={() => handleNavigate("create")}
                            >
                                <span className="nav-icon">➕</span>
                                Create Quiz
                            </button>
                        </li>
                        <li>
                            <button
                                className={`nav-link ${activeView === "add-question" ? "active" : ""}`}
                                onClick={() => handleNavigate("add-question")}
                            >
                                <span className="nav-icon">❓</span>
                                Add Question
                            </button>
                        </li>
                    </ul>
                    <div className="navbar-user">
                        <span className="user-name">👤 {user.username}</span>
                        <button className="logout-button" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="main-content">
                {activeView === "home" && (
                    <div className="home-view fade-in">
                        <Dashboard onNavigate={handleNavigate} onPlayQuiz={handlePlayQuiz} />
                    </div>
                )}

                {activeView === "quizzes" && (
                    <div className="view-content fade-in">
                        <QuizList key={refreshKey} onPlay={handlePlayQuiz} />
                    </div>
                )}

                {activeView === "create" && (
                    <div className="view-content fade-in">
                        <CreateQuiz onQuizCreated={handleQuizCreated} />
                    </div>
                )}

                {activeView === "add-question" && (
                    <div className="view-content fade-in">
                        <AddQuestion onQuestionAdded={handleQuestionAdded} />
                    </div>
                )}

                {activeView === "play" && selectedQuiz && (
                    <div className="view-content fade-in">
                        <button className="back-button" onClick={handleBackToHome}>
                            ← Back to Home
                        </button>
                        <PlayQuiz quizId={selectedQuiz} />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2025 Quiz Master | Built with React</p>
                </div>
            </footer>
        </div>
    );
}

export default QuizPage;
