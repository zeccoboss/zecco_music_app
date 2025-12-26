const whitelist = ["http://localhost:5174", "http://localhost:5173"];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
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
