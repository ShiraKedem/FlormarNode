export const errorHandling = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "מצטערים התרחשה שגיאה";
    res.status(statusCode).json({
      type: 'error',
      message: message,
    });
  };