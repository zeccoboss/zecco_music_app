const ImageModel = require("../models/image.model");
const { v4: uuidV4 } = require("uuid");

const validateConfig = (data) => {
	if (!data) return console.error("No config object passed");
	if (!data.name) return console.error("Image name required");
	if (!data.path) return console.error("Image path required");
	if (!data.format) return console.error("Image format required");
};

/* === For user avatar === */
function avaterImageHandler(config) {
	// The config needs to be an object that has {id: jhe33ig2t67t8, name: fileName, extension: jpg}
	validateConfig(config);

	return ImageModel.create({
		uuid: uuidV4(),
		ownerId: config.id,
		category: "avatar",
		bucket: "local",
		static: true,
		name: config.name,
		path: config.path,
		format: config.format,
	});
}

/* === For user banner === */
function bannerImageHandler(config) {
	// The config needs to be an object that has {id: jhe33ig2t67t8, name: fileName, extension: jpg,static: false}
	validateConfig(config);

	return ImageModel.create({
		ownerId: config.id,
		uuid: uuidV4(),
		category: "banner",
		bucket: "local",
		static: true,
		name: config.name,
		path: config.path,
		format: config.format,
	});
}

/* === For music covers === */
function coverImage(config) {
	// The config needs to be an object that has {id: jhe33ig2t67t8, name: fileName, extension: jpg,static: false}
	validateConfig(config);

	return ImageModel.create({
		ownerId: config.id,
		uuid: uuidV4(),
		name: config.name,
		path: config.path,
		format: config.format,
		bucket: "images",
		static: false,
	});
}

module.exports = { avaterImageHandler, bannerImageHandler, coverImage };
