const express = require("express");
const path = require("node:path");
const { parseFile } = require("music-metadata");
const fsPromise = require("node:fs/promises");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const { logger } = require("./middlewares/eventHandler");
const { errorLogger } = require("./middlewares/errorHandler");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5200;

app.use(cors(corsOptions));
app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.get("/api/media/audios", async (_req, res) => {
	try {
		const dirPath = path.join(__dirname, "public", "audios");
		const files = await fsPromise.readdir(dirPath, "utf-8");

		const transformedData = await Promise.all(
			files.map(async (el) => {
				const src = path.join(dirPath, el);
				const metadata = await parseFile(src);

				return {
					file: el,
					metadata: metadata,
				};
			})
		);

		// console.log(transformedData);
		res.json(transformedData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

app.use("/users", require("./routes/api/users"));

app.use((_, res) => {
	res.status(404).sendFile(
		path.join(__dirname, "public", "views", "notFound.html")
	);
});

app.use(errorLogger);

app.listen(PORT, () => {
	console.log(`🔥 Server running on "http://localhost:${PORT}"`);
});
