const reqError = (status, message = "") => {
  const error = new Error(`${status} ${message}`);
  error.status = status;
  return error;
};

module.exports = reqError;
