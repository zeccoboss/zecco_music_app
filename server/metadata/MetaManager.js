const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");
const { parseStream, selectCover, parseBuffer } = require("music-metadata");
const { v4: uuidV4 } = require("uuid");
const MinIOService = require("../services/MinIOService");
const { Readable } = require("node:stream");
const AppConfig = require("../config/App");

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

	#readFileWithBuffer = async (buffer) => {
		try {
			const metaData = await parseBuffer(buffer); // Parse the buffer and remove metadata

			// Check if metadata valid
			if (!metaData) {
				console.error("No metadata");
				return null;
			}

			return {
				fileName: null, // Filename
				metaData, // Metadata
				stream: Readable.from(buffer), // Audio file
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
			artist: common.artist ?? "Unknown Artist",
			duration: format.duration ?? null,
			artists: common.artists ?? [],
			bitrate: format.bitrate ?? null,
			sampleRate: format.sampleRate ?? null,
			album: common.album ?? "Unknown Album",
			hasVideo: format.hasVideo ?? false,
			hasAudio: !!format.hasAudio,
			hasCover: !!cover?.data,
			genre: format.genre ?? null,
			year: common.year ?? null,
			coverUrl: cover?.data
				? coverUrl
				: `${AppConfig.baseUrl}/images/default/music.default.png`,
			coverFormat: cover ? cover.format : "image/png",
			audioUrl: audioUrl,
			audioFormat: format.hasAudio && !format.hasVideo ? "audio/mpeg" : null,
		};
	}

	#storeCover(data) {
		return this.#imagesStorage.uploadFile({
			fileName: id,
			media: cover ? cover.data : null,
			dir: "cover",
			extension: "jpeg",
			flag: "Buffer",
			bucketName: "image-files",
			contentType: "image/jpeg",
		});
	}

	#storeAudio() {
		return this.#audiosStorage.uploadFile({
			fileName: id,
			media: !!format.hasAudio === true ? data.stream : null,
			dir: "local",
			extension: "mp3",
			flag: "Stream",
			bucketName: "audio-files",
			contentType: "audio/mpeg",
		});
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
					bucketName: "image-files",
					contentType: "image/jpeg",
				});

				const audioUrl = await this.#audiosStorage.uploadFile({
					fileName: id,
					media: !!format.hasAudio === true ? data.stream : null,
					dir: "local",
					extension: "mp3",
					flag: "Stream",
					bucketName: "audio-files",
					contentType: "audio/mpeg",
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

	async processFile({ path, flag, buffer, bufferName }) {
		try {
			// Check to know if path or file passed is valid
			if (flag === "Path" && !path)
				return console.error("Audio path required");

			// Chose what to do on matching flag
			let readData;
			if (flag === "Path") readData = await this.#readFileWithPath(path);
			if (flag === "Buffer")
				readData = await this.#readFileWithBuffer(buffer); // Get the read file

			// If there's no data or stream then return
			if (!readData.metaData || !readData.stream)
				return console.warn("No data to transform!"); // Check if data is returned

			// Get file name from read data or default to passed buffer name
			const fileName =
				readData.fileName ??
				bufferName.slice(0, bufferName.lastIndexOf("."));

			// Get useful metadata
			const { common, format } = readData.metaData; // Get the common and format from metadata
			const cover = selectCover(common.picture); // Get cover or return custom values

			const id = `${uuidV4()}`; // Generate file name
			// Upload cover and get the active url
			const coverUrl = await this.#imagesStorage.uploadFile({
				fileName: id,
				media: cover ? cover.data : null,
				dir: "cover",
				extension: "jpeg",
				flag: "Buffer",
				bucketName: "image-files",
				contentType: "image/jpeg",
			});

			const audioUrl = await this.#audiosStorage.uploadFile({
				fileName: id,
				media: !!format.hasAudio === true ? readData.stream : null,
				dir: "local",
				flag: "Stream",
				extension: "mp3",
				bucketName: "audio-files",
				contentType: "audio/mpeg",
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
