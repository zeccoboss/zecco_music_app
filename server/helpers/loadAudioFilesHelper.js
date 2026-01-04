const fs = require("node:fs/promises");
const path = require("node:path");
const { parseFile } = require("music-metadata");

const loadAudioFiles = async () => {
	try {
		const audioDirPath = path.join(__dirname, "..", "public", "audios");
		const audioFiles = await fs.readdir(audioDirPath, "utf8");
		const audiosWithMetadata = Promise.all(
			audioFiles.map(async (file) => {
				const filePath = path.join(audioDirPath, file);
				const metaData = await parseFile(filePath);

				return metaData;
			})
		);
		return audiosWithMetadata;
	} catch (err) {
		console.error(err);
	}
};

module.exports = { loadAudioFiles };
