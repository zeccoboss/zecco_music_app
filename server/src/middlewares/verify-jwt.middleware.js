const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "No token provided or invalid token format" });
	}
	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
		if (err) return res.sendStatus(403); // Forbidden since an error occurred
		const user = await UserModel.findById(decoded.UserInfo.id).select(
			"isActive",
		);
		if (user && !user.isActive) {
			return res.status(403).json({ message: "Account suspended." });
		}
		req.user = decoded.UserInfo; // Pas objects the decoded value to the req
		next();
	});
};

module.exports = verifyJWT;
