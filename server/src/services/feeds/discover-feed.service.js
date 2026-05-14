const TrackModel = require("../../models/track.model");
const UserModel = require("../../models/user.model");
const RecentPlayModel = require("../../models/recent-plays-model");

const {
	toTrackCard,
	toArtistCard,
} = require("../../helpers/feed-transformers.helper");

const IMAGE_POPULATE = {
	path: "coverImageId",
	select: "storage",
};

const AVATAR_POPULATE = {
	path: "avatarImageId",
	select: "storage",
};

// ── Discover Feed ─────────────────────────────────────
const getDiscoverFeed = async ({ limit = 10 }) => {
	const queryLimit = Math.min(50, Math.max(1, Number(limit)));

	const baseQuery = {
		visibility: "public",
	};

	const [newUploads, trending, topTracks, popular] = await Promise.all([
		TrackModel.find(baseQuery)
			.sort({ createdAt: -1 })
			.limit(queryLimit)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),

		TrackModel.find(baseQuery)
			.sort({ playCount: -1 })
			.limit(queryLimit)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),

		TrackModel.find(baseQuery)
			.sort({ likeCount: -1 })
			.limit(queryLimit)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),

		TrackModel.find(baseQuery)
			.sort({ playCount: -1 })
			.limit(queryLimit)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),
	]);

	return {
		sections: [
			{
				type: "newUploads",
				items: newUploads.map(toTrackCard),
			},
			{
				type: "trending",
				items: trending.map(toTrackCard),
			},
			{
				type: "topTracks",
				items: topTracks.map(toTrackCard),
			},
			{
				type: "popular",
				items: popular.map(toTrackCard),
			},
		],
	};
};

module.exports = {
	getDiscoverFeed,
};
