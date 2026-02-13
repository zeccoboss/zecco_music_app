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
			this.#user = data;
		}
	}

	removeUser() {
		console.log('User logged out with status "Success"');
	}
}

export const appUser = new AppUser();
