import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import { middleware } from '@api-lib/middlewares'
import { insertUser } from '@api-lib/db'

interface ExtendedRequest {
  body: any
  logIn: any
}

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req: any, res: NextApiResponse) => {
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

export default handler
