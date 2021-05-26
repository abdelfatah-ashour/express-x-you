const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const notificationSchema = new mongoose.Schema(
  {
    to: {
      type: ObjectId,
      ref: 'User',
    },
    content: String,
    state: {
      type: Number,
      enum: [0, 1], // 0 send , 1 seen
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
