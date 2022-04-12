import { ObjectId } from 'mongodb'
import { dbProjectionCreators } from './post'

export async function findFollowingByUserId(db, userId) {
  const following = await db
    .collection('following')
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    .toArray()

  return following
}

export async function findFollowingWithProfileByUserId(
  db,
  userId,
  username,
  limit = 1000,
  skip = 0
) {
  const following = await db
    .collection('following')
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followingId',
          foreignField: '_id',
          as: 'following',
          pipeline: [
            {
              $match: {
                ...(username && {
                  username: { $regex: username, $options: 'gi' },
                }),
              },
            },
          ],
        },
      },
      { $unwind: '$following' },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: dbProjectionCreators('following.'),
      },
    ])
    .toArray()

  return following
}
