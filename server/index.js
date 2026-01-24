require("dotenv").config();
const express = require("express");
const path = require("node:path");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const { logger } = require("./middlewares/eventHandler");
const { errorLogger } = require("./middlewares/errorHandler");
const initAdmin = require("./core/initAdmin");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middlewares/verifyJWT");
const { credentials } = require("./middlewares/credentials");
const { connectDB } = require("./config/dbConn");
const mongoose = require("mongoose");
const initLocalAudio = require("./core/initLocalAudio");
// const minioClient = require("./config/minioConn");
// const MetaManager = require("./metadata/MetaManager");

connectDB(); // Connect to mongodb
const app = express(); // Create App
const PORT = process.env.PORT || 7835; // Get PORT

app.use(credentials); //
app.use(cors(corsOptions)); // CORS
app.use(logger); // Logs all Events

// Create admin on server start
initAdmin();
initLocalAudio(); // LoadLocal music/

// Middle wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Server html page
app.use("/", require("./routes/rootRouter"));

app.use("/auth", require("./routes/authRouter"));
app.use("/profile", require("./routes/profileRouter"));
app.use("/refresh", require("./routes/refreshRouter")); // Routes
app.use("/users", verifyJWT, require("./routes/api/usersRouter")); // Users routes
app.use("/api/media/audio", require("./routes/api/audiosRouter")); // Music routes

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
