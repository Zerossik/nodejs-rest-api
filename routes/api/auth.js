const express = require("express");
const {
  signUp,
  signIn,
  getCurrent,
  logout,
  verifyEmail,
  resendEmail,
} = require("../../controllers/auth-controller.js");
const { validateBody } = require("../../decorators/index.js");
const { authSchemaJoi, authSchemaVerify } = require("../../models/user.js");
const { authenticate } = require("../../middleware/index.js");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(authSchemaJoi), signUp);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/verify", validateBody(authSchemaVerify), resendEmail);
authRouter.post("/signin", validateBody(authSchemaJoi), signIn);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);
module.exports = authRouter;
