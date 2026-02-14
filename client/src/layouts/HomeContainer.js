import { audioService } from "../services/audioService.js";
import CreateElement from "../utils/CreateElement.js";
import { getTag } from "../helpers/selectElement.js";
import MusicCard from "../components/MusicCard.js";
import { buttonWrapper } from "../components/HeaderBtnContainer.js";
import { mobileScreen } from "../core/screenBreakPoints.js";
import { HomeSkeleton } from "../components/skeleton/HomeSkeleton.js";
import { buildNode } from "../utils/buildNode.js";

const HomeContainer = async () => {
	const homeContainerInstance = new CreateElement("section");

	// Create element
	const musicCardContainer = new CreateElement("section");

	// Set attributes
	homeContainerInstance.addClass(
		"home_section",
		"main_sections",
		"active_section",
	);
	homeContainerInstance.setId("home-section");
	musicCardContainer.setId("music-card-container");
	musicCardContainer.addClass("music_card_container");

	const homeContent = {
		get exploreSection() {
			const html = `
				<section id="" class="">
					<hi>Discover</hi>

					<div id=""home-explore-section class="home_explore_section">
						<p>Content goes here...</p>
					</div>
				</section>
			`;

			return buildNode(html);
		},
		get globalSection() {
			const html = `
				<section id="home-global-section" class="home_global_section">
					<hi>Global</hi>

					<div id="" class="">
						<p>Content goes here...</p>
					</div>
				</section>
			`;

			return buildNode(html);
		},
		get personalSection() {
			const html = `
				<section id="home-personal-section" class="home_personal_section">
					<h3>For you</h3>

					<div id="" class="home_recent_ctn">
						<h4>Recent Plays</h4>

						<div class="home_recent_wrapper">

						</div>
					</div>

					<div id="" class="home_uploaded_ctn">
						<h4>Uploaded Track</h4>

						<div class="home_uploaded_wrapper">
							
						</div>
					</div>

					<div id="" class="">
						<h3></h3>

						<div class="home_ x _wrapper">
							
						</div>					
					</div>
				</section>
			`;

			return buildNode(html);
		},
	};

	// homeContainerInstance.appendChild(homeContent.personalSection);
	homeContainerInstance.appendChild(HomeSkeleton);

	try {
		// Create to keep reference on track
		let audioFetchTrial = 5;
		// Keep a timer to retry at given time
		const trialIntervalId = setInterval(async () => {
			try {
				const response = await audioService("/api/media/audio");

				// Make sure theres response
				if (!response) return clearInterval(trialIntervalId);

				// Check is its a valid data
				if (response?.data?.length > 0 && !response?.failed) {
					// Get the music card container and clear it
					const musicCrdCtn = getTag("#music-card-container");
					// musicCardSkeletonInstance.remove();
					// musicCrdCtn.remove();

					// Make if a scrollable container
					musicCardContainer.style("scroll-x", "none");

					// Add music cards to the container
					for (const audio of response.data) {
						musicCardContainer.append(MusicCard(audio));
					}
					clearInterval(trialIntervalId);
				}
				// Stop interval when retry's
				if (response.failed && audioFetchTrial === 5) {
					console.warn("Could not connect to server...");
					clearInterval(trialIntervalId);
				}

				audioFetchTrial++; // Increase counter to keep track on retries
			} catch (err) {
				console.error(err);
			}
		}, 500);
	} catch (err) {
		console.log(err);
	}

	return homeContainerInstance.getElement();
};
// export { homeContainerInstance, HomeContainer };
export { HomeContainer };
