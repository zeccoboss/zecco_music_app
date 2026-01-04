/** biome-ignore-all lint/correctness/noUnusedVariables: <explanation> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
const bcrypt = require("bcrypt");
const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");
// const jwt = require("jsonwebtoken");
const { parseFile } = require("music-metadata");
const loadAudioFilesHelper = require("../helpers/loadAudioFilesHelper");

const audiosDB = {
	users: require("../models/audios.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

const getAllAudios = async (_req, res) => {
	try {
		const data = await loadAudioFilesHelper.loadAudioFiles();
		// res.json({ message: "I have audio data" });
		return data;
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
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
