const { validationResult } = require('express-validator');
const Item = require('../models/Item');

// Create new item
exports.createItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    // Ensure req.user exists (from JWT)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: No user data found' });
    }

    const { title, description } = req.body;

    const item = await Item.create({
      title,
      description,
      owner: req.user.id, // use .id (from decoded JWT)
    });

    res.status(201).json(item);
  } catch (err) {
    console.error('[ERROR] createItem:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all items for user
exports.getItems = async (req, res) => {
  try {
    if (!req.user || !req.user.id)
      return res.status(401).json({ message: 'Unauthorized' });

    const items = await Item.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('[ERROR] getItems:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get single item by ID
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, owner: req.user.id });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('[ERROR] getItem:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const updates = (({ title, description }) => ({ title, description }))(req.body);

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!item)
      return res.status(404).json({ message: 'Item not found or you are not the owner' });

    res.json(item);
  } catch (err) {
    console.error('[ERROR] updateItem:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!item)
      return res.status(404).json({ message: 'Item not found or you are not the owner' });

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('[ERROR] deleteItem:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
