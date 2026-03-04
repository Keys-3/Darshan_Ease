import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';
import api from '../../services/api';
import './MyBookings.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const isNewBooking = location.state?.newBooking;

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await api.get('/bookings/my');
            setBookings(res.data.data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await api.put(`/bookings/${bookingId}/cancel`);
                setBookings(bookings.map(b =>
                    b._id === bookingId ? { ...b, status: 'cancelled' } : b
                ));
            } catch (err) {
                alert(err.response?.data?.error || 'Failed to cancel booking');
            }
        }
    };

    if (loading) {
        return (
            <div className="bookings-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="bookings-page">
            <section className="bookings-hero">
                <div className="bookings-hero__bg"></div>
                <div className="container bookings-hero__content">
                    <h1 className="bookings-hero__title animate-fade-in-up">My Bookings</h1>
                    <p className="bookings-hero__subtitle animate-fade-in-up delay-1">
                        View and manage your darshan bookings
                    </p>
                </div>
            </section>

            <section className="bookings-content container">
                {bookings.length === 0 ? (
                    <div className="bookings-empty animate-fade-in-up">
                        <div className="bookings-empty__icon">
                            <GiTempleGate />
                        </div>
                        <h3>No Bookings Yet</h3>
                        <p>Start your spiritual journey by booking a darshan at your favorite temple.</p>
                        <Link to="/temples" className="btn btn-primary">Explore Temples</Link>
                    </div>
                ) : (
                    <div className="bookings-list">
                        {bookings.map((booking, i) => (
                            <div
                                key={booking._id}
                                className={`booking-card animate-fade-in-up delay-${(i % 4) + 1} ${isNewBooking && i === 0 ? 'booking-card--new' : ''
                                    }`}
                            >
                                {isNewBooking && i === 0 && (
                                    <div className="booking-card__new-badge">
                                        <FiCheckCircle /> Booking Confirmed!
                                    </div>
                                )}

                                <div className="booking-card__image">
                                    <img src={booking.temple?.image} alt={booking.temple?.name} />
                                    <div className={`booking-card__status booking-card__status--${booking.status}`}>
                                        {booking.status === 'confirmed' ? <FiCheckCircle /> : <FiAlertCircle />}
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </div>
                                </div>

                                <div className="booking-card__body">
                                    <h3 className="booking-card__temple">{booking.temple?.name}</h3>
                                    <div className="booking-card__location">
                                        <FiMapPin /> {booking.temple?.location}
                                    </div>

                                    <div className="booking-card__details">
                                        <div className="booking-card__detail">
                                            <FiCalendar />
                                            <div>
                                                <strong>Date</strong>
                                                <span>{new Date(booking.date).toLocaleDateString('en-IN', {
                                                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                                })}</span>
                                            </div>
                                        </div>
                                        <div className="booking-card__detail">
                                            <FiClock />
                                            <div>
                                                <strong>Time Slot</strong>
                                                <span>{booking.slot?.time} — {booking.slot?.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.poojas && booking.poojas.length > 0 && (
                                        <div className="booking-card__poojas">
                                            <strong>Poojas:</strong>
                                            {booking.poojas.map((p, idx) => (
                                                <span key={idx} className="booking-card__pooja-tag">{p?.name}</span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="booking-card__footer">
                                        <div className="booking-card__info">
                                            <span className="booking-card__visitors">{booking.visitors} Visitor{booking.visitors > 1 ? 's' : ''}</span>
                                            <span className="booking-card__total">Total: ₹{booking.total}</span>
                                        </div>
                                        <div className="booking-card__actions">
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => cancelBooking(booking._id)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MyBookings;
