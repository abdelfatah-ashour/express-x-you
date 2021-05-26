const router = require('express').Router();
const initMulter = require('../utilities/multer');

const {
  createProduct,
  getProducts,
  getOneProduct,
  getTopTen,
} = require('../controllers/products-controllers');
const { isAuth } = require('../controllers/user-controllers');

router.get('/product', getProducts);
router.post('/product', initMulter.single('fileItem'), isAuth, createProduct);
router.get('/product/getOneProduct', getOneProduct);
router.get('/product/getTopTen', getTopTen);

module.exports = router;
