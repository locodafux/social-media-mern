const { Schema, model } = require('mongoose');

const friendsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],

  requestsSent: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],

  requestsReceived: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],

  connectionRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],

}, { timestamps: true });

module.exports = model('Friends', friendsSchema);
