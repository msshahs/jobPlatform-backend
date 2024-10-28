const response = function (res, statusCode, data, message, status) {
  return res.status(statusCode).send({
    data: data,
    message: message,
    status: status,
  });
};

global.response = response;
