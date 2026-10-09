/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */
// Declare findIndex, as this is needed for WooCommerce term component.
if ( typeof findIndex === "undefined" ) {
	// Set up findIndex as global function.
	

	window.findIndex = ( arr, object ) => {
		// Make sure arr is an array and object has a field of id.
		if ( ! Array.isArray( arr ) || ! object.hasOwnProperty( 'id' ) ) {
			return -1;
		}
		 // Use the findIndex method of array
		 const indexId = object.id;
		 return arr.findIndex(function(element) {
			return element.id === indexId;
		});
	}
}

import './block/custom-post-one/block.js'; // Import main block.
import './block/term-grid/block.js'; // Import term grid block.
import './block/featured-posts/block.js'; // Import Featured Posts Block.
