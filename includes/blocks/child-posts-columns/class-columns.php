<?php
/**
 * Child Posts Columns Block.
 *
 * @package PTAM
 */

namespace PTAM\Includes\Blocks\Child_Posts_Columns;

use PTAM\Includes\Functions as Functions;

/**
 * Child Posts Hierarchy Columns Block.
 */
class Columns {

	/**
	 * Initialize hooks/actions for class.
	 */
	public function run() {
		add_action( 'init', array( $this, 'register_block' ) );
	}

	/**
	 * Retrieve a list of terms for display.
	 *
	 * @param array $attributes Array of passed attributes.
	 *
	 * @return string HTML of the custom posts.
	 */
	public function output( $attributes ) {
		return 'hello world';
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
			'ptam/child-posts-columns',
			array(
				'attributes'      => array(
					'uniqueId'                          => array(
						'type'    => 'string',
						'default' => '',
					),
					'align'                             => array(
						'type'    => 'string',
						'default' => 'full',
					),
					'view'                              => array(
						'type'    => 'string',
						'default' => 'grid',
					),
					'postType'                          => array(
						'type'    => 'string',
						'default' => 'page',
					),
					'hierarchy'                         => array(
						'type'    => 'string',
						'default' => 'parents', // parents or children.
					),
					'parentItem'                        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'order'                             => array(
						'type'    => 'string',
						'default' => 'ASC',
					),
					'orderBy'                           => array(
						'type'    => 'string',
						'default' => 'title',
					),
					'postsPerPage'                      => array(
						'type'    => 'integer',
						'default' => 20,
					),
					'wpmlLanguage'                      => array(
						'type'    => 'string',
						'default' => 'en',
					),
					'listStyle'                         => array(
						'type'    => 'string',
						'default' => 'ul', /* ul, ol, none */
					),
					'disableStyles'                     => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'pagination'                        => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'gridPaddingTop'                    => array(
						'type'    => 'integer',
						'default' => 20,
					),
					'gridPaddingRight'                  => array(
						'type'    => 'integer',
						'default' => 20,
					),
					'gridPaddingBottom'                 => array(
						'type'    => 'integer',
						'default' => 20,
					),
					'gridPaddingLeft'                   => array(
						'type'    => 'integer',
						'default' => 20,
					),
					'gridPaddingUnit'                   => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridPaddingUnitsSync'              => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'gridPaddingTopTablet'              => array(
						'type'    => 'integer',
						'default' => 15,
					),
					'gridPaddingRightTablet'            => array(
						'type'    => 'integer',
						'default' => 15,
					),
					'gridPaddingBottomTablet'           => array(
						'type'    => 'integer',
						'default' => 15,
					),
					'gridPaddingLeftTablet'             => array(
						'type'    => 'integer',
						'default' => 15,
					),
					'gridPaddingUnitTablet'             => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridPaddingUnitsSyncTablet'        => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'gridPaddingTopMobile'              => array(
						'type'    => 'integer',
						'default' => 10,
					),
					'gridPaddingRightMobile'            => array(
						'type'    => 'integer',
						'default' => 10,
					),
					'gridPaddingBottomMobile'           => array(
						'type'    => 'integer',
						'default' => 10,
					),
					'gridPaddingLeftMobile'             => array(
						'type'    => 'integer',
						'default' => 10,
					),
					'gridPaddingUnitMobile'             => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridPaddingUnitsSyncMobile'        => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'gridBackgroundType'                => array(
						'type'    => 'string',
						'default' => 'featured_image', /* featured_image, gradient, color */
					),
					'gridImageTypeSize'                 => array(
						'type'    => 'string',
						'default' => 'large',
					),
					'gridBackgroundGradient'            => array(
						'type'    => 'string',
						'default' => '',
					),
					'gridBackgroundGradientHover'       => array(
						'type'    => 'string',
						'default' => '',
					),
					'gridBackgroundColor'               => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'gridBackgroundColorHover'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'gridFallbackImg'                   => array(
						'type'    => 'object',
						'default' => '',
					),
					'gridMinHeight'                     => array(
						'type'    => 'integer',
						'default' => 300,
					),
					'gridMinHeightTablet'               => array(
						'type'    => 'integer',
						'default' => 300,
					),
					'gridMinHeightMobile'               => array(
						'type'    => 'integer',
						'default' => 300,
					),
					'gridMinHeightUnit'                 => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridMinHeightUnitTablet'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridMinHeightUnitMobile'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridNumberColumns'                 => array(
						'type'    => 'integer',
						'default' => 2,
					),
					'gridBorderWidth'                   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'gridBorderRadiusTopleft'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'gridBorderRadiusTopRight'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'gridBorderRadiusBottomLeft'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'gridBorderRadiusBottomRight'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'gridBorderRadiusUnitsSync'         => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'gridBorderRadiusUnit'              => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridBorderColor'                   => array(
						'type'    => 'string',
						'default' => '',
					),
					'gridBorderColorHover'              => array(
						'type'    => 'string',
						'default' => '',
					),
					'gridOverlay'                       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'gridOverlayBackgroundColor'        => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'gridOverlayBackgroundColorOpacity' => array(
						'type'    => 'string',
						'default' => '0.6',
					),
					'gridOverlayBackgroundColorHover'   => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'gridOverlayBackgroundColorHoverOpacity' => array(
						'type'    => 'string',
						'default' => '0.4',
					),
					'gridShowTitle'                     => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'gridTitleColor'                    => array(
						'type'    => 'string',
						'default' => '#DDDDDD',
					),
					'gridTitleColorHover'               => array(
						'type'    => 'string',
						'default' => '#FFFFFF',
					),
					'gridTitleFontFamily'               => array(
						'type'    => 'string',
						'default' => '',
					),
					'gridTitleFontSizeUnit'             => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridTitleFontSizeUnitTablet'       => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridTitleFontSizeUnitMobile'       => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'gridTitleFontSize'                 => array(
						'type'    => 'string',
						'default' => '20',
					),
					'gridTitleFontSizeTablet'           => array(
						'type'    => 'string',
						'default' => '20',
					),
					'gridTitleFontSizeMobile'           => array(
						'type'    => 'string',
						'default' => '20',
					),
					'gridTitleFontWeight'               => array(
						'type'    => 'string',
						'default' => 400.,
					),
					'gridTitleLetterSpacing'            => array(
						'type'    => 'string',
						'default' => '0',
					),
					'gridTitleLetterSpacingTablet'      => array(
						'type'    => 'string',
						'default' => '0',
					),
					'gridTitleLetterSpacingMobile'      => array(
						'type'    => 'string',
						'default' => '0',
					),
					'gridTitleLetterSpacingUnit'        => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'gridTitleTextTransform'            => array(
						'type'    => 'string',
						'default' => 'none',
					),
					'gridTitleLineHeight'               => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'gridTitleLineHeightTablet'         => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'gridTitleLineHeightMobile'         => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'gridTitleLineHeightUnit'           => array(
						'type'    => 'string',
						'default' => 'em',
					),
				),
				'render_callback' => array( $this, 'output' ),
				'editor_script'   => 'ptam-custom-posts-gutenberg',
				'editor_style'    => 'ptam-style-editor-css',
			)
		);
	}
}
