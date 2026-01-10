import { audioService } from "../services/audioService";

export default async function processAudio() {
	const response = await audioService("/api/media/audio");
	const audios = response.data;
	return audios;
}
