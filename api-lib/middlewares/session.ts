import { session, Store, MemoryStore } from 'next-session'
import connectMongo from 'connect-mongo'
import { getMongoClient } from './database'

const MongoStore = connectMongo({ Store, MemoryStore } as any)

export default function (req, res, next) {
  const mongoStore = new MongoStore({
    clientPromise: getMongoClient() as any,
    stringify: false,
  })
  return session({
    store: mongoStore,
  })(req, res, next)
}
