const isValidId = require("./isValidId.js");
const authenticate = require("./authenticate.js");
const decorator = require("../decorators/controller-decorator.js");
module.exports = {
  isValidId,
  authenticate: decorator(authenticate),
};
