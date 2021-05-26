const router = require('express').Router();

const { getOrders, makeOrder } = require('../controllers/order-controller');
const { isAuth } = require('../controllers/user-controllers');
router.get('/order', isAuth, getOrders);
router.post('/order', isAuth, makeOrder);

module.exports = router;
