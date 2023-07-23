const { isValidObjectId } = require("mongoose");
const reqError = require("../helpers/reqError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(reqError(404, `${contactId} NotFound`));
  }
  next();
};

module.exports = isValidId;
