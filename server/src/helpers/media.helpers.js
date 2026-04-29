const fs = require("node:fs");
const path = require("node:path");

function getLocalMediaSize(key) {
	try {
		const filePath = path.join(process.cwd(), "public", key);
		const stats = fs.statSync(filePath);
		return stats.size;
	} catch (err) {
		console.error("[MEDIA_SIZE_HELPER ]: ", err.message);
		return null;
	}
}

const sharp = require("sharp");

async function getLocalImageDimensions(key) {
	try {
		const filePath = path.join(process.cwd(), "public", key);
		const metadata = await sharp(filePath).metadata();

		return {
			width: metadata.width,
			height: metadata.height,
		};
	} catch {
		return null;
	}
}

module.exports = { getLocalMediaSize, getLocalImageDimensions };
