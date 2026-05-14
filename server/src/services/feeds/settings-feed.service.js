const User = require("../../models/user.model");
const Image = require("../../models/image.model");

/**
 * Fetches the public profile data for a specific user.
 * @param {string} identifier - Can be the user's uuid or username.
 * @returns {Promise<Object>} The public profile data.
 */
const getPublicProfile = async (identifier) => {
	try {
		// 1. Find user by UUID or Username (useful for custom profile URLs)
		const query =
			identifier.length > 30
				? { uuid: identifier }
				: { username: identifier };

		const profile = await User.findOne(query)
			.select(
				"fullname username bio followersId followingId avatarImageId coverImageId bannerImageId uploadsTracksId playlistIds",
			)
			.populate("avatarImageId coverImageId bannerImageId")
			.populate({
				path: "uploadsTracksId",
				select: "title artist duration coverImageId uuid",
				match: { visibility: "public" }, // Only show public uploads
				populate: { path: "coverImageId", select: "storage name" },
			})
			.populate({
				path: "playlistIds",
				select: "name trackIds public uuid",
				match: { public: true }, // Only show public playlists
			});

		if (!profile) {
			throw new Error("Profile not found");
		}

		// 2. Format the data to focus on social stats and public content
		return {
			identity: {
				fullname: profile.fullname,
				username: profile.username,
				bio: profile.bio,
				avatar: profile.avatarImageId?.url || null,
				cover: profile.coverImageId?.url || null,
				banner: profile.bannerImageId?.url || null,
			},
			stats: {
				followersCount: profile.followersId?.length || 0,
				followingCount: profile.followingId?.length || 0,
				totalUploads: profile.uploadsTracksId?.length || 0,
			},
			content: {
				publicTracks: profile.uploadsTracksId || [],
				publicPlaylists: profile.playlistIds || [],
			},
		};
	} catch (error) {
		console.error("Profile Service Error:", error.message);
		throw error;
	}
};

module.exports = {
	getPublicProfile,
};
