/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <WIll update file later> */
const metaManager = require("../metadata/meta-manager.metadata");

const getAllAudios = async (_req, res) => {
	try {
		const localMedia = await AudioModel.find();
		(async () => res.json(await localMedia))();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

const getAudio = (req, res) => {};
const createAudio = async (req, res) => {};
const updateAudio = (req, res) => {};
const deleteAudio = (req, res) => {};

const uploadAudio = async (req, res) => {
	if (!req.file.buffer) res.status(400).json({ error: "No file uploaded" });
	const userId = req.user.id; // Get id

	// Check if theres user
	if (!userId) return res.status(406).json({ error: "Cant proceed upload" });

	const metadata = await metaManager.processAudio(userId, req.file);
	res.json(metadata);
};

// module.exports = handleAudioUpload;

module.exports = {
	getAllAudios,
	getAudio,
	createAudio,
	updateAudio,
	deleteAudio,
	uploadAudio,
};
