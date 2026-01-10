// const path = require("node:path");
// const MetaManager = require("../metadata/MetaManager");
const LocalMedia = require("../models/LocalMedia");

const getAllAudios = async (_req, res) => {
	try {
		const localMedia = await LocalMedia.find();
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

module.exports = {
	getAllAudios,
	getAudio,
	createAudio,
	updateAudio,
	deleteAudio,
};
