require("dotenv").config();
const express = require("express");
const path = require("node:path");
const cors = require("cors");
const { corsOptions } = require("./src/config/cors-options.config");
const { logger } = require("./src/middlewares/event-handler.middleware");
const { errorLogger } = require("./src/middlewares/error-handler.middleware");
const { initAdmin } = require("./src/core/init-admin.core");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./src/middlewares/verify-jwt.middleware");
const { credentials } = require("./src/middlewares/credentials.middleware");
const { connectDB } = require("./src/config/db.config");
const mongoose = require("mongoose");
const appConfig = require("./src/config/app.config");
const { seedTracks } = require("./seed-tracks");

connectDB(); // Connect to mongodb
const app = express(); // Create App
const PORT = appConfig.port; // Get PORT

app.use(credentials); // Handle options credentials check - before CORS! and fetch cookies credentials requirement
app.use(cors(corsOptions)); // CORS
app.use(logger); // Logs all Events

// Middle wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Server html page
app.use("/", require("./src/routes/root.route"));

// API routes
app.use("/api/v1/auth", require("./src/routes/api/auth.route"));
app.use("/api/v1/oauth", require("./src/routes/api/oauth.route"));
app.use("/api/v1/auth/refresh", require("./src/routes/refresh.route")); // Routes
app.use("/api/v1/users", verifyJWT, require("./src/routes/api/users.route")); // Users routes
app.use("/api/v1/images", verifyJWT, require("./src/routes/api/images.route")); //
app.use("/api/v1/tracks", require("./src/routes/api/audios.route")); // Music routes
app.use("/api/v1/feeds", require("./src/routes/api/feeds.route"));

// Serve 404 page
app.use((_, res) => {
	const filePath = path.join(__dirname, "public", "views", "no-resource.html");
	res.status(404).sendFile(filePath);
});

// Logs all errors
app.use(errorLogger);

mongoose.connection.once("open", () => {
	console.log("Connected to mongoDB");

	// seedTracks();

	// Create admin on server start
	initAdmin(); // Initialize admin user if not exists

	// Listen for request on port
	app.listen(PORT, () => {
		console.log(`🔥 Server running on "http://localhost:${PORT}"`);
		console.log("");
	});
});
