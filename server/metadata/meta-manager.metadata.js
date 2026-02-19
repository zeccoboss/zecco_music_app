/** biome-ignore-all lint/correctness/noUnusedVariables: <Will be used when its time> */
const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");
const { parseStream, selectCover, parseBuffer } = require("music-metadata");
const { v4: uuidV4 } = require("uuid");
const MinIOService = require("../services/minio.service");
const { Readable } = require("node:stream");
const AppConfig = require("../config/app.config");
const ImageModel = require("../models/image.model");
const AudioModel = require("../models/audio.model");

class MetaManager {
	#time = new Date().toTimeString();
	#date = `${new Date().toDateString()}-${this.#time.slice(0, this.#time.indexOf(" "))}`;
	async #safeMeta(file, coverId, userId, metadata) {
		if (!metadata || metadata instanceof Object === false) {
			console.error("Not valid metadata");
			return null;
		}

		// const { originalname } = file; // Get original name
		const { common, format } = metadata; // Get the common and format from metadata
		const cover = selectCover(common?.picture); // Get cover of the audio

		const audioName = `ZeccoMusicApp-Audio-${uuidV4()}-${this.#date}`;
		const audioPath = await MinIOService.storeAudio(file, audioName);

		// console.log("user: ", userId);
		// console.log(file.originalname);

		return {
			ownerId: userId,
			name: file.originalname ?? null,
			artist: common.artist ?? null,
			artists: common.artists ?? [],
			album: common.album ?? null,
			bitrate: format.bitrate ?? null,
			codec: format.codec ?? null,
			duration: format.duration ?? null,
			hasAudio: format.hasAudio,
			hasVideo: format.hasVideo ?? false,
			hasCover: !!cover?.data,
			title: common.title ?? null,
			sampleRate: format.sampleRate ?? null,
			year: common.year ?? null,
			coverImageId: coverId ?? null,
			videoId: null,
			path: audioPath ?? null,
			createdAt: Date.now(),
		};
	}

	async #processImage(ownerId, common) {
		if (!common) {
			console.error("[MetaManager]: Common in metadata not available");
			return null;
		}

		const cover = selectCover(common?.picture); // Get cover of the audio
		if (!cover) {
			console.error("[MetaManager]: Audio has no cover!");
			return null;
		}
		const coverName = `ZeccoMusicApp-Cover-${uuidV4()}-${this.#date}`;
		cover.fileName = coverName;
		const coverPath = await MinIOService.storeAudioCover(cover); // Upload and use path

		const image = await ImageModel.create({
			ownerId,
			name: coverName,
			category: "cover",
			path: coverPath,
			format: cover?.format,
			createdAt: Date.now(),
		});

		return image._id;
	}

	async processAudio(userId, file) {
		if (!file || file instanceof Object === false) {
			console.error("File not valid");
			return;
		}

		const metadata = await parseBuffer(file?.buffer); // Parser to get metadata
		const coverId = await this.#processImage(userId, metadata?.common);

		// Pass the required data to get  structured and presentable data
		const safeMetadata = await this.#safeMeta(
			file,
			coverId,
			userId,
			metadata,
		);
		console.log(safeMetadata);

		const audio = await AudioModel.create(safeMetadata);

		// Return the metadata after creating audio in db
		return audio;
	}
}

const metaManager = new MetaManager();
module.exports = metaManager;
