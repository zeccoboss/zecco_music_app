const MetaManager = require("../metadata/MetaManager");
const UserMedia = require("../models/UserMedia");
// console.log(require("http").STATUS_CODES);

const handleAudioUpload = async (req, res) => {
	if (!req.file.buffer) res.status(400).json({ error: "No file uploaded" });
	const userId = req.user.id; // Get id
	// console.log(req.file);

	// Check if theres user
	if (!userId) res.status(406).json({ error: "Cant proceed upload" });
	const uploadAudio = new MetaManager(); // Instantiate the MetaData class
	const buffer = req.file.buffer; // Get stream

	// Retrieve the meta data after file has been processed and stored
	const meta = await uploadAudio.processFile({
		buffer: buffer,
		flag: "Buffer",
		bufferName: `${req.file.originalname}`,
	});

	const result = await UserMedia.insertOne({
		owner: userId,
		type: "audio",
		category: "upload",
		media: meta,
	});

	res.json(result);
};

module.exports = handleAudioUpload;
