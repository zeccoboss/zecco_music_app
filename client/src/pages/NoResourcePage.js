import restoreDefaultLayout from "../helpers/restoreDefaultLayout.js";
import { router } from "../routes/router.js";
import CreateElement from "../utils/CreateElement.js";

// Create element
const noResourcePageInstance = new CreateElement("div");

// Set attributes
noResourcePageInstance.addClass("no_resource_page");
noResourcePageInstance.setId("no-resource-page");
// show_not_found_page;

noResourcePageInstance.innerHTML = `
	<h1>404</h1>	
	<p>Resource not found</p>
	<a href="/" class="nfp-link">Return Home</a>
`;

// notFoundPage.style(`
// 	display: flex;
// 	place-content: center;1
// 	font-family: Verdana, Geneva, Tahoma, sans-serif;
// 	padding-top: 3rem;
// 	color: hsla(0, 80%, 80%);
// `);

const rtnHomeBtn = noResourcePageInstance.getChild("nfp-link", "class");

rtnHomeBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (noResourcePageInstance.hasClass("show_no_resource_page"))
		noResourcePageInstance.removeClass("show_no_resource_page");

	// router.navigateTo(e.target.href);
});

//
const NoResourcePage = () => noResourcePageInstance.getElement();

export { noResourcePageInstance, NoResourcePage };
