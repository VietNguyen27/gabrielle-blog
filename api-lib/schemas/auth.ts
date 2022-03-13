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
      'string.min': `Email must be at least ${MIN_LENGTH_8} characters long.`,
      'string.max': `Email must be less than or equal to ${MAX_LENGTH_255} characters long.`,
      'string.empty': 'Email is not allowed to be empty.',
    }),
  password: Joi.string()
    .min(MIN_LENGTH_8)
    .max(MAX_LENGTH_24)
    .required()
    .messages({
      'string.min': `Password must be at least ${MIN_LENGTH_8} characters long.`,
      'string.max': `Password must be less than or equal to ${MAX_LENGTH_24} characters long.`,
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
    .alphanum()
    .min(MIN_LENGTH_6)
    .max(MAX_LENGTH_24)
    .required()
    .messages({
      'string.min': `Username must be at least ${MIN_LENGTH_6} characters long.`,
      'string.max': `Username must be less than or equal to ${MAX_LENGTH_24} characters long.`,
      'string.empty': 'Username is not allowed to be empty.',
      'string.alphanum': 'Username must only contain alpha-numeric characters.',
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
