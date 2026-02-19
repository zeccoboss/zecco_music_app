const verifyToken = (req, res) => {
	const { token } = req.params;
	console.log(req.params);
	if (!token) return res.sendStatus(400);
	res.json({ token });
};

module.exports = { verifyToken };
