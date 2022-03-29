import nextConnect from 'next-connect'
import middleware from '@api-lib/middlewares/middleware'
import { passport } from '@api-lib/auth'
import { extractUser } from '@lib/user'
import { NextApiResponse } from 'next'
import { loginSchema } from '@api-lib/schemas'
import { TNextApiRequest } from '@global/types'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.post(
  (req, res, next) => {
    const { error } = loginSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    })

    if (error) return res.status(400).json(error.details)
    return next()
  },
  passport.authenticate('local'),
  (req: TNextApiRequest, res: NextApiResponse) => {
    res.json({ user: extractUser(req.user) })
  }
)

handler.delete(async (req: TNextApiRequest, res: NextApiResponse) => {
  await req.session.destroy()
  res.status(204).end()
})

export default handler
