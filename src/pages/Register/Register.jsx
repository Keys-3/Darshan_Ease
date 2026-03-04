import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiTempleGate } from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext';
import '../Login/Login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', role: 'USER', password: '', confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password, formData.phone, formData.role);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
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
                    <h2>Create Account</h2>
                    <p>Join DarshanEase to start booking</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-form__group">
                        <label className="auth-form__label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="auth-form__input"
                            required
                            id="register-name"
                        />
                    </div>

                    <div className="auth-form__group">
                        <label className="auth-form__label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="auth-form__input"
                            required
                            id="register-email"
                        />
                    </div>

                    <div className="auth-form__group">
                        <label className="auth-form__label">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="auth-form__input"
                            id="register-phone"
                        />
                    </div>

                    <div className="auth-form__group">
                        <label className="auth-form__label">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="auth-form__input"
                            id="register-role"
                        >
                            <option value="USER">User — Book darshan & poojas</option>
                            <option value="ORGANIZER">Organizer — Manage temples & slots</option>
                            <option value="ADMIN">Admin — Full system access</option>
                        </select>
                    </div>

                    <div className="auth-form__row">
                        <div className="auth-form__group">
                            <label className="auth-form__label">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min 6 characters"
                                className="auth-form__input"
                                required
                                minLength={6}
                                id="register-password"
                            />
                        </div>
                        <div className="auth-form__group">
                            <label className="auth-form__label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="auth-form__input"
                                required
                                minLength={6}
                                id="register-confirm-password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-form__submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="auth-form__footer">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
