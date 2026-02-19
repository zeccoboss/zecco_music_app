require("dotenv").config();
const express = require("express");
const path = require("node:path");
const cors = require("cors");
const { corsOptions } = require("./config/cors-options.config");
const { logger } = require("./middlewares/event-handler.middleware");
const { errorLogger } = require("./middlewares/error-handler.middleware");
const initAdmin = require("./core/init-admin.core");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middlewares/verify-jwt.middleware");
const { credentials } = require("./middlewares/credentials.middleware");
const { connectDB } = require("./config/db.config");
const mongoose = require("mongoose");
const appConfig = require("./config/app.config");

connectDB(); // Connect to mongodb
const app = express(); // Create App
const PORT = appConfig.port; // Get PORT

app.use(credentials); //
app.use(cors(corsOptions)); // CORS
app.use(logger); // Logs all Events

// Create admin on server start
initAdmin();

// Middle wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Server html page
app.use("/", require("./routes/root.route"));

app.use("/auth", require("./routes/auth.route"));
app.use("/profile", require("./routes/profile.route"));
app.use("/refresh", require("./routes/refresh.route")); // Routes
app.use("/users", verifyJWT, require("./routes/api/users.route")); // Users routes
app.use("/api/media/audio", require("./routes/api/audios.route")); // Music routes

// Serve 404 page
app.use((_, res) => {
	const filePath = path.join(__dirname, "public", "views", "notFound.html");
	res.status(404).sendFile(filePath);
});

// Logs all errors
app.use(errorLogger);

mongoose.connection.once("open", () => {
	console.log("  Connected to mongoDB"); //
	// Listen for request on port
	app.listen(PORT, () => {
		console.log(`   🔥 Server running on "http://localhost:${PORT}"`);
		console.log("");
	});
});

//  For testing purpose
// (async () => {
// const buckets = await minioClient.listBuckets();
// console.log(buckets);
// const mtm = new MetaManager("Public");
// const data = await mtm.processFile({
// 	path: "public/audios/Happiest Year (Afro Mara) | val9ja.mp3",
// 	flag: "Path",
// });
// console.log(data);
// })();
