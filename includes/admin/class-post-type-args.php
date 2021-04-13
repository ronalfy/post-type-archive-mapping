<?php
/**
 * Enable excerpts and featured images on post types.
 *
 * @package PTAM
 */

namespace PTAM\Includes\Admin;

use PTAM\Includes\Functions as Functions;
use PTAM\Includes\Admin\Options as Options;

/**
 * Post Type Args Class
 */
class Post_Type_Args {

	/**
	 * Class initializer.
	 */
	public function run() {
		add_filter( 'init', array( $this, 'add_post_type_support' ), Functions::get_highest_priority( 100 ) );
	}

	/**
	 * Add featured image and excerpts to available post types based on user preferences.
	 *
	 * @see init
	 */
	public function add_post_type_support() {

		/**
		 * Allow others to programatically restrict and/or modify the post type arguments.
		 *
		 * @since 6.0.0
		 *
		 * @param array Post type arguments.
		 */
		$post_type_support_args = apply_filters(
			'ptam_post_type_supports_args',
			array(
				'public'  => true,
				'show_ui' => true,
			)
		);

		$post_types = get_post_types(
			$post_type_support_args,
			'objects'
		);

		/**
		 * Allow others to programatically disable adding featurd images support.
		 *
		 * @since 6.0.0
		 *
		 * @param bool Featurd Images check.
		 */
		if ( Options::is_featured_images_enabled() && apply_filters( 'ptam_post_type_supports_featured_enabled', true ) ) {

			$theme_supports_post_types = array();
			foreach ( $post_types as $post_type ) {

				/**
				 * Filter post type support per post type.
				 *
				 * @since 6.0.0
				 *
				 * @param bool  Featurd Images check.
				 * @param array Post type slug.
				 */
				if ( apply_filters( 'ptam_post_type_supports_featured_per_type', true, $post_type->name ) ) {
					add_post_type_support( $post_type->name, 'thumbnail' );
					$theme_supports_post_types[] = $post_type->name;
				}
			}
			/**
			 * Filter the theme supports for featured images.
			 *
			 * @since 6.0.0
			 *
			 * @param array Post types to enable featured images on.
			 */
			$theme_supports_post_types = apply_filters( 'ptam_post_type_supports_featured_types', $theme_supports_post_types );
			if ( ! empty( $theme_supports_post_types ) ) {
				add_theme_support( 'post-thumbnails', $theme_supports_post_types );
			}
		}

		/**
		 * Allow others to programatically disable adding excerpt support.
		 *
		 * @since 6.0.0
		 *
		 * @param bool Featurd Images check.
		 */
		if ( Options::is_excerpts_enabled() && apply_filters( 'ptam_post_type_supports_excerpts', true ) ) {

			foreach ( $post_types as $post_type ) {
				/**
				 * Allow others to programatically disable adding excerpt support per post type.
				 *
				 * @since 6.0.0
				 *
				 * @param bool   Excerpt enabled.
				 * @param string Post Type slug.
				 */
				if ( apply_filters( 'ptam_post_type_supports_excerpts', true, $post_type->name ) ) {
					add_post_type_support( $post_type->name, 'excerpt' );
				}
			}
		}
	}
}
