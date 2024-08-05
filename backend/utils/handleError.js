const handleError = ({ res, error, status = 500, message }) => {
    return res.status(status).json({
      status: status,
      message: message ? message : error?.message || "Some Internal error!",
      error,
    });
  };
  module.exports = handleError;
  