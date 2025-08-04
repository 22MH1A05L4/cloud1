const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadCSV } = require('../controllers/uploadController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// ✅ Ensure 'uploads' folder exists
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// ✅ Multer Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// ✅ File Filter – Only CSV allowed
const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() === ".csv") {
    cb(null, true);
  } else {
    cb(new Error("Only .csv files are allowed!"), false);
  }
};

// ✅ Multer Upload
const upload = multer({
  storage,
  fileFilter,
});

// ✅ POST /api/upload - Use the uploadController
router.post("/", protect, upload.single("file"), uploadCSV);

module.exports = router;
