const { validationResult } = require('express-validator');
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    console.log("req.body:", req.body); // should log { content: "..." }
    console.log("req.file:", req.file); // file info if uploaded

    if (!req.user || !req.user.id)
      return res.status(401).json({ message: 'Unauthorized' });

    const content = req.body.content;
    if (!content || !content.trim())
      return res.status(400).json({ message: 'Post content cannot be empty' });

    let imageUrl = req.file ? req.file.originalname : null; // store filename for now

    const post = await Post.create({
      content: content.trim(),
      image: imageUrl,
      owner: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error('[ERROR] createPost:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getPosts = async (req, res) => {
  try {
    if (!req.user?.id)
      return res.status(401).json({ message: 'Unauthorized' });

    const posts = await Post.find({ owner: req.user.id })
      .sort({ createdAt: -1 })
      .populate('owner', 'name'); // <-- populate owner and select only the "name" field

    res.json(posts);
  } catch (err) {
    console.error('[ERROR] getPosts:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// GET single post
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

// UPDATE post (text-only)
exports.updatePost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Post content cannot be empty' });
    }

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: { content: content.trim() } },
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

// DELETE post
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
