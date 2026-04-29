// config/minio.config.js
const { S3Client } = require("@aws-sdk/client-s3");

const minioClient = new S3Client({
	endpoint: process.env.MINIO_ENDPOINT, // e.g. http://127.0.0.1:9000
	region: process.env.MINIO_REGION || "us-east-1", //
	credentials: {
		accessKeyId: process.env.MINIO_ACCESS_KEY,
		secretAccessKey: process.env.MINIO_SECRET_KEY,
	},
	forcePathStyle: true, // Required for MinIO — AWS uses subdomains, MinIO uses paths
});

module.exports = minioClient;
