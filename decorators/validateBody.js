const reqError = require("../helpers/reqError.js");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(reqError(404, error.message));
    }
    next();
  };
};

module.exports = validateBody;
