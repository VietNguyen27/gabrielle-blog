import { MAX_LENGTH_1024 } from '@utils/constants'
import Joi from 'joi'

export const commentSchema = Joi.object({
  comment: Joi.string()
    .max(MAX_LENGTH_1024)
    .required()
    .messages({
      'string.max': `Comment must be less than or equal to ${MAX_LENGTH_1024} characters long.`,
      'string.empty': 'Comment is not allowed to be empty.',
    }),
})
