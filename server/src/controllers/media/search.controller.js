const { getGlobalSearch } = require("../../services/search.service");

const searchAll = async (req, res) => {
	try {
		const { q, filter } = req.query;

		if (!q) {
			return res
				.status(400)
				.json({ success: false, message: "Query required" });
		}

		const results = await getGlobalSearch(q, filter);

		// If nothing found at all
		if (results.tracks.length === 0 && results.artists.length === 0) {
			return res.json({ success: true, state: "no-results", data: results });
		}

		res.json({ success: true, state: "results", data: results });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const { fetchSuggestions } = require("../../services/autocomplete.service");

const getSuggestions = async (req, res) => {
	try {
		const { q } = req.query;
		if (!q || q.length < 2) return res.json({ data: [] }); // Don't search for 1 character

		const data = await fetchSuggestions(q);
		res.json({ success: true, data });
	} catch (error) {
		res.status(500).json({ success: false });
	}
};

module.exports = { searchAll, getSuggestions };
