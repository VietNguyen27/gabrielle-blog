import { MongoClient } from 'mongodb'

global.mongo = global.mongo || {}

async function getMongoClient() {
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
  return next()
}
