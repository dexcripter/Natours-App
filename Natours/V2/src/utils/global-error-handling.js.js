const AppError = require('./appError');
// functions
function handleCastErrorDB(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  const operationalError = new AppError(message, 400);
  console.log(operationalError);
  return operationalError;
}

function handleDuplicateErrorDB(err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/).at(0);
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
}

const sendErrDev = (res, err) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};

function handleJWTError(err) {
  return new AppError('Invalid token. Please log in again', 401);
}

const handleExpiredToken = (err) =>
  new AppError('Token expired. Please log in again');

const sendProdError = (res, err) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res
      .status(500)
      .json({ status: 'error', message: 'Something went wrong' });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'An error occured';

  if (process.env.NODE_ENV === 'development') {
    sendErrDev(res, err);
  } else if (process.env.NODE_ENV === 'production') {
    let error;
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (err.name === 'TokenExpiredError') error = handleExpiredToken(error);

    sendProdError(res, error);
  }
};
