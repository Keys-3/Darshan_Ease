import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiTrash2, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';
import './MyBookings.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const location = useLocation();
    const newBookingId = location.state?.newBooking;

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('darshanBookings') || '[]');
        setBookings(saved.reverse());
    }, []);

    const cancelBooking = (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            const updated = bookings.map(b =>
                b.id === bookingId ? { ...b, status: 'cancelled' } : b
            );
            setBookings(updated);
            localStorage.setItem('darshanBookings', JSON.stringify(updated));
        }
    };

    const deleteBooking = (bookingId) => {
        const updated = bookings.filter(b => b.id !== bookingId);
        setBookings(updated);
        localStorage.setItem('darshanBookings', JSON.stringify(updated));
    };

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
                                key={booking.id}
                                className={`booking-card animate-fade-in-up delay-${(i % 4) + 1} ${newBookingId === booking.id ? 'booking-card--new' : ''
                                    }`}
                            >
                                {newBookingId === booking.id && (
                                    <div className="booking-card__new-badge">
                                        <FiCheckCircle /> Booking Confirmed!
                                    </div>
                                )}

                                <div className="booking-card__image">
                                    <img src={booking.templeImage} alt={booking.templeName} />
                                    <div className={`booking-card__status booking-card__status--${booking.status}`}>
                                        {booking.status === 'confirmed' ? <FiCheckCircle /> : <FiAlertCircle />}
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </div>
                                </div>

                                <div className="booking-card__body">
                                    <h3 className="booking-card__temple">{booking.templeName}</h3>
                                    <div className="booking-card__location">
                                        <FiMapPin /> {booking.location}
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
                                            <span className="booking-card__id">#{booking.id}</span>
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => cancelBooking(booking.id)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {booking.status === 'cancelled' && (
                                                <button
                                                    className="booking-card__delete"
                                                    onClick={() => deleteBooking(booking.id)}
                                                >
                                                    <FiTrash2 />
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
