import CreateElement from "@zecco/utils/dom/create-element";

const AppLogo = () => {
	const logo = new CreateElement("div");
	logo.addClass("logo").setId("app-logo");

	logo.innerHTML = `
		<div class="logo-icon">
			<i class="bi bi-music-note"></i>
		</div>
		<h1 class="logo-text">Soniq<span>Stream</span></h1>
	`;

	return logo.getElement();
};

export default AppLogo;
