import { ObjectId } from 'mongodb'

export async function findTopicByName(db, name) {
  const topic = await db.collection('topics').findOne({ value: name })

  if (!topic) return null

  topic._id = String(topic._id)

  return topic
}

export async function findTopics(db, limit = 50) {
  const topics = await db
    .collection('topics')
    .find({})
    .sort({ postsPublished: -1 })
    .limit(Number(limit))
    .toArray()

  return topics.map((topic) => {
    topic._id = String(topic._id)
    return topic
  })
}

export async function findTopicAndUpdate(db, id, change = 1) {
  const topic = await db
    .collection('topics')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { postsPublished: change } }
    )

  return topic
}

export async function insertTopic(
  db,
  { label, value, name, description, color }
) {
  const topic = {
    label,
    value,
    name,
    description,
    color,
    postsPublished: 0,
  }

  const { insertedId } = await db.collection('topics').insertOne(topic)

  return insertedId
}
