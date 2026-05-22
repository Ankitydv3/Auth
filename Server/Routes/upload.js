const express = require("express");

const router = express.Router();

const upload = require("../Middleware/upload");

router.post(
  "/event",
  upload.single("eventImage"),
  (req, res) => {

    res.json({
      success: true,
      file: req.file.filename,
      path: req.file.path
    });

  }
);

module.exports = router;