const express = require("express");
// const validateBody = require("../decorators/validateBody.js");
const { signUp } = require("../controllers/auth-controller.js");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
module.exports = authRouter;
