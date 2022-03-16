import { ObjectId } from 'mongodb'

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
      { $project: dbProjectionCreators('creator.') },
    ])
    .toArray()

  if (!post[0]) return null

  return changeDataObjectToString(post[0])
}

export async function findPosts(db, by, not, limit = 10) {
  const posts = await db
    .collection('posts')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(not && { _id: { $ne: new ObjectId(not) } }),
        },
      },
      { $sort: { _id: -1 } },
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
        $project: { content: 0, cover: 0, ...dbProjectionCreators('creator.') },
      },
    ])
    .toArray()

  return posts.map((post) => {
    changeDataObjectToString(post)
    return post
  })
}

export async function insertPost(
  db,
  { creatorId, content, topic, title, cover, readingTime, published }
) {
  const post = {
    creatorId,
    content,
    topic,
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

  const { insertedId } = await db.collection('posts').insertOne(post)

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
