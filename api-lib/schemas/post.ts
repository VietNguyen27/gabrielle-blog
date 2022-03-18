import {
  MAX_LENGTH_20000,
  MAX_LENGTH_255,
  MIN_LENGTH_8,
} from '@utils/constants'
import Joi from 'joi'

export const postSchema = Joi.object({
  title: Joi.string()
    .min(MIN_LENGTH_8)
    .max(MAX_LENGTH_255)
    .required()
    .messages({
      'string.min': `Title must be at least ${MIN_LENGTH_8} characters long.`,
      'string.max': `Title must be less than or equal to ${MAX_LENGTH_255} characters long.`,
      'string.empty': 'Title is not allowed to be empty.',
    }),
  description: Joi.string()
    .max(MAX_LENGTH_255)
    .messages({
      'string.max': `Description must be less than or equal to ${MAX_LENGTH_255} characters long.`,
    }),
  topic: Joi.string().min(3).required().messages({
    'any.required': 'Please at least one topic.',
    'string.min': 'Please at least one topic.',
  }),
  rawCover: Joi.string().required().messages({
    'any.required': 'Please choose a cover image.',
  }),
  contentUnsafe: Joi.string()
    .min(MIN_LENGTH_8)
    .max(MAX_LENGTH_20000)
    .required()
    .messages({
      'string.min': `Content must be at least ${MIN_LENGTH_8} characters long.`,
      'string.max': `Content must be less than or equal to ${MAX_LENGTH_20000} characters long.`,
      'string.empty': 'Content is not allowed to be empty.',
    }),
})
