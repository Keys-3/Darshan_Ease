const Temple = require('../models/Temple');
const Slot = require('../models/Slot');

// @desc    Get all temples (with search/filter)
// @route   GET /api/temples
exports.getTemples = async (req, res, next) => {
    try {
        const { search, state, category, featured } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { deity: { $regex: search, $options: 'i' } },
            ];
        }
        if (state && state !== 'All') query.state = state;
        if (category && category !== 'All') query.category = category;
        if (featured === 'true') query.featured = true;

        const temples = await Temple.find(query).sort({ featured: -1, rating: -1 });
        res.json({ success: true, count: temples.length, data: temples });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single temple (with its slots)
// @route   GET /api/temples/:id
exports.getTemple = async (req, res, next) => {
    try {
        const temple = await Temple.findById(req.params.id);
        if (!temple) {
            return res.status(404).json({ success: false, error: 'Temple not found' });
        }

        const slots = await Slot.find({ temple: temple._id });
        res.json({ success: true, data: { ...temple.toObject(), slots } });
    } catch (err) {
        next(err);
    }
};

// @desc    Create temple
// @route   POST /api/temples
exports.createTemple = async (req, res, next) => {
    try {
        const temple = await Temple.create(req.body);
        res.status(201).json({ success: true, data: temple });
    } catch (err) {
        next(err);
    }
};

// @desc    Update temple
// @route   PUT /api/temples/:id
exports.updateTemple = async (req, res, next) => {
    try {
        const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!temple) {
            return res.status(404).json({ success: false, error: 'Temple not found' });
        }
        res.json({ success: true, data: temple });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete temple
// @route   DELETE /api/temples/:id
exports.deleteTemple = async (req, res, next) => {
    try {
        const temple = await Temple.findByIdAndDelete(req.params.id);
        if (!temple) {
            return res.status(404).json({ success: false, error: 'Temple not found' });
        }
        // Also delete related slots
        await Slot.deleteMany({ temple: req.params.id });
        res.json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

// @desc    Get unique states and categories (for filter dropdowns)
// @route   GET /api/temples/filters/options
exports.getFilterOptions = async (req, res, next) => {
    try {
        const states = await Temple.distinct('state');
        const categories = await Temple.distinct('category');
        res.json({ success: true, data: { states, categories } });
    } catch (err) {
        next(err);
    }
};
