<?php
/**
 * Child Posts List Block.
 *
 * @package PTAM
 */

namespace PTAM\Includes\Blocks\Child_Posts_List;

use PTAM\Includes\Functions as Functions;

/**
 * Child Posts Hierarchy List Block.
 */
class Post_List {

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
			'ptam/child-posts-list',
			array(
				'attributes'      => array(
					'uniqueId'                        => array(
						'type'    => 'string',
						'default' => '',
					),
					'align'                           => array(
						'type'    => 'string',
						'default' => 'full',
					),
					'postType'                        => array(
						'type'    => 'string',
						'default' => 'page',
					),
					'hierarchy'                       => array(
						'type'    => 'string',
						'default' => 'parents', // parents or children.
					),
					'parentItem'                      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'order'                           => array(
						'type'    => 'string',
						'default' => 'ASC',
					),
					'orderBy'                         => array(
						'type'    => 'string',
						'default' => 'title',
					),
					'postsPerPage'                    => array(
						'type'    => 'integer',
						'default' => 20,
					),
					'wpmlLanguage'                    => array(
						'type'    => 'string',
						'default' => 'en',
					),
					'disableStyles'                   => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'pagination'                      => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'listPaddingTop'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingRight'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingBottom'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingLeft'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingUnit'                 => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listPaddingUnitsSync'            => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listPaddingTopTablet'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingRightTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingBottomTablet'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingLeftTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingUnitTablet'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listPaddingUnitsSyncTablet'      => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listPaddingTopMobile'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingRightMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingBottomMobile'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingLeftMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingUnitMobile'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listPaddingUnitsSyncMobile'      => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMarginTop'                   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginRight'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginBottom'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginLeft'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginUnit'                  => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMarginUnitsSync'             => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMarginTopTablet'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginRightTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginBottomTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginLeftTablet'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginUnitTablet'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMarginUnitsSyncTablet'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMarginTopMobile'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginRightMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginBottomMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginLeftMobile'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginUnitMobile'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMarginUnitsSyncMobile'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitlePaddingTop'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingRight'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingBottom'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingLeft'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingUnit'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitlePaddingUnitsSync'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitlePaddingTopTablet'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingRightTablet'     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingBottomTablet'    => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingLeftTablet'      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingUnitTablet'      => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitlePaddingUnitsSyncTablet' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitlePaddingTopMobile'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingRightMobile'     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingBottomMobile'    => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingLeftMobile'      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingUnitMobile'      => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitlePaddingUnitsSyncMobile' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitleMarginTop'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginRight'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginBottom'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginLeft'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginUnit'             => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleMarginUnitsSync'        => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitleMarginTopTablet'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginRightTablet'      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginBottomTablet'     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginLeftTablet'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginUnitTablet'       => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleMarginUnitsSyncTablet'  => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitleMarginTopMobile'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginRightMobile'      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginBottomMobile'     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginLeftMobile'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginUnitMobile'       => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleMarginUnitsSyncMobile'  => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listImageTypeSize'               => array(
						'type'    => 'string',
						'default' => 'large',
					),
					'listFallbackImg'                 => array(
						'type'    => 'object',
						'default' => '',
					),
					'listFeaturedImageAlign'          => array(
						'type'    => 'string',
						'default' => 'left',
					),
					'listMinHeight'                   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMinHeightTablet'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMinHeightMobile'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMinHeightUnit'               => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMinHeightUnitTablet'         => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMinHeightUnitMobile'         => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listNumberColumns'               => array(
						'type'    => 'integer',
						'default' => 1,
					),
					'listBackgroundType'              => array(
						'type'    => 'string',
						'default' => 'color',
					),
					'listBackgroundColor'             => array(
						'type'    => 'string',
						'default' => '',
					),
					'listBackgroundGradient'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'listShowFeaturedImage'           => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listBorderWidth'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusTopleft'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusTopRight'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusBottomLeft'      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusBottomRight'     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusUnitsSync'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listBorderRadiusUnit'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listBorderColor'                 => array(
						'type'    => 'string',
						'default' => '',
					),
					'listBorderColorHover'            => array(
						'type'    => 'string',
						'default' => '',
					),
					'listShowTitle'                   => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitleColor'                  => array(
						'type'    => 'string',
						'default' => '#DDDDDD',
					),
					'listTitleColorHover'             => array(
						'type'    => 'string',
						'default' => '#DDDDDD',
					),
					'listTitleFontFamily'             => array(
						'type'    => 'string',
						'default' => '',
					),
					'listTitleFontSizeUnit'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleFontSizeUnitTablet'     => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleFontSizeUnitMobile'     => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleFontSize'               => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listTitleFontSizeTablet'         => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listTitleFontSizeMobile'         => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listTitleFontWeight'             => array(
						'type'    => 'string',
						'default' => 400.,
					),
					'listTitleLetterSpacing'          => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listTitleLetterSpacingTablet'    => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listTitleLetterSpacingMobile'    => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listTitleLetterSpacingUnit'      => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listTitleTextTransform'          => array(
						'type'    => 'string',
						'default' => 'none',
					),
					'listTitleLineHeight'             => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listTitleLineHeightTablet'       => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listTitleLineHeightMobile'       => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listTitleLineHeightUnit'         => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listTitleAlign'                  => array(
						'type'    => 'string',
						'default' => 'left',
					),
					'listShowPostMeta'                => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'listShowPostMetaAppearance'      => array(
						'type'    => 'string',
						'default' => 'aligncenter', /* stacked, aligncenter, alignright, alignleft */
					),
					'listShowPostMetaAuthor'          => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listShowPostMetaDate'            => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listShowPostMetaTerms'           => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'listShowPostMetaComments'        => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'listMetaDateFormat' => array(
						'type' => 'string',
						'default' => 'MMMM DD, YYYY',
					),
					'listMetaIconColor' => array(
						'type' => 'string',
						'default' => '#000000',
					),
					'listMetaTextColor' => array(
						'type' => 'string',
						'default' => '#000000',
					),
					'listMetaLinkColor' => array(
						'type' => 'string',
						'default' => '#000000',
					),
					'listMetaLinkColorHover' => array(
						'type' => 'string',
						'default' => '#000000',
					),
					'listMetaPaddingTop'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingRight'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingBottom'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingLeft'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingUnit'                 => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaPaddingUnitsSync'            => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaPaddingTopTablet'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingRightTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingBottomTablet'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingLeftTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingUnitTablet'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaPaddingUnitsSyncTablet'      => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaPaddingTopMobile'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingRightMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingBottomMobile'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingLeftMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingUnitMobile'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaPaddingUnitsSyncMobile'      => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaMarginTop'                   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginRight'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginBottom'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginLeft'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginUnit'                  => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaMarginUnitsSync'             => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaMarginTopTablet'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginRightTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginBottomTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginLeftTablet'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginUnitTablet'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaMarginUnitsSyncTablet'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaMarginTopMobile'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginRightMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginBottomMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginLeftMobile'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginUnitMobile'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaMarginUnitsSyncMobile'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaFontFamily'             => array(
						'type'    => 'string',
						'default' => '',
					),
					'listMetaFontSizeUnit'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaFontSizeUnitTablet'     => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaFontSizeUnitMobile'     => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaFontSize'               => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listMetaFontSizeTablet'         => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listMetaFontSizeMobile'         => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listMetaFontWeight'             => array(
						'type'    => 'string',
						'default' => 400.,
					),
					'listMetaLetterSpacing'          => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listMetaLetterSpacingTablet'    => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listMetaLetterSpacingMobile'    => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listMetaLetterSpacingUnit'      => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listMetaTextTransform'          => array(
						'type'    => 'string',
						'default' => 'none',
					),
					'listMetaLineHeight'             => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listMetaLineHeightTablet'       => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listMetaLineHeightMobile'       => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listMetaLineHeightUnit'         => array(
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
