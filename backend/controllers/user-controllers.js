const User = require('../models/User-Model');
const { hash, compare } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const { signup, login } = require('../helper/validate-user');
const { logger } = require('../utilities/winston');
const { serialize } = require('cookie');
module.exports = {
    signup: async (req, res) => {
        const saltRounds = 10;
        try {
            const { error } = signup(req.body);
            if (error) {
                return res
                    .status(400)
                    .json({ message: error.details[0].message });
            }
            const { username, email, password, cPassword } = req.body;

            // if no error check email unique
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res
                    .status(400)
                    .json({ message: 'user is already exists' });
            }

            // Now we hashed password and confirm password
            const hashedPassword = await hash(password, saltRounds)
                .then(hash => hash)
                .catch(error => {
                    if (error) throw new Error(error);
                });
            const hashedCPassword = await hash(cPassword, saltRounds)
                .then(hash => hash)
                .catch(error => {
                    if (error) throw new Error(error);
                });

            // create new User
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                cPassword: hashedCPassword,
            });
            await newUser.save(error => {
                if (error) throw new Error(error);
                return res
                    .status(201)
                    .json({ message: '🚀 created new account success' });
            });
        } catch (error) {
            logger.error(error.message);
            return res.status(500).json({ message: '🥱 ' + error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { error } = login(req.body);
            if (error) {
                return res
                    .status(400)
                    .json({ message: error.details[0].message });
            }
            const { email, password } = req.body;

            // no error ? check if user is exists
            const isUser = await User.findOne(
                { email },
                null,
                { new: true },
                error => {
                    if (error) throw new Error(error);
                }
            );

            if (!isUser) {
                return res
                    .status(400)
                    .json({ message: '👎🏻 email or password is invalid' });
            }

            const same = compare(password, isUser.password)
                .then(() => true)
                .catch(error => {
                    if (error) throw new Error(error);
                });

            if (!same) {
                return res
                    .status(400)
                    .json({ message: '👎🏻 email or password is invalid' });
            }

            // we have 2 case role = 0 || role = 1
            // user
            if (isUser.role === 0) {
                // same password send cookie with in header
                const token = accessTokenUser({ _id: isUser._id });
                res.setHeader(
                    'Set-Cookie',
                    serialize('auth', token, {
                        httpOnly: process.env.NODE_ENV === 'production',
                        secure: process.env.NODE_ENV === 'production',
                        sameSite:
                            process.env.NODE_ENV === 'production'
                                ? 'none'
                                : false,
                        path: '/',
                        maxAge: 24 * 60 * 60,
                    })
                );
                res.header('authorization', token)
                    .status(200)
                    .json({
                        message: {
                            user: {
                                _id: isUser._id,
                                email: isUser.email,
                                role: isUser.role,
                                photoProfile: isUser.photoProfile,
                                address: isUser.address,
                            },
                            msg: '🦄 you are welcome',
                        },
                    });
            }

            // admin
            if (isUser.role === 1) {
                // same password send cookie with in header
                const token = accessTokenAdmin({
                    _id: isUser._id,
                    role: isUser.role,
                });

                res.setHeader(
                    'Set-Cookie',
                    serialize('admin', token, {
                        httpOnly: process.env.NODE_ENV === 'production',
                        secure: process.env.NODE_ENV === 'production',
                        sameSite:
                            process.env.NODE_ENV === 'production'
                                ? 'none'
                                : false,
                        path: '/',
                        maxAge: 60 * 60,
                    })
                );

                res.header('authorization', token)
                    .status(200)
                    .json({
                        message: {
                            user: {
                                _id: isUser._id,
                                username: isUser.username,
                                email: isUser.email,
                                role: isUser.role,
                                photoProfile: isUser.photoProfile,
                                address: isUser.address,
                            },
                            msg: '🦄 you are welcome',
                        },
                    });
            }
        } catch (error) {
            logger.error(error.message);
            return res.status(500).json({ message: `🥱  ${error.message}` });
        }
    },
    logout: async (req, res) => {
        try {
            return res.status(200).json({ message: '👋🏻 see you later' });
        } catch (error) {
            logger.error(error.message);
            return res.status(500).json({ message: '🥱 ' + error.message });
        }
    },
    isAuth: async (req, res, next) => {
        try {
            const token = req.cookies.auth || req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: '🔐 access denied',
                });
            }
            const decoded = await verify(
                token,
                process.env.ACCESS_TOKEN_USER_SECRET
            );

            if (!decoded) {
                return res.status(401).json({
                    message: '🔐 access denied',
                });
            }

            req.user = decoded;
            return next();
        } catch (error) {
            logger.error(error.message);
            return res.status(500).json({ message: '🥱 ' + error.message });
        }
    },
    isAdmin: async (req, res, next) => {
        try {
            const token = req.cookies.admin || req.headers.authorization;
            if (!token) {
                return res.status(403).json({
                    message: '🔓 forbidden',
                });
            }

            const decoded = await verify(
                token,
                process.env.ACCESS_TOKEN_ADMIN_SECRET
            );

            if (!decoded) {
                return res.status(403).json({
                    message: 'forbidden...',
                });
            }
            req.admin = decoded;
            return next();
        } catch (error) {
            logger.error(error.message);
            return res.status(500).json({
                message: '🥱 ' + error.message,
            });
        }
    },
};

const accessTokenUser = data => {
    return sign(data, process.env.ACCESS_TOKEN_USER_SECRET);
};

const accessTokenAdmin = data => {
    return sign(data, process.env.ACCESS_TOKEN_ADMIN_SECRET);
};
