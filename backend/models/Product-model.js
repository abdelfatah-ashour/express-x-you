const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: ObjectId,
      ref: 'User',
    },
    nameItem: String,
    category: String,
    section: String,
    brand: String,
    size: String,
    ram: String,
    memoryMobile: String,
    hard: String,
    inchLaptops: String,
    inchTv: String,
    typeDisplay: String,
    effectiveMegapixels: String,
    videoCaptureResolution: String,
    color: String,
    price: Number,
    qty: Number,
    sold: Number,
    rate: Number,
    imageItem: String,
    description: String,
    published: { type: Number, enum: [0, 1], default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
