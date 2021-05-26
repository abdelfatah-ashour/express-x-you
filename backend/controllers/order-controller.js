const Order = require('../models/Order-model');
const Cart = require('../models/Cart-model.js');

const { logger } = require('../utilities/winston');
module.exports = {
  getOrders: async (req, res) => {
    try {
      const _id = req.user._id;
      Order.find({ bayerId: _id })
        .populate('items.product')
        .exec((error, resp) => {
          if (error) throw new Error(error);
          res.status(200).json({ message: resp });
        });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  makeOrder: async (req, res) => {
    try {
      const { paymentId, items, fullName, address, tel } = req.body;
      const createOrder = new Order({
        bayerId: req.user._id,
        paymentId,
        items: items,
        fullName: fullName,
        address: address,
        tel: tel,
      });
      await createOrder.save(error => {
        if (error) throw new Error(error);
      });

      // delete order from cart
      if (items.length > 0) {
        await Cart.findOneAndDelete({ userId: req.user._id }, (error, docs) => {
          if (error) throw new Error(error);
          res.status(200).json({ message: 'order done', docs });
        });
      } else {
        res.status(200).json({ message: 'order done' });
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
};
