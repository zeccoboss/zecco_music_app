const { eventLogger } = require("./eventHandler");

const errorLogger = (err, _req, res, next) => {
	const fileName = "errorLogs.txt";
	const message = `${err.name}\t${err.message}`;
	eventLogger(message, fileName);
	res.status(500).json({ error: err.message });
	console.error(`[ERROR]: ${err}`);
	next();
};

module.exports = { errorLogger };
