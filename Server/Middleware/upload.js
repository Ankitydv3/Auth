const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination: "./uploads/events",

  filename: (req, file, cb) => {

    const ext = path.extname(file.originalname);

    cb(
      null,
      Date.now() + ext
    );

  }

});

const upload = multer({
  storage
});

module.exports = upload;