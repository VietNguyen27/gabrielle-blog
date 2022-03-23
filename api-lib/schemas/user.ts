import { MAX_LENGTH_24, MAX_LENGTH_255, MIN_LENGTH_8 } from '@utils/constants'
import Joi from 'joi'

export const updateUserSchema = Joi.object({
  position: Joi.string()
    .max(MAX_LENGTH_255)
    .required()
    .messages({
      'string.max': `Position must be less than or equal to ${MAX_LENGTH_255} characters long.`,
      'any.required': 'Position is not allowed to be empty.',
    }),
  location: Joi.string()
    .allow('')
    .max(MAX_LENGTH_255)
    .messages({
      'string.max': `Location must be less than or equal to ${MAX_LENGTH_255} characters long.`,
    }),
  bio: Joi.string()
    .max(MAX_LENGTH_255)
    .allow('')
    .messages({
      'string.max': `Bio must be less than or equal to ${MAX_LENGTH_255} characters long.`,
    }),
  skills: Joi.string()
    .max(MAX_LENGTH_255)
    .allow('')
    .messages({
      'string.max': `Skills must be less than or equal to ${MAX_LENGTH_255} characters long.`,
    }),
})

export const updatePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .min(MIN_LENGTH_8)
    .max(MAX_LENGTH_24)
    .required()
    .messages({
      'string.min': `Password must be at least ${MIN_LENGTH_8} characters long.`,
      'string.max': `Password must be less than or equal to ${MAX_LENGTH_24} characters long.`,
      'string.empty': 'Password is not allowed to be empty.',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .empty('')
    .messages({
      'string.empty': 'Confirmation password is not allowed to be empty.',
      'any.required': 'Confirmation password is not allowed to be empty.',
      'any.only': 'Confirmation password does not match.',
    }),
})
