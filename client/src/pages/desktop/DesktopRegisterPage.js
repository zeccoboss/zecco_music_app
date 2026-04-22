import { buildNode } from "../../utils/build-node";
import CreateElement from "../../utils/create-element";

const DesktopRegisterPage = () => {
	const page = new CreateElement("div");
	page
		.addClass("register-page", "desktop-form-page", "app-page")
		.setId("register-page");

	const state = {
		get step_one() {
			const html = `
				<div class="desk-brand-side">
					<div class="desk-vinyl"></div>
					<div class="desk-brand-logo">
						<div class="desk-brand-icon-wrap">🎵</div>
						<div class="desk-brand-name">
							Zecco<span>Stream</span>
						</div>
					</div>
					<div class="desk-brand-tag">
						Join thousands of Nigerian artists sharing their
						music on ZeccoStream.
					</div>
					<div class="desk-brand-pills">
						<span class="desk-brand-pill">🎵 Free to join</span>
						<span class="desk-brand-pill">🎤 Upload tracks</span>
						<span class="desk-brand-pill"
							>🌍 Share globally</span
						>
					</div>
				</div>
				<div class="desk-form-side">
					<div class="desk-steps">
						<div class="desk-step active"></div>
						<div class="desk-step"></div>
					</div>
					<div class="desk-form-heading">Create account</div>
					<div class="desk-form-sub">
						Step 1 of 2 — Enter your details
					</div>

					<div class="desk-oauth">
						<button class="desk-oauth-btn">
							<span>G</span> Google
						</button>
						<button class="desk-oauth-btn">
							<span>⌥</span> GitHub
						</button>
					</div>
					<div class="desk-divider">
						<div class="desk-divider-line"></div>
						<span class="desk-divider-text">or use email</span>
						<div class="desk-divider-line"></div>
					</div>

					<div class="desk-field">
						<label class="desk-field-label">Username</label>
						<input
							class="desk-input"
							placeholder="Choose a username"
						/>
					</div>
					<div class="desk-field">
						<label class="desk-field-label">Email address</label>
						<input
							class="desk-input"
							placeholder="youremail@example.com"
							type="email"
						/>
					</div>
					<button class="desk-submit">Next →</button>
					<div class="desk-switch">
						Already have an account? <a href="/login">Login</a>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get second_step() {
			const html = `
			
			`;
			return buildNode(html);
		},
	};

	page.append(state.step_one);
	return page.getElement();
};

export { DesktopRegisterPage };
