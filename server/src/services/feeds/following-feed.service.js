const UserModel = require("../../models/user.model");
const TrackModel = require("../../models/track.model");

/**
 * Aggregates a feed of tracks from users the current user follows.
 */
const getFollowingFeed = async (userId, lastTimestamp, limit = 10) => {
	try {
		const user = await User.findById(userId).select("followingId");
		if (!user || user.followingId.length === 0) return { tracks: [] };

		// Query logic: Find tracks from followed users created BEFORE the last seen timestamp
		const query = {
			user: { $in: user.followingId },
			visibility: "public",
		};

		if (lastTimestamp) {
			query.createdAt = { $lt: new Date(lastTimestamp) };
		}

		const tracks = await Track.find(query)
			.sort({ createdAt: -1 })
			.limit(limit)
			.populate({
				path: "user",
				select: "username fullname avatarImageId",
				populate: { path: "avatarImageId", select: "storage name" },
			})
			.populate({ path: "coverImageId", select: "storage name" });

		return {
			tracks,
			// The timestamp of the last track becomes the 'cursor' for the next fetch
			nextCursor:
				tracks.length === limit
					? tracks[tracks.length - 1].createdAt
					: null,
		};
	} catch (error) {
		throw new Error("Failed to stream feed");
	}
};

module.exports = { getFollowingFeed };
