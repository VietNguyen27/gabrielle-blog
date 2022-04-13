import { ObjectId } from 'mongodb'
import { dbProjectionCreators } from './post'

export async function findFollowersByUserId(db, userId, after = '') {
  const followers = await db
    .collection('followers')
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
          ...(after && { createdAt: { $gt: new Date(after) } }),
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    .toArray()

  return followers
}

export async function findFollowersWithProfileByUserId(
  db,
  userId,
  username,
  limit = 1000,
  skip = 0
) {
  const followers = await db
    .collection('followers')
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followerId',
          foreignField: '_id',
          as: 'follower',
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
      { $unwind: '$follower' },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: dbProjectionCreators('follower.'),
      },
    ])
    .toArray()

  return followers
}
