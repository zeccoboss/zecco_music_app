const showMobileFooter = () => {
	const app = document.querySelector("#app");
	app.classList.remove("show-mobile-footer");
	document.getElementById("mobile-footer").style.display = "flex";
};
const hideMobileFooter = () => {
	const app = document.querySelector("#app");
	app.classList.add("show-mobile-footer");
	document.getElementById("mobile-footer").style.display = "none";
};

export { showMobileFooter, hideMobileFooter };
