// services/user.service.js
const UserModel = require("../models/user.model");

// Service functions related to user operations (recent searches, player state, etc.)
const updateRecentSearches = async (userId, searchTerm) => {
	// Step 1: Remove the term if it already exists (Prevents duplicates)
	await UserModel.findByIdAndUpdate(userId, {
		$pull: { recentSearches: searchTerm },
	});

	// Step 2: Push to the start and slice to 10
	return await UserModel.findByIdAndUpdate(
		userId,
		{
			$push: {
				recentSearches: {
					$each: [searchTerm],
					$position: 0,
					$slice: 10,
				},
			},
		},
		{ new: true },
	).select("recentSearches");
};

// Sync recent searches from client to server (called on app launch to merge local and server history)
const syncRecentSearches = async (userId, localArray) => {
	const user = await User.findById(userId);

	// Merge: Local storage items first, then existing DB items
	const merged = [...localArray, ...user.recentSearches];

	// Remove duplicates and keep only the first 10 unique items
	const uniqueItems = [...new Set(merged)].slice(0, 10);

	user.recentSearches = uniqueItems;
	await user.save();

	return uniqueItems;
};

// Update player state (current track, progress, isPlaying) - called on pause or heartbeat
const updatePlayerState = async (userId, stateData) => {
	const { trackId, progressMs, isPlaying } = stateData;

	return await User.findByIdAndUpdate(
		userId,
		{
			$set: {
				"playerState.currentTrack": trackId,
				"playerState.progressMs": progressMs,
				"playerState.isPlaying": isPlaying,
				"playerState.lastUpdated": new Date(),
			},
		},
		{ new: true },
	)
		.select("playerState")
		.populate("playerState.currentTrack");
};

// Get last player state (current track, progress, isPlaying) - called on app launch to resume playback
const getPlayerState = async (userId) => {
	const user = await User.findById(userId).select("playerState").populate({
		path: "playerState.currentTrack",
		select: "title artist coverUrl duration trackUrl", // Only fetch what the player needs
	});

	if (!user) throw new Error("User not found");

	return user.playerState;
};

module.exports = {
	syncRecentSearches,
	updateRecentSearches,
	updatePlayerState,
	getPlayerState,
};
