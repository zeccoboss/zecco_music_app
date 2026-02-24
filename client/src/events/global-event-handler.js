import { closest, matches } from "../helpers/event-delegation-helpers.js";

export function globalEventHandler() {
	document.addEventListener("click", (e) => {
		e.preventDefault();
	});
}
