const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/images/products'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});

const fileFilter = function (req, file, cb) {
  const msg = {
    message: 'Invalid file type. Only jpg, png image files are allowed',
  };
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
    return cb(null, true);
  } else {
    return cb(msg, false);
  }
};

const configMulter = {
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
};

module.exports = multer(configMulter);
