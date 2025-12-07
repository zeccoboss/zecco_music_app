const express = require("express");
const path = require("node:path");
const { parseFile } = require("music-metadata");
const fsPromise = require("node:fs/promises");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5200;

app.use(async (req, res, next) => {
	try {
		const message = `${req.url}\t${req.method}\t${req.headers.origin}\n`;
		const filePath = path.join(__dirname, "logs", "eventLogs.tx");

		await fsPromise.appendFile(filePath, message);
		console.log(`${req.url}\t${req.method}\t${req.headers.origin}`);
	} catch (error) {
		console.log(error);
	}

	next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "public", "views", "index.html")
	);
});

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

app.use((_, res) => {
	res.status(404).sendFile(
		path.join(__dirname, "public", "views", "404.html")
	);
});

app.listen(PORT, () => {
	console.log(`🔥 Server running on "http://localhost:${PORT}"`);
});
