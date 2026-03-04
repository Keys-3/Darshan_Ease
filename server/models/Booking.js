const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    temple: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temple',
        required: true,
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
    },
    poojas: [{
        name: String,
        price: Number,
        duration: String,
        description: String,
    }],
    date: {
        type: Date,
        required: [true, 'Please add the booking date'],
    },
    visitors: {
        type: Number,
        required: true,
        min: [1, 'Minimum 1 visitor'],
        max: [10, 'Maximum 10 visitors'],
        default: 1,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed',
    },
}, { timestamps: true });

BookingSchema.index({ user: 1 });
BookingSchema.index({ temple: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
