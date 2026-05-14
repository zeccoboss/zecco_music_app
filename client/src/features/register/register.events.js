export const registerEvents = (
	root,
	{ step, draft, saveDraft, clearDraft, goToStep },
) => {
	// ── Initialization ───────────────────────────────────────
	let isMounted = true;

	// ── Input change handler ─────────────────────────────────
	// Called on every input change in the form (debounced).
	// Saves the current form state to sessionStorage for persistence across steps.
	const handleInputChange = (field, value) => {
		saveDraft({ [field]: value });
	};

	// ── Form submission handler ───────────────────────────────
	const handleSubmit = async () => {
		try {
			const response = await fetch("/api/v1/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(draft),
			});
			const result = await response.json();

			if (response.ok) {
				clearDraft();
				goToStep(2); // Move to success step
			} else {
				alert(result.message || "Registration failed. Please try again.");
			}
		} catch (error) {
			console.error("Registration Error:", error);
			alert("An error occurred. Please try again later.");
		}
	};

	// ── Step direction calculation ───────────────────────────
	const prevStep = (() => {
		try {
			return Number(sessionStorage.getItem("reg_prev_step")) || 1;
		} catch {
			return 1;
		}
	})();

	const ctx = { handleInputChange, handleSubmit };
	const dir =
		step > prevStep ? "forward" : step < prevStep ? "back" : "forward";

	// Persist current step as previous for next render
	try {
		sessionStorage.setItem("reg_prev_step", String(step));
	} catch {
		/* ignore */
	}

	return { ctx, dir };
};
