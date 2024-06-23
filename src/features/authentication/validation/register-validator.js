import Joi from "joi";
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .messages({ "string.empty": "Email is not allowed to be empty." })
    .message({
      "string.email":
        "Email is not formatted correctly and is not a valid email.",
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^[0-9a-zA-Z]{5,}$"))
    .messages({ "string.empty": "Password is not allowed to be empty." })
    .message({
      "string.pattern.base": "Password must be at least 5 characters.",
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Password and confirm password did not match." })
    .messages({
      "string.empty": "Confirm password is not allowed to be empty.",
    }),
});

const validateRegister = (inputRegister) => {
  const { error } = registerSchema.validate(inputRegister, {
    abortEarly: false,
  });

  if (error) {
    const errorMassage = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return errorMassage;
  }
};

export default validateRegister;
