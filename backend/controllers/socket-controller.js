const Order = require('../models/Order-model');
const Notification = require('../models/Notification-model');

const { logger } = require('../utilities/winston');

module.exports = {
  editStateOrder: async order => {
    try {
      return await Order.updateOne(
        { _id: order.orderId },
        { stateOrder: order.state },
        { new: true },
        async error => {
          if (error) throw new Error(error);
          return {
            state: 'success',
            message: 'edit success',
          };
        }
      );
    } catch (error) {
      logger.error(error.message);
      return {
        state: 'success',
        message: 'edit success',
      };
    }
  },
  makeNotification: async notification => {
    try {
      const newNotification = new Notification({
        to: notification.to,
        content: notification.content,
      });
      await newNotification.save((error, docs) => {
        if (error) throw new Error(error);
        return docs;
      });
    } catch (error) {
      logger.error(error.message);
    }
  },
};
