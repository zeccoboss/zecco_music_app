console.log("Vite config Loaded");

import { defineConfig } from "vite";

export default defineConfig({
	server: {
		base: "/zecco_music_app/",
		host: true,
		allowedHosts: "9c2b-102-91-98-68.ngrok-free.app",
	},
});
