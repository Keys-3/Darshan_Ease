import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiClock, FiInfo, FiCheck, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { GiPrayer } from 'react-icons/gi';
import templesData from '../../data/temples';
import './TempleDetail.css';

const TempleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const temple = templesData.find(t => t.id === parseInt(id));

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedPoojas, setSelectedPoojas] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [visitors, setVisitors] = useState(1);

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
            prev.includes(poojaId) ? prev.filter(id => id !== poojaId) : [...prev, poojaId]
        );
    };

    const getTotal = () => {
        let total = 0;
        if (selectedSlot) {
            const slot = temple.slots.find(s => s.id === selectedSlot);
            total += (slot?.price || 0) * visitors;
        }
        selectedPoojas.forEach(pId => {
            const pooja = temple.poojas.find(p => p.id === pId);
            total += pooja?.price || 0;
        });
        return total;
    };

    const handleBooking = () => {
        if (!selectedSlot || !selectedDate) {
            alert('Please select a date and time slot');
            return;
        }
        const slot = temple.slots.find(s => s.id === selectedSlot);
        const poojas = selectedPoojas.map(pId => temple.poojas.find(p => p.id === pId));
        const booking = {
            id: 'DE' + Date.now(),
            templeId: temple.id,
            templeName: temple.name,
            templeImage: temple.image,
            location: temple.location,
            date: selectedDate,
            slot: slot,
            poojas: poojas,
            visitors: visitors,
            total: getTotal(),
            status: 'confirmed',
            bookedAt: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem('darshanBookings') || '[]');
        existing.push(booking);
        localStorage.setItem('darshanBookings', JSON.stringify(existing));
        navigate('/bookings', { state: { newBooking: booking.id } });
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
                        {/* About */}
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

                        {/* Deity */}
                        <div className="td-card">
                            <h2 className="td-card__title"><GiPrayer /> Deity</h2>
                            <p className="td-deity-name">{temple.deity}</p>
                        </div>

                        {/* Available Poojas */}
                        <div className="td-card">
                            <h2 className="td-card__title">Available Poojas & Sevas</h2>
                            <div className="td-poojas">
                                {temple.poojas.map(pooja => (
                                    <div
                                        key={pooja.id}
                                        className={`td-pooja ${selectedPoojas.includes(pooja.id) ? 'td-pooja--selected' : ''}`}
                                        onClick={() => togglePooja(pooja.id)}
                                    >
                                        <div className="td-pooja__check">
                                            {selectedPoojas.includes(pooja.id) && <FiCheck />}
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

                            {/* Date Selection */}
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

                            {/* Visitors */}
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

                            {/* Time Slots */}
                            <div className="td-field">
                                <label className="td-field__label">
                                    <FiClock /> Select Time Slot
                                </label>
                                <div className="td-slots">
                                    {temple.slots.map(slot => (
                                        <div
                                            key={slot.id}
                                            className={`td-slot ${selectedSlot === slot.id ? 'td-slot--selected' : ''} ${slot.available === 0 ? 'td-slot--disabled' : ''}`}
                                            onClick={() => slot.available > 0 && setSelectedSlot(slot.id)}
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
                                            {selectedSlot === slot.id && (
                                                <div className="td-slot__check"><FiCheck /></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="td-summary">
                                <div className="td-summary__row">
                                    <span>Darshan ({visitors} visitor{visitors > 1 ? 's' : ''})</span>
                                    <span>₹{selectedSlot ? (temple.slots.find(s => s.id === selectedSlot)?.price || 0) * visitors : 0}</span>
                                </div>
                                {selectedPoojas.map(pId => {
                                    const p = temple.poojas.find(p => p.id === pId);
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
                                disabled={!selectedSlot || !selectedDate}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TempleDetail;
