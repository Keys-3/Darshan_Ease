const Donation = require('../models/Donation');

// @desc    Create donation
// @route   POST /api/donations
exports.createDonation = async (req, res, next) => {
    try {
        const { temple, amount, message, anonymous } = req.body;

        const donation = await Donation.create({
            user: req.user.id,
            temple,
            amount,
            message,
            anonymous,
        });

        const populated = await Donation.findById(donation._id)
            .populate('temple', 'name location');

        res.status(201).json({ success: true, data: populated });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my donations
// @route   GET /api/donations/my
exports.getMyDonations = async (req, res, next) => {
    try {
        const donations = await Donation.find({ user: req.user.id })
            .populate('temple', 'name location')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: donations.length, data: donations });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all donations (admin)
// @route   GET /api/donations
exports.getAllDonations = async (req, res, next) => {
    try {
        const donations = await Donation.find()
            .populate('user', 'name email')
            .populate('temple', 'name location')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: donations.length, data: donations });
    } catch (err) {
        next(err);
    }
};
