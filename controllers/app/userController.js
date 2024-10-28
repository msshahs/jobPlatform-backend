const status = require("../../config/status");
const message = require("../../config/appMessage");
const UserValidation = require("../../validations/app/userValidation");
const ErrorControllerHandlerAPP =
  require("../../errorHandler/app/index").handleControllerAsyncAPP;
const UserService = require("../../services/app/userService");

module.exports = {
  userFormRecord: async (req, res) => {
    return ErrorControllerHandlerAPP(req, res, async (req, res) => {
      // const valid = await UserValidation.userValidation(req);
      // if (valid.error) {
      //   return response(
      //     res,
      //     status.BAD_REQUEST_CODE,
      //     {},
      //     valid.error.details[0].message,
      //     status.ERROR
      //   );
      // }

      // service
      const record = await UserService.createUserFormRecord(req, res);
      if (record) {
        return response(
          res,
          status.SUCCESS_CODE,
          record,
          message.RECORD_EXISTS,
          status.SUCCESS
        );
      } else {
        return response(
          res,
          status.NOT_FOUND_CODE,
          {},
          message.REQUESTS_EXISTS,
          status.ERROR
        );
      }
    });
  },
};
