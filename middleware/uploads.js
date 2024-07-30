const express = require("express");
const multer = require("multer");

const app = express();

module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, files, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).fields([
  { name: "thumbnail_image", maxCount: 1 },
  { name: "main_image", maxCount: 1 },
]);
