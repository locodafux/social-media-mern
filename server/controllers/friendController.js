const Friends = require('../models/Friends');
const User = require('../models/User'); // only for validating user existence

// Helper: ensure a Friends document exists for a user
async function ensureFriendsDoc(userId) {
  let doc = await Friends.findOne({ user: userId });
  if (!doc) {
    doc = await Friends.create({ user: userId });
  }
  return doc;
}

/**
 * GET /api/friends/me
 * Retrieve current user's friendship data
 */
exports.getMyFriendsData = async (req, res) => {
  try {
    const friendsData = await ensureFriendsDoc(req.user.id);

    res.json({
      data: friendsData,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * POST /api/friends/request/:targetId
 * Send friend request
 */
exports.sendFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.targetId;

    if (userId === targetId) {
      return res.status(400).json({ message: "You cannot send a request to yourself" });
    }

    // Verify target exists
    const targetExists = await User.findById(targetId);
    if (!targetExists) {
      return res.status(404).json({ message: "Target user not found" });
    }

    const userFriends = await ensureFriendsDoc(userId);
    const targetFriends = await ensureFriendsDoc(targetId);

    // Already friends?
    if (userFriends.friends.includes(targetId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Already sent?
    if (userFriends.requestsSent.includes(targetId)) {
      return res.status(400).json({ message: "Already sent a request" });
    }

    // Target already requested user?
    if (userFriends.requestsReceived.includes(targetId)) {
      return res.status(400).json({ message: "User already sent you a request" });
    }

    // Add request
    userFriends.requestsSent.push(targetId);
    targetFriends.requestsReceived.push(userId);

    await userFriends.save();
    await targetFriends.save();

    res.json({ message: "Friend request sent" });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * DELETE /api/friends/request/:targetId
 * Cancel friend request
 */
exports.cancelFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.targetId;

    const userFriends = await ensureFriendsDoc(userId);
    const targetFriends = await ensureFriendsDoc(targetId);

    userFriends.requestsSent = userFriends.requestsSent.filter(id => id.toString() !== targetId);
    targetFriends.requestsReceived = targetFriends.requestsReceived.filter(id => id.toString() !== userId);

    await userFriends.save();
    await targetFriends.save();

    res.json({ message: "Friend request canceled" });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * POST /api/friends/accept/:targetId
 * Accept friend request
 */
exports.acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.targetId;

    const userFriends = await ensureFriendsDoc(userId);
    const targetFriends = await ensureFriendsDoc(targetId);

    // Must exist in the received list
    if (!userFriends.requestsReceived.includes(targetId)) {
      return res.status(400).json({ message: "No friend request from this user" });
    }

    // Move to friends list
    userFriends.friends.push(targetId);
    targetFriends.friends.push(userId);

    // Remove request
    userFriends.requestsReceived = userFriends.requestsReceived.filter(id => id.toString() !== targetId);
    targetFriends.requestsSent = targetFriends.requestsSent.filter(id => id.toString() !== userId);

    await userFriends.save();
    await targetFriends.save();

    res.json({ message: "Friend request accepted" });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * DELETE /api/friends/decline/:targetId
 * Decline friend request
 */
exports.declineFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.targetId;

    const userFriends = await ensureFriendsDoc(userId);
    const targetFriends = await ensureFriendsDoc(targetId);

    userFriends.requestsReceived = userFriends.requestsReceived.filter(id => id.toString() !== targetId);
    targetFriends.requestsSent = targetFriends.requestsSent.filter(id => id.toString() !== userId);

    await userFriends.save();
    await targetFriends.save();

    res.json({ message: "Friend request declined" });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * DELETE /api/friends/remove/:targetId
 * Remove friend
 */
exports.removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.targetId;

    const userFriends = await ensureFriendsDoc(userId);
    const targetFriends = await ensureFriendsDoc(targetId);

    userFriends.friends = userFriends.friends.filter(id => id.toString() !== targetId);
    targetFriends.friends = targetFriends.friends.filter(id => id.toString() !== userId);

    await userFriends.save();
    await targetFriends.save();

    res.json({ message: "Friend removed" });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
