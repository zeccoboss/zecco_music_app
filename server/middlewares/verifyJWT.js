const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "No token provided or invalid token format" });
	}
	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);

		req.user = decoded.username;
		next();
	});
};

module.exports = verifyJWT;
