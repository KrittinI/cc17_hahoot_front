import Joi from "joi";
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .messages({ "string.empty": "Email is not allowed to be empty." })
    .message({
      "string.email": "Email is not formatted correctly.",
    }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "Password is not allowed to be empty." }),
});

const validateLogin = (inputLogin) => {
  const { error } = loginSchema.validate(inputLogin, {
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

export default validateLogin;
