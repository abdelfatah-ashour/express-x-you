const Order = require('../models/Order-model');
const { logger } = require('../utilities/winston');

module.exports = {
  allOrder: async (req, res) => {
    try {
      await Order.find()
        .limit(10)
        .exec((error, resp) => {
          if (error) throw new Error(error);
          res.status(200).json({ message: resp });
        });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
};
