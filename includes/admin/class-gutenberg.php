<?php
/**
 * Gutenberg Helper
 *
 * @package PTAM
 */

namespace PTAM\Includes\Admin;

/**
 * Gutenberg helper class.
 */
class Gutenberg {

	/**
	 * Class initializer.
	 */
	public function run() {
		add_filter( 'block_categories_all', array( $this, 'add_block_category' ), 10, 2 );
	}

	/**
	 * Adds a block category for the blocks.
	 *
	 * @since 4.5.0
	 *
	 * @param array  $categories Array of available categories.
	 * @param object $post       Post to attach it to.
	 *
	 * @return array New Categories
	 */
	public function add_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'ptam-custom-query-blocks',
					'title' => __( 'Custom Query Blocks', 'post-type-archive-mapping' ),
				),
			)
		);
	}
}
