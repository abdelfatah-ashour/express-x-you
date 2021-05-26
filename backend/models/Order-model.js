const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema(
  {
    bayerId: {
      type: ObjectId,
      ref: 'User',
    },
    paymentId: String,
    items: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        qty: { type: Number, default: 1 },
        amount: Number,
      },
    ],
    fullName: String,
    address: String,
    tel: Number,
    stateOrder: {
      type: Number,
      default: 1,
      enum: [1, 2, 3, 4, 5], // 1 is ordered && 2 purchased && 3 process order &&  4 shipped && 5 delivered
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
