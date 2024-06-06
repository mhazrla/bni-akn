const multer = require("multer");
const fs = require("fs");
const path = require("path");

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("File harus berupa file PDF"), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/pdf";
    fs.access(uploadPath, (err) => {
      if (err) {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
          if (err) {
            cb(err, null);
          } else {
            cb(null, uploadPath);
          }
        });
      } else {
        cb(null, uploadPath);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const pdfUpload = multer({
  storage: storage,
  fileFilter: pdfFilter,
}).array("pdfFiles");

module.exports = {
  pdfUploadMiddleware: pdfUpload,
};
