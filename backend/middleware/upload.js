// middleware/upload.js
const multer = require("multer");// primarily used for file uploads.
const path = require("path");//Node.js module for handling file paths, especially to extract file extensions.

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Sets the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
    // prefixes the original filename with the current timestamp to avoid filename collisions.
  }
});

// Checking if the file extension and the MIME type match common image formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  cb("Only images are allowed!");
};

const upload = multer({ storage, fileFilter });// creates a configured multer instance

module.exports = upload;
