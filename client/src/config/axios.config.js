import { appConfig } from "@zecco/config/app.config";
import axios from "axios";

// Optional:
// import { authStore } from '../stores/auth.store.js';

const apiClient = axios.create({
	baseURL: appConfig.API_BASE_URL,

	timeout: 10000,

	headers: {
		"Content-Type": "application/json",
	},
});

// ========================================================
// Request Interceptor
// ========================================================

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

// ========================================================
// Response Interceptor
// ========================================================

apiClient.interceptors.response.use(
	// Success
	(response) => response,

	// Error
	async (error) => {
		const originalRequest = error.config;

		// ------------------------------------------------
		// Unauthorized
		// ------------------------------------------------

		if (error.response?.status === 401) {
			console.warn("[API] Unauthorized — logging out");

			// Prevent infinite retry loops
			if (!originalRequest._retry) {
				originalRequest._retry = true;

				try {
					console.log("[API] Attempting token refresh");

					// =================================================
					// OPTIONAL REFRESH TOKEN FLOW
					// =================================================
					//

					// If you later implement refresh tokens:
					//
					// const refreshToken =
					//     localStorage.getItem('refreshToken');
					//
					// const response =
					//     await axios.post('/auth/refresh', {
					//         refreshToken
					//     });
					//
					// const newAccessToken =
					//     response.data.accessToken;
					//
					// localStorage.setItem(
					//     'token',
					//     newAccessToken
					// );
					//
					// originalRequest.headers.Authorization =
					//     `Bearer ${newAccessToken}`;
					//
					// return apiClient(originalRequest);
					//
					// =================================================
				} catch (refreshError) {
					console.error("[API] Refresh failed", refreshError);
				}
			}

			// =================================================
			// Logout User
			// =================================================

			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");

			// Example store logout:
			//
			// authStore.logout();

			// Optional redirect:
			//
			// window.location.href = '/login';
		}

		// ------------------------------------------------
		// Server Error
		// ------------------------------------------------

		if (error.response?.status >= 500) {
			console.error("[API] Server Error", error.response);
		}

		// ------------------------------------------------
		// Timeout
		// ------------------------------------------------

		if (error.code === "ECONNABORTED") {
			console.error("[API] Request timeout");
		}

		// ------------------------------------------------
		// Network Error
		// ------------------------------------------------

		if (!error.response) {
			console.error("[API] Network Error");
		}

		return Promise.reject(error);
	},
);

export default apiClient;
