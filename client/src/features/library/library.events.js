import { router } from "@zecco/routes/router";

const libraryEvents = (container) => {
	const tabButtons = container.querySelectorAll(".lib-filter-tab");
	tabButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const tab = e.target.dataset.tab;
			router.navigate(`/library?tab=${tab}`);
		});
	});
};

export { libraryEvents };
