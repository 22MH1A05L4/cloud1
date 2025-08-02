// middleware/multerMiddleware.js

const multer = require("multer");
const path = require("path");

// Set storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Folder to save uploaded files
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`
    );
  },
});

// Filter for CSV files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: max 5MB
});

module.exports = upload;
