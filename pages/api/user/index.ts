import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { middleware } from '@api-lib/middlewares'
import { extractUser } from '@lib/user'

const handler = nextConnect()

handler.use(middleware)
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json({ user: extractUser(req) })
)

export default handler
