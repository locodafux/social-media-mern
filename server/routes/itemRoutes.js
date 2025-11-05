const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/itemController');

router.use(authMiddleware);
router.post('/', [body('title').isLength({ min: 1 })], createItem);
router.get('/', getItems);
router.get('/:id', [param('id').isMongoId()], getItem);
router.put('/:id', [param('id').isMongoId()], updateItem);
router.delete('/:id', [param('id').isMongoId()], deleteItem);

module.exports = router;