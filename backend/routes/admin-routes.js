const router = require('express').Router();

const { isAdmin } = require('../controllers/user-controllers');
const { allOrder } = require('../controllers/admin-controller');

router.get('/admin/order', isAdmin, allOrder);

module.exports = router;
