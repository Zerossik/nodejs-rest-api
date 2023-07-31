const reqError = require("../helpers/reqError.js");

const jwt = require("jsonwebtoken");
const { User } = require("../models/user.js");

const authenticate = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw reqError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user) {
      throw reqError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    throw reqError(401, "Not authorized");
  }
};

module.exports = authenticate;
