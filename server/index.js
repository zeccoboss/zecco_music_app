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

require("dotenv").config();

// Create App and Get PORT
const app = express();
const PORT = process.env.PORT || 5200;

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
app.use("/auth/login", require("./routes/loginUser"));
app.use("/auth/logout", require("./routes/logoutUser"));
app.use("/refresh", require("./routes/refresh"));

// app.use(verifyJWT);

// Users routes
app.use("/users", verifyJWT, require("./routes/api/users"));

// Music routes
app.get("/api/media/audios", require("./routes/api/audios"));

// Serve 404 page
app.use((_, res) => {
	res.status(404).sendFile(
		path.join(__dirname, "public", "views", "notFound.html")
	);
});

// Logs all errors
app.use(errorLogger);

// Listen for request on port
app.listen(PORT, () => {
	console.log(`🔥 Server running on "http://localhost:${PORT}"`);
});
