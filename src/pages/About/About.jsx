import { FiUsers, FiShield, FiHeart, FiGlobe, FiAward, FiTarget } from 'react-icons/fi';
import { GiTempleGate, GiLotus } from 'react-icons/gi';
import './About.css';

const About = () => {
    const values = [
        { icon: <FiHeart />, title: 'Devotion First', desc: 'We put devotees at the center of everything we do, ensuring a spiritually fulfilling experience.' },
        { icon: <FiShield />, title: 'Trust & Security', desc: 'Your data and payments are protected with the highest levels of security and encryption.' },
        { icon: <FiGlobe />, title: 'Accessibility', desc: 'Making temple darshan accessible to everyone, regardless of location or physical ability.' },
        { icon: <FiAward />, title: 'Excellence', desc: 'We continuously improve our platform to deliver the best booking experience possible.' },
        { icon: <FiUsers />, title: 'Community', desc: 'Building a community of devotees who share their spiritual experiences and recommendations.' },
        { icon: <FiTarget />, title: 'Innovation', desc: 'Leveraging technology to modernize and simplify the traditional temple visit experience.' },
    ];

    const team = [
        { name: 'Prithvi Singh', role: 'Backend Developer', initial: 'P' },
        { name: 'Parth Gupta', role: 'Frontend Developer', initial: 'P' },
    ];

    return (
        <div className="about-page">
            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero__bg"></div>
                <div className="container about-hero__content">
                    <div className="about-hero__badge animate-fade-in-up">
                        <GiLotus /> Our Story
                    </div>
                    <h1 className="about-hero__title animate-fade-in-up delay-1">
                        Making Sacred Journeys <br />
                        <span className="about-hero__accent">Effortless & Joyful</span>
                    </h1>
                    <p className="about-hero__subtitle animate-fade-in-up delay-2">
                        DarshanEase was born from a simple idea — every devotee deserves a hassle-free,
                        peaceful temple visit without the stress of long queues and uncertainty.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="about-mission">
                <div className="container">
                    <div className="about-mission__grid">
                        <div className="about-mission__content animate-fade-in-up">
                            <h2 className="about-mission__title">Our Mission</h2>
                            <p className="about-mission__text">
                                At DarshanEase, we believe that technology can enhance the spiritual experience
                                rather than diminish it. Our mission is to bridge the gap between traditional
                                temple practices and modern convenience, ensuring that every devotee can plan
                                their spiritual journey with ease and confidence.
                            </p>
                            <p className="about-mission__text">
                                We work closely with temple trusts and management committees across India to
                                provide a seamless online booking experience. From darshan time slots to special
                                pooja ceremonies, we bring the entire temple visit planning process to your fingertips.
                            </p>
                        </div>
                        <div className="about-mission__visual animate-fade-in-up delay-2">
                            <div className="about-mission__card">
                                <GiTempleGate className="about-mission__icon" />
                                <h3>500+ Temples</h3>
                                <p>Partnered across India</p>
                            </div>
                            <div className="about-mission__card">
                                <FiUsers className="about-mission__icon" />
                                <h3>2M+ Users</h3>
                                <p>Trust DarshanEase</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-values">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <p className="section-subtitle">
                        The principles that guide us in serving the devotee community
                    </p>
                    <div className="about-values__grid">
                        {values.map((value, i) => (
                            <div key={i} className={`about-value-card animate-fade-in-up delay-${(i % 5) + 1}`}>
                                <div className="about-value-card__icon">{value.icon}</div>
                                <h3 className="about-value-card__title">{value.title}</h3>
                                <p className="about-value-card__desc">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="about-team">
                <div className="container">
                    <h2 className="section-title">Meet Our Team</h2>
                    <p className="section-subtitle">
                        Passionate individuals dedicated to serving devotees
                    </p>
                    <div className="about-team__grid">
                        {team.map((member, i) => (
                            <div key={i} className={`about-team-card animate-fade-in-up delay-${i + 1}`}>
                                <div className="about-team-card__avatar">{member.initial}</div>
                                <h3 className="about-team-card__name">{member.name}</h3>
                                <p className="about-team-card__role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
