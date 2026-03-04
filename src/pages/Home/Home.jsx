import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiCalendar, FiCheckCircle, FiShield, FiClock, FiUsers, FiArrowRight, FiStar } from 'react-icons/fi';
import { GiTempleGate, GiLotus, GiPrayer } from 'react-icons/gi';
import TempleCard from '../../components/TempleCard/TempleCard';
import api from '../../services/api';
import './Home.css';

const Home = () => {
    const [featuredTemples, setFeaturedTemples] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await api.get('/temples?featured=true');
                setFeaturedTemples(res.data.data.slice(0, 4));
            } catch (err) {
                console.error('Error fetching featured temples:', err);
            }
        };
        fetchFeatured();
    }, []);

    const features = [
        { icon: <FiSearch />, title: 'Browse Temples', desc: 'Explore hundreds of sacred temples across India with detailed information and photos.' },
        { icon: <FiCalendar />, title: 'Choose Time Slots', desc: 'Select your preferred darshan time slot from available options to avoid long queues.' },
        { icon: <GiPrayer />, title: 'Select Pooja Type', desc: 'Choose from various pooja ceremonies and special sevas offered at each temple.' },
        { icon: <FiCheckCircle />, title: 'Instant Confirmation', desc: 'Get instant booking confirmation with QR code ticket sent to your email and phone.' },
        { icon: <FiShield />, title: 'Secure Payments', desc: 'Multiple secure payment options including UPI, cards, and net banking.' },
        { icon: <FiUsers />, title: 'Group Bookings', desc: 'Easy group booking for families and pilgrim groups with special discounts.' },
    ];

    const stats = [
        { value: '500+', label: 'Temples Listed' },
        { value: '2M+', label: 'Happy Devotees' },
        { value: '50K+', label: 'Daily Bookings' },
        { value: '4.9', label: 'User Rating' },
    ];

    const testimonials = [
        { name: 'Priya Sharma', location: 'Mumbai', text: 'DarshanEase made our Tirupati trip so smooth! No waiting in queues, just pure devotion.', rating: 5 },
        { name: 'Rajesh Kumar', location: 'Delhi', text: 'Booked darshan for our family of 8 effortlessly. The time slot feature is a blessing.', rating: 5 },
        { name: 'Lakshmi Iyer', location: 'Chennai', text: 'I use DarshanEase for every temple visit now. The pooja booking feature is wonderful.', rating: 5 },
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__bg">
                    <div className="hero__bg-pattern"></div>
                    <div className="hero__bg-gradient"></div>
                </div>
                <div className="hero__content container">
                    <div className="hero__text">
                        <div className="hero__badge animate-fade-in-up">
                            <GiLotus /> India's #1 Temple Darshan Booking Platform
                        </div>
                        <h1 className="hero__title animate-fade-in-up delay-1">
                            Your Sacred Journey <br />
                            <span className="hero__title-accent">Begins Here</span>
                        </h1>
                        <p className="hero__description animate-fade-in-up delay-2">
                            Book darshan tickets, select time slots, and choose special poojas
                            at India's most revered temples — all from the comfort of your home.
                        </p>
                        <div className="hero__actions animate-fade-in-up delay-3">
                            <Link to="/temples" className="btn btn-primary btn-lg">
                                <GiTempleGate /> Explore Temples
                            </Link>
                            <Link to="/about" className="btn btn-secondary btn-lg">
                                Learn More <FiArrowRight />
                            </Link>
                        </div>
                        <div className="hero__stats animate-fade-in-up delay-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="hero__stat">
                                    <span className="hero__stat-value">{stat.value}</span>
                                    <span className="hero__stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hero__visual animate-fade-in-up delay-3">
                        <div className="hero__card hero__card--1">
                            <GiTempleGate className="hero__card-icon" />
                            <span>Tirupati Darshan</span>
                            <span className="hero__card-badge">Booked ✓</span>
                        </div>
                        <div className="hero__card hero__card--2">
                            <FiClock className="hero__card-icon" />
                            <span>Slot: 9:00 AM</span>
                            <span className="hero__card-badge">Confirmed</span>
                        </div>
                        <div className="hero__card hero__card--3">
                            <GiPrayer className="hero__card-icon" />
                            <span>Abhishekam Pooja</span>
                            <span className="hero__card-badge">₹500</span>
                        </div>
                        <div className="hero__illustration">
                            <div className="hero__temple-shape"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2 className="section-title">How DarshanEase Works</h2>
                    <p className="section-subtitle">
                        A simple and seamless process to book your temple darshan in just a few clicks
                    </p>
                    <div className="features__grid">
                        {features.map((feature, i) => (
                            <div key={i} className={`feature-card animate-fade-in-up delay-${(i % 5) + 1}`}>
                                <div className="feature-card__icon">{feature.icon}</div>
                                <h3 className="feature-card__title">{feature.title}</h3>
                                <p className="feature-card__desc">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Temples */}
            <section className="featured-temples">
                <div className="container">
                    <h2 className="section-title">Popular Temples</h2>
                    <p className="section-subtitle">
                        Discover and book darshan at India's most beloved spiritual destinations
                    </p>
                    <div className="featured-temples__grid">
                        {featuredTemples.map((temple, i) => (
                            <TempleCard key={temple._id} temple={temple} index={i} />
                        ))}
                    </div>
                    <div className="featured-temples__cta">
                        <Link to="/temples" className="btn btn-secondary btn-lg">
                            View All Temples <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <h2 className="section-title">Devotees Love DarshanEase</h2>
                    <p className="section-subtitle">
                        Hear from millions of satisfied devotees who trust us for their spiritual journeys
                    </p>
                    <div className="testimonials__grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className={`testimonial-card animate-fade-in-up delay-${i + 1}`}>
                                <div className="testimonial-card__stars">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <FiStar key={j} className="testimonial-card__star" />
                                    ))}
                                </div>
                                <p className="testimonial-card__text">"{t.text}"</p>
                                <div className="testimonial-card__author">
                                    <div className="testimonial-card__avatar">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <strong>{t.name}</strong>
                                        <span>{t.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-card__content">
                            <h2 className="cta-card__title">Ready for Your Sacred Journey?</h2>
                            <p className="cta-card__desc">
                                Join millions of devotees who trust DarshanEase for hassle-free temple visits.
                                Book your darshan today!
                            </p>
                            <Link to="/temples" className="btn btn-gold btn-lg">
                                <GiTempleGate /> Book Darshan Now
                            </Link>
                        </div>
                        <div className="cta-card__decoration">
                            <GiLotus className="cta-card__lotus" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
