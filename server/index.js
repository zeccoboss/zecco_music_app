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
const { getAllAudios } = require("./controllers/audiosController");

connectDB(); // Connect to mongodb

// Create App and Get PORT
const app = express();
const PORT = process.env.PORT || 7830;

//
app.use(credentials);

// CORS
app.use(cors(corsOptions));

// Logs all Events
app.use(logger);

// Create admin on server start
initAdmin();

// Middle wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Server html page
app.use("/", require("./routes/root"));

// Users auth routes
app.use("/auth/register", require("./routes/registerUser"));
app.use("/auth/verify:token", require("./routes/token"));
app.use("/auth/login", require("./routes/loginUser"));
app.use("/auth/logout", require("./routes/logoutUser"));
app.use("/profile", require("./routes/profile"));
app.use("/refresh", require("./routes/refresh"));

// // app.use(verifyJWT);
// getAllAudios()
// 	.then((data) => {
// 		data.forEach((au) => {
// 			console.log(au.common);
// 		});
// 	})
// 	.catch((err) => console.error(err));

// Users routes
app.use("/users", verifyJWT, require("./routes/api/users"));

// Music routes
app.use("/api/media/audios", require("./routes/api/audios"));

// Serve 404 page
app.use((_, res) => {
	res.status(404).sendFile(
		path.join(__dirname, "public", "views", "notFound.html")
	);
});
app.use("/auth/verify:token", require("./routes/token"));
app.use("/auth/login", require("./routes/loginUser"));
app.use("/auth/logout", require("./routes/logoutUser"));
app.use("/profile", require("./routes/profile"));
app.use("/refresh", require("./routes/refresh"));

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
