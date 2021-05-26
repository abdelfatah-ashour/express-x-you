const Wishlist = require('../models/Wishlist-model');
const { logger } = require('../utilities/winston');

module.exports = {
  get: async (req, res) => {
    try {
      return await Wishlist.find({ userId: req.user._id }, (error, resp) => {
        if (error) throw new Error(error);
        res.status(200).json({ message: resp });
      });
    } catch (error) {
      logger.error(error.message);
      res.status(200).json({ message: error.message });
    }
  },
  add: async (req, res) => {
    try {
      await Wishlist.findOne(
        { item: req.body.itemId },
        null,
        { new: true },
        async (error, docs) => {
          if (error) throw new Error(error);
          if (docs) {
            res.status(400).json({ message: '🚀 item already in Wishlist' });
          } else {
            const newWishlist = new Wishlist({
              userId: req.user._id,
              item: req.body.itemId,
            });

            await newWishlist.save(error => {
              if (error) throw new Error(error);
              res.status(200).json({ message: '♥ added to Wishlist' });
            });
          }
        }
      );
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  remove: async (req, res) => {
    try {
      await Wishlist.findOneAndDelete(
        { _id: req.body.wishlistId },
        { new: true },
        async error => {
          if (error) throw new Error(error);
          res.status(200).json({ message: 'deleted complete' });
        }
      );
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
};
