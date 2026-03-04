import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiClock, FiInfo, FiCheck, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { GiPrayer } from 'react-icons/gi';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './TempleDetail.css';

const TempleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [temple, setTemple] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedPoojas, setSelectedPoojas] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [visitors, setVisitors] = useState(1);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        fetchTemple();
    }, [id]);

    const fetchTemple = async () => {
        try {
            const res = await api.get(`/temples/${id}`);
            setTemple(res.data.data);
        } catch (err) {
            console.error('Error fetching temple:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!temple) {
        return (
            <div className="temple-detail__not-found container">
                <h2>Temple not found</h2>
                <Link to="/temples" className="btn btn-primary">Browse Temples</Link>
            </div>
        );
    }

    const togglePooja = (poojaId) => {
        setSelectedPoojas(prev =>
            prev.includes(poojaId) ? prev.filter(pid => pid !== poojaId) : [...prev, poojaId]
        );
    };

    const getTotal = () => {
        let total = 0;
        if (selectedSlot) {
            const slot = temple.slots.find(s => s._id === selectedSlot);
            total += (slot?.price || 0) * visitors;
        }
        selectedPoojas.forEach(pId => {
            const pooja = temple.poojas.find(p => p._id === pId);
            total += pooja?.price || 0;
        });
        return total;
    };

    const handleBooking = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (!selectedSlot || !selectedDate) {
            alert('Please select a date and time slot');
            return;
        }

        setBooking(true);
        try {
            const slot = temple.slots.find(s => s._id === selectedSlot);
            const poojas = selectedPoojas.map(pId => temple.poojas.find(p => p._id === pId)).filter(Boolean);

            await api.post('/bookings', {
                temple: temple._id,
                slot: selectedSlot,
                poojas,
                date: selectedDate,
                visitors,
                total: getTotal(),
            });

            navigate('/bookings', { state: { newBooking: true } });
        } catch (err) {
            alert(err.response?.data?.error || 'Booking failed. Please try again.');
        } finally {
            setBooking(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="temple-detail">
            {/* Hero */}
            <section className="td-hero">
                <div className="td-hero__bg" style={{ backgroundImage: `url(${temple.image})` }}></div>
                <div className="td-hero__overlay"></div>
                <div className="td-hero__content container">
                    <button onClick={() => navigate(-1)} className="td-hero__back">
                        <FiArrowLeft /> Back
                    </button>
                    <div className="td-hero__badges">
                        <span className="badge badge-gold">{temple.category}</span>
                        {temple.featured && <span className="badge badge-primary">Featured</span>}
                    </div>
                    <h1 className="td-hero__title">{temple.name}</h1>
                    <div className="td-hero__meta">
                        <span className="td-hero__location"><FiMapPin /> {temple.location}</span>
                        <span className="td-hero__rating">
                            <FiStar className="td-hero__star" /> {temple.rating}
                            <span className="td-hero__reviews">({temple.reviews.toLocaleString()} reviews)</span>
                        </span>
                    </div>
                </div>
            </section>

            <div className="td-content container">
                <div className="td-grid">
                    {/* Left Column - Info */}
                    <div className="td-info">
                        <div className="td-card">
                            <h2 className="td-card__title">About This Temple</h2>
                            <p className="td-card__text">{temple.description}</p>
                            <div className="td-info-grid">
                                <div className="td-info-item">
                                    <FiClock className="td-info-item__icon" />
                                    <div>
                                        <strong>Timings</strong>
                                        <span>{temple.timings}</span>
                                    </div>
                                </div>
                                <div className="td-info-item">
                                    <FiInfo className="td-info-item__icon" />
                                    <div>
                                        <strong>Dress Code</strong>
                                        <span>{temple.dressCode}</span>
                                    </div>
                                </div>
                            </div>
                            {temple.specialInfo && (
                                <div className="td-special-info">
                                    <FiInfo /> {temple.specialInfo}
                                </div>
                            )}
                        </div>

                        <div className="td-card">
                            <h2 className="td-card__title"><GiPrayer /> Deity</h2>
                            <p className="td-deity-name">{temple.deity}</p>
                        </div>

                        <div className="td-card">
                            <h2 className="td-card__title">Available Poojas & Sevas</h2>
                            <div className="td-poojas">
                                {temple.poojas.map(pooja => (
                                    <div
                                        key={pooja._id}
                                        className={`td-pooja ${selectedPoojas.includes(pooja._id) ? 'td-pooja--selected' : ''}`}
                                        onClick={() => togglePooja(pooja._id)}
                                    >
                                        <div className="td-pooja__check">
                                            {selectedPoojas.includes(pooja._id) && <FiCheck />}
                                        </div>
                                        <div className="td-pooja__info">
                                            <strong>{pooja.name}</strong>
                                            <span>{pooja.description}</span>
                                            <span className="td-pooja__duration">{pooja.duration}</span>
                                        </div>
                                        <span className="td-pooja__price">
                                            {pooja.price === 0 ? 'Free' : `₹${pooja.price}`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking */}
                    <div className="td-booking">
                        <div className="td-booking-card">
                            <h2 className="td-booking-card__title">Book Your Darshan</h2>

                            <div className="td-field">
                                <label className="td-field__label">
                                    <FiCalendar /> Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={today}
                                    className="td-field__input"
                                    id="booking-date"
                                />
                            </div>

                            <div className="td-field">
                                <label className="td-field__label">Number of Visitors</label>
                                <div className="td-visitors">
                                    <button
                                        className="td-visitors__btn"
                                        onClick={() => setVisitors(Math.max(1, visitors - 1))}
                                    >−</button>
                                    <span className="td-visitors__count">{visitors}</span>
                                    <button
                                        className="td-visitors__btn"
                                        onClick={() => setVisitors(Math.min(10, visitors + 1))}
                                    >+</button>
                                </div>
                            </div>

                            <div className="td-field">
                                <label className="td-field__label">
                                    <FiClock /> Select Time Slot
                                </label>
                                <div className="td-slots">
                                    {temple.slots.map(slot => (
                                        <div
                                            key={slot._id}
                                            className={`td-slot ${selectedSlot === slot._id ? 'td-slot--selected' : ''} ${slot.available === 0 ? 'td-slot--disabled' : ''}`}
                                            onClick={() => slot.available > 0 && setSelectedSlot(slot._id)}
                                        >
                                            <div className="td-slot__time">{slot.time}</div>
                                            <div className="td-slot__type">{slot.type}</div>
                                            <div className="td-slot__footer">
                                                <span className="td-slot__price">
                                                    {slot.price === 0 ? 'Free' : `₹${slot.price}`}
                                                </span>
                                                <span className="td-slot__avail">
                                                    {slot.available > 0 ? `${slot.available} left` : 'Full'}
                                                </span>
                                            </div>
                                            {selectedSlot === slot._id && (
                                                <div className="td-slot__check"><FiCheck /></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="td-summary">
                                <div className="td-summary__row">
                                    <span>Darshan ({visitors} visitor{visitors > 1 ? 's' : ''})</span>
                                    <span>₹{selectedSlot ? (temple.slots.find(s => s._id === selectedSlot)?.price || 0) * visitors : 0}</span>
                                </div>
                                {selectedPoojas.map(pId => {
                                    const p = temple.poojas.find(p => p._id === pId);
                                    return (
                                        <div key={pId} className="td-summary__row">
                                            <span>{p.name}</span>
                                            <span>₹{p.price}</span>
                                        </div>
                                    );
                                })}
                                <div className="td-summary__total">
                                    <span>Total</span>
                                    <span>₹{getTotal()}</span>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary btn-lg td-booking-btn"
                                onClick={handleBooking}
                                disabled={!selectedSlot || !selectedDate || booking}
                            >
                                {!isAuthenticated ? 'Login to Book' : booking ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TempleDetail;
