const ImageModel = require("../models/image.model");
const { v4: uuidV4 } = require("uuid");

// Get the image extension by giving file path then use for banner & avater format field
const getImageExtension = (key) => key.slice(key.lastIndexOf(".") + 1);

/* === For user avatar === */
function avaterImageHandler(config) {
	const uuid = uuidV4(); // generate a special uuid

	// Create the image in DB and return the metadata
	return ImageModel.create({
		uuid: uuid,
		name: `user-avatar-${uuid}`,
		category: "avatar",
		...config,
	});
}

/* === For user banner === */
function bannerImageHandler(config) {
	const uuid = uuidV4(); // generate a special uuid

	// Create the image in DB and return the metadata
	return ImageModel.create({
		uuid: uuid,
		name: `user-banner-${uuid}`,
		category: "banner",
		...config,
	});
}

/* === For music covers === */
function coverImage(config) {
	const uuid = uuidV4(); // generate a special uuid

	// Create the image in DB and return the metadata
	return ImageModel.create({
		uuid: uuid,
		name: `audio-cover-${uuid}`,
		category: "cover",
		...config,
	});
}

module.exports = {
	avaterImageHandler,
	bannerImageHandler,
	coverImage,
	getImageExtension,
};
