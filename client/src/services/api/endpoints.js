// ======================================================
// API ENDPOINTS
// Centralized endpoint registry
// ======================================================

export const ENDPOINTS = {
	// ==================================================
	// Auth
	// ==================================================

	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		LOGOUT: "/auth/logout",
		REFRESH: "/auth/refresh",
		VERIFY: "/auth/verify",
		ME: "/auth/me",
	},

	// ==================================================
	// Audio
	// ==================================================

	TRACKS: {
		BASE: "/tracks",
		TRENDING: "/tracks/trending",
		NEW_UPLOADS: "/tracks/new-uploads",
		TOP_TRACKS: "/tracks/top-tracks",
		POPULAR: "/tracks/popular",
		SEARCH: "/tracks/search",
		LIKE: (trackId) => `/tracks/${trackId}/like`,
		STREAM: (trackId) => `/tracks/${trackId}/stream`,
	},

	// ==================================================
	// User
	// ==================================================

	USER: {
		BASE: "/users",
		PROFILE: (userId) => `/users/${userId}`,
		FEATURED_ARTISTS: "/users/featured-artists",
		RECENT_PLAYS: "/users/recent-plays",
		LIKED_CONTENT: "/users/liked",
		FOR_YOU: "/users/for-you",
	},

	// ==================================================
	// Playlists
	// ==================================================

	PLAYLIST: {
		BASE: "/playlists",
		TRENDING: "/playlists/trending",
		FEATURED: "/playlists/featured",
		BY_ID: (playlistId) => `/playlists/${playlistId}`,
	},

	// ==================================================
	// Albums
	// ==================================================

	ALBUM: {
		BASE: "/albums",
		BY_ID: (albumId) => `/albums/${albumId}`,
	},

	// ==================================================
	// Search
	// ==================================================

	SEARCH: {
		ALL: "/search",
	},

	// ==================================================
	// Uploads
	// ==================================================

	UPLOAD: {
		AUDIO: "/upload/audio",
		IMAGE: "/upload/image",
	},

	// ==================================================
	// Feeds
	// ==================================================
	FEEDS: {
		DISCOVER: "feeds/discover",
		EXPLORE: "/feeds/explore",
		FOR_YOU: "/feeds/for-you",
	},
};
