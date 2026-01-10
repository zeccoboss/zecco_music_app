// const fs = require("node:fs");
const { Readable } = require("node:stream");

const handleAudioUpload = (req, res) => {
	if (!req.file.buffer) res.status(400).json({ error: "No file uploaded" });
	const stream = Readable.from(req.file.buffer);
	console.log(stream);
	res.sendStatus(200);
	// res.json({ message: req.file.Buffer });
};

module.exports = handleAudioUpload;
