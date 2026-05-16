import "./Toast.styles.css";

/**
 * Toast — Lightweight notification system
 *
 * Singleton container mounted once on document.body at boot.
 * Call toast() from anywhere in the app.
 *
 * Usage:
 *   import { toast } from "@zecco/components/Toast/Toast.js";
 *
 *   toast({ message: "Track uploaded!" });
 *   toast({ message: "Login required", type: "warning" });
 *   toast({ message: "Something went wrong", type: "error" });
 *   toast({ message: "Redirecting...", type: "info", duration: 5000 });
 *   toast({
 *     message: "Upload complete",
 *     type: "success",
 *     action: { label: "View", onClick: () => router.navigate("/library") }
 *   });
 *
 * Props:
 *   message  {string}   — required, text to display
 *   type     {string}   — "success" | "error" | "warning" | "info" (default: "info")
 *   duration {number}   — ms before auto-dismiss (default: 3500)
 *   id       {string}   — optional, lets you dismiss a specific toast programmatically
 *   action   {Object}   — optional { label: string, onClick: Function }
 */

// ── Icon map per type ────────────────────────────────────────
const ICONS = {
	success: "bi-check-circle-fill",
	error: "bi-exclamation-circle-fill",
	warning: "bi-exclamation-triangle-fill",
	info: "bi-info-circle-fill",
};

// ── Singleton container ───────────────────────────────────────
let container = null;

const getContainer = () => {
	if (container && document.body.contains(container)) return container;

	container = document.createElement("div");
	container.className = "toast-container";
	container.setAttribute("aria-live", "polite");
	container.setAttribute("aria-atomic", "false");
	document.body.appendChild(container);
	return container;
};

// ── Active toasts map ─────────────────────────────────────────
// Keyed by id so programmatic dismiss works
const activeToasts = new Map();

// ── Dismiss a single toast ────────────────────────────────────
const dismiss = (id) => {
	const el = activeToasts.get(id);
	if (!el) return;

	el.classList.add("toast--out");

	// Remove after exit animation
	el.addEventListener(
		"animationend",
		() => {
			el.remove();
			activeToasts.delete(id);
		},
		{ once: true },
	);
};

// ── Main toast function ───────────────────────────────────────
/**
 * @param {Object} props
 * @param {string}   props.message
 * @param {string}   [props.type="info"]
 * @param {number}   [props.duration=3500]
 * @param {string}   [props.id]
 * @param {Object}   [props.action]
 * @param {string}   props.action.label
 * @param {Function} props.action.onClick
 * @returns {string} id — use to dismiss programmatically
 */
const toast = ({
	message,
	type = "info",
	duration = 3500,
	id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
	action = null,
}) => {
	if (!message) return id;

	const validType = ["success", "error", "warning", "info"].includes(type)
		? type
		: "info";

	const icon = ICONS[validType];
	const c = getContainer();

	// Build toast element
	const el = document.createElement("div");
	el.className = `toast toast--${validType}`;
	el.setAttribute("role", "alert");
	el.dataset.id = id;

	el.innerHTML = `
		<div class="toast-icon">
			<i class="bi ${icon}"></i>
		</div>
		<span class="toast-message">${message}</span>
		<div class="toast-right">
			${
				action
					? `<button class="toast-action-btn" type="button">${action.label}</button>`
					: ""
			}
			<button class="toast-close-btn" type="button" aria-label="Dismiss">
				<i class="bi bi-x"></i>
			</button>
		</div>
	`;

	// Wire action button
	if (action) {
		el.querySelector(".toast-action-btn")?.addEventListener("click", () => {
			action.onClick?.();
			dismiss(id);
		});
	}

	// Wire close button
	el.querySelector(".toast-close-btn")?.addEventListener("click", () => {
		dismiss(id);
	});

	// Mount
	c.appendChild(el);
	activeToasts.set(id, el);

	// Auto-dismiss
	const timer = setTimeout(() => dismiss(id), duration);

	// Cancel auto-dismiss on hover — gives user time to read
	el.addEventListener("mouseenter", () => clearTimeout(timer));
	el.addEventListener("mouseleave", () => {
		setTimeout(() => dismiss(id), 1500);
	});

	return id;
};

// ── Programmatic dismiss by id ────────────────────────────────
/**
 * Dismiss a specific toast by the id returned from toast()
 * @param {string} id
 */
const dismissToast = (id) => dismiss(id);

/**
 * Dismiss all active toasts
 */
const dismissAll = () => {
	activeToasts.forEach((_, id) => dismiss(id));
};

export { toast, dismissToast, dismissAll };
export default toast;
