const minioClient = require("../config/minioConn");
const { Readable } = require("node:stream");
const fs = require("node:fs");

class MinIOService {
	constructor(bucketName, contentType) {
		if (!bucketName || !contentType) return;
		console.error("Bucket name and Content type are required");
		this.bucketName = bucketName ?? null;
		this.contentType = contentType;
	}

	async uploadFile({ fileName, media, dir, flag, extension, path }) {
		if (!fileName) return console.error("File 'name' required");
		if (!flag) return console.error("Flag required to store Object");

		let stream = null;
		if (flag === "Buffer") stream = Readable.from(Buffer.from(media));
		if (flag === "Stream") stream = media;
		if (flag === "Path") stream = fs.createReadStream(path);

		// If theres no stream at any occasion don't proceed uploading of files
		if (!stream) return null;

		const contentType = this.contentType;

		try {
			const etag = await new Promise((resolve, reject) => {
				minioClient.putObject(
					this.bucketName,
					`${fileName}.${extension}`,
					stream,
					{ contentType },
					(err, etag) => {
						if (err) reject(err);
						resolve(etag);
					}
				);
			});

			const url = dir
				? `${process.env.MINIO_IMAGE_BUCKET}/${dir}/${fileName}.${this._extension}`
				: `${process.env.MINIO_IMAGE_BUCKET}/${fileName}.${this._extension}`;
			return etag ? url : null;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async uploadProfileImg({ fileName, media, dir, flag, extension, path }) {
		if (!fileName) return console.error("File 'name' required");
		if (!flag) return console.error("Flag required to store Object");

		let stream = null;
		if (flag === "Buffer") stream = Readable.from(Buffer.from(media));
		if (flag === "Stream") stream = media;
		if (flag === "Path") stream = fs.createReadStream(path);

		// If theres no stream at any occasion don't proceed uploading of files
		if (!stream) return null;

		const contentType = this.contentType;

		try {
			const etag = await new Promise((resolve, reject) => {
				minioClient.putObject(
					this.bucketName,
					`${fileName}.${extension}`,
					stream,
					{ contentType },
					(err, etag) => {
						if (err) reject(err);
						resolve(etag);
					}
				);
			});

			const url = dir
				? `${process.env.MINIO_IMAGE_BUCKET}/${dir}/${fileName}.${this._extension}`
				: `${process.env.MINIO_IMAGE_BUCKET}/${fileName}.${this._extension}`;

			return etag ? url : null;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	deleteFile(fileName) {
		console.log(fileName);
	}
}

module.exports = MinIOService;
