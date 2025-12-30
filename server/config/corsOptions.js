const { allowedOrigins } = require("./allowedOrigins");

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: ["PUT", "POST", "GET", "DELETE"],
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"],
	maxAge: 600,
	optionsSuccessStatus: 204,
};

module.exports = { corsOptions };
