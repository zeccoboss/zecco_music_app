// services/oauth.service.js
const https = require("node:https");

// ── Shared helper — native https request forcing IPv4 ──────────────────────────
const makeRequest = ({
	hostname,
	path,
	method = "GET",
	headers = {},
	body = null,
}) => {
	return new Promise((resolve, reject) => {
		const options = {
			hostname,
			port: 443,
			path,
			method,
			family: 4, // force IPv4 — IPv6 unreachable on this network
			headers: {
				...headers,
				...(body ? { "Content-Length": Buffer.byteLength(body) } : {}),
			},
		};

		const req = https.request(options, (res) => {
			let data = "";
			res.on("data", (chunk) => {
				data += chunk;
			});
			res.on("end", () => {
				try {
					resolve(JSON.parse(data));
				} catch {
					reject(new Error(`Failed to parse response from ${hostname}`));
				}
			});
		});

		req.on("error", reject);
		req.setTimeout(15000, () => req.destroy(new Error("Request timed out")));
		if (body) req.write(body);
		req.end();
	});
};

// ── Google ─────────────────────────────────────────────────────────────────────

const getGoogleAuthUrl = () => {
	const params = new URLSearchParams({
		client_id: process.env.GOOGLE_CLIENT_ID,
		redirect_uri: process.env.GOOGLE_CALLBACK_URL,
		response_type: "code",
		scope: "openid email profile",
		access_type: "offline",
		prompt: "consent",
	});
	return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

const exchangeGoogleCode = async (code) => {
	const body = new URLSearchParams({
		code,
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		redirect_uri: process.env.GOOGLE_CALLBACK_URL,
		grant_type: "authorization_code",
	}).toString();

	return makeRequest({
		hostname: "oauth2.googleapis.com",
		path: "/token",
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body,
	});
};

const getGoogleProfile = async (accessToken) => {
	return makeRequest({
		hostname: "www.googleapis.com",
		path: "/oauth2/v3/userinfo",
		headers: { Authorization: `Bearer ${accessToken}` },
	});
};

// ── GitHub ─────────────────────────────────────────────────────────────────────

const getGitHubAuthUrl = () => {
	const params = new URLSearchParams({
		client_id: process.env.GITHUB_CLIENT_ID,
		redirect_uri: process.env.GITHUB_CALLBACK_URL,
		scope: "user:email",
	});
	return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

const exchangeGitHubCode = async (code) => {
	const body = new URLSearchParams({
		client_id: process.env.GITHUB_CLIENT_ID,
		client_secret: process.env.GITHUB_CLIENT_SECRET,
		redirect_uri: process.env.GITHUB_CALLBACK_URL,
		code,
	}).toString();

	return makeRequest({
		hostname: "github.com",
		path: "/login/oauth/access_token",
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Accept: "application/json",
		},
		body,
	});
};

const getGitHubProfile = async (accessToken) => {
	const profile = await makeRequest({
		hostname: "api.github.com",
		path: "/user",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/vnd.github+json",
			"User-Agent": "ZeccoMusicApp",
		},
	});

	// GitHub doesn't always return email in /user — fetch separately
	if (!profile.email) {
		const emails = await makeRequest({
			hostname: "api.github.com",
			path: "/user/emails",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: "application/vnd.github+json",
				"User-Agent": "ZeccoMusicApp",
			},
		});
		const primary = emails.find?.((e) => e.primary && e.verified);
		profile.email = primary?.email ?? null;
	}

	return profile;
};

module.exports = {
	getGoogleAuthUrl,
	exchangeGoogleCode,
	getGoogleProfile,
	getGitHubAuthUrl,
	exchangeGitHubCode,
	getGitHubProfile,
};
