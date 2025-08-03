const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadCSV } = require('../controllers/uploadController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

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

// ✅ POST /api/upload
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded or invalid file type" });
  }

  res.status(200).json({
    filePath: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
