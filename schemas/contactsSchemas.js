import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  number: Joi.string(),
});

export const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required()
})