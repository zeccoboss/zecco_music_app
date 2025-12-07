const navigateLogin = () => {
	const extraContent = document.querySelector(".extra_content");
	const overlay = document.querySelector(".overlay");

	overlay.classList.add("show_overlay");

	setTimeout(() => {
		overlay.classList.remove("show_overlay");
		extraContent.classList.add("show_extra_content");
		extraContent.innerHTML = "Login";
	}, 1000);
};

export default navigateLogin;
