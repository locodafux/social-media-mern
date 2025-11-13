const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUser } = require('../controllers/userController');

router.use(authMiddleware);

// ✅ Protected route — get current user info
router.get('/', getUser);

module.exports = router;
