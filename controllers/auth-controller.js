const { User } = require("../models/user.js");
const decorator = require("../decorators/controller-decorator.js");
const reqError = require("../helpers/reqError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const getUserByEmail = await User.findOne({ email });
  if (getUserByEmail) {
    throw reqError(409);
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;
  const user = await User.findOne({ email });
  if (!user) throw reqError(401);
  const checkPasswors = await bcrypt.compare(password, user.password);
  if (!checkPasswors) throw reqError(401);
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  res.json({ token });
};

module.exports = {
  signUp: decorator(signUp),
  signIn: decorator(signIn),
};
