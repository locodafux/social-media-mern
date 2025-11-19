const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/postController');

router.use(authMiddleware);
// router.post('/', [body('title').isLength({ min: 1 })], createPost);
// router.get('/', getPosts);
// router.get('/:id', [param('id').isMongoId()], getPost);
// router.put('/:id', [param('id').isMongoId()], updatePost);
// router.delete('/:id', [param('id').isMongoId()], deletePost);

module.exports = router;