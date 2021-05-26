const Product = require('../models/Product-model');
const { logger } = require('../utilities/winston');

module.exports = {
  createProduct: async (req, res) => {
    try {
      const result = { ...req.body };

      const createItem = new Product({
        seller: req.user._id,
        ...result,
        color: result.color,
        imageItem: req.file.filename,
      });
      await createItem.save((error, item) => {
        if (error) throw new Error(error);
        res.status(200).json({ message: item });
      });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  getProducts: async (req, res) => {
    try {
      const { category, section, page, price, color, brand, date } = req.query;
      const limit = 25;
      const currentPage = +page - 1;
      const countSkip = page !== 'all' ? currentPage * limit : 0;

      console.log(countSkip);

      await Product.find({
        category: category !== 'all' ? category : { $gt: '' },
        section: section !== 'all' ? section : { $gt: '' },
        brand: brand !== 'all' ? brand : { $gt: '' },
        price: price !== 'all' ? { $gt: Math.ceil(price) } : { $gt: 0 },
        color: color !== 'all' ? color : { $gt: '' },
        published: 1,
        qty: { $gte: 1 },
      })
        .limit(limit)
        .skip(countSkip)
        .sort({ createdAt: date === 'newest' ? 1 : -1 })
        .exec(async (error, items) => {
          if (error) throw new Error(error);

          const paginationLength = await Product.find({
            category: category !== 'all' ? category : { $gt: '' },
            section: section !== 'all' ? section : { $gt: '' },
            brand: brand !== 'all' ? brand : { $gt: '' },
            price: price !== 'all' ? { $gt: Math.ceil(price) } : { $gt: 0 },
            color: color !== 'all' ? color : { $gt: '' },
            published: 1,
          });

          res
            .status(200)
            .json({ message: items, pagination: paginationLength.length });
        });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ msg: error.message });
    }
  },
  getOneProduct: async (req, res) => {
    try {
      await Product.findOne({
        _id: req.query.productId,
      }).exec((error, product) => {
        if (error) throw new Error(error);
        res.status(200).json({ message: product });
      });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  getTopTen: async (req, res) => {
    try {
      await Product.find({})
        .limit(10)
        .exec((error, resp) => {
          if (error) throw new Error(error);
          res.status(200).json({ message: resp });
        });
    } catch (error) {
      logger.error(error.message);
      res.status(200).json({ message: error.message });
    }
  },
};
