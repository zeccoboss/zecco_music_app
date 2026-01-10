const minioClient = require("../config/minioConn");
const { Readable } = require("node:stream");

class MinIOService {
	constructor(bucketName, contentType) {
		if (!bucketName || !contentType)
			console.error("Bucket name and Content type are required");
		this.bucketName = bucketName ?? null;
		this.contentType = contentType;
	}

	async uploadFile({ fileName, media, dir, flag, extension }) {
		if (!fileName) return console.error("File 'name' required");
		if (!media) return null;

		const stream =
			flag === "Buffer" ? Readable.from(Buffer.from(media)) : media;

		try {
			const etag = await new Promise((resolve, reject) => {
				minioClient.putObject(
					this.bucketName,
					`${fileName}.${extension}`,
					stream,
					{
						contentType: this.contentType,
					},
					(err, etag) => {
						if (err) reject(err);
						resolve(etag);
					}
				);
			});

			const url = `${this.bucketName}/${fileName}.${extension}`;

			return etag ? url : null;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	/*
	async uploadAudios(fileName, stream, dir) {
		if (!fileName) console.error("File 'name' required");

		if (!cover) return null;

		const stream = cover ? Readable.from(Buffer.from(cover.data)) : null;
		// console.log(this._extension);

		try {
			const etag = await new Promise((resolve, reject) => {
				minioClient.putObject(
					this.bucketName,
					`${fileName}.jpeg`,
					stream,
					{
						contentType: this.contentType,
					},
					(err, etag) => {
						if (err) reject(err);
						resolve(etag);
					}
				);
			});
			const url = dir
				? `http://127.0.0.1:9000/${process.env.MINIO_IMAGE_BUCKET}/${dir}/${fileName}.${this._extension}`
				: `http://127.0.0.1:9000/${process.env.MINIO_IMAGE_BUCKET}/${fileName}.${this._extension}`;

			return etag ? url : null;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	*/
	deleteFile(fileName) {
		console.log(fileName);
	}
}

module.exports = MinIOService;
