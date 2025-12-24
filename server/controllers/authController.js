const userDB = {
	users: require("../model/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

const handleLogin = async (req, res) => {
	const { user_name_or_email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(hashPassword);

	res.status(202).json({
		message: "user logged in successfully",
		user: { user_name_or_email },
	});
};

module.exports = [handleLogin];
