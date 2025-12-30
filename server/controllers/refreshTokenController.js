const jwt = require("jsonwebtoken");

const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

const handleRefreshToken = (req, res) => {
	const cookies = req.cookies;
	console.log(cookies);

	if (!cookies?.jwt) return res.sendStatus(401);

	console.log(cookies.jwt);
	const refreshToken = cookies.jwt;
	const foundUser = usersDB.users.find((u) => u.refreshToken === refreshToken);

	if (!foundUser) return res.sendStatus(403);

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || foundUser.username !== decoded.username)
				return res.sendStatus(403);

			const accessToken = jwt.sign(
				{ username: decoded.username },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "15m" }
			);
			res.json({ accessToken });
		}
	);
};

module.exports = { handleRefreshToken };
