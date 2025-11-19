const { validationResult } = require('express-validator');
const Post = require('../models/Post');

// Create new post
exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: No user data found' });
    }

    const { content, image } = req.body; 
    // image is optional; you can add Cloudinary URL after upload

    const post = await Post.create({
      content,
      image: image || null,
      owner: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error('[ERROR] createPost:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all posts for logged-in user
exports.getPosts = async (req, res) => {
  try {
    if (!req.user?.id)
      return res.status(401).json({ message: 'Unauthorized' });

    const posts = await Post.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('[ERROR] getPosts:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, owner: req.user.id });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error('[ERROR] getPost:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const updates = (({ content, image }) => ({ content, image }))(req.body);

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!post)
      return res.status(404).json({ message: 'Post not found or you are not the owner' });

    res.json(post);
  } catch (err) {
    console.error('[ERROR] updatePost:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

    if (!post)
      return res.status(404).json({ message: 'Post not found or you are not the owner' });

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('[ERROR] deletePost:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
