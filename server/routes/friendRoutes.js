const express = require('express');
const { param } = require('express-validator');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const {
  getMyFriendsData,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  removeFriend
} = require('../controllers/friendController');

router.use(authMiddleware);

// GET my friends data
router.get('/me', getMyFriendsData);

// SEND FRIEND REQUEST
router.post(
  '/request/:targetId',
  [param('targetId').isMongoId()],
  sendFriendRequest
);

// CANCEL SENT REQUEST
router.delete(
  '/request/:targetId',
  [param('targetId').isMongoId()],
  cancelFriendRequest
);

// ACCEPT FRIEND REQUEST
router.post(
  '/accept/:targetId',
  [param('targetId').isMongoId()],
  acceptFriendRequest
);

// DECLINE FRIEND REQUEST
router.delete(
  '/decline/:targetId',
  [param('targetId').isMongoId()],
  declineFriendRequest
);

// REMOVE FRIEND
router.delete(
  '/remove/:targetId',
  [param('targetId').isMongoId()],
  removeFriend
);

module.exports = router;
