import defaultLayout from "../helpers/restore-default-layout.js";
import handleFormNavigation from "../helpers/handle-form-navigation.js";
import { router } from "../routes/router.js";
import { formPageInstance } from "../pages/FormPage.js";
import { forgotPasswordFormPageInstance } from "../pages/ForgotPasswordFormPage.js";

function preventLinksBehavior() {
	const links = document.querySelectorAll("a");
	const inputs = Array.from(document.getElementsByTagName("input"));

	inputs.forEach((input) => {
		input.value = ""; //  Clear all inputs when a link is clicked
	});

	for (const link of links) {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const currentTarget = e.currentTarget;

			if (currentTarget.id === "form-nav-link") {
				// Get the active form page
				const formPage = formPageInstance.hasClass("show_form_page")
					? formPageInstance
					: forgotPasswordFormPageInstance;

				// Add animation and navigate to home page
				handleFormNavigation(1500, formPage, "home");

				// Change the route to navigate
				router.navigateTo(currentTarget.getAttribute("href"));
				return;
			} else {
				router.navigateTo(currentTarget.getAttribute("href"));
			}
		});
	}
}

// function preventFormBehavior() {
// 	const extraContent = document.querySelector(".extra_content");
// 	const forms = extraContent.querySelectorAll(".forms");
// 	const homeNavLink = document.querySelector("#home-links");

// 	forms.forEach((form) => {
// 		form.addEventListener("submit", (e) => {
// 			e.preventDefault();
// 		});

// 		form.addEventListener("click", (e) => {
// 			e.preventDefault();

// 			if (e.target.getAttribute("href") === "/") {
// 				navigateHome(homeNavLink, e.target.getAttribute("href"));
// 			}
// 		});
// 	});
// }

export { preventLinksBehavior };
