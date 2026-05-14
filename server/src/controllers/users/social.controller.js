const User = require("../../models/user.model");

const followUser = async (req, res) => {
	try {
		const { targetUuid } = req.params; // The person you want to follow
		const myId = req.user.id; // From verifyJWT

		// 1. Find the target user
		const targetUser = await User.findOne({ uuid: targetUuid });
		if (!targetUser)
			return res.status(404).json({ message: "User not found" });

		// 2. Prevent following yourself
		if (targetUser._id.toString() === myId) {
			return res.status(400).json({ message: "You cannot follow yourself" });
		}

		// 3. Perform the atomic updates
		// Update Me: Add them to my following list
		await User.findByIdAndUpdate(myId, {
			$addToSet: { followingId: targetUser._id },
		});

		// Update Them: Add me to their followers list
		await User.findByIdAndUpdate(targetUser._id, {
			$addToSet: { followersId: myId },
		});

		res.json({
			success: true,
			message: `Now following ${targetUser.username}`,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const unfollowUser = async (req, res) => {
	try {
		const { targetUuid } = req.params;
		const myId = req.user.id;

		const targetUser = await User.findOne({ uuid: targetUuid });
		if (!targetUser)
			return res.status(404).json({ message: "User not found" });

		// Remove from both lists
		await User.findByIdAndUpdate(myId, {
			$pull: { followingId: targetUser._id },
		});

		await User.findByIdAndUpdate(targetUser._id, {
			$pull: { followersId: myId },
		});

		res.json({ success: true, message: `Unfollowed ${targetUser.username}` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { followUser, unfollowUser };
