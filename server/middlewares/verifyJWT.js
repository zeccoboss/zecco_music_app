const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "No token provided or invalid token format" });
	}
	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403); // Forbidden since an error occurred
		req.user = decoded.UserInfo; // Pas objects the decoded value to the req
		next();
	});
};

module.exports = verifyJWT;
