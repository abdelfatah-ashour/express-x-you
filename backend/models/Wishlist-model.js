const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const schemaWishList = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    item: {
      type: ObjectId,
      ref: 'Product',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', schemaWishList);
