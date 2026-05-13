import { buildNode } from "@zecco/utils/dom/build-node";

export function OfflineView(config = {}) {
	const {
		id = "offline-default",
		title = "You're offline",
		message = "Check your connection and try again.",
		icon = "bi-wifi-off",
		retryText = "Retry",
		onRetry = () => {
			console.warn("Retrying internet connection...");
		},
	} = config;

	const node = buildNode(`
		<div class="offline-wrapper" data-id="${id}">
			<div class="offline-icon">
				<i class="bi ${icon}"></i>
			</div>

			<h3 class="offline-title">${title}</h3>

			<p class="offline-msg">${message}</p>

			<button class="offline-retry-btn" id="${id}-retry">
				<i class="bi bi-arrow-clockwise"></i>
				${retryText}
			</button>
		</div>
	`);

	node.querySelector(`#${id}-retry`).addEventListener("click", () => {
		onRetry();
	});

	return node;
}
