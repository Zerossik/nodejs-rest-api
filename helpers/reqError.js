const statusError = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  409: "Conflict",
};

const reqError = (status, message = "") => {
  const error = new Error(
    `${status} ${statusError[status] ? statusError[status] : message}`
  );
  error.status = status;
  return error;
};

module.exports = reqError;
