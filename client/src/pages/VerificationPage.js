import CreateElement from "../utils/CreateElement.js";

// Create instance
const verificationPage = new CreateElement("div");

// Set attributes
verificationPage.setId("verification-page");
verificationPage.addClass("verification_page", "");
// show_verification_page;

// Create a function to return the component
const VerificationPage = () => verificationPage.getElement();

// Make the instance and component available
export { verificationPage, VerificationPage };
