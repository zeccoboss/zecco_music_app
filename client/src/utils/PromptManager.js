import { overlayInstance } from "../layouts/Overlay.js";
import { router } from "../routes/router";
import CreateElement from "./CreateElement";
import { checkBox, uncheckBox } from "./SVG_ICONS.js";

class PromptManager {
	constructor() {
		this.modal = new CreateElement("div");
	}

	open(config = {}, email) {
		this.modal.setId(config.id);
		this.modal.addClass("prompt_modal", config.class);
		config.mail = email;

		this.modal.innerHTML = `
			<h2 class="modal_title">${config.title} ${config.success ? checkBox : uncheckBox}</h2>
			<p class="modal_message">${config.message}</p>
			<div class="modal_actions">
				${config.actions
					.map((a) => {
						return `<a href="${a.to}" class="modal_actn_lnks">${a.label}</a>`;
					})
					.join(" ")}
			</div>
		`;
		this.#bindActions();
		return { modal: this.modal.getElement(), modalInstance: this.modal };
	}

	close() {
		this.modal.remove();
		overlayInstance.removeClass("show_overlay");
	}

	#bindActions() {
		const links = this.modal.getChildren(".reg_frm_prompt_btn", "class");
		for (const link of links) {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				router.navigateTo(e.target.getAttribute("href"));
			});
		}
		// overlayInstance.style("opacity", "none");
	}
}
// Create a single
export { PromptManager };
