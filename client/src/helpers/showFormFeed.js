export function showFormFeed(message, feedTag, parentTag, parentChild) {
	feedTag.innerHTML = ""; // Clear the element
	feedTag.remove(); // Remove fromDOM
	feedTag.innerHTML = message; // Add the message
	parentTag.insertBefore(feedTag, parentChild.nextElementSibling); // Add to DOM
}
