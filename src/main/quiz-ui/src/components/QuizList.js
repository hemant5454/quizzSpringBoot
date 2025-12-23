import { useEffect, useState } from "react";
import { fetchQuizzes, deleteQuiz } from "../api/quizApi";
import "./QuizList.css";

function QuizList({ onPlay }) {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayCount, setDisplayCount] = useState(6);
    const [deleting, setDeleting] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchQuizzes()
            .then(data => {
                setQuizzes(data);
                setFilteredQuizzes(data);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map(q => q.category || "General"))];
                setCategories(uniqueCategories);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Filter quizzes when search term or category changes
    useEffect(() => {
        let filtered = quizzes;

        // Filter by search term
        if (searchTerm.trim()) {
            filtered = filtered.filter(quiz =>
                (quiz.title || "Untitled Quiz").toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(quiz =>
                (quiz.category || "General") === selectedCategory
            );
        }

        setFilteredQuizzes(filtered);
        setDisplayCount(6); // Reset display count when filters change
    }, [searchTerm, selectedCategory, quizzes]);

    const handleShowMore = () => {
        setDisplayCount(prev => prev + 6);
    };

    const handleDelete = async (quizId, quizTitle, e) => {
        e.stopPropagation();

        if (!window.confirm(`Are you sure you want to delete "${quizTitle}"?`)) {
            return;
        }

        setDeleting(quizId);
        try {
            await deleteQuiz(quizId);
            setQuizzes(prev => prev.filter(q => q.id !== quizId));
            if (displayCount > filteredQuizzes.length - 1) {
                setDisplayCount(prev => Math.max(6, prev - 1));
            }
        } catch (err) {
            alert("Failed to delete quiz: " + err.message);
        } finally {
            setDeleting(null);
        }
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
    };

    const visibleQuizzes = filteredQuizzes.slice(0, displayCount);
    const hasMore = displayCount < filteredQuizzes.length;
    const hasActiveFilters = searchTerm.trim() || selectedCategory !== "all";

    if (loading) {
        return (
            <div className="quiz-list-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading quizzes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="quiz-list-container">
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <h3>Failed to Load Quizzes</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!quizzes.length) {
        return (
            <div className="quiz-list-container">
                <div className="empty-state">
                    <span className="empty-icon">📝</span>
                    <h3>No Quizzes Available</h3>
                    <p>Create your first quiz to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-list-container">
            <div className="quiz-list-header">
                <h2 className="section-title">Available Quizzes</h2>
                <p className="quiz-count">{filteredQuizzes.length} {filteredQuizzes.length === 1 ? 'quiz' : 'quizzes'} {hasActiveFilters ? 'found' : 'available'}</p>
            </div>

            {/* Search and Filter Section */}
            <div className="search-filter-section">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search quizzes by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            className="clear-search"
                            onClick={() => setSearchTerm("")}
                            title="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="filter-box">
                    <label htmlFor="category-filter" className="filter-label">Category:</label>
                    <select
                        id="category-filter"
                        className="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {hasActiveFilters && (
                    <button className="clear-filters-btn" onClick={handleClearFilters}>
                        Clear Filters
                    </button>
                )}
            </div>

            {filteredQuizzes.length === 0 ? (
                <div className="no-results">
                    <span className="no-results-icon">🔍</span>
                    <h3>No quizzes found</h3>
                    <p>Try adjusting your search or filters</p>
                    {hasActiveFilters && (
                        <button className="clear-filters-btn-large" onClick={handleClearFilters}>
                            Clear All Filters
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="quiz-grid">
                        {visibleQuizzes.map(q => (
                            <div key={q.id} className="quiz-card">
                                {q.createdBy && (
                                    <div className="creator-badge" title={`Created by ${q.createdBy}`}>
                                        <span className="creator-icon">👤</span>
                                        <span className="creator-name">{q.createdBy}</span>
                                    </div>
                                )}
                                <button
                                    className="delete-button"
                                    onClick={(e) => handleDelete(q.id, q.title || "Untitled Quiz", e)}
                                    disabled={deleting === q.id}
                                    title="Delete quiz"
                                >
                                    {deleting === q.id ? "..." : "×"}
                                </button>
                                <div className="quiz-card-content">
                                    <div className="quiz-icon">📚</div>
                                    <h3 className="quiz-title">{q.title || "Untitled Quiz"}</h3>
                                    <span className="quiz-category">{q.category || "General"}</span>
                                    <div className="quiz-meta">
                                        <span className="quiz-info">🎯 Interactive Quiz</span>
                                    </div>
                                </div>
                                <div className="quiz-card-footer">
                                    <button
                                        className="play-button"
                                        onClick={() => onPlay(q.id)}
                                    >
                                        <span className="play-icon">▶</span>
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {hasMore && (
                        <div className="load-more-container">
                            <button className="load-more-button" onClick={handleShowMore}>
                                Show More Quizzes
                                <span className="arrow-down">↓</span>
                            </button>
                            <p className="showing-text">Showing {visibleQuizzes.length} of {filteredQuizzes.length}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default QuizList;
