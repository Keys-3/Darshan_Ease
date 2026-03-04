const express = require('express');
const router = express.Router();
const { createDonation, getMyDonations, getAllDonations } = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createDonation);
router.get('/my', protect, getMyDonations);
router.get('/', protect, authorize('ADMIN'), getAllDonations);

module.exports = router;
