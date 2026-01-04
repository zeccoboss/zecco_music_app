const verifyToken = (req, res) => {
	const token = req.params;
	if (!token) return res.sendStatus(400);
};

module.exports = { verifyToken };
