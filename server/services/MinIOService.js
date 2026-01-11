const minioClient = require("../config/minioConn");
const { Readable } = require("node:stream");
const fs = require("node:fs");

class MinIOService {
	constructor(bucketName, contentType) {
		// if (!bucketName || !contentType) return console.error("Bucket name and Content type are required");
		this.bucketName = bucketName;
		this.contentType = contentType;
	}

	async uploadFile({
		fileName,
		media,
		dir,
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
					}
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

	async uploadProfileImg({
		fileName,
		media,
		dir,
		flag,
		extension,
		path,
		bucketName,
		contentType,
	}) {
		if (!fileName) return console.error("File 'name' required");
		if (!flag) return console.error("Flag required to store Object");

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
					}
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

	deleteFile(fileName) {
		console.log(fileName);
	}
}

module.exports = MinIOService;
