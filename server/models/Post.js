const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  content: { type: String, required: true }, // replaced title with content
  image: { type: String },                   // optional image URL
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = model('Post', postSchema); // use 'Post' for consistency
