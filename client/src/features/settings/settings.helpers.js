/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <explanation> */
const filterSettingsPanels = (panel) => {
	const navItems = document.querySelectorAll(".settings-nav-item");
	const panels = document.querySelectorAll(".settings-panel");

	if (navItems.length === 0 || panels.length === 0) return;

	// Clear active states
	navItems.forEach((item) => item.classList.remove("active-settings-nav"));
	panels.forEach((p) => p.classList.remove("active-settings-panel"));

	// Set active panel
	const activePanel = document.querySelector(`[data-panel="${panel}"]`);
	const activePanelContent = document.querySelector(
		`#settings-panel-${panel}`,
	);

	if (activePanel) activePanel.classList.add("active-settings-nav");
	if (activePanelContent)
		activePanelContent.classList.add("active-settings-panel");
};

export { filterSettingsPanels };
