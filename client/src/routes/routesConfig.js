import RenderHome from "../utils/RenderHome";
import RenderLibrary from "../utils/RenderLibrary";
import RenderLoginForm from "../utils/RenderLoginForm";
import RenderMusicUploadPage from "../utils/RenderMusicUploadPage";
import RenderNoResourcePage from "../utils/RenderNoResourcePage";
import RenderProfile from "../utils/RenderProfile";
import RenderRegisterForm from "../utils/RenderRegisterForm";
import RenderResetPasswordPage from "../utils/RenderResetPasswordPage";
import RenderVerifyPasswordPage from "../utils/RenderVerifyPasswordPage";
import RenderVerifyUserPage from "../utils/RenderVerifyUserPage";

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
		// (/user/profile/id--id84je4r3) User profile
		pattern: /^\/user\/profile\/([^/]+)$/,
		handler: RenderProfile,
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
		// (/user/verify/token--3u3n44u3hb3uhe) Verify user when token available
		pattern: /^\/user\/verify\/([^/]+)$/,
		handler: RenderVerifyUserPage,
	},
	{
		// (/verify/token--3u3n44u3hb3uhe) Render form for resetting password
		pattern: /^\/password\/reset$/,
		handler: RenderResetPasswordPage,
	},
	{
		// (/password/verify/token--4eu33edh3e) Verify user email with provided token to reset password
		pattern: /^\/password\/verify\/([^/]+)$/,
		handler: RenderVerifyPasswordPage,
	},
	{
		// (404) No resource page
		pattern: 404,
		handler: RenderNoResourcePage,
	},
];

export { routes };
