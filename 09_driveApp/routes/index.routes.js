const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const authMiddleware = require("../middlewares/auth");

router.get("/home", authMiddleware, (req, res) => {
  res.render("home");
});

router.post("/upload", authMiddleware, upload.single("file"), (req, res) => {
  console.log(req.file);

  const file = new fileModel({
    path: req.file.path,
    originalname: req.file.originalname,
    user: req.user._id,
  });

  res.send("File uploaded");
});

module.exports = router;
