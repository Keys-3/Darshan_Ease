import { Link } from 'react-router-dom';
import { GiTempleGate } from 'react-icons/gi';
import { FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,60 C360,100 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,100 L0,100 Z" />
                </svg>
            </div>

            <div className="footer__content container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <div className="footer__logo-icon">
                                <GiTempleGate />
                            </div>
                            <div>
                                <h3 className="footer__logo-name">DarshanEase</h3>
                                <p className="footer__logo-tagline">Sacred Journeys Made Easy</p>
                            </div>
                        </div>
                        <p className="footer__description">
                            Your trusted companion for seamless temple darshan experiences.
                            Book tickets, select time slots, and plan your spiritual journey with ease.
                        </p>
                        <div className="footer__socials">
                            <a href="#" className="footer__social-link" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" className="footer__social-link" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" className="footer__social-link" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" className="footer__social-link" aria-label="YouTube"><FaYoutube /></a>
                        </div>
                    </div>

                    <div className="footer__section">
                        <h4 className="footer__section-title">Quick Links</h4>
                        <ul className="footer__links">
                            <li><Link to="/" className="footer__link"><FiArrowRight /> Home</Link></li>
                            <li><Link to="/temples" className="footer__link"><FiArrowRight /> Temples</Link></li>
                            <li><Link to="/bookings" className="footer__link"><FiArrowRight /> My Bookings</Link></li>
                            <li><Link to="/about" className="footer__link"><FiArrowRight /> About Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer__section">
                        <h4 className="footer__section-title">Popular Temples</h4>
                        <ul className="footer__links">
                            <li><Link to="/temple/1" className="footer__link"><FiArrowRight /> Tirupati Balaji</Link></li>
                            <li><Link to="/temple/2" className="footer__link"><FiArrowRight /> Kashi Vishwanath</Link></li>
                            <li><Link to="/temple/3" className="footer__link"><FiArrowRight /> Golden Temple</Link></li>
                            <li><Link to="/temple/5" className="footer__link"><FiArrowRight /> Jagannath Puri</Link></li>
                        </ul>
                    </div>

                    <div className="footer__section">
                        <h4 className="footer__section-title">Contact Us</h4>
                        <ul className="footer__contact">
                            <li><FiMapPin /> 123 Temple Road, New Delhi, India</li>
                            <li><FiPhone /> +91 98765 43210</li>
                            <li><FiMail /> support@darshanease.com</li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} DarshanEase. All rights reserved.</p>
                    <div className="footer__bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
