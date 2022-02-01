module.exports.logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  next(err);
};

// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports.boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
};
