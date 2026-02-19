import { closest, matches } from "../helpers/eventDelegationHelpers";

export function globalEventHandler() {
	document.addEventListener("click", (e) => {
		e.preventDefault();
	});
}
