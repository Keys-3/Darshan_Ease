const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: [true, 'Please add a donation amount'],
        min: [1, 'Minimum donation is ₹1'],
    },
    message: {
        type: String,
        maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

DonationSchema.index({ user: 1 });
DonationSchema.index({ temple: 1 });

module.exports = mongoose.model('Donation', DonationSchema);
