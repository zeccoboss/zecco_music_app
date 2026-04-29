const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const minioClient = require("../config/minio.config");

const BUCKETS = {
	images: "images",
	audios: "audios",
};

/**
 * Upload a buffer to MinIO.
 * @param {object} opts
 * @param {"images"|"audios"} opts.bucket
 * @param {string}  opts.key        - Object key (filename/path inside bucket)
 * @param {Buffer}  opts.buffer     - File data
 * @param {string}  opts.mimeType   - e.g. "image/jpeg"
 * @returns {Promise<string|null>}  - The stored key, or null on failure
 */
const uploadObject = async ({ bucket, key, buffer, mimeType }) => {
	try {
		await minioClient.send(
			new PutObjectCommand({
				Bucket: bucket,
				Key: key,
				Body: buffer,
				ContentType: mimeType,
				ContentLength: buffer.length, // Avoids chunked-encoding issues with MinIO
			}),
		);
		return key;
	} catch (err) {
		console.error(
			`[MinIO] Upload failed — bucket: ${bucket}, key: ${key}`,
			err,
		);
		return null;
	}
};

/**
 * Delete an object from MinIO.
 * @param {object} opts
 * @param {"images"|"audios"} opts.bucket
 * @param {string} opts.key
 * @returns {Promise<boolean>}
 */
const deleteObject = async ({ bucket, key }) => {
	try {
		await minioClient.send(
			new DeleteObjectCommand({ Bucket: bucket, Key: key }),
		);
		return true;
	} catch (err) {
		console.error(
			`[MinIO] Delete failed — bucket: ${bucket}, key: ${key}`,
			err,
		);
		return false;
	}
};

/**
 * Store an audio cover image.
 * @param {{ data: Buffer, format: string, fileName: string }} cover
 * @returns {Promise<string|null>} Stored key or null
 */
const storeAudioCover = async (cover) => {
	if (!cover || typeof cover !== "object") {
		console.error("[MinIO] Invalid audio cover object");
		return null;
	}

	const ext = cover.format.slice(cover.format.indexOf("/") + 1);
	const key = `${cover.fileName}.${ext}`;

	return uploadObject({
		bucket: BUCKETS.images,
		key,
		buffer: Buffer.from(cover.data),
		mimeType: cover.format ?? "image/jpeg",
	});
};

/**
 * Store an audio file.
 * @param {Express.Multer.File} file  - Multer file object (memory storage)
 * @param {string} audioName          - Generated unique name for the file
 * @returns {Promise<string|null>} Stored key or null
 */
const storeAudio = async (file, audioName) => {
	if (!file || typeof file !== "object") {
		console.error("[MinIO] Invalid audio file object");
		return null;
	}

	const ext = file.originalname.slice(file.originalname.lastIndexOf(".") + 1);
	const key = `${audioName}.${ext}`;

	return uploadObject({
		bucket: BUCKETS.audios,
		key,
		buffer: file.buffer,
		mimeType: file.mimetype ?? "audio/mpeg",
	});
};

/**
 * Store a user image (avatar or cover photo).
 * @param {Express.Multer.File} file  - Multer file object (memory storage)
 * @param {string} uniqueName         - Pre-generated unique filename (no extension)
 * @returns {Promise<string|null>} Stored key or null
 */
const storeImage = async (file, uniqueName) => {
	if (!file || typeof file !== "object") {
		console.error("[MinIO] Invalid image file object");
		return null;
	}

	const ext = file.mimetype.slice(file.mimetype.indexOf("/") + 1);
	const key = `${uniqueName}.${ext}`;

	return uploadObject({
		bucket: BUCKETS.images,
		key,
		buffer: file.buffer,
		mimeType: file.mimetype,
	});
};

/**
 * Generate a short-lived presigned URL for direct MinIO access.
 * @param {object} opts
 * @param {string} opts.bucket
 * @param {string} opts.key
 * @param {number} opts.expiresIn - seconds (default 60)
 * @returns {Promise<string|null>}
 */
const getPresignedUrl = async ({ bucket, key, expiresIn = 60 }) => {
	try {
		const command = new GetObjectCommand({ Bucket: bucket, Key: key });
		const url = await getSignedUrl(minioClient, command, { expiresIn });
		return url;
	} catch (err) {
		console.error(
			`[MinIO] Presigned URL failed — bucket: ${bucket}, key: ${key}`,
			err,
		);
		return null;
	}
};

module.exports = {
	uploadObject,
	deleteObject,
	storeAudioCover,
	storeAudio,
	storeImage,
	getPresignedUrl, // 👈 add this to existing exports
	BUCKETS,
};
