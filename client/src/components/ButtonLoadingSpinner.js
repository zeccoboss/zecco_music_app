import CreateElement from "../utils/CreateElement.js";
const buttonLoadingSpinner = new CreateElement("div");

buttonLoadingSpinner.addClass("button_loading_spinner");
buttonLoadingSpinner.setId("button-loading-spinner");

// buttonLoadingSpinner.style(`
//    border: 1px solid red;
// `);

export { buttonLoadingSpinner };
