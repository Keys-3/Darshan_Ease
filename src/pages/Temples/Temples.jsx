import { useState, useMemo } from 'react';
import { FiSearch, FiFilter, FiMapPin } from 'react-icons/fi';
import TempleCard from '../../components/TempleCard/TempleCard';
import templesData from '../../data/temples';
import './Temples.css';

const Temples = () => {
    const [search, setSearch] = useState('');
    const [selectedState, setSelectedState] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const states = ['All', ...new Set(templesData.map(t => t.state))];
    const categories = ['All', ...new Set(templesData.map(t => t.category))];

    const filteredTemples = useMemo(() => {
        return templesData.filter(temple => {
            const matchSearch = temple.name.toLowerCase().includes(search.toLowerCase()) ||
                temple.location.toLowerCase().includes(search.toLowerCase()) ||
                temple.deity.toLowerCase().includes(search.toLowerCase());
            const matchState = selectedState === 'All' || temple.state === selectedState;
            const matchCategory = selectedCategory === 'All' || temple.category === selectedCategory;
            return matchSearch && matchState && matchCategory;
        });
    }, [search, selectedState, selectedCategory]);

    return (
        <div className="temples-page">
            <section className="temples-hero">
                <div className="temples-hero__bg"></div>
                <div className="container temples-hero__content">
                    <h1 className="temples-hero__title animate-fade-in-up">Explore Sacred Temples</h1>
                    <p className="temples-hero__subtitle animate-fade-in-up delay-1">
                        Browse through India's most revered temples and book your darshan
                    </p>
                    <div className="temples-search animate-fade-in-up delay-2">
                        <FiSearch className="temples-search__icon" />
                        <input
                            type="text"
                            placeholder="Search temples by name, location, or deity..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="temples-search__input"
                            id="temple-search-input"
                        />
                    </div>
                </div>
            </section>

            <section className="temples-content container">
                <div className="temples-filters animate-fade-in-up">
                    <div className="temples-filters__group">
                        <FiFilter className="temples-filters__icon" />
                        <span className="temples-filters__label">Filters:</span>
                    </div>

                    <div className="temples-filters__group">
                        <FiMapPin className="temples-filters__icon" />
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="temples-filters__select"
                            id="state-filter"
                        >
                            {states.map(s => <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>)}
                        </select>
                    </div>

                    <div className="temples-filters__group">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="temples-filters__select"
                            id="category-filter"
                        >
                            {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                        </select>
                    </div>

                    <span className="temples-filters__count">
                        {filteredTemples.length} temple{filteredTemples.length !== 1 ? 's' : ''} found
                    </span>
                </div>

                {filteredTemples.length > 0 ? (
                    <div className="temples-grid">
                        {filteredTemples.map((temple, i) => (
                            <TempleCard key={temple.id} temple={temple} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="temples-empty">
                        <div className="temples-empty__icon">🛕</div>
                        <h3>No temples found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Temples;
