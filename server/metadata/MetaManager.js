const fs = require("node:fs/promises");
const path = require("node:path");
const { parseFile } = require("music-metadata");

class MetaManager {
	constructor() {
		this.name = "MetaManager";
	}

	#loadAudioFiles = async () => {
		try {
			audioDirPath = path.join(__dirname, "..", "public", "audios");
			audioFiles = await fs.readdir(audioDirPath, "utf8");
			audiosWithMetadata = Promise.all(
				audioFiles.map(async (file) => {
					filePath = path.join(audioDirPath, file);
					metaData = await parseFile(filePath);
					return metaData;
				})
			);
			return audiosWithMetadata;
		} catch (err) {
			console.error(err);
		}
	};
}

module.exports = MetaManager;
