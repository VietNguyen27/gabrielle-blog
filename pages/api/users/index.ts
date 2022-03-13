import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import normalizeEmail from 'validator/lib/normalizeEmail'
import { middleware, validate } from '@api-lib/middlewares'
import { registerSchema } from '@api-lib/schemas'
import { insertUser } from '@api-lib/db'

const handler = nextConnect()

handler.use(middleware)

handler.post(
  validate(registerSchema, async (req: any, res: NextApiResponse) => {
    const { username, password, position, interests } = req.body
    const email = normalizeEmail(req.body.email)

    const existedEmail = await req.db
      .collection('users')
      .countDocuments({ email })

    if (existedEmail) {
      res.status(403).json([
        {
          context: {
            label: 'email',
            value: '',
            key: 'email',
          },
          message: 'The email has already been used.',
        },
      ])
      return
    }

    const regex = new RegExp(['^', username, '$'].join(''), 'i')
    const existedUsername = await req.db
      .collection('users')
      .countDocuments({ username: regex })

    if (existedUsername) {
      res.status(403).json([
        {
          context: {
            label: 'username',
            value: '',
            key: 'username',
          },
          message: 'The username has already been used.',
        },
      ])
      return
    }

    const user = await insertUser(req.db, {
      email,
      password,
      username,
      position,
      interests,
    })

    req.logIn(user, (err) => {
      if (err) throw err
      res.status(201).json({
        user,
      })
    })
  })
)

export default handler
