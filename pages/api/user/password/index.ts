import nextConnect from 'next-connect'
import { middleware, validate } from '@api-lib/middlewares'
import { updateUserPassword } from '@api-lib/db'
import { updatePasswordSchema } from '@api-lib/schemas'

const handler = nextConnect()
handler.use(middleware)

handler.patch(
  validate(updatePasswordSchema, async (req: any, res: any) => {
    if (!req.user) {
      res.json(401).end()
      return
    }
    const { oldPassword, newPassword } = req.body

    const success = await updateUserPassword(
      req.db,
      req.user._id,
      oldPassword,
      newPassword
    )

    if (!success) {
      res.status(401).json([
        {
          context: {
            label: 'oldPassword',
            value: '',
            key: 'oldPassword',
          },
          message: 'The old password you entered is incorrect.',
        },
      ])
      return
    }

    res.status(204).end()
  })
)

export default handler
