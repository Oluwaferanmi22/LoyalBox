const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  promoteToAdmin,
  earnPoints,
  getProfile,
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// User routes
router.get('/profile', authMiddleware, getProfile);
router.post('/earn', authMiddleware, earnPoints);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.put('/promote/:userId', authMiddleware, adminMiddleware, promoteToAdmin);

module.exports = router;
