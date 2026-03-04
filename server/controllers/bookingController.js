const Booking = require('../models/Booking');
const Slot = require('../models/Slot');

// @desc    Create booking
// @route   POST /api/bookings
exports.createBooking = async (req, res, next) => {
    try {
        const { temple, slot, poojas, date, visitors, total } = req.body;

        // Check slot availability
        const slotDoc = await Slot.findById(slot);
        if (!slotDoc) {
            return res.status(404).json({ success: false, error: 'Slot not found' });
        }
        if (slotDoc.available < visitors) {
            return res.status(400).json({ success: false, error: 'Not enough availability in this slot' });
        }

        // Decrement slot availability
        slotDoc.available -= visitors;
        await slotDoc.save();

        const booking = await Booking.create({
            user: req.user.id,
            temple,
            slot,
            poojas,
            date,
            visitors,
            total,
        });

        // Populate for response
        const populated = await Booking.findById(booking._id)
            .populate('temple', 'name location image')
            .populate('slot', 'time type price');

        res.status(201).json({ success: true, data: populated });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my bookings
// @route   GET /api/bookings/my
exports.getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('temple', 'name location image')
            .populate('slot', 'time type price')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
exports.getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('temple', 'name location')
            .populate('slot', 'time type price')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        next(err);
    }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
exports.cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }

        // Check ownership
        if (booking.user.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({ success: false, error: 'Not authorized to cancel this booking' });
        }

        if (booking.status === 'cancelled') {
            return res.status(400).json({ success: false, error: 'Booking is already cancelled' });
        }

        // Restore slot availability
        await Slot.findByIdAndUpdate(booking.slot, { $inc: { available: booking.visitors } });

        booking.status = 'cancelled';
        await booking.save();

        const populated = await Booking.findById(booking._id)
            .populate('temple', 'name location image')
            .populate('slot', 'time type price');

        res.json({ success: true, data: populated });
    } catch (err) {
        next(err);
    }
};
