import CreateElement from "../../utils/CreateElement";

// Create element
const homeSkeletonInstance = new CreateElement("div");

// Set attributes
homeSkeletonInstance.addClass("home_skeleton", "skeleton");
homeSkeletonInstance.setId("music-card-skeleton");

const skeletonCard = `
	<div class="music_card_skeleton">
		<div class="mcs_img"></div>

		<div class="msc_content">
			<div class="msc_artist"></div>
			<div class="msc_title"></div>
		</div>

		<div class="mcs_controls"></div>
	</div>
`;

const skeletonNumbers = 20; // For the skeleton card
let cards = skeletonCard; // Initialize the card

// Iterate and create a card that matches skeletonNumbers value
for (let index = 0; index < skeletonNumbers; index++) cards += skeletonCard; // Add to it

// Add the to the container
homeSkeletonInstance.appendContent(cards);

// Return the node that
const HomeSkeleton = homeSkeletonInstance.getElement();

export { homeSkeletonInstance, HomeSkeleton };
