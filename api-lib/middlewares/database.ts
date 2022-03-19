import { MongoClient } from 'mongodb'

global.mongo = global.mongo || {}

let indexesCreated = false
async function createIndexes(db) {
  await Promise.all([
    db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { username: 1 }, unique: true },
    ]),
    db
      .collection('posts')
      .createIndexes([{ key: { createdAt: -1 } }, { key: { user: -1 } }]),
    db.collection('topics').createIndexes([{ key: { createdAt: -1 } }]),
    db
      .collection('comments')
      .createIndexes([{ key: { createdAt: -1 } }, { key: { blog: -1 } }]),
    db
      .collection('notifications')
      .createIndexes([{ key: { createdAt: -1 } }, { key: { receiver: -1 } }]),
    db.collection('feedbacks').createIndexes([{ key: { createdAt: -1 } }]),
  ])
  indexesCreated = true
}

export async function getMongoClient() {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URL as string)
  }
  await global.mongo.client.connect()
  return global.mongo.client
}

export default async function database(req, res, next) {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URL as string)
  }
  req.dbClient = await getMongoClient()
  req.db = req.dbClient.db()
  if (!indexesCreated) await createIndexes(req.db)
  return next()
}
