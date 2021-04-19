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
					'uniqueId'                             => array(
						'type'    => 'string',
						'default' => '',
					),
					'align'                                => array(
						'type'    => 'string',
						'default' => 'full',
					),
					'postType'                             => array(
						'type'    => 'string',
						'default' => 'page',
					),
					'hierarchy'                            => array(
						'type'    => 'string',
						'default' => 'parents', // parents or children.
					),
					'parentItem'                           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'order'                                => array(
						'type'    => 'string',
						'default' => 'ASC',
					),
					'orderBy'                              => array(
						'type'    => 'string',
						'default' => 'title',
					),
					'postsPerPage'                         => array(
						'type'    => 'integer',
						'default' => 20,
					),
					'wpmlLanguage'                         => array(
						'type'    => 'string',
						'default' => 'en',
					),
					'disableStyles'                        => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'pagination'                           => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'listPaddingTop'                       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingRight'                     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingBottom'                    => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingLeft'                      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingUnit'                      => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listPaddingUnitsSync'                 => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listPaddingTopTablet'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingRightTablet'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingBottomTablet'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingLeftTablet'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingUnitTablet'                => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listPaddingUnitsSyncTablet'           => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listPaddingTopMobile'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingRightMobile'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingBottomMobile'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingLeftMobile'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listPaddingUnitMobile'                => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listPaddingUnitsSyncMobile'           => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMarginTop'                        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginRight'                      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginBottom'                     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginLeft'                       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginUnit'                       => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMarginUnitsSync'                  => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMarginTopTablet'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginRightTablet'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginBottomTablet'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginLeftTablet'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginUnitTablet'                 => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMarginUnitsSyncTablet'            => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMarginTopMobile'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginRightMobile'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginBottomMobile'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginLeftMobile'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMarginUnitMobile'                 => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMarginUnitsSyncMobile'            => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitlePaddingTop'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingRight'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingBottom'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingLeft'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingUnit'                 => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitlePaddingUnitsSync'            => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitlePaddingTopTablet'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingRightTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingBottomTablet'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingLeftTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingUnitTablet'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitlePaddingUnitsSyncTablet'      => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitlePaddingTopMobile'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingRightMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingBottomMobile'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingLeftMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitlePaddingUnitMobile'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitlePaddingUnitsSyncMobile'      => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitleMarginTop'                   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginRight'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginBottom'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginLeft'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginUnit'                  => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleMarginUnitsSync'             => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitleMarginTopTablet'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginRightTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginBottomTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginLeftTablet'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginUnitTablet'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleMarginUnitsSyncTablet'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitleMarginTopMobile'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginRightMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginBottomMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginLeftMobile'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listTitleMarginUnitMobile'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleMarginUnitsSyncMobile'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listImageTypeSize'                    => array(
						'type'    => 'string',
						'default' => 'large',
					),
					'listFallbackImg'                      => array(
						'type'    => 'object',
						'default' => '',
					),
					'listFeaturedImageAlign'               => array(
						'type'    => 'string',
						'default' => 'left',
					),
					'listMinHeight'                        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMinHeightTablet'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMinHeightMobile'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMinHeightUnit'                    => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMinHeightUnitTablet'              => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMinHeightUnitMobile'              => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listNumberColumns'                    => array(
						'type'    => 'integer',
						'default' => 1,
					),
					'listBackgroundType'                   => array(
						'type'    => 'string',
						'default' => 'color',
					),
					'listBackgroundColor'                  => array(
						'type'    => 'string',
						'default' => '',
					),
					'listBackgroundGradient'               => array(
						'type'    => 'string',
						'default' => '',
					),
					'listShowFeaturedImage'                => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listBorderWidth'                      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusTopleft'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusTopRight'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusBottomLeft'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusBottomRight'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listBorderRadiusUnitsSync'            => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listBorderRadiusUnit'                 => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listBorderColor'                      => array(
						'type'    => 'string',
						'default' => '',
					),
					'listBorderColorHover'                 => array(
						'type'    => 'string',
						'default' => '',
					),
					'listShowTitle'                        => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listTitleColor'                       => array(
						'type'    => 'string',
						'default' => '#DDDDDD',
					),
					'listTitleColorHover'                  => array(
						'type'    => 'string',
						'default' => '#DDDDDD',
					),
					'listTitleFontFamily'                  => array(
						'type'    => 'string',
						'default' => '',
					),
					'listTitleFontSizeUnit'                => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleFontSizeUnitTablet'          => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleFontSizeUnitMobile'          => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listTitleFontSize'                    => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listTitleFontSizeTablet'              => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listTitleFontSizeMobile'              => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listTitleFontWeight'                  => array(
						'type'    => 'string',
						'default' => 400.,
					),
					'listTitleLetterSpacing'               => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listTitleLetterSpacingTablet'         => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listTitleLetterSpacingMobile'         => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listTitleLetterSpacingUnit'           => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listTitleTextTransform'               => array(
						'type'    => 'string',
						'default' => 'none',
					),
					'listTitleLineHeight'                  => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listTitleLineHeightTablet'            => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listTitleLineHeightMobile'            => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listTitleLineHeightUnit'              => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listTitleAlign'                       => array(
						'type'    => 'string',
						'default' => 'left',
					),
					'listShowPostMeta'                     => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'listShowPostMetaAppearance'           => array(
						'type'    => 'string',
						'default' => 'aligncenter', /* stacked, aligncenter, alignright, alignleft */
					),
					'listShowPostMetaAuthor'               => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listShowPostMetaDate'                 => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listShowPostMetaTerms'                => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'listShowPostMetaComments'             => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'listMetaDateFormat'                   => array(
						'type'    => 'string',
						'default' => 'MMMM DD, YYYY',
					),
					'listMetaIconColor'                    => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listMetaTextColor'                    => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listMetaLinkColor'                    => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listMetaLinkColorHover'               => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listMetaPaddingTop'                   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingRight'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingBottom'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingLeft'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingUnit'                  => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaPaddingUnitsSync'             => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaPaddingTopTablet'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingRightTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingBottomTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingLeftTablet'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingUnitTablet'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaPaddingUnitsSyncTablet'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaPaddingTopMobile'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingRightMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingBottomMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingLeftMobile'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaPaddingUnitMobile'            => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaPaddingUnitsSyncMobile'       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaMarginTop'                    => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginRight'                  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginBottom'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginLeft'                   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginUnit'                   => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaMarginUnitsSync'              => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaMarginTopTablet'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginRightTablet'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginBottomTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginLeftTablet'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginUnitTablet'             => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaMarginUnitsSyncTablet'        => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaMarginTopMobile'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginRightMobile'            => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginBottomMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginLeftMobile'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listMetaMarginUnitMobile'             => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaMarginUnitsSyncMobile'        => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listMetaFontFamily'                   => array(
						'type'    => 'string',
						'default' => '',
					),
					'listMetaFontSizeUnit'                 => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaFontSizeUnitTablet'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaFontSizeUnitMobile'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listMetaFontSize'                     => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listMetaFontSizeTablet'               => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listMetaFontSizeMobile'               => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listMetaFontWeight'                   => array(
						'type'    => 'string',
						'default' => 400.,
					),
					'listMetaLetterSpacing'                => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listMetaLetterSpacingTablet'          => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listMetaLetterSpacingMobile'          => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listMetaLetterSpacingUnit'            => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listMetaTextTransform'                => array(
						'type'    => 'string',
						'default' => 'none',
					),
					'listMetaLineHeight'                   => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listMetaLineHeightTablet'             => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listMetaLineHeightMobile'             => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listMetaLineHeightUnit'               => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listContentTextColor'                 => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listContentLinkColor'                 => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listContentLinkColorHover'            => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listContentPaddingTop'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingRight'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingBottom'             => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingLeft'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingUnit'               => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentPaddingUnitsSync'          => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listContentPaddingTopTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingRightTablet'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingBottomTablet'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingLeftTablet'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingUnitTablet'         => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentPaddingUnitsSyncTablet'    => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listContentPaddingTopMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingRightMobile'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingBottomMobile'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingLeftMobile'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentPaddingUnitMobile'         => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentPaddingUnitsSyncMobile'    => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listContentMarginTop'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginRight'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginBottom'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginLeft'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginUnit'                => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentMarginUnitsSync'           => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listContentMarginTopTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginRightTablet'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginBottomTablet'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginLeftTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginUnitTablet'          => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentMarginUnitsSyncTablet'     => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listContentMarginTopMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginRightMobile'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginBottomMobile'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginLeftMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listContentMarginUnitMobile'          => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentMarginUnitsSyncMobile'     => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listContentFontFamily'                => array(
						'type'    => 'string',
						'default' => '',
					),
					'listContentFontSizeUnit'              => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentFontSizeUnitTablet'        => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentFontSizeUnitMobile'        => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listContentFontSize'                  => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listContentFontSizeTablet'            => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listContentFontSizeMobile'            => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listContentFontWeight'                => array(
						'type'    => 'string',
						'default' => 400.,
					),
					'listContentLetterSpacing'             => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listContentLetterSpacingTablet'       => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listContentLetterSpacingMobile'       => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listContentLetterSpacingUnit'         => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listContentTextTransform'             => array(
						'type'    => 'string',
						'default' => 'none',
					),
					'listContentLineHeight'                => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listContentLineHeightTablet'          => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listContentLineHeightMobile'          => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listContentLineHeightUnit'            => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listShowPostContent'                  => array(
						'type'    => 'string',
						'default' => 'excerpt',
					),
					'listContentAlign'                     => array(
						'type'    => 'string',
						'default' => 'left',
					),
					'listButtonContainerPaddingTop'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingRight'      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingBottom'     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingLeft'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingUnit'       => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonContainerPaddingUnitsSync'  => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonContainerPaddingTopTablet'  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingRightTablet' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingBottomTablet' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingLeftTablet' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingUnitTablet' => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonContainerPaddingUnitsSyncTablet' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonContainerPaddingTopMobile'  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingRightMobile' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingBottomMobile' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingLeftMobile' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerPaddingUnitMobile' => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonContainerPaddingUnitsSyncMobile' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonContainerMarginTop'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginRight'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginBottom'      => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginLeft'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginUnit'        => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonContainerMarginUnitsSync'   => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonContainerMarginTopTablet'   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginRightTablet' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginBottomTablet' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginLeftTablet'  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginUnitTablet'  => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonContainerMarginUnitsSyncTablet' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonContainerMarginTopMobile'   => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginRightMobile' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginBottomMobile' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginLeftMobile'  => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonContainerMarginUnitMobile'  => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonContainerMarginUnitsSyncMobile' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonPaddingTop'                 => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingRight'               => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingBottom'              => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingLeft'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingUnit'                => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonPaddingUnitsSync'           => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonPaddingTopTablet'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingRightTablet'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingBottomTablet'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingLeftTablet'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingUnitTablet'          => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonPaddingUnitsSyncTablet'     => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonPaddingTopMobile'           => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingRightMobile'         => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingBottomMobile'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingLeftMobile'          => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonPaddingUnitMobile'          => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonPaddingUnitsSyncMobile'     => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonShow'                       => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonBorderWidth'                => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonBorderRadiusTopleft'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonBorderRadiusTopRight'       => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonBorderRadiusBottomLeft'     => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonBorderRadiusBottomRight'    => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'listButtonBorderRadiusUnitsSync'      => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'listButtonBorderRadiusUnit'           => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonFontFamily'                 => array(
						'type'    => 'string',
						'default' => '',
					),
					'listButtonFontSizeUnit'               => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonFontSizeUnitTablet'         => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonFontSizeUnitMobile'         => array(
						'type'    => 'string',
						'default' => 'px',
					),
					'listButtonFontSize'                   => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listButtonFontSizeTablet'             => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listButtonFontSizeMobile'             => array(
						'type'    => 'string',
						'default' => '20',
					),
					'listButtonFontWeight'                 => array(
						'type'    => 'string',
						'default' => 400.,
					),
					'listButtonLetterSpacing'              => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listButtonLetterSpacingTablet'        => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listButtonLetterSpacingMobile'        => array(
						'type'    => 'string',
						'default' => '0',
					),
					'listButtonLetterSpacingUnit'          => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listButtonTextTransform'              => array(
						'type'    => 'string',
						'default' => 'none',
					),
					'listButtonLineHeight'                 => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listButtonLineHeightTablet'           => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listButtonLineHeightMobile'           => array(
						'type'    => 'string',
						'default' => '1.2',
					),
					'listButtonLineHeightUnit'             => array(
						'type'    => 'string',
						'default' => 'em',
					),
					'listButtonBorderColor'                => array(
						'type'    => 'string',
						'default' => '',
					),
					'listButtonBorderColorHover'           => array(
						'type'    => 'string',
						'default' => '',
					),
					'listButtonBackgroundType'             => array(
						'type'    => 'string',
						'default' => 'color',
					),
					'listButtonBackgroundColor'            => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listButtonBackgroundColorHover'       => array(
						'type'    => 'string',
						'default' => '#000000',
					),
					'listButtonBackgroundGradient'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'listButtonBackgroundGradientHover'    => array(
						'type'    => 'string',
						'default' => '',
					),
					'listButtonTextColor'                  => array(
						'type'    => 'string',
						'default' => '#FFFFFF',
					),
					'listButtonTextColorHover'             => array(
						'type'    => 'string',
						'default' => '#FFFFFF',
					),
					'listButtonContainerAlign'             => array(
						'type'    => 'string',
						'default' => 'left',
					),
					'listButtonTextAlign'                  => array(
						'type'    => 'string',
						'default' => 'center',
					),
					'listButtonWidth'                      => array(
						'type'    => 'string',
						'default' => 'inline',
					),
					'listButtonReadMoreText'               => array(
						'type'    => 'string',
						'default' => __( 'Read More', 'post-type-archivemapping' ),
					),
				),
				'render_callback' => array( $this, 'output' ),
				'editor_script'   => 'ptam-custom-posts-gutenberg',
				'editor_style'    => 'ptam-style-editor-css',
			)
		);
	}
}
