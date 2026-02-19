// Get the closest target if bubbling matches
const closest = (identifier, event) => !!event.target.closest(identifier); // Return boolean
const matches = (identifier, event) => !!event.target.matches(identifier); // Return boolean

export { closest, matches };
