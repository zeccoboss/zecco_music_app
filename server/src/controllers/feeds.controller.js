const {
	getDiscoverFeed,
	getExploreFeed,
	getForYouFeed,
} = require("../services/feed.service");

const getDiscover = async (req, res) => {
	try {
		const data = await getDiscoverFeed({
			cursor: req.query.cursor,
			limit: req.query.limit,
		});

		return res.status(200).json({
			success: true,
			...data,
		});
	} catch (err) {
		console.error("[Feed] Discover Error:", err);

		return res.status(500).json({
			success: false,
			message: "Failed to load discover feed",
		});
	}
};

const getExplore = async (req, res) => {
	const data = await getExploreFeed(req.query);

	res.json({
		success: true,
		...data,
	});
};

const getForYou = async (req, res) => {
	try {
		console.log("[ForYou Feed] User ID:", req.user?._id); // Debug log to check user ID presence
		const userId = req.user?._id || null;

		const data = await getForYouFeed(userId);

		return res.status(200).json({
			success: true,
			...data,
		});
	} catch (err) {
		console.error("[ForYou Feed Error]", err);

		return res.status(500).json({
			success: false,
			message: "Failed to load For You feed",
		});
	}
};

module.exports = {
	getDiscover,
	getExplore,
	getForYou,
};
