import { appConfig } from "@zecco/config/app.config.js";
import {
	removeFromLocalStorage,
	writeToLocalStorage,
} from "@zecco/services/storage/local-storage";

class AppStore {
	// ── Auth ──────────────────────────────────────────────────────────
	#user = null;
	#token = null;

	// ── Player ────────────────────────────────────────────────────────
	#currentTrack = null; // { id, title, artist, coverUrl, streamUrl, duration }
	#originalQueue = []; // untouched order
	#queue = []; // active queue (shuffled or original)
	#queueIndex = 0;
	#isShuffle = false;
	#repeatMode = "none"; // "none" | "one" | "all"
	#volume = 1; // 0.0 – 1.0

	// ── track Engine ──────────────────────────────────────────────────
	#trackContext = null;
	#sourceNode = null; // trackBufferSourceNode — recreated each play
	#gainNode = null; // Controls volume
	#trackBuffer = null; // Decoded track data
	#startedAt = 0; // AudioContext.currentTime when playback started
	#pausedAt = 0; // How far into the track we paused
	#isPlaying = false;

	// ── UI ────────────────────────────────────────────────────────────
	#activePage = "home"; // "home" | "search" | "library" | "upload" | "settings" | "profile"
	// #activeFormPage = null; // "login" | "register" | "forgotPassword" | "verification" | null
	#overlayOpen = false;
	#isLoading = false;
	#deepLinkTrackId = null;

	// ═════════════════════════════════════════════════════════════════
	// AUTH
	// ═════════════════════════════════════════════════════════════════

	get user() {
		return this.#user;
	}

	set user(data) {
		if (!data || typeof data !== "object") {
			console.error("[Store]: Invalid user data.");
			return;
		}
		this.#user = {
			id: data.id ?? null,
			username: data.username ?? null,
			email: data.email ?? null,
			avatar: data.avatar ?? null,
			isVerified: data.isVerified ?? false,
			isAdmin: data.isAdmin ?? false,
		};
	}

	updateUser(fields) {
		if (!this.#user) {
			console.error("[Store]: No user to update.");
			return;
		}
		this.#user = { ...this.#user, ...fields };
	}

	get token() {
		return this.#token;
	}

	set token(value) {
		if (!value || typeof value !== "string") {
			console.error("[Store]: Invalid token.");
			removeFromLocalStorage("token");
			return;
		}
		this.#token = value;
		writeToLocalStorage(`token`, value);
	}

	get isLoggedIn() {
		return !!this.#token;
	}

	// ═════════════════════════════════════════════════════════════════
	// PLAYER
	// ═════════════════════════════════════════════════════════════════

	get currentTrack() {
		return this.#currentTrack;
	}

	get queue() {
		return this.#queue;
	}

	get isPlaying() {
		return this.#isPlaying;
	}

	get isShuffle() {
		return this.#isShuffle;
	}

	get repeatMode() {
		return this.#repeatMode;
	}

	get volume() {
		return this.#volume;
	}

	set volume(value) {
		if (typeof value !== "number") {
			console.error("[Store]: Volume must be a number.");
			return;
		}
		this.#volume = Math.min(1, Math.max(0, value));
		// Apply to track engine immediately if active
		if (this.#gainNode) {
			this.#gainNode.gain.value = this.#volume;
		}
	}

	// Computed from track context — not a stored value
	get progress() {
		if (!this.#trackContext || !this.#isPlaying) return this.#pausedAt;
		return this.#trackContext.currentTime - this.#startedAt + this.#pausedAt;
	}

	// Load a single track and clear the queue
	async loadTrack(track) {
		if (!track?.id) {
			console.error("[Store]: Invalid track object.");
			return;
		}
		this.#originalQueue = [track];
		this.#queue = [track];
		this.#queueIndex = 0;
		await this.#prepare(track);
	}

	// Load a full queue, optionally start at a given index
	async loadQueue(tracks = [], startIndex = 0) {
		if (!tracks.length) {
			console.error("[Store]: Cannot load an empty queue.");
			return;
		}
		this.#originalQueue = tracks;
		this.#queue = [...tracks];
		this.#queueIndex = startIndex;
		await this.#prepare(tracks[startIndex]);
	}

	async nextTrack() {
		if (!this.#queue.length) return;

		let next;
		if (this.#queueIndex < this.#queue.length - 1) {
			next = this.#queueIndex + 1;
		} else if (this.#repeatMode === "all") {
			next = 0;
		} else {
			this.#isPlaying = false; // end of queue
			return;
		}

		this.#queueIndex = next;
		await this.#prepare(this.#queue[next]);
	}

	async prevTrack() {
		if (!this.#queue.length) return;

		// If more than 3 seconds in, restart current track
		if (this.progress > 3) {
			this.#pausedAt = 0;
			this.#sourceNode?.stop();
			this.#isPlaying = false;
			this.play();
			return;
		}

		const prev = this.#queueIndex > 0 ? this.#queueIndex - 1 : 0;
		this.#queueIndex = prev;
		await this.#prepare(this.#queue[prev]);
	}

	play() {
		if (!this.#trackBuffer || this.#isPlaying) return;

		// Resume suspended context (browser autoplay policy)
		if (this.#trackContext.state === "suspended") {
			this.#trackContext.resume();
		}

		this.#sourceNode = this.#trackContext.createBufferSource();
		this.#sourceNode.buffer = this.#trackBuffer;
		this.#sourceNode.connect(this.#gainNode);

		// Handle repeat one
		this.#sourceNode.loop = this.#repeatMode === "one";

		this.#sourceNode.start(0, this.#pausedAt);
		this.#startedAt = this.#trackContext.currentTime;
		this.#isPlaying = true;

		// Auto advance when track ends naturally
		this.#sourceNode.onended = () => {
			if (this.#isPlaying) this.nextTrack();
		};
	}

	pause() {
		if (!this.#isPlaying) return;
		this.#pausedAt += this.#trackContext.currentTime - this.#startedAt;
		this.#sourceNode?.stop();
		this.#isPlaying = false;
	}

	togglePlay() {
		this.#isPlaying ? this.pause() : this.play();
	}

	toggleShuffle() {
		this.#isShuffle = !this.#isShuffle;

		if (this.#isShuffle) {
			// Keep current track at index 0, shuffle the rest
			const rest = this.#originalQueue.filter(
				(t) => t.id !== this.#currentTrack.id,
			);
			// Fisher-Yates shuffle
			for (let i = rest.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[rest[i], rest[j]] = [rest[j], rest[i]];
			}
			this.#queue = [this.#currentTrack, ...rest];
			this.#queueIndex = 0;
		} else {
			// Restore original, find current track position
			this.#queue = [...this.#originalQueue];
			this.#queueIndex = this.#originalQueue.findIndex(
				(t) => t.id === this.#currentTrack.id,
			);
		}
	}

	toggleRepeat() {
		const modes = ["none", "one", "all"];
		const next = (modes.indexOf(this.#repeatMode) + 1) % modes.length;
		this.#repeatMode = modes[next];

		// Apply repeat one to active source node immediately if playing
		if (this.#sourceNode) {
			this.#sourceNode.loop = this.#repeatMode === "one";
		}
	}

	// Seek to a specific second in the track
	seekTo(seconds) {
		if (!this.#trackBuffer) return;
		const wasPlaying = this.#isPlaying;

		this.#sourceNode?.stop();
		this.#isPlaying = false;
		this.#pausedAt = Math.min(seconds, this.#trackBuffer.duration);

		if (wasPlaying) this.play();
	}

	clearPlayer() {
		this.#sourceNode?.stop();
		this.#trackBuffer = null;
		this.#currentTrack = null;
		this.#originalQueue = [];
		this.#queue = [];
		this.#queueIndex = 0;
		this.#isPlaying = false;
		this.#pausedAt = 0;
		this.#startedAt = 0;
	}

	// ═════════════════════════════════════════════════════════════════
	// track ENGINE (private)
	// ═════════════════════════════════════════════════════════════════

	async #prepare(trackId) {
		// 1. Ask your backend for a presigned URL
		const res = await fetch(`/api/media/track/${trackId}/stream`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const { data } = await res.json();

		// 2. Fetch the actual track directly from MinIO
		const trackRes = await fetch(data.streamUrl);
		const arrayBuffer = await trackRes.arrayBuffer();

		// 3. Decode and store
		this.#trackBuffer = await this.#trackContext.decodetrackData(arrayBuffer);
	}

	// ═════════════════════════════════════════════════════════════════
	// UI
	// ═════════════════════════════════════════════════════════════════

	get activePage() {
		return this.#activePage;
	}

	set activePage(page) {
		if (!page || typeof page !== "string") {
			console.error("[Store]: Invalid page name.");
			return;
		}
		this.#activePage = page;
	}

	// get activeFormPage() {
	// 	return this.#activeFormPage;
	// }

	// openFormPage(name) {
	// 	this.#activeFormPage = name;
	// 	this.#overlayOpen = true;
	// }

	// closeFormPage() {
	// 	this.#activeFormPage = null;
	// 	this.#overlayOpen = false;
	// }

	get overlayOpen() {
		return this.#overlayOpen;
	}

	openOverlay() {
		this.#overlayOpen = true;
	}

	closeOverlay() {
		this.#overlayOpen = false;
	}

	get isLoading() {
		return this.#isLoading;
	}

	set isLoading(value) {
		this.#isLoading = value;
	}

	get deepLinkTrackId() {
		return this.#deepLinkTrackId;
	}

	captureDeepLink() {
		const params = new URLSearchParams(window.location.search);
		const id = params.get("track");
		if (id) this.#deepLinkTrackId = id;
		return id ?? null;
	}

	clearDeepLink() {
		this.#deepLinkTrackId = null;
	}

	// ═════════════════════════════════════════════════════════════════
	// RESET
	// ═════════════════════════════════════════════════════════════════

	clearAuth() {
		this.#user = null;
		this.#token = null;
		localStorage.removeItem(`${appConfig.API_NAME}-token`);
	}

	clearAll() {
		this.clearAuth();
		this.clearPlayer();
		this.#activePage = "home";
		// this.#activeFormPage = null;
		this.#overlayOpen = false;
		this.#isLoading = false;
		this.#deepLinkTrackId = null;
	}

	// ═════════════════════════════════════════════════════════════════
	// INIT
	// ═════════════════════════════════════════════════════════════════

	init() {
		const token = localStorage.getItem(`${appConfig.API_NAME}-token`);
		if (token) this.#token = token;

		const trackId = this.captureDeepLink();
		if (trackId)
			console.log(`[Store]: Deep link track detected → ${trackId}`);
	}
}

const store = new AppStore();
store.init();

export { store };
