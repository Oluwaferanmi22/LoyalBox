const express = require('express');
const router = express.Router();
const {
  getAllRewards,
  createReward,
  updateReward,
  deleteReward,
  redeemReward,
} = require('../controllers/rewardController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public for logged-in users
router.get('/', authMiddleware, getAllRewards);
router.post('/redeem', authMiddleware, redeemReward);

// Admin only
router.post('/', authMiddleware, adminMiddleware, createReward);
router.put('/:id', authMiddleware, adminMiddleware, updateReward);
router.delete('/:id', authMiddleware, adminMiddleware, deleteReward);

module.exports = router;
