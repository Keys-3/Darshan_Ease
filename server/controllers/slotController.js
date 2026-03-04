const Slot = require('../models/Slot');

// @desc    Get slots for a temple
// @route   GET /api/slots/temple/:templeId
exports.getSlotsByTemple = async (req, res, next) => {
    try {
        const slots = await Slot.find({ temple: req.params.templeId }).sort({ time: 1 });
        res.json({ success: true, count: slots.length, data: slots });
    } catch (err) {
        next(err);
    }
};

// @desc    Create slot
// @route   POST /api/slots
exports.createSlot = async (req, res, next) => {
    try {
        const slot = await Slot.create(req.body);
        res.status(201).json({ success: true, data: slot });
    } catch (err) {
        next(err);
    }
};

// @desc    Update slot
// @route   PUT /api/slots/:id
exports.updateSlot = async (req, res, next) => {
    try {
        const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!slot) {
            return res.status(404).json({ success: false, error: 'Slot not found' });
        }
        res.json({ success: true, data: slot });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete slot
// @route   DELETE /api/slots/:id
exports.deleteSlot = async (req, res, next) => {
    try {
        const slot = await Slot.findByIdAndDelete(req.params.id);
        if (!slot) {
            return res.status(404).json({ success: false, error: 'Slot not found' });
        }
        res.json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
