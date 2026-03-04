const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    temple: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temple',
        required: [true, 'Please add a temple reference'],
    },
    time: {
        type: String,
        required: [true, 'Please add the time range'],
    },
    type: {
        type: String,
        required: [true, 'Please add the slot type'],
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    totalCapacity: {
        type: Number,
        required: true,
        default: 100,
    },
    available: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
    },
}, { timestamps: true });

SlotSchema.index({ temple: 1, date: 1 });

module.exports = mongoose.model('Slot', SlotSchema);
