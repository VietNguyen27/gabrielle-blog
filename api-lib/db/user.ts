import { getRandomColor } from '@utils/utils'
import normalizeEmail from 'validator/lib/normalizeEmail'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

export async function findUserForAuth(db, userId) {
  return db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
    .then((user) => user || null)
}

export async function findUserWithEmailAndPassword(db, email, password) {
  email = normalizeEmail(email)
  const user = await db.collection('users').findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined }
  }
  return null
}

export async function insertUser(
  db,
  { email, password, username, position, interests }
) {
  const user = {
    email,
    username,
    position,
    interests,
    profilePicture: '',
    bio: '',
    backdrop: getRandomColor(),
    skills: [],
    bookmarks: [],
    followers: [],
    followersCount: 0,
    following: [],
    followingCount: 0,
    status: true,
    reportReceived: 0,
  }
  const salt: string = await bcrypt.genSalt(10)
  const hashedPassword: string = await bcrypt.hash(password, salt)
  const { insertedId } = await db.collection('users').insertOne({
    ...user,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  ;(user as any)._id = insertedId

  return user
}
