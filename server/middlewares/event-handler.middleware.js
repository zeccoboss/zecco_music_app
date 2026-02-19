const fs = require("node:fs");
const fsPromise = fs.promises;
const { v4: uuidV4 } = require("uuid");
const path = require("node:path");
const { format } = require("date-fns");

const eventLogger = async (message, fileName) => {
	try {
		// Declare variables to hold dynmic and static paths
		const logDir = path.join(__dirname, "..", "logs");
		const filePath = path.join(logDir, fileName);

		// Format date
		const dateTime = format(new Date(), "ddMMyyyy\tHH:mm:ss");

		//
		const logItem = `${uuidV4()}\t${dateTime}\t${message}\n`;

		// Create logs directory when its not found
		if (!fs.existsSync(logDir)) await fsPromise.mkdir(logDir);

		// Add message to the logs file
		await fsPromise.appendFile(filePath, logItem);
	} catch (error) {
		console.log(error);
	}
};

const logger = (req, _res, next) => {
	const fileName = "eventLogs.txt";

	const message = `${req.url}\t${req.method}\t${req.headers.origin}`;

	eventLogger(message, fileName);
	console.log(`${req.url}\t${req.method}\t${req.headers.origin}`);
	next();
};

module.exports = { logger, eventLogger };
