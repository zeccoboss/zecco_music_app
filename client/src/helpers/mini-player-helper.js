const showMiniPlayer = () => {
	const app = document.querySelector("#app");
	app.classList.remove("show-mini-player");
	document.getElementById("mini-player").style.display = "flex";
};
const hideMiniPlayer = () => {
	const app = document.querySelector("#app");
	app.classList.add("show-mini-player");
	document.getElementById("mini-player").style.display = "none";
};

export { showMiniPlayer, hideMiniPlayer };
