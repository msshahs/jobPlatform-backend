const status = require("../../config/status");
const message = require("../../config/appMessage");

const handleControllerAsyncAPP = async (req, res, callback) => {
  try {
    return await callback(req, res);
  } catch (error) {
    console.error(error);
    return response(
      res,
      status.INTERNAL_SERVER_ERROR_CODE,
      {},
      error?.message || message.INTERNAL_SERVER_ERROR,
      status.ERROR
    );
  }
};

const handleServiceAsyncAPP = async (req, res, callback) => {
  try {
    return await callback(req);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handleControllerAsyncAPP,
  handleServiceAsyncAPP,
};
