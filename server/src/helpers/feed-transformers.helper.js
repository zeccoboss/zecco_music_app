const getImageUrl = (image) => image?.url ?? null;

const toTrackCard = (track) => ({
	id: track._id,
	title: track.title,
	artist: track.artist,
	cover: getImageUrl(track.cover),
	plays: track.playCount ?? 0,
	genre: track.genre?.[0] ?? null,
	duration: track.duration ?? 0,
});

const toArtistCard = (artist) => ({
	username: artist.username ?? "Unknown Artist",
	avatar: getImageUrl(artist.avatar),
	uploadsCount: artist.uploadsCount ?? 0,
});

module.exports = {
	toTrackCard,
	toArtistCard,
	getImageUrl,
};
