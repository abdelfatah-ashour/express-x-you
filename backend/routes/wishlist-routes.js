const router = require('express').Router();
const { get, add, remove } = require('../controllers/wishlist-controller');
const { isAuth } = require('../controllers/user-controllers');

router.get('/wishlist', isAuth, get);
router.post('/wishlist', isAuth, add);
router.delete('/wishlist', isAuth, remove);

module.exports = router;
