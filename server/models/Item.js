const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = model('Item', itemSchema);