class FeedController {
	constructor(fetchFn) {
		this.fetchFn = fetchFn;
		this.items = [];
		this.cursor = "";
		this.hasNextPage = true;
		this.loading = false;
	}

	async loadNext(params = {}) {
		if (this.loading || !this.hasNextPage) return;

		this.loading = true;

		const res = await this.fetchFn({
			cursor: this.cursor,
			limit: 10,
			...params,
		});

		this.items.push(...res.data);

		this.cursor = res.nextCursor;
		this.hasNextPage = res.hasNextPage;

		this.loading = false;
	}

	reset() {
		this.items = [];
		this.cursor = "";
		this.hasNextPage = true;
	}
}

export const trackFeedController = new FeedController();
