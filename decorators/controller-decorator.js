const controllerDecorator = (f) => {
  return async (req, res, next) => {
    try {
      await f(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = controllerDecorator;
