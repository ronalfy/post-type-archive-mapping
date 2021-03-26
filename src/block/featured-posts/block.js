/**
 * BLOCK: Basic with ESNext
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 *
 * Using inline styles - no external stylesheet needed.  Not recommended!
 * because all of these styles will appear in `post_content`.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

// Import JS
import edit from './edit';

export const name = 'ptam/featured-posts';

/**
 * Register Basic Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ptam/featured-posts', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Featured Posts by Term', 'post-type-archive-mapping' ), // Block title.
	icon: (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fad"
			data-icon="tag"
			className="svg-inline--fa fa-tag fa-w-16"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
		>
			<g className="fa-group">
				<path
					className="fa-secondary"
					fill="#585aa8"
					d="M497.94 225.94L286.06 14.06A48 48 0 0 0 252.12 0H48A48 48 0 0 0 0 48v204.12a48 48 0 0 0 14.06 33.94l211.88 211.88a48 48 0 0 0 67.88 0l204.12-204.12a48 48 0 0 0 0-67.88zM112 160a48 48 0 1 1 48-48 48 48 0 0 1-48 48z"
					opacity="0.7"
				></path>
				<path className="fa-primary" fill="currentColor" d=""></path>
			</g>
		</svg>
	),
	category: 'ptam-custom-query-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __(
		'Highlight a term (category) and show the items within it. Perfect for term archives.',
		'post-type-archive-mapping'
	),
	keywords: [
		__( 'featured', 'post-type-archive-mapping' ),
		__( 'post', 'poost-type-archive-mapping' ),
		__( 'posts', 'poost-type-archive-mapping' ),
		__( 'category', 'post-type-archive-mapping' ),
		__( 'term', 'post-type-archive-mapping' ),
	],
	supports: {
		align: [ 'wide', 'full', 'center' ],
		anchor: true,
		html: false,
	},
	example: {
		attributes: {
			preview: true,
		},
	},
	edit,

	// Render via PHP
	save() {
		return null;
	},
} );
