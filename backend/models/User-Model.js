const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    cPassword: String,
    photoProfile: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    role: {
      type: Number,
      default: 0,
      enum: [0, 1], // 0 user && 1 admin
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
