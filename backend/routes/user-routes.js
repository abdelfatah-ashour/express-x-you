const router = require('express').Router();

const { signup, login, logout } = require('../controllers/user-controllers');

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/logout', logout);

module.exports = router;
