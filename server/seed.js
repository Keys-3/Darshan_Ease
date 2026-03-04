const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Temple = require('./models/Temple');
const Slot = require('./models/Slot');
const User = require('./models/User');

const templesData = [
    {
        name: "Tirumala Tirupati Devasthanam",
        location: "Tirupati, Andhra Pradesh",
        deity: "Lord Venkateswara",
        image: "https://images.unsplash.com/photo-1621427639082-543532752541?w=600&h=400&fit=crop",
        rating: 4.9,
        reviews: 12580,
        description: "One of the most visited and richest temples in the world, dedicated to Lord Venkateswara. The temple is located on the seven hills of Tirumala and attracts millions of devotees every year.",
        timings: "3:00 AM - 12:00 AM",
        dressCode: "Traditional attire recommended. No shorts, sleeveless tops.",
        specialInfo: "Free darshan queue may take 8-12 hours. Special darshan tickets recommended.",
        category: "Vaishnavism",
        state: "Andhra Pradesh",
        featured: true,
        poojas: [
            { name: "Suprabhatam", price: 200, duration: "30 min", description: "Early morning wake-up prayer" },
            { name: "Thomala Seva", price: 300, duration: "45 min", description: "Floral decoration service" },
            { name: "Archana", price: 100, duration: "15 min", description: "Chanting of deity's names" },
            { name: "Kalyanotsavam", price: 5000, duration: "2 hrs", description: "Celestial wedding ceremony" },
        ],
        slots: [
            { time: "6:00 AM - 7:00 AM", type: "Suprabhata Seva", price: 200, totalCapacity: 50, available: 45 },
            { time: "7:30 AM - 9:00 AM", type: "Thomala Seva", price: 300, totalCapacity: 35, available: 30 },
            { time: "9:00 AM - 11:00 AM", type: "Special Darshan", price: 300, totalCapacity: 150, available: 120 },
            { time: "11:00 AM - 1:00 PM", type: "VIP Darshan", price: 500, totalCapacity: 60, available: 50 },
            { time: "2:00 PM - 4:00 PM", type: "General Darshan", price: 100, totalCapacity: 250, available: 200 },
            { time: "5:00 PM - 7:00 PM", type: "Evening Darshan", price: 150, totalCapacity: 180, available: 150 },
        ],
    },
    {
        name: "Varanasi Kashi Vishwanath",
        location: "Varanasi, Uttar Pradesh",
        deity: "Lord Shiva",
        image: "https://images.unsplash.com/photo-1609947017136-9daf32a15c38?w=600&h=400&fit=crop",
        rating: 4.8,
        reviews: 9840,
        description: "One of the twelve Jyotirlingas, the holiest temple of Lord Shiva. Located on the banks of the sacred Ganges river in the spiritual capital of India.",
        timings: "3:00 AM - 11:00 PM",
        dressCode: "Traditional attire preferred. Mobile phones not allowed inside.",
        specialInfo: "Ganga Aarti at 6:30 PM is a must-see experience.",
        category: "Shaivism",
        state: "Uttar Pradesh",
        featured: true,
        poojas: [
            { name: "Rudrabhishek", price: 1100, duration: "1 hr", description: "Sacred bathing of Shivlinga" },
            { name: "Shringar", price: 500, duration: "30 min", description: "Decoration ceremony" },
            { name: "Archana", price: 100, duration: "15 min", description: "Prayer offering" },
            { name: "Maha Aarti", price: 300, duration: "45 min", description: "Grand aarti ceremony" },
        ],
        slots: [
            { time: "4:00 AM - 5:00 AM", type: "Mangala Aarti", price: 250, totalCapacity: 70, available: 60 },
            { time: "6:00 AM - 8:00 AM", type: "Morning Darshan", price: 200, totalCapacity: 120, available: 100 },
            { time: "9:00 AM - 12:00 PM", type: "Regular Darshan", price: 150, totalCapacity: 250, available: 200 },
            { time: "1:00 PM - 4:00 PM", type: "Afternoon Darshan", price: 150, totalCapacity: 200, available: 180 },
            { time: "5:00 PM - 7:00 PM", type: "Sandhya Aarti", price: 300, totalCapacity: 100, available: 80 },
            { time: "8:00 PM - 10:00 PM", type: "Night Darshan", price: 200, totalCapacity: 120, available: 100 },
        ],
    },
    {
        name: "Golden Temple (Harmandir Sahib)",
        location: "Amritsar, Punjab",
        deity: "Guru Granth Sahib",
        image: "https://images.unsplash.com/photo-1609947017136-9daf32a15c38?w=600&h=400&fit=crop",
        rating: 4.9,
        reviews: 15200,
        description: "The holiest Gurdwara and one of the most significant spiritual sites. The temple is covered in gold foil and is surrounded by a sacred pool.",
        timings: "Open 24 Hours",
        dressCode: "Head must be covered. Shoes to be removed. Free scarves available.",
        specialInfo: "Free langar (community kitchen) serves meals 24/7.",
        category: "Sikhism",
        state: "Punjab",
        featured: true,
        poojas: [
            { name: "Palki Sahib", price: 0, duration: "1 hr", description: "Sacred procession" },
            { name: "Kirtan", price: 0, duration: "2 hrs", description: "Devotional singing" },
        ],
        slots: [
            { time: "4:00 AM - 6:00 AM", type: "Amrit Vela Darshan", price: 0, totalCapacity: 500, available: 500 },
            { time: "6:00 AM - 9:00 AM", type: "Morning Darshan", price: 0, totalCapacity: 500, available: 500 },
            { time: "10:00 AM - 1:00 PM", type: "Midday Darshan", price: 0, totalCapacity: 500, available: 500 },
            { time: "2:00 PM - 5:00 PM", type: "Afternoon Darshan", price: 0, totalCapacity: 500, available: 500 },
            { time: "6:00 PM - 9:00 PM", type: "Evening Darshan", price: 0, totalCapacity: 500, available: 500 },
        ],
    },
    {
        name: "Meenakshi Amman Temple",
        location: "Madurai, Tamil Nadu",
        deity: "Goddess Meenakshi & Lord Sundareswarar",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
        rating: 4.7,
        reviews: 8920,
        description: "A historic Hindu temple dedicated to Goddess Meenakshi and Lord Sundareswarar. Known for its stunning Dravidian architecture with 14 colorful gopurams.",
        timings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM",
        dressCode: "Traditional attire. No leather items allowed inside.",
        specialInfo: "The temple has 33,000 sculptures. Evening ceremony is spectacular.",
        category: "Shaivism",
        state: "Tamil Nadu",
        featured: false,
        poojas: [
            { name: "Abhishekam", price: 500, duration: "45 min", description: "Sacred bathing ritual" },
            { name: "Alankaram", price: 300, duration: "30 min", description: "Decoration pooja" },
            { name: "Archana", price: 50, duration: "15 min", description: "Prayer chanting" },
        ],
        slots: [
            { time: "5:00 AM - 7:00 AM", type: "Special Darshan", price: 200, totalCapacity: 100, available: 80 },
            { time: "7:00 AM - 10:00 AM", type: "Morning Darshan", price: 100, totalCapacity: 180, available: 150 },
            { time: "10:00 AM - 12:30 PM", type: "Regular Darshan", price: 50, totalCapacity: 250, available: 200 },
            { time: "4:00 PM - 6:00 PM", type: "Evening Darshan", price: 100, totalCapacity: 180, available: 150 },
            { time: "6:00 PM - 8:00 PM", type: "Night Ceremony Darshan", price: 150, totalCapacity: 120, available: 100 },
        ],
    },
    {
        name: "Jagannath Temple",
        location: "Puri, Odisha",
        deity: "Lord Jagannath",
        image: "https://images.unsplash.com/photo-1621427639082-543532752541?w=600&h=400&fit=crop",
        rating: 4.8,
        reviews: 7650,
        description: "One of the Char Dham pilgrimage sites, famous for the annual Rath Yatra. The temple is a masterpiece of Kalinga architecture.",
        timings: "5:00 AM - 11:00 PM",
        dressCode: "Traditional Indian attire only. Non-Hindus not allowed inside.",
        specialInfo: "The Mahaprasad (temple food) is considered sacred and a must-try.",
        category: "Vaishnavism",
        state: "Odisha",
        featured: true,
        poojas: [
            { name: "Mahaprasad", price: 100, duration: "20 min", description: "Sacred food offering" },
            { name: "Abadha", price: 200, duration: "30 min", description: "Morning meal offering" },
            { name: "Sakala Dhupa", price: 150, duration: "25 min", description: "Traditional pooja" },
        ],
        slots: [
            { time: "5:00 AM - 6:00 AM", type: "Mangala Aarti", price: 200, totalCapacity: 60, available: 50 },
            { time: "7:00 AM - 9:00 AM", type: "Morning Darshan", price: 150, totalCapacity: 140, available: 120 },
            { time: "10:00 AM - 12:00 PM", type: "Madhyana Dhupa", price: 200, totalCapacity: 120, available: 100 },
            { time: "4:00 PM - 6:00 PM", type: "Sandhya Darshan", price: 150, totalCapacity: 140, available: 120 },
            { time: "7:00 PM - 9:00 PM", type: "Chandana Lagi", price: 300, totalCapacity: 80, available: 60 },
        ],
    },
    {
        name: "Somnath Temple",
        location: "Veraval, Gujarat",
        deity: "Lord Shiva",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
        rating: 4.7,
        reviews: 6430,
        description: "First among the twelve Jyotirlingas. Believed to have been created by the Moon God. The temple has been rebuilt multiple times throughout history.",
        timings: "6:00 AM - 9:30 PM",
        dressCode: "Decent traditional clothing. Photography restricted.",
        specialInfo: "Light and Sound show in the evening narrates the temple's history.",
        category: "Shaivism",
        state: "Gujarat",
        featured: false,
        poojas: [
            { name: "Rudrabhishek", price: 800, duration: "1 hr", description: "Grand Shiva pooja" },
            { name: "Laghu Rudra", price: 500, duration: "45 min", description: "Short Rudra pooja" },
            { name: "Archana", price: 100, duration: "15 min", description: "Simple prayer" },
        ],
        slots: [
            { time: "6:00 AM - 8:00 AM", type: "Morning Darshan", price: 100, totalCapacity: 180, available: 150 },
            { time: "9:00 AM - 12:00 PM", type: "Regular Darshan", price: 50, totalCapacity: 300, available: 250 },
            { time: "4:00 PM - 6:00 PM", type: "Evening Darshan", price: 100, totalCapacity: 180, available: 150 },
            { time: "7:00 PM - 9:00 PM", type: "Sandhya Aarti", price: 200, totalCapacity: 100, available: 80 },
        ],
    },
    {
        name: "Siddhivinayak Temple",
        location: "Mumbai, Maharashtra",
        deity: "Lord Ganesha",
        image: "https://images.unsplash.com/photo-1621427639082-543532752541?w=600&h=400&fit=crop",
        rating: 4.6,
        reviews: 11200,
        description: "One of the most visited temples in Mumbai, dedicated to Lord Ganesha. Known for fulfilling wishes and granting success to devotees.",
        timings: "5:30 AM - 10:00 PM",
        dressCode: "Modest clothing. Bags not allowed inside.",
        specialInfo: "Tuesday special darshan attracts the largest crowds.",
        category: "Ganapatya",
        state: "Maharashtra",
        featured: false,
        poojas: [
            { name: "Abhishek", price: 400, duration: "30 min", description: "Sacred bathing" },
            { name: "Modak Offering", price: 200, duration: "15 min", description: "Sweet offering" },
            { name: "Archana", price: 100, duration: "10 min", description: "Prayer chanting" },
        ],
        slots: [
            { time: "5:30 AM - 7:00 AM", type: "Early Morning Darshan", price: 200, totalCapacity: 100, available: 80 },
            { time: "7:00 AM - 10:00 AM", type: "Morning Darshan", price: 150, totalCapacity: 180, available: 150 },
            { time: "10:00 AM - 1:00 PM", type: "Regular Darshan", price: 100, totalCapacity: 250, available: 200 },
            { time: "2:00 PM - 5:00 PM", type: "Afternoon Darshan", price: 100, totalCapacity: 250, available: 200 },
            { time: "5:00 PM - 8:00 PM", type: "Evening Darshan", price: 150, totalCapacity: 150, available: 120 },
        ],
    },
    {
        name: "Kedarnath Temple",
        location: "Kedarnath, Uttarakhand",
        deity: "Lord Shiva",
        image: "https://images.unsplash.com/photo-1609947017136-9daf32a15c38?w=600&h=400&fit=crop",
        rating: 4.9,
        reviews: 5890,
        description: "Highest among the twelve Jyotirlingas, located at an altitude of 11,755 ft in the Himalayas. Part of the Char Dham pilgrimage circuit.",
        timings: "4:00 AM - 9:00 PM (Open Apr-Nov only)",
        dressCode: "Warm traditional clothing due to cold weather.",
        specialInfo: "Temple is accessible only by a 16 km trek or helicopter. Open only 6 months a year.",
        category: "Shaivism",
        state: "Uttarakhand",
        featured: true,
        poojas: [
            { name: "Rudrabhishek", price: 1500, duration: "1.5 hrs", description: "Grand Shiva pooja in the Himalayas" },
            { name: "Shiv Parvati Pooja", price: 800, duration: "45 min", description: "Couple blessing ceremony" },
        ],
        slots: [
            { time: "4:00 AM - 5:00 AM", type: "Mahabhishek", price: 500, totalCapacity: 40, available: 30 },
            { time: "6:00 AM - 9:00 AM", type: "Morning Darshan", price: 200, totalCapacity: 120, available: 100 },
            { time: "10:00 AM - 2:00 PM", type: "Regular Darshan", price: 100, totalCapacity: 250, available: 200 },
            { time: "4:00 PM - 7:00 PM", type: "Evening Darshan", price: 150, totalCapacity: 120, available: 100 },
        ],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        // Clear existing data
        await Temple.deleteMany();
        await Slot.deleteMany();
        await User.deleteMany();
        console.log('Cleared existing data.');

        // Create admin user
        await User.create({
            name: 'Admin',
            email: 'admin@darshanease.com',
            password: 'admin123',
            role: 'ADMIN',
            phone: '9999999999',
        });
        console.log('Admin user created (admin@darshanease.com / admin123)');

        // Create a test user
        await User.create({
            name: 'Test User',
            email: 'user@darshanease.com',
            password: 'user123',
            role: 'USER',
            phone: '8888888888',
        });
        console.log('Test user created (user@darshanease.com / user123)');

        // Seed temples and slots
        for (const data of templesData) {
            const { slots, ...templeData } = data;
            const temple = await Temple.create(templeData);

            const slotDocs = slots.map(s => ({
                ...s,
                temple: temple._id,
            }));
            await Slot.insertMany(slotDocs);

            console.log(`Seeded: ${temple.name} (${slots.length} slots)`);
        }

        console.log('\nSeeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
