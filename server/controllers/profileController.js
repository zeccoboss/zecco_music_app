const jwt = require("jsonwebtoken");
const usersDB = {
	users: require("../models/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

const profieController = (req, res) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer "))
		return res.status(401).json({ error: "No or invalid token format" });
	const token = authHeader.split(" ")[1];
	try {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) return res.sendStatus(401);
			const dcdUsrN = decoded.UserInfo.username;
			const currentUser = usersDB.users.find((u) => u.username === dcdUsrN);
			if (!currentUser) return res.sendStatus(404);

			// Remove sensitive field
			delete currentUser.password;
			delete currentUser.isVerified;
			delete currentUser.refreshToken;
			res.status(200).json({ user: currentUser });
		});
	} catch (error) {
		// console.log(err);
		res.status(500).json({ error: error.message });
	}
};

module.exports = { profieController };
