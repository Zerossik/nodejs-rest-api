const express = require("express");
const { changeUserAvatar } = require("../controllers/index");
const upload = require("../middleware/uploadFile");

const usersRouter = express.Router();

usersRouter.post("/avatars", upload.single("avatar"), changeUserAvatar);

module.exports = usersRouter;
