const router = require('express').Router();

const { isAuth } = require('../controllers/user-controllers');
const {
  getCart,
  addToCart,
  editQtyItem,
  deleteOneITem,
} = require('../controllers/cart-controller');

router.get('/cart', isAuth, getCart);
router.post('/cart', isAuth, addToCart);
router.put('/cart', isAuth, deleteOneITem);
router.post('/cart/edit', isAuth, editQtyItem);

module.exports = router;
