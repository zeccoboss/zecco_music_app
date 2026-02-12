import appConfig from "../config/AppConfig";

const getLocalStorageData = (identifier) => {
	return (
		JSON.parse(localStorage.getItem(`${appConfig.appName}-${identifier}`)) ||
		null
	);
};

const setToLocalStorage = (key, value) => {
	localStorage.setItem(
		`${appConfig.appName}-${key}`,
		JSON.stringify(`${value}`),
	);
};

export { getLocalStorageData, setToLocalStorage };
