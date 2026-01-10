const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");
const { parseStream, selectCover } = require("music-metadata");
const { v4: uuidV4 } = require("uuid");
const MinIOService = require("../services/MinIOService");

class MetaManager {
	constructor(flag) {
		this.flag = flag ?? null;
	}
	#imagesStorage = new MinIOService("image-files", "image/jpeg");
	#audiosStorage = new MinIOService("audio-files", "audio/mpeg");

	#readDirectory = async (dirPath) => {
		try {
			const audioFiles = await fsPromise.readdir(dirPath, "utf8");
			return Promise.all(
				audioFiles.map(async (file) => {
					const filePath = path.join(dirPath, file); // Get path to each
					const stream = fs.createReadStream(filePath); // Get stream (Actual audio)
					const metaData = await parseStream(stream); // Parse the stream and remove metadata
					if (!metaData) return console.error("No metadata"); // Check if metadata valid
					return {
						fileName: file, // Filename
						metaData, // Metadata
						stream: fs.createReadStream(filePath), // Audio file
					};
				})
			);
		} catch (err) {
			console.error(err);
			return [];
		}
	};

	#readFileWithPath = async (filePath) => {
		try {
			const stream = fs.createReadStream(filePath); // Get stream (Actual audio)
			const metaData = await parseStream(stream); // Parse the stream and remove metadata

			if (!metaData) return console.error("No metadata"); // Check if metadata valid
			return {
				fileName: null, // Filename
				metaData, // Metadata
				stream: fs.createReadStream(filePath), // Audio file
			};
		} catch (err) {
			console.error(err);
			return null; // Return no data
		}
	};

	#readFileWithStream = async (stream) => {
		try {
			const metaData = await parseStream(stream); // Parse the stream and remove metadata
			if (!metaData) return console.error("No metadata"); // Check if metadata valid
			return {
				fileName: null, // Filename
				metaData, // Metadata
				stream: fs.createReadStream(filePath), // Audio file
			};
		} catch (err) {
			console.error(err);
			return null; // Return no data
		}
	};

	async #safeMeta(id, metadata, cover, fileName, coverUrl, audioUrl) {
		const { common, format } = metadata; // Remove required properties
		if (!common || !format)
			return console.error("Common or Format not passed");
		// Return object

		return {
			uuid: id,
			fileName,
			title: common.title ?? null,
			artist: common.artist ?? null,
			duration: format.duration ?? null,
			artists: common.artists ?? null,
			bitrate: format.bitrate ?? null,
			sampleRate: format.sampleRate ?? null,
			album: common.album ?? null,
			hasVideo: format.hasVideo ?? false,
			hasAudio: !!format.hasAudio,
			hasCover: !!cover?.data,
			genre: format.genre ?? null,
			year: common.year ?? null,
			coverUrl: coverUrl,
			coverFormat: cover ? cover.format : null,
			audioUrl: audioUrl,
		};
	}

	async processDirectory(dirPath) {
		try {
			// Only allow if path is a string
			if (!dirPath) return console.error("Directory Path required!");
			const readData = await this.#readDirectory(dirPath);

			// Check if data is returned
			if (readData.length === 0)
				return console.warn("No data to transform!");

			// Map the data to transform its content
			return readData.map(async (data) => {
				const { fileName } = data; // Get the common
				const { common, format } = data.metaData; // Get the common
				const cover = selectCover(common.picture); // Get cover or return custom values

				const id = `${uuidV4()}`; // Generate file name
				// Upload cover and get the active url
				const coverUrl = await this.#imagesStorage.uploadFile({
					fileName: id,
					media: cover ? cover.data : null,
					dir: "cover",
					extension: "jpeg",
					flag: "Buffer",
				});

				const audioUrl = await this.#audiosStorage.uploadFile({
					fileName: id,
					media: !!format.hasAudio === true ? data.stream : null,
					dir: "local",
					extension: "mp3",
					flag: "Stream",
				});

				const meta = this.#safeMeta(
					id,
					data.metaData,
					cover,
					fileName,
					coverUrl,
					audioUrl
				); // A method to process metadata

				return meta;
			});
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	async processFile({ path, flag, stream }) {
		try {
			// Check to know if path or file passed is valid
			if (flag === "Path" && !path)
				return console.error("Audio path required");

			const readData =
				flag === "Path"
					? await this.#readFileWithPath(path)
					: await this.#readFileWithStream(stream); // Get the read file

			if (!readData.metaData || !readData.stream)
				return console.warn("No data to transform!"); // Check if data is returned

			const { fileName } = readData; // Get the common
			const { common, format } = readData.metaData; // Get the common
			const cover = selectCover(common.picture); // Get cover or return custom values

			const id = `${uuidV4()}`; // Generate file name
			// Upload cover and get the active url
			const coverUrl = await this.#imagesStorage.uploadFile({
				fileName: id,
				media: cover ? cover.data : null,
				dir: "cover",
				extension: "jpeg",
				flag: "Buffer",
			});

			const audioUrl = await this.#audiosStorage.uploadFile({
				fileName: id,
				media: !!format.hasAudio === true ? readData.stream : null,
				dir: "local",
				flag: "Stream",
				extension: "mp3",
			});

			const meta = this.#safeMeta(
				id,
				readData.metaData,
				cover,
				fileName,
				coverUrl,
				audioUrl
			); // A method to process metadata

			return meta;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

module.exports = MetaManager;
