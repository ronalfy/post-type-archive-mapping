<?php
/**
 * Custom Post Types Block.
 *
 * @package PTAM
 */

namespace PTAM\Includes\Blocks\Advanced_Custom_Posts;

/**
 * Custom Post Types Block helper methods.
 */
class Custom_Posts {

	/**
	 * Initialize hooks/actions for class.
	 */
	public function run() {
		add_action( 'init', array( $this, 'register_block' ) );
	}

	/**
	 * Registers the block on server.
	 */
	public function register_block() {

		// Check if the register function exists.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		register_block_type(
			'ptam/advanced-custom-posts',
			array(
				'attributes'      => array(
					'wpmlLanguage' => array(
						'type'    => 'string',
						'default' => 'en',
					),
					'postType'     => array(
						'type'    => 'string',
						'default' => 'post',
					),
					'postType'     => array(
						'type'    => 'string',
						'default' => 'post',
					),
					'align'        => array(
						'type'    => 'string',
						'default' => 'full',
					),
					'taxonomies'   =>
						array(
							'type'    => 'array',
							'items'   => array(
								'type'       => 'object',
								'properties' => array(
									'label' => array(
										'type'     => 'string',
										'required' => true,
										'default'  => __( 'Category', 'post-type-archive-mapping' ),
									),
									'taxonomy' => array(
										'type'     => 'string',
										'required' => true,
										'default'  => 'category',
									),
									'terms'    => array(
										'type'    => 'array',
										'default' => array(),
									),
								),
							),
							'default' => array(
								array(
									'label' => __( 'Category', 'post-type-archive-mapping' ),
									'taxonomy' => 'category',
									'terms'    => array(),
								),
							),
						),

				),
				'render_callback' => array( $this, 'advanced_custom_posts' ),
				'editor_script'   => 'ptam-custom-posts-gutenberg',
				'editor_style'    => 'ptam-style-editor-css',
			)
		);
	}

	public function advanced_custom_posts( $attributes ) {
		return 'hello';
	}
}
