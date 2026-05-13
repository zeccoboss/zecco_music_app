const mongoose = require("mongoose");

const getUri = () => {
	// Use production URI if explicitly set to production
	if (process.env.NODE_ENV === "production") return process.env.MONGODB_URI;

	// Otherwise, default to your development/local database URI
	return process.env.DATABASE_URI;
};

const connectDB = async () => {
	const dbUri = getUri();

	try {
		await mongoose.connect(dbUri, {
			dbName: "soniq", // This forces the connection to use the soniq database
			// In your database connection file
			autoIndex: process.env.NODE_ENV !== "production", // 👈 Only auto-index if NOT in production
		});
		console.log("MongoDB connected to SoniqStream (soniq db) successfully.");
	} catch (error) {
		console.error("Connection error:", error.message);
		process.exit(1);
	}
};
module.exports = { connectDB };
