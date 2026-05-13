const jwt = require("jsonwebtoken");

const optionalJWT = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader?.startsWith("Bearer ")) {
			return next();
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		req.user = decoded;

		next();
	} catch (err) {
		// Ignore invalid/expired token
		next();
	}
};

module.exports = optionalJWT;
