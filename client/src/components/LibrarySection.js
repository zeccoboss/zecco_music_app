import CreateElement from "../utils/CreateElement.js";

const LibrarySection = () => {
	// Create element
	const librarySection = new CreateElement("section", "Library");

	// Set attributes
	librarySection.addClass("library_section", "main_sections");
	librarySection.setId("library-section");

	librarySection.setInnerHTML(`
		<div class="empty_lib_content show_lib_content">
			<h2>Library</h2>

			<div>
				<p>No content in your library.</p>
				<p>To access your library  <a href="/signup" class="lib_links">Sign up</a> to continue or <a href="/login" class="lib_links">Login</a> to acces all features.</p> 
				<div class="lib_lnks_ctn">
					<a href="/signup" class="lib_links">Sign up</a>
					<a href="/login" class="lib_links">Login</a> 
				</div>
			</div>
		</div>

		<section class="lib_content">
			<div>
				<h3>Explore your library content.</h3>
			</div>

			<div class="library_created">
				<p>Created Music.</p>
			</div>

			<div class="library_favorite">
				<p>Favorites Music.</p>
			</div>

			<div class="library_uploaded">
				<p>Uploaded Music.</p>
			</div>

			<div class="library_playlist">
				<p>Playlis.</p>
			</div>
		</section>
	`);
	return librarySection.getElement();
};

export default LibrarySection;
