const express = require('express');
const router = express.Router();
const { getSlotsByTemple, createSlot, updateSlot, deleteSlot } = require('../controllers/slotController');
const { protect, authorize } = require('../middleware/auth');

router.get('/temple/:templeId', getSlotsByTemple);
router.post('/', protect, authorize('ADMIN', 'ORGANIZER'), createSlot);
router.route('/:id')
    .put(protect, authorize('ADMIN', 'ORGANIZER'), updateSlot)
    .delete(protect, authorize('ADMIN'), deleteSlot);

module.exports = router;
