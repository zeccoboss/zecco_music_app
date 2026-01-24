const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");
const MetaManager = require("../metadata/MetaManager");
const LocalMedia = require("../models/LocalMedia");

const initLocalAudio = async (flag) => {
	try {
		const metaManager = new MetaManager("Public");
		const localAudioDir = path.join(__dirname, "..", "public", "audios");
		console.log("Processing local data...");
		const data = await metaManager.processDirectory(localAudioDir); //
		// console.log(data);
		if (!data) return res.sendStatus(404);
		const localAudios = Promise.all(data.map(async (audio) => audio));
		const result = await LocalMedia.insertMany(await localAudios);
	} catch (err) {
		console.error(err);
	}
};

module.exports = initLocalAudio;
