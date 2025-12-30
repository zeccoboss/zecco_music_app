const jwt = require("jsonwebtoken");
const { ROLES_LIST } = require("../config/roles_list");

const usersDB = {
	users: require("../models/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

const handleRefreshToken = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;
	const foundUser = usersDB.users.find((u) => u.refreshToken === refreshToken);
	if (!foundUser) return res.sendStatus(403);
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || foundUser.username !== decoded.username)
				return res.sendStatus(403);
			const roles = Object.values(ROLES_LIST); // get roles valuse
			// Create new access token
			const accessToken = jwt.sign(
				{
					UserInfo: {
						roles: roles,
						username: foundUser.username,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "15m" }
			);
			res.json({ accessToken });
		}
	);
};

module.exports = { handleRefreshToken };
