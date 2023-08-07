const { User } = require("../models/user.js");
const decorator = require("../decorators/controller-decorator.js");
const reqError = require("../helpers/reqError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const getUserByEmail = await User.findOne({ email });
  if (getUserByEmail) {
    throw reqError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: 250 }, false);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;
  const user = await User.findOne({ email });
  if (!user) throw reqError(401, "Email or password is wrong");
  const checkPasswors = await bcrypt.compare(password, user.password);
  if (!checkPasswors) throw reqError(401, "Email or password is wrong");
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      user: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "No Content",
  });
};
module.exports = {
  signUp: decorator(signUp),
  signIn: decorator(signIn),
  getCurrent: decorator(getCurrent),
  logout: decorator(logout),
};
