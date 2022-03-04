import nextConnect from 'next-connect'
import middleware from '@api-lib/middlewares/middleware'
import passport from '@api-lib/auth/passport'
import { extractUser } from 'lib/user'
import { NextApiRequest, NextApiResponse } from 'next'

interface ExtendedRequest {
  user: object
  logOut: () => void
}

const handler = nextConnect<NextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.post(passport.authenticate('local'), (req: ExtendedRequest, res) => {
  res.json({ user: extractUser(req.user) })
})

handler.delete(async (req: any, res) => {
  await req.session.destroy()
  res.status(204).end()
})

export default handler
