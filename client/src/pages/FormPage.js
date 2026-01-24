import { LoginForm } from "../components/LoginForm.js";
import { RegisterForm } from "../components/RegisterForm.js";
import CreateElement from "../utils/CreateElement.js";

// Create instance
const formPageInstance = new CreateElement("div");

// Set attributes
formPageInstance.setId("form-page");
formPageInstance.addClass("form_page", "");

// Create a function to return the component
const FormPage = () => {
	formPageInstance.append(LoginForm(), RegisterForm());
	return formPageInstance.getElement();
};

// Make the instance and component available
export { formPageInstance, FormPage };
