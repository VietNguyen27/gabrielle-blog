import { ObjectId } from 'mongodb'

export async function findLikes(db, postId) {
  return db
    .collection('likes')
    .find({
      postId: new ObjectId(postId),
    })
    .toArray()
}

export async function likePost(db, postId, userId) {
  const post = await db
    .collection('posts')
    .findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $inc: { likesCount: 1 } },
      { returnDocument: 'after' }
    )

  await db
    .collection('likes')
    .insertOne({ postId: new ObjectId(postId), userId: new ObjectId(userId) })

  return post.value
}

export async function unlikePost(db, postId, userId) {
  const post = await db
    .collection('posts')
    .findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $inc: { likesCount: -1 } },
      { returnDocument: 'after' }
    )

  await db
    .collection('likes')
    .deleteOne({ postId: new ObjectId(postId), userId: new ObjectId(userId) })

  return post.value
}
