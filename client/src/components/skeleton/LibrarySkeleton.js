import CreateElement from "../../utils/create-element.js";

const LibrarySkeleton = () => {
	const librarySkeleton = new CreateElement("section");

	// Set attributes
	librarySkeleton.setId("library-skeleton");
	librarySkeleton.addClass("library_skeleton");

	librarySkeleton.innerHTML = `
		Skeleton
	`;

	return librarySkeleton.getElement();
};

export default LibrarySkeleton;
1;
