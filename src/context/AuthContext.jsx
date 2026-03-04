import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('darshanease_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, []);

    const loadUser = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data.data);
        } catch (err) {
            localStorage.removeItem('darshanease_token');
            localStorage.removeItem('darshanease_user');
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { token: newToken, data } = res.data;
        localStorage.setItem('darshanease_token', newToken);
        localStorage.setItem('darshanease_user', JSON.stringify(data));
        setToken(newToken);
        setUser(data);
        return data;
    };

    const register = async (name, email, password, phone) => {
        const res = await api.post('/auth/register', { name, email, password, phone });
        const { token: newToken, data } = res.data;
        localStorage.setItem('darshanease_token', newToken);
        localStorage.setItem('darshanease_user', JSON.stringify(data));
        setToken(newToken);
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('darshanease_token');
        localStorage.removeItem('darshanease_user');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
