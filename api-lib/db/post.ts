import { ObjectId } from 'mongodb'
import { findTopicAndUpdate, insertTopic } from './topic'

export async function findPostById(db, id) {
  const post = await db
    .collection('posts')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      {
        $lookup: {
          from: 'topics',
          localField: 'topic',
          foreignField: '_id',
          as: 'topics',
        },
      },
      { $project: { topic: 0, ...dbProjectionCreators('creator.') } },
    ])
    .toArray()

  if (!post[0]) return null

  const topics = post[0].topics.map(({ _id, ...rest }) => ({
    _id: String(_id),
    ...rest,
  }))

  return { ...changeDataObjectToString(post[0]), topics }
}

export async function findPosts(
  db,
  by,
  topic,
  not,
  limit = 1000,
  skip = 0,
  random = false
) {
  const MAX_RANDOM_POSTS = 4
  const count = await db.collection('posts').countDocuments({})
  const randomIndex = Math.floor(Math.random() * (count - MAX_RANDOM_POSTS))
  const randomSkip =
    randomIndex - MAX_RANDOM_POSTS > 0
      ? randomIndex - MAX_RANDOM_POSTS
      : randomIndex

  const posts = await db
    .collection('posts')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(topic && { topic: new ObjectId(topic) }),
          ...(not && { _id: { $ne: new ObjectId(not) } }),
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: random ? randomSkip : skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      {
        $lookup: {
          from: 'topics',
          localField: 'topic',
          foreignField: '_id',
          as: 'topics',
        },
      },
      {
        $project: { content: 0, topic: 0, ...dbProjectionCreators('creator.') },
      },
    ])
    .toArray()

  return posts.map((post) => {
    const topics = post.topics.map(({ _id, ...rest }) => ({
      _id: String(_id),
      ...rest,
    }))
    changeDataObjectToString(post)
    return { ...post, topics }
  })
}

export async function insertPost(
  db,
  { creatorId, content, topic, title, cover, readingTime, published }
) {
  const post = {
    creatorId,
    content,
    title,
    cover,
    readingTime,
    likes: [],
    likesCount: 0,
    comments: [],
    commentsCount: 0,
    bookmarks: [],
    bookmarksCount: 0,
    published,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const topicArr = await Promise.all(
    topic.map(async (topic) => {
      const { value, label, color } = topic
      const topicExisted = await db.collection('topics').findOne({ value })

      if (topicExisted) {
        await findTopicAndUpdate(db, String(topicExisted._id))
        return topicExisted._id
      } else {
        const insertedId = await insertTopic(db, {
          label,
          value,
          name: value,
          description: '',
          color,
        })
        await findTopicAndUpdate(db, String(insertedId))
        return insertedId
      }
    })
  )

  const { insertedId } = await db
    .collection('posts')
    .insertOne({ ...post, topic: topicArr })

  if (published) {
    await db
      .collection('users')
      .findOneAndUpdate(
        { _id: new ObjectId(creatorId) },
        { $inc: { postsCount: 1 } }
      )
  }

  return insertedId
}

export const changeDataObjectToString = (data) => {
  data._id = String(data._id)
  data.creatorId = String(data.creatorId)
  data.createdAt = data.createdAt.getTime()
  data.updatedAt = data.updatedAt.getTime()
  data.creator.createdAt = data.creator.createdAt.getTime()
  data.creator.updatedAt = data.creator.updatedAt.getTime()

  return data
}

export const dbProjectionCreators = (prefix = '') => {
  return {
    [`${prefix}_id`]: 0,
    [`${prefix}interests`]: 0,
    [`${prefix}password`]: 0,
    [`${prefix}status`]: 0,
    [`${prefix}reportReceived`]: 0,
  }
}
