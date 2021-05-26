const Cart = require('../models/Cart-model');
const Product = require('../models/Product-model');
const { logger } = require('../utilities/winston');

module.exports = {
  getCart: async (req, res) => {
    try {
      await Cart.find({ userId: req.user._id })
        .populate({
          path: 'products.product',
        })
        .exec((error, cart) => {
          if (error) throw new Error(error);
          if (cart.length > 0) {
            res.status(200).json({ message: cart[0].products });
          } else {
            res.status(200).json({ message: null });
          }
        });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  addToCart: async (req, res) => {
    try {
      const _id = req.user._id;
      const { productId } = req.body;

      // check if user has cart
      await Cart.findOne(
        { userId: _id },
        null,
        { new: true },
        async (error, isCart) => {
          if (error) throw new Error(error);
          if (!isCart) {
            const newCart = new Cart({
              userId: _id,
              products: { product: productId },
            });
            await newCart.save(error => {
              if (error) throw new Error(error);
              res.status(201).json({ message: '😍 added to cart' });
            });
          } else {
            // check if item already added
            await Cart.findOne(
              { userId: _id, 'products.product': productId },
              null,
              { new: true },
              async (error, alreadyAdded) => {
                if (error) throw new Error(error);
                if (alreadyAdded) {
                  res.status(400).json({ message: '🚀 already Added' });
                } else {
                  await Cart.updateOne(
                    {
                      userId: _id,
                    },
                    { $addToSet: { products: { product: productId } } },
                    { new: true },
                    error => {
                      if (error) throw new Error(error);
                      res.status(200).json({ message: '😍 added to cart' });
                    }
                  );
                }
              }
            );
          }
        }
      );
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  editQtyItem: async (req, res) => {
    try {
      const { cartId, productId, newCount } = req.body;
      // check first if quantity of product  < newCount
      const getProduct = await Product.findOne({ _id: productId });

      if (getProduct.qty >= newCount || newCount < 0) {
        {
          let oneCart = await Cart.findOne({
            userId: req.user._id,
            'products._id': cartId,
          });
          let oneProduct = await Product.findOne({ _id: productId });
          if (oneCart) {
            oneCart.products[0].qty = oneCart.products[0].qty + newCount;
            oneProduct.qty = oneProduct.qty - newCount;
            await oneProduct.save(error => {
              if (error) {
                throw new Error(error);
              }
            });
            await oneCart.save(error => {
              if (error) {
                throw new Error(error);
              }
              return res
                .status(200)
                .json({ message: '🚩 Editing successfully' });
            });
          }
        }
      } else {
        return res.status(400).json({ message: '🚩 new quantity not enough' });
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  deleteOneITem: async (req, res) => {
    try {
      const findOneCart = await Cart.findOne(
        { userId: req.user._id },
        null,
        { new: true },
        error => {
          if (error) throw new Error(error);
        }
      );
      if (findOneCart && findOneCart.products.length > 1) {
        await Cart.updateOne(
          { userId: req.user._id },
          { $pull: { products: { _id: req.body.cartId } } },
          {
            new: true,
          },
          error => {
            if (error) throw new Error(error);

            res.status(200).json({
              message: 'deleted done',
            });
          }
        );
      } else {
        await Cart.findOneAndDelete({ userId: req.user._id }, error => {
          if (error) throw new Error(error);
          res.status(200).json({
            message: 'deleted done',
          });
        });
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
