import { buildNode } from "../../utils/build-node";
import CreateElement from "../../utils/create-element";

const DesktopLoginPage = () => {
	const page = new CreateElement("div");

	page
		.addClass("login-page", "desktop-form-page", "app-page")
		.setId("login-page").innerHTML = `
			<div class="desk-brand-side">
				<div class="desk-vinyl"></div>
				<div class="desk-brand-logo">
					<div class="desk-brand-icon-wrap">🎵</div>
					<div class="desk-brand-name">
						Zecco<span>Stream</span>
					</div>
				</div>
				<div class="desk-brand-tag">
					Discover, upload and share Nigerian music with the
					world.
				</div>
				<div class="desk-brand-pills">
					<span class="desk-brand-pill">🎵 Afrobeats</span>
					<span class="desk-brand-pill">🎸 Highlife</span>
					<span class="desk-brand-pill">🥁 Amapiano</span>
					<span class="desk-brand-pill">🎤 Upload</span>
				</div>
			</div>
			<div class="desk-form-side">
				<div class="desk-form-heading">Welcome back</div>
				<div class="desk-form-sub">
					Login to continue to ZeccoStream
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
					<span class="desk-divider-text"
						>or continue with email</span
					>
					<div class="desk-divider-line"></div>
				</div>

				<div class="desk-field">
					<label class="desk-field-label">Email address</label>
					<input
						class="desk-input"
						placeholder="youremail@example.com"
						type="email"
					/>
				</div>
				<div class="desk-field">
					<label class="desk-field-label">Password</label>
					<input
						class="desk-input"
						placeholder="Enter password"
						type="password"s
					/>
				</div>
				<div class="desk-forgot">Forgot password?</div>
				<button class="desk-submit">Login</button>
				<div class="desk-switch">
					Don't have an account? <a href="/register">Sign up</a>
				</div>
			</div>
		`;

	return page.getElement();
};

export { DesktopLoginPage };
