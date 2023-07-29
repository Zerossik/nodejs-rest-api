const { User } = require("../models/user.js");
const decorator = require("../decorators/controller-decorator.js");
const reqError = require("../helpers/reqError.js");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const getUserByEmail = await User.findOne({ email });
  if (getUserByEmail) {
    throw reqError(409, "Conflict");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  console.log(hashPassword);
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = {
  signUp: decorator(signUp),
};
