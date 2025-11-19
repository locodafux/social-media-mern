const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/postController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authMiddleware);

// CREATE post with optional image
router.post('/', upload.single('image'), createPost);

// GET all posts
router.get('/', getPosts);

// GET single post
router.get('/:id', getPost);

// UPDATE post (optional image)
router.put('/:id', upload.single('image'), updatePost);

// DELETE post
router.delete('/:id', deletePost);

module.exports = router;
