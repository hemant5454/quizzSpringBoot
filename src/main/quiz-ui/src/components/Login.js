import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const endpoint = isSignup ? "signup" : "login";
            const response = await fetch(`http://localhost:8080/auth/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Authentication failed");
            }

            const data = await response.json();

            // Store token and user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            onLogin(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-logo">🎯</div>
                    <h1>Quiz Master</h1>
                    <p>{isSignup ? "Create your account" : "Welcome back!"}</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="login-error">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="login-input"
                            placeholder="Enter your username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="login-input"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="button-spinner"></span>
                                {isSignup ? "Creating Account..." : "Logging in..."}
                            </>
                        ) : (
                            isSignup ? "Sign Up" : "Login"
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                        <button
                            className="toggle-mode-btn"
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError("");
                            }}
                            disabled={loading}
                        >
                            {isSignup ? "Login" : "Sign Up"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
