import { emit } from "@zecco/events/network-events.js";
// import {store} from "@zecco/store/store.js";

export const NETWORK_STATUS = Object.freeze({
	ONLINE: "online",
	OFFLINE: "offline",
});

class NetworkHandler {
	constructor() {
		this.status = navigator.onLine
			? NETWORK_STATUS.ONLINE
			: NETWORK_STATUS.OFFLINE;

		this.init();
	}

	init() {
		window.addEventListener("online", () => this.setOnline());
		window.addEventListener("offline", () => this.setOffline());
	}

	setOnline() {
		this.status = NETWORK_STATUS.ONLINE;

		// store.setNetworkState(this.status);
		emit("NETWORK_ONLINE", { status: this.status });
	}

	setOffline() {
		this.status = NETWORK_STATUS.OFFLINE;

		// setNetworkState(this.status);
		emit("NETWORK_OFFLINE", { status: this.status });
	}

	getStatus() {
		return this.status;
	}
}

export const networkHandler = new NetworkHandler();
