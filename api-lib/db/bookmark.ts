import { ObjectId } from 'mongodb'

export async function findBookmarksByUserId(db, userId) {
  return db
    .collection('bookmarks')
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'postId',
          foreignField: '_id',
          as: 'post',
        },
      },
      { $unwind: '$post' },
      {
        $lookup: {
          from: 'users',
          localField: 'post.creatorId',
          foreignField: '_id',
          as: 'post.creator',
        },
      },
      { $unwind: '$post.creator' },
      {
        $lookup: {
          from: 'topics',
          localField: 'post.topic',
          foreignField: '_id',
          as: 'post.topics',
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    .toArray()
}

export async function findBookmarksByPostId(db, postId) {
  return db
    .collection('bookmarks')
    .find({
      postId: new ObjectId(postId),
    })
    .toArray()
}

export async function savePost(db, postId, userId) {
  const post = await db
    .collection('posts')
    .findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $inc: { bookmarksCount: 1 } },
      { returnDocument: 'after' }
    )

  await db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $inc: { bookmarksCount: 1 } }
    )

  await db.collection('bookmarks').insertOne({
    postId: new ObjectId(postId),
    userId: new ObjectId(userId),
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return post.value
}

export async function unsavePost(db, postId, userId) {
  const post = await db
    .collection('posts')
    .findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $inc: { bookmarksCount: -1 } },
      { returnDocument: 'after' }
    )

  await db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $inc: { bookmarksCount: -1 } }
    )

  await db
    .collection('bookmarks')
    .deleteOne({ postId: new ObjectId(postId), userId: new ObjectId(userId) })

  return post.value
}
