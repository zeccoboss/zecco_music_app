class AppUser {
	#user = null;

	get user() {
		return this.#user;
	}

	set user(data) {
		if (!data || (!data) instanceof Object) {
			console.warn(`Could not set user with data: ${data}`);
			return;
		} else {
			this.#user = { ...data };
		}
	}

	removeUser() {
		this.#user = null;
		console.log('User logged out with status "Success"');
	}
}

export const appUser = new AppUser();

appUser.user = {
	_id: "6985428636f47a7153ed5a2f",
	username: "zecco",
	email: "ezekielobang@gmail.com",
	fullname: "Obang Ezekiel",
	isVerified: true,
	bio: "A full time music practitioner!",
};
