import Joi from "joi";

export const userRegistrationSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

