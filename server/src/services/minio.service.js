const minioClient = require("../config/minio.config");
const { Readable } = require("node:stream");
const appConfig = require("../config/app.config");

class MinIOService {
	static async storeAudioCover(cover) {
		if (!cover || cover instanceof Object === false) {
			console.error("[Object Storage]: Not valid audio cover");
			return null;
		}

		// generate extension
		const ext = `.${cover.format.slice(cover.format.indexOf("/") + 1)}`;

		const stream = Readable.from(Buffer.from(cover.data));
		if (!stream) {
			console.error("[Object Storage]: Not a valid image stream");
			return null;
		}
		const bucket = "images";

		//
		const etag = await new Promise((resolve, reject) => {
			minioClient.putObject(
				bucket,
				`${cover.fileName}${ext}`,
				stream,
				{ "Content-Type": cover?.format ?? "image/jpeg" },
				(err, etag) => {
					if (err) reject(err);
					resolve(etag);
				},
			);
		});

		return etag ? `${bucket}/${cover.fileName}${ext}` : null;
	}

	static async storeAudio(file) {
		if (!file || file instanceof Object === false) {
			console.error("[Object Storage]: Not valid audio");
			return null;
		}

		// generate extension
		const ext = `.${file.originalname.slice(file.originalname.lastIndexOf(".") + 1)}`;
		const bucket = "audios";

		try {
			//
			const etag = await new Promise((resolve, reject) => {
				minioClient.putObject(
					bucket,
					`${appConfig.audioName}${ext}`,
					file.buffer,
					{ "Content-Type": file?.mimetype ?? "audio/mpeg" },
					(err, etag) => {
						if (err) reject(err);
						resolve(etag);
					},
				);
			});

			return etag ? `${bucket}/${appConfig.audioName()}${ext}` : null;
		} catch (err) {
			console.error("[MinIOService]: ", err);
			return null;
		}
	}

	static async storeImage(image) {
		console.log(image);
	}

	/*
	async uploadFile({
		fileName,
		media,
		flag,
		extension,
		path,
		bucketName,
		contentType,
	}) {
		if (!fileName) return console.error("File 'name' required");
		if (!flag) return console.error("Flag required to store Object");

		if (!media) return null;

		let stream = null;
		if (flag === "Buffer") stream = Readable.from(Buffer.from(media));
		if (flag === "Stream") stream = media;
		if (flag === "Path") stream = fs.createReadStream(path);

		// If theres no stream at any occasion don't proceed uploading of files
		if (!stream) return null;

		try {
			const etag = await new Promise((resolve, reject) => {
				minioClient.putObject(
					bucketName,
					`${fileName}.${extension}`,
					stream,
					{ contentType },
					(err, etag) => {
						if (err) reject(err);
						resolve(etag);
					},
				);
			});

			// const url = dir
			// 	? `${bucketName}/${dir}/${fileName}.${extension}`
			// 	: `${bucketName}/${fileName}.${extension}`;
			return etag ? `${bucketName}/${fileName}.${extension}` : null;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	*/
}
module.exports = MinIOService;
// module.exports = { storeImage };
