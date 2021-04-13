/**
 * Child Posts Columns block.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

// Import JS
import edit from './edit';

export const name = 'ptam/child-posts-columns';

// Register alignments
const validAlignments = [ 'left', 'center', 'right', 'wide', 'full' ];

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
registerBlockType( 'ptam/child-posts-list', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Child Posts List', 'post-type-archive-mapping' ), // Block title.
	icon: (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fad"
			data-icon="sitemap"
			className="svg-inline--fa fa-sitemap fa-w-20"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 640 512"
		>
			<g className="fa-group">
				<path
					className="fa-secondary"
					fill="#585aa8"
					d="M104 320H56v-57.59A38.45 38.45 0 0 1 94.41 224H296v-64h48v64h201.59A38.46 38.46 0 0 1 584 262.41V320h-48v-48H344v48h-48v-48H104z"
					opacity="0.4"
				></path>
				<path
					className="fa-primary"
					fill="#585aa8"
					d="M128 352H32a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h96a32 32 0 0 0 32-32v-96a32 32 0 0 0-32-32zM384 0H256a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h128a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zm224 352h-96a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h96a32 32 0 0 0 32-32v-96a32 32 0 0 0-32-32zm-240 0h-96a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h96a32 32 0 0 0 32-32v-96a32 32 0 0 0-32-32z"
				></path>
			</g>
		</svg>
	),
	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},
	category: 'ptam-custom-query-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __(
		'Displays hierarchical items in beautiful columns.',
		'post-type-archive-mapping'
	),
	keywords: [
		__( 'children', 'post-type-archive-mapping' ),
		__( 'post', 'poost-type-archive-mapping' ),
		__( 'parent', 'post-type-archive-mapping' ),
		__( 'hierarchy', 'post-type-archive-mapping' ),
		__( 'list', 'post-type-archive-mapping' ),

	],
	supports: {
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
