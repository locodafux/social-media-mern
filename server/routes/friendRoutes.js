const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {} = require('../controllers/friendController');

router.use(authMiddleware);

router.post('/get_friends', getFriends);
router.post('/add', addFriend);
router.post('/accept', acceptFriend);
router.get('/delete', [param('id').isMongoId()], removeFriend);

module.exports = router;
