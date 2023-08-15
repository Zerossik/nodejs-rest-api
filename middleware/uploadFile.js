const multer = require("multer");
const path = require("path").resolve("tmp");

const storage = multer.diskStorage({
  destination: path,
  filename: (req, file, cb) => {
    const prefix = `${Date.now()}-${Math.round(Math.random() * 1e9)} `;
    cb(null, `${prefix}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
