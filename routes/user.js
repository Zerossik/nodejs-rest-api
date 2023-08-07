const express = require("express");
const { changeUserAvatar } = require("../controllers/index");
const upload = require("../middleware/uploadFile");
const { authenticate } = require("../middleware/index");

const usersRouter = express.Router();

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  changeUserAvatar
);

module.exports = usersRouter;
