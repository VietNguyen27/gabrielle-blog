import {
  MAX_LENGTH_24,
  MAX_LENGTH_255,
  MIN_LENGTH_6,
  MIN_LENGTH_8,
} from '@utils/constants'
import Joi from 'joi'

export const registerSchema = Joi.object({
  email: Joi.string()
    .min(MIN_LENGTH_8)
    .max(MAX_LENGTH_255)
    .email()
    .required()
    .messages({
      'string.email': 'Not a valid email address.',
      'string.min': `Email must be between ${MIN_LENGTH_8} and ${MAX_LENGTH_255} characters.`,
      'string.max': `Email must be between ${MIN_LENGTH_8} and ${MAX_LENGTH_255} characters.`,
      'string.empty': 'Email is not allowed to be empty.',
    }),
  password: Joi.string()
    .min(MIN_LENGTH_8)
    .max(MAX_LENGTH_24)
    .required()
    .messages({
      'string.min': `Password must be between ${MIN_LENGTH_8} and ${MAX_LENGTH_24} characters.`,
      'string.max': `Password must be between ${MIN_LENGTH_8} and ${MAX_LENGTH_24} characters.`,
      'string.empty': 'Password is not allowed to be empty.',
    }),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .empty('')
    .messages({
      'string.empty': 'Confirmation password is not allowed to be empty.',
      'any.required': 'Confirmation password is not allowed to be empty.',
      'any.only': 'Confirmation password does not match.',
    }),
  position: Joi.string().required().messages({
    'string.empty': 'Please choose one from these options.',
  }),
  interests: Joi.array().min(1).messages({
    'array.min': 'Please select at least one option.',
  }),
  username: Joi.string()
    .min(MIN_LENGTH_6)
    .max(MAX_LENGTH_255)
    .required()
    .messages({
      'string.max': `Username must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
      'string.empty': 'Username is not allowed to be empty.',
    }),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Not a valid email address.',
    'string.empty': 'Email is not allowed to be empty',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is not allowed to be empty',
  }),
})
