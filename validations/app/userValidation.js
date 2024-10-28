const Joi = require("joi");

const userValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().required().max(50).min(3).messages({
      "any.required": "Name is required",
      "string.empty": "Name is required",
      "string.max": "Name must be less than or equal to 50 characters",
      "string.min": "Title must be greater than or equal to 3 characters.",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Email is not valid",
      "string.empty": "Email is required",
    }),
    message: Joi.string().required().max(500).min(3).messages({
      "any.required": "Message is required",
      "string.empty": "Message is required",
      "string.max": "Message must be less than or equal to 500 characters",
      "string.min": "Title must be greater than or equal to 3 characters.",
    }),
  });

  return schema.validate(req.body);
};

module.exports = {
  userValidation,
};
