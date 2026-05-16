const Track = require("../models/track.model");
const User = require("../models/user.model");

/**
 * Performs a global search across tracks and artists.
 * @param {string} query - The search term.
 * @param {string} filter - 'all' | 'tracks' | 'artists'
 */
const getGlobalSearch = async (query, filter = "all") => {
	try {
		const searchRegex = new RegExp(query, "i"); // 'i' for case-insensitive

		// 1. Define the search tasks based on the filter
		const searchTasks = [];

		// If filter is 'all' or 'tracks', search tracks by title (public only)
		if (filter === "all" || filter === "tracks") {
			searchTasks.push(
				Track.find({ title: searchRegex, visibility: "public" })
					.limit(10)
					.populate("user", "username fullname avatar")
					.populate("cover")
					.lean(),
			);
		} else {
			searchTasks.push(Promise.resolve([]));
		}

		// If filter is 'all' or 'artists', search users by username or fullname
		if (filter === "all" || filter === "artists") {
			searchTasks.push(
				User.find({
					$or: [{ username: searchRegex }, { fullname: searchRegex }],
				})
					.limit(8)
					.populate("avatar")
					.lean(),
			);
		} else {
			searchTasks.push(Promise.resolve([]));
		}

		// 2. Execute searches in parallel
		const [tracks, artists] = await Promise.all(searchTasks);

		// 3. Determine the "Top Result" (Extra Smart Logic)
		// We pick the one that matches the query most closely (exact match priority)
		let topResult = null;
		if (tracks.length > 0 || artists.length > 0) {
			const firstTrack = tracks[0];
			const firstArtist = artists[0];

			// Simple scoring: If artist name is an exact match, they win.
			// Otherwise, first track wins.
			if (
				firstArtist &&
				firstArtist.username.toLowerCase() === query.toLowerCase()
			) {
				topResult = { ...firstArtist, type: "Artist" };
			} else if (firstTrack) {
				topResult = { ...firstTrack, type: "Track" };
			} else {
				topResult = { ...firstArtist, type: "Artist" };
			}
		}

		return {
			topResult,
			tracks,
			artists,
			query,
		};
	} catch (error) {
		console.error("Search Service Error:", error);
		throw error;
	}
};

module.exports = { getGlobalSearch };
