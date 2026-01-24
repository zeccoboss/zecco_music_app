import { DropDownList } from "../components/DropDownList";

const listItems = `
	<li id="hd-crt-playlist-btn">Create new playlist</li>
	<li id="hd-upload-music-btn">Upload Music</li>
`;

const headerEvent = () => {
	const dropDownList = DropDownList("header-add-list", "header_add_list");
	dropDownList.innerHTML = listItems;

	const header = document.querySelector("header");
	const headerPlusBtn = document.getElementById("header-plus-btn");
	if (headerPlusBtn) {
		headerPlusBtn.style.position = "relative";
		headerPlusBtn.appendChild(dropDownList.getElement());
		console.log(headerPlusBtn);
	}

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

	if (headerPlusBtn)
		headerPlusBtn.addEventListener("click", (e) => {
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
