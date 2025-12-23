import QuizPage from "./pages/QuizPage";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

function AppContent() {
    const { user, login, logout, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return <Login onLogin={login} />;
    }

    return <QuizPage user={user} onLogout={logout} />;
}

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <AppContent />
            </div>
        </AuthProvider>
    );
}

export default App;
