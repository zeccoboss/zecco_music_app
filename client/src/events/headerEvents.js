import { DropDownList } from "../components/DropDownList";

const listItems = `
	<li id="hd-crt-playlist-btn">Create new playlist</li>
	<li id="hd-upload-music-btn">Upload Music</li>
`;

const headerEvent = () => {
	const dropDownList = DropDownList("header-add-list", "header_add_list");
	dropDownList.setInnerHTML(listItems);

	const header = document.querySelector("header");
	const headerPlusBtn = document.getElementById("header-plus-btn");
	headerPlusBtn.style.position = "relative";
	headerPlusBtn.appendChild(dropDownList.getElement());

	header.addEventListener("click", (e) => {
		e.stopPropagation();

		if (e.target === headerPlusBtn) {
			dropDownList.getElement().classList.toggle("show_header_add_list");
		} else {
			if (
				dropDownList.getElement().classList.contains("show_header_add_list")
			)
				dropDownList.removeClass("show_header_add_list");
		}
	});

	headerPlusBtn.addEventListener("click", (e) => {
		const list = header.querySelector("#header-add-list");
		const addPlayListBtn = document.querySelector("#hd-crt-playlist-btn");
		const uploadMusicBtn = document.querySelector("#hd-upload-music-btn");

		if (e.target === addPlayListBtn) {
			console.log("Create new playlist");
		} else if (e.target === uploadMusicBtn) {
			console.log("Upload music");
		}
	});
};

export { headerEvent };
