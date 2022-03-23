import { ObjectId } from 'mongodb'
import { dbProjectionCreators } from './post'

export async function findComments(db, postId) {
  return db
    .collection('comments')
    .aggregate([
      {
        $match: {
          postId: new ObjectId(postId),
        },
      },
      { $sort: { createdAt: -1 } },
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
}

export async function insertComment(
  db,
  { content, depth = 0, postId, creatorId, parentId = '' }
) {
  const comment = {
    postId: new ObjectId(postId),
    creatorId: new ObjectId(creatorId),
    parentId: parentId ? new ObjectId(parentId) : new ObjectId(postId),
    content,
    likes: [],
    likesCount: 0,
    depth,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as any
  const { insertedId } = await db.collection('comments').insertOne(comment)
  await db
    .collection('posts')
    .findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $inc: { commentsCount: 1 } }
    )

  comment._id = insertedId
  return comment
}
