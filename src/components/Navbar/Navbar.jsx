import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSun } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/temples', label: 'Temples' },
        { path: '/bookings', label: 'My Bookings' },
        { path: '/about', label: 'About' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container container">
                <Link to="/" className="navbar__logo">
                    <div className="navbar__logo-icon">
                        <GiTempleGate />
                    </div>
                    <div className="navbar__logo-text">
                        <span className="navbar__logo-name">DarshanEase</span>
                        <span className="navbar__logo-tagline">Sacred Journeys Made Easy</span>
                    </div>
                </Link>

                <div className={`navbar__links ${isMenuOpen ? 'navbar__links--open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                        >
                            {link.label}
                            {location.pathname === link.path && <span className="navbar__link-indicator" />}
                        </Link>
                    ))}
                    <Link to="/temples" className="btn btn-primary btn-sm navbar__cta">
                        <FiSun /> Book Darshan
                    </Link>
                </div>

                <button
                    className="navbar__toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
