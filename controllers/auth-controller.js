const { User } = require("../models/user.js");
const decorator = require("../decorators/controller-decorator.js");
const reqError = require("../helpers/reqError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helpers/index.js");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const getUserByEmail = await User.findOne({ email });
  if (getUserByEmail) {
    throw reqError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid(10);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  const data = {
    to: email,
    subject: "Verify Emmail",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
  };
  sendEmail(data)
    .then(() => console.log("Email sended"))
    .catch((error) => console.log(error.message));

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  // при реєстраціі ми заносимо користувача в базу, але з не підтвердженою почтою (verify: false) та додаємо verifyToken/
  // потім відправляємо листа на електронну адресу зі ссилкою для підтвердження почти.
  // в цій ссилці в атрибуті href="ми вказуємо роут для підтвердження". при переході по ссилці браузер автоматично робить гет запит на цей роут

  // далі ми повинні знайти юзера с таким verifyToken в базі.
  const user = await User.findOne({ verificationToken });
  if (!user) throw reqError(404, "User not found");
  // необхідно verify замінити на true та видалити verifyToken.
  user.verify = true;
  user.verificationToken = " ";

  user.save();

  // при авторизаціі ми повинні перевіряти, чи підтвердив користувач свій email.
  console.log(user);

  res.status(200).json({ message: "Verification successful" });
};
const resendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) reqError(400, "missing required field email");
  const user = await User.findOne({ email });

  if (!user) throw reqError(404, "User not found");

  if (user.verify) throw reqError(404, "Verification has already been passed");
  const data = {
    to: email,
    subject: "Verify Emmail",
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">Click verify email</a>`,
  };
  sendEmail(data)
    .then(() => console.log("Email sended"))
    .catch((error) => console.log(error.message));

  res.status(200).json({ message: "Verification email sent" });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;
  const user = await User.findOne({ email });
  if (!user) throw reqError(401, "Email or password is wrong");
  if (!user.verify) throw reqError(401, "email address not confirmed");
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
  verifyEmail: decorator(verifyEmail),
  resendEmail: decorator(resendEmail),
};
