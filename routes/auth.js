const express = require("express");
const { signUp, signIn } = require("../controllers/auth-controller.js");
const { validateBody } = require("../decorators/index.js");
const { authSchemaJoi } = require("../models/user.js");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(authSchemaJoi), signUp);
authRouter.post("/signin", validateBody(authSchemaJoi), signIn);
module.exports = authRouter;
