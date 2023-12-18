const AppError = require('./appError');
// functions
function handleCastErrorDB(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  const operationalError = new AppError(message, 400);
  console.log(operationalError);
  return operationalError;
}

const sendErrDev = (res, err) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};

const sendProdError = (res, err) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.log(err);
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
    if (err.name === 'CastError') {
      error = handleCastErrorDB(err);
    }

    sendProdError(res, error);
  }
};
