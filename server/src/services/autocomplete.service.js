const TrackModel = require("../models/track.model");
const UserModel = require("../models/user.model");

/**
 * Rapid-fire search for suggestions
 */
const fetchSuggestions = async (query) => {
	try {
		const regex = new RegExp(`^${query}`, "i"); // Matches start of string for better UX

		const [tracks, artists] = await Promise.all([
			TrackModel.find({ title: regex, visibility: "public" })
				.limit(5)
				.select("title uuid")
				.lean(),
			User.find({
				$or: [{ username: regex }, { fullname: regex }],
			})
				.limit(3)
				.select("username fullname uuid")
				.lean(),
		]);

		// Merge into a flat list of simple strings or small objects
		const suggestions = [
			...tracks.map((t) => ({ text: t.title, type: "track", uuid: t.uuid })),
			...artists.map((a) => ({
				text: a.username || a.fullname,
				type: "artist",
				uuid: a.uuid,
			})),
		];

		return suggestions;
	} catch (error) {
		throw error;
	}
};

module.exports = { fetchSuggestions };
