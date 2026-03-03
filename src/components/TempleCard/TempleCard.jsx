import { Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiClock, FiArrowRight } from 'react-icons/fi';
import './TempleCard.css';

const TempleCard = ({ temple, index = 0 }) => {
    const minPrice = Math.min(...temple.slots.map(s => s.price));
    const totalSlots = temple.slots.reduce((acc, s) => acc + s.available, 0);

    return (
        <div className={`temple-card animate-fade-in-up delay-${(index % 5) + 1}`}>
            <div className="temple-card__image-wrapper">
                <img src={temple.image} alt={temple.name} className="temple-card__image" loading="lazy" />
                <div className="temple-card__overlay">
                    <span className="badge badge-gold">{temple.category}</span>
                    {temple.featured && <span className="badge badge-primary">Featured</span>}
                </div>
                <div className="temple-card__price-tag">
                    {minPrice === 0 ? 'Free Entry' : `From ₹${minPrice}`}
                </div>
            </div>

            <div className="temple-card__body">
                <div className="temple-card__rating">
                    <FiStar className="temple-card__star" />
                    <span className="temple-card__rating-value">{temple.rating}</span>
                    <span className="temple-card__reviews">({temple.reviews.toLocaleString()} reviews)</span>
                </div>

                <h3 className="temple-card__name">{temple.name}</h3>

                <div className="temple-card__location">
                    <FiMapPin />
                    <span>{temple.location}</span>
                </div>

                <p className="temple-card__deity">
                    <strong>Deity:</strong> {temple.deity}
                </p>

                <div className="temple-card__meta">
                    <div className="temple-card__meta-item">
                        <FiClock />
                        <span>{temple.slots.length} Time Slots</span>
                    </div>
                    <div className="temple-card__meta-item">
                        <span className="temple-card__availability">{totalSlots} slots available</span>
                    </div>
                </div>

                <Link to={`/temple/${temple.id}`} className="btn btn-primary temple-card__btn">
                    View & Book <FiArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default TempleCard;
