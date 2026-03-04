import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiTempleGate } from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-card__logo">
                    <div className="auth-card__logo-icon">
                        <GiTempleGate />
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue your sacred journey</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-form__group">
                        <label className="auth-form__label">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="auth-form__input"
                            required
                            id="login-email"
                        />
                    </div>

                    <div className="auth-form__group">
                        <label className="auth-form__label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="auth-form__input"
                            required
                            id="login-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-form__submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="auth-form__footer">
                        Don't have an account? <Link to="/register">Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
