import {
  findNotificationsByUserId,
  findNotificationsWithProfile,
} from '@api-lib/db'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const { userId, type, limit, skip } = req.query

  if (limit && skip) {
    const notifications = await findNotificationsWithProfile(
      req.db,
      userId,
      type,
      +limit,
      +skip
    )

    return res.json({ notifications })
  } else {
    const notifications = await findNotificationsByUserId(req.db, userId)

    return res.json({ notifications })
  }
})

export default handler
