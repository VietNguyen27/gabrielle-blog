import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import isEmail from 'validator/lib/isEmail'
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

    if (!isEmail(email)) {
      res.status(400).send('The email you entered is invalid.')
      return
    }
    if (!password || !username) {
      res.status(400).send('Missing field(s)')
      return
    }

    const existedEmail = await req.db
      .collection('users')
      .countDocuments({ email })

    if (existedEmail) {
      res.status(403).send('The email has already been used.')
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
