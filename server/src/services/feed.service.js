const AudioModel = require("../models/audio.model");
const UserModel = require("../models/user.model");
const RecentPlayModel = require("../models/recent-plays-model");

const {
	toTrackCard,
	toArtistCard,
} = require("../helpers/feed-transformers.helper");

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
		AudioModel.find(baseQuery)
			.sort({ createdAt: -1 })
			.limit(queryLimit)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),

		AudioModel.find(baseQuery)
			.sort({ playCount: -1 })
			.limit(queryLimit)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),

		AudioModel.find(baseQuery)
			.sort({ likeCount: -1 })
			.limit(queryLimit)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),

		AudioModel.find(baseQuery)
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

// ── Explore Feed ─────────────────────────────────────
const getExploreFeed = async () => {
	const genres = [
		{
			name: "Afrobeats",
			icon: "bi-boombox",
			colorClass: "genre-afrobeats",
		},
		{
			name: "Hip Hop",
			icon: "bi-vinyl",
			colorClass: "genre-hiphop",
		},
		{
			name: "Amapiano",
			icon: "bi-music-note-beamed",
			colorClass: "genre-amapiano",
		},
		{
			name: "R&B",
			icon: "bi-disc",
			colorClass: "genre-rnb",
		},
	];

	const [trendingArtists, newThisWeek, trendingTracks] = await Promise.all([
		UserModel.find({})
			.sort({ uploadsCount: -1 })
			.limit(10)
			.select("username username uploadsCount avatarImageId")
			.populate(AVATAR_POPULATE)
			.lean({ virtuals: true }),

		AudioModel.find({ visibility: "public" })
			.sort({ createdAt: -1 })
			.limit(10)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),

		AudioModel.find({ visibility: "public" })
			.sort({ playCount: -1 })
			.limit(10)
			.populate(IMAGE_POPULATE)
			.lean({ virtuals: true }),
	]);

	return {
		genres,
		trendingArtists: trendingArtists.map(toArtistCard),
		newThisWeek: newThisWeek.map(toTrackCard),
		trendingTracks: trendingTracks.map(toTrackCard),
		activeFilter: "all",
	};
};

const getForYouFeed = async (userId) => {
	// Guest users
	if (!userId) {
		const popularRightNow = await AudioModel.find({
			visibility: "public",
		})
			.sort({ playCount: -1 })
			.limit(10)
			.populate("coverImageId");

		return {
			isLoggedIn: false,
			hasEnoughData: false,

			recentPlays: [],
			liked: [],
			genreRecs: [],

			popularRightNow: popularRightNow.map(toTrackCard),

			topGenre: null,
		};
	}

	// ── Recent Plays ─────────────────────────────
	const recentDocs = await RecentPlayModel.find({
		userId,
	})
		.sort({ updatedAt: -1 })
		.limit(10)
		.populate({
			path: "audioId",
			populate: {
				path: "coverImageId",
			},
		});

	const recentPlays = recentDocs.map((doc) => doc.audioId).filter(Boolean);

	// ── User Likes ───────────────────────────────
	const user = await UserModel.findById(userId).populate({
		path: "likedTracksIds",
		populate: {
			path: "coverImageId",
		},
	});

	const likedTracksIds = user?.likedTracksIds || [];

	// ── Determine Top Genre ──────────────────────
	const genreMap = {};

	for (const track of [...recentPlays, ...likedTracksIds]) {
		for (const genre of track.genre || []) {
			genreMap[genre] = (genreMap[genre] || 0) + 1;
		}
	}

	let topGenre = null;

	if (Object.keys(genreMap).length) {
		topGenre = Object.entries(genreMap).sort((a, b) => b[1] - a[1])[0][0];
	}

	// ── Genre Recommendations ────────────────────
	let genreRecs = [];

	if (topGenre) {
		genreRecs = await AudioModel.find({
			visibility: "public",
			genre: topGenre,
		})
			.sort({ playCount: -1 })
			.limit(10)
			.populate("coverImageId");
	}

	// ── Popular Fallback ─────────────────────────
	const popularRightNow = await AudioModel.find({
		visibility: "public",
	})
		.sort({ playCount: -1 })
		.limit(10)
		.populate("coverImageId");

	return {
		isLoggedIn: true,

		hasEnoughData: recentPlays.length > 0 || likedTracksIds.length > 0,

		recentPlays: recentPlays.map(toTrackCard),

		liked: likedTracksIds.map(toTrackCard),

		genreRecs: genreRecs.map(toTrackCard),

		popularRightNow: popularRightNow.map(toTrackCard),

		topGenre,
	};
};

module.exports = {
	getForYouFeed,
	getDiscoverFeed,
	getExploreFeed,
};
