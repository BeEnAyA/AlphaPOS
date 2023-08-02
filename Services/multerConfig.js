const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads/Admin/");           ///destination where file is to be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);     //how file is named while storing
  },
});

var productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads/Product/");           ///destination where file is to be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);     //how file is named while storing
  },
});

module.exports = {
  multer,
  storage,
  productStorage,
};