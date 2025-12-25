/** biome-ignore-all lint/correctness/noUnusedVariables: <explanation> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
const bcrypt = require("bcrypt");
const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");
// const jwt = require("jsonwebtoken");
const { parseFile } = require("music-metadata");

const audiosDB = {
	users: require("../models/audios.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

// Update json file with new data
async function saveAudiosToDB(updatedData, res) {
	try {
		await fsPromises.writeFile(
			path.join(__dirname, "..", "models", "users.json"),
			JSON.stringify(updatedData, null, 3)
		);
	} catch (err) {
		console.error("Error:", err);
		res.status(500).json(err.message);
	}
}

const getAllAudios = async (_req, res) => {
	try {
		const dirPath = path.join(__dirname, "public", "audios");
		const files = await fs.readdir(dirPath, "utf-8");

		const transformedData = await Promise.all(
			files.map(async (el) => {
				const src = path.join(dirPath, el);
				const metadata = await parseFile(src);
				return {
					file: el,
					metadata: metadata,
				};
			})
		);

		// console.log(transformedData);
		res.json(transformedData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const getAudio = (req, res) => {};

const createAudio = async (req, res) => {};

const updateAudio = (req, res) => {};

const deleteAudio = (req, res) => {};

module.exports = {
	getAllAudios,
	getAudio,
	createAudio,
	updateAudio,
	deleteAudio,
};
