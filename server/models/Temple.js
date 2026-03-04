const mongoose = require('mongoose');

const PoojaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    duration: { type: String },
    description: { type: String },
}, { _id: true });

const TempleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a temple name'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    deity: {
        type: String,
        required: [true, 'Please add the deity name'],
    },
    image: {
        type: String,
        default: 'no-photo.jpg',
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
        default: 4.0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    timings: {
        type: String,
        required: [true, 'Please add temple timings'],
    },
    dressCode: {
        type: String,
    },
    specialInfo: {
        type: String,
    },
    poojas: [PoojaSchema],
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Vaishnavism', 'Shaivism', 'Sikhism', 'Ganapatya', 'Shaktism', 'Buddhism', 'Jainism', 'Other'],
    },
    state: {
        type: String,
        required: [true, 'Please add a state'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Indexes for search/filter performance
TempleSchema.index({ name: 'text', location: 'text', deity: 'text' });
TempleSchema.index({ state: 1 });
TempleSchema.index({ category: 1 });
TempleSchema.index({ featured: 1 });

module.exports = mongoose.model('Temple', TempleSchema);
