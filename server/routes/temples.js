const express = require('express');
const router = express.Router();
const {
    getTemples, getTemple, createTemple, updateTemple, deleteTemple, getFilterOptions,
} = require('../controllers/templeController');
const { protect, authorize } = require('../middleware/auth');

router.get('/filters/options', getFilterOptions);
router.route('/')
    .get(getTemples)
    .post(protect, authorize('ADMIN', 'ORGANIZER'), createTemple);

router.route('/:id')
    .get(getTemple)
    .put(protect, authorize('ADMIN', 'ORGANIZER'), updateTemple)
    .delete(protect, authorize('ADMIN'), deleteTemple);

module.exports = router;
