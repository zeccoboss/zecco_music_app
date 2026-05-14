let debounceTimer;

const handleInput = (e) => {
	const query = e.target.value;
	clearTimeout(debounceTimer);

	if (query.length < 2) {
		hideSuggestions();
		return;
	}

	debounceTimer = setTimeout(async () => {
		const res = await fetch(`/api/v1/search/suggestions?q=${query}`);
		const { data } = await res.json();

		renderSuggestionsDropdown(data);
	}, 300); // Wait 300ms
};

const renderSuggestionsDropdown = (items) => {
	// Inject a small <ul> below your #search-input
	const list = document.getElementById("srch-suggestions-list");
	list.innerHTML = items
		.map(
			(item) => `
        <li class="suggestion-item" data-uuid="${item.uuid}">
            <i class="bi bi-search"></i>
            <span>${item.text}</span>
            <small>${item.type}</small>
        </li>
    `,
		)
		.join("");
};
