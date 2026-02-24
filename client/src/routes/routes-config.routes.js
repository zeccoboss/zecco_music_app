import RenderHome from "../utils/render-home";
import RenderLibrary from "../utils/render-library";
import RenderLoginForm from "../utils/render-login-form";
import RenderMusicUploadPage from "../utils/render-music-upload-page";
import RenderNoResourcePage from "../utils/render-no-resource-page";
import RenderProfile from "../utils/render-profile";
import RenderRegisterForm from "../utils/render-register-form";
import RenderResetPasswordPage from "../utils/render-reset-password-page";
import RenderSearch from "../utils/render-search";
import RenderSettings from "../utils/render-settings";
import RenderVerifyUserPage from "../utils/render-verify-user-page";

// Declare all routes
const routes = [
	{
		// ('/') Home
		pattern: /^\/$/,
		handler: RenderHome,
	},
	{
		// (/library) Library
		pattern: /^\/library$/,
		handler: RenderLibrary,
	},
	{
		// (/library) Library
		pattern: /^\/search$/,
		handler: RenderSearch,
	},
	{
		// (/profile/id--id84je4r3) User profile
		pattern: /^\/profile\/?id=([A-Za-z0-9/-_.]{10,50})$/,
		handler: RenderProfile,
	},
	{
		// (/profile/id--id84je4r3) User profile
		pattern: /^\/profile$/,
		handler: RenderProfile,
	},
	{
		// (/library) Library
		pattern: /^\/settings$/,
		handler: RenderSettings,
	},
	{
		// (/login) Login form on form page
		pattern: /^\/login$/,
		handler: RenderLoginForm,
	},
	{
		// (/register) Register form on form page
		pattern: /^\/register$/,
		handler: RenderRegisterForm,
	},
	{
		// (/media/audio/upload) Page to upload songs
		pattern: /^\/media\/audio\/upload$/,
		handler: RenderMusicUploadPage,
	},
	{
		// (/media/image/profile/upload) Page to upload profiles
		pattern: /^\/media\/image\/profile\/upload$/,
		handler: null,
	},
	{
		// (/media/image/profile/upload) // Related to user buh not specific, will be tweaked later
		pattern: /^\/media\/image\/profile\/upload$/,
		handler: null,
	},
	{
		// (/verify-email/3u3n44u3hb3uhe) Verify user when token available
		pattern: /^\/verify-email\/?token=([A-Za-z0-9/-_.]{20,500})$/,
		handler: RenderVerifyUserPage,
	},
	{
		// (/forgot-password) Render form for resetting password
		pattern: /^\/forgot-password$/,
		handler: RenderResetPasswordPage,
	},
	{
		// (/reset-password/4eu33edh3e) Verify user email with provided token to reset password
		pattern: /^\/reset-password\/?token=([A-Za-z0-9/-_.]{20,500})$/,
		handler: RenderResetPasswordPage,
	},
	{
		// (404) No resource page
		pattern: 404,
		handler: RenderNoResourcePage,
	},
];

export { routes };
