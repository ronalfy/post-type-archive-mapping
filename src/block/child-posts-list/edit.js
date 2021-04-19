/* eslint-disable no-undef */
/**
 * External dependencies
 */
import classnames from 'classnames';
import axios from 'axios';
import dayjs from 'dayjs';
import DimensionsControl from '../../components/dimensions';
import PTAMColorPicker from '../../components/color-picker';
import PTAMGradientPicker from '../../components/gradient-picker';
import UnitPicker from '../../components/unit-picker';
import Loading from '../../components/Loading';
import hexToRgba from 'hex-to-rgba';
import CSSBuilder from '../../utilities/css-builder';
import valueWithUnit from '../../utilities/value-with-unit';
import shorthandCSS from '../../utilities/shorthand-css';
import ResponsiveTabs from '../../components/responsive-tabs';
import HierarchicalItems from '../../components/hierarchical-items';
import TypographyControls from '../../components/typography';
import GoogleFonts from '../../components/typography/GoogleFonts';
import AlignmentGroup from '../../components/alignment';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { Fragment, useState, useEffect } = wp.element;

// eslint-disable-next-line no-unused-vars
const { __, _n, _x } = wp.i18n;

const {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	TabPanel,
} = wp.components;

const {
	MediaUpload,
	InspectorControls,
	InspectorAdvancedControls,
} = wp.blockEditor;

const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

const PTAMHierarchyChildPostsList = ( props ) => {
	// Shortcuts.
	const { attributes, setAttributes } = props;

	// Get attributes from props.
	const {
		uniqueId,
		// eslint-disable-next-line no-unused-vars
		align,
		postType,
		hierarchy,
		parentItem,
		order,
		orderBy,
		postsPerPage,
		wpmlLanguage,
		disableStyles,
		pagination,
		listPaddingTop,
		listPaddingRight,
		listPaddingBottom,
		listPaddingLeft,
		listPaddingUnit,
		// eslint-disable-next-line no-unused-vars
		listPaddingUnitsSync,
		listPaddingTopTablet,
		listPaddingRightTablet,
		listPaddingBottomTablet,
		listPaddingLeftTablet,
		listPaddingUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listPaddingUnitsSyncTablet,
		listPaddingTopMobile,
		listPaddingRightMobile,
		listPaddingBottomMobile,
		listPaddingLeftMobile,
		listPaddingUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listPaddingUnitsSyncMobile,
		listMarginTop,
		listMarginRight,
		listMarginBottom,
		listMarginLeft,
		listMarginUnit,
		// eslint-disable-next-line no-unused-vars
		listMarginUnitsSync,
		listMarginTopTablet,
		listMarginRightTablet,
		listMarginBottomTablet,
		listMarginLeftTablet,
		listMarginUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listMarginUnitsSyncTablet,
		listMarginTopMobile,
		listMarginRightMobile,
		listMarginBottomMobile,
		listMarginLeftMobile,
		listMarginUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listMarginUnitsSyncMobile,
		listTitlePaddingTop,
		listTitlePaddingRight,
		listTitlePaddingBottom,
		listTitlePaddingLeft,
		listTitlePaddingUnit,
		// eslint-disable-next-line no-unused-vars
		listTitlePaddingUnitsSync,
		listTitlePaddingTopTablet,
		listTitlePaddingRightTablet,
		listTitlePaddingBottomTablet,
		listTitlePaddingLeftTablet,
		listTitlePaddingUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listTitlePaddingUnitsSyncTablet,
		listTitlePaddingTopMobile,
		listTitlePaddingRightMobile,
		listTitlePaddingBottomMobile,
		listTitlePaddingLeftMobile,
		listTitlePaddingUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listTitlePaddingUnitsSyncMobile,
		listTitleMarginTop,
		listTitleMarginRight,
		listTitleMarginBottom,
		listTitleMarginLeft,
		listTitleMarginUnit,
		// eslint-disable-next-line no-unused-vars
		listTitleMarginUnitsSync,
		listTitleMarginTopTablet,
		listTitleMarginRightTablet,
		listTitleMarginBottomTablet,
		listTitleMarginLeftTablet,
		listTitleMarginUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listTitleMarginUnitsSyncTablet,
		listTitleMarginTopMobile,
		listTitleMarginRightMobile,
		listTitleMarginBottomMobile,
		listTitleMarginLeftMobile,
		listTitleMarginUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listTitleMarginUnitsSyncMobile,
		listFallbackImg,
		listImageTypeSize,
		listFeaturedImageAlign,
		listMinHeight,
		listMinHeightTablet,
		listMinHeightMobile,
		listMinHeightUnit,
		listMinHeightUnitTablet,
		listMinHeightUnitMobile,
		listNumberColumns,
		listShowFeaturedImage,
		listBorderWidth,
		// eslint-disable-next-line no-unused-vars
		listBorderRadiusTopleft,
		// eslint-disable-next-line no-unused-vars
		listBorderRadiusTopRight,
		// eslint-disable-next-line no-unused-vars
		listBorderRadiusBottomLeft,
		// eslint-disable-next-line no-unused-vars
		listBorderRadiusBottomRight,
		// eslint-disable-next-line no-unused-vars
		listBorderRadiusUnitsSync,
		// eslint-disable-next-line no-unused-vars
		listBackgroundType,
		listBackgroundColor,
		listBackgroundGradient,
		listBorderRadiusUnit,
		listBorderColor,
		listShowTitle,
		listTitleColor,
		listTitleColorHover,
		listTitleFontFamily,
		listTitleFontSizeUnit,
		listTitleFontSizeUnitTablet,
		listTitleFontSizeUnitMobile,
		listTitleFontSize,
		listTitleFontSizeTablet,
		listTitleFontSizeMobile,
		listTitleFontWeight,
		listTitleLetterSpacing,
		listTitleLetterSpacingTablet,
		listTitleLetterSpacingMobile,
		listTitleLetterSpacingUnit,
		listTitleTextTransform,
		listTitleLineHeight,
		listTitleLineHeightTablet,
		listTitleLineHeightMobile,
		listTitleLineHeightUnit,
		listTitleAlign,
		listShowPostMeta,
		listShowPostMetaAppearance,
		listShowPostMetaAuthor,
		listShowPostMetaDate,
		listShowPostMetaTerms,
		listShowPostMetaComments,
		listMetaDateFormat,
		listMetaIconColor,
		listMetaTextColor,
		listMetaLinkColor,
		listMetaLinkColorHover,
		listMetaPaddingTop,
		listMetaPaddingRight,
		listMetaPaddingBottom,
		listMetaPaddingLeft,
		listMetaPaddingUnit,
		// eslint-disable-next-line no-unused-vars
		listMetaPaddingUnitsSync,
		listMetaPaddingTopTablet,
		listMetaPaddingRightTablet,
		listMetaPaddingBottomTablet,
		listMetaPaddingLeftTablet,
		listMetaPaddingUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listMetaPaddingUnitsSyncTablet,
		listMetaPaddingTopMobile,
		listMetaPaddingRightMobile,
		listMetaPaddingBottomMobile,
		listMetaPaddingLeftMobile,
		listMetaPaddingUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listMetaPaddingUnitsSyncMobile,
		listMetaMarginTop,
		listMetaMarginRight,
		listMetaMarginBottom,
		listMetaMarginLeft,
		listMetaMarginUnit,
		// eslint-disable-next-line no-unused-vars
		listMetaMarginUnitsSync,
		listMetaMarginTopTablet,
		listMetaMarginRightTablet,
		listMetaMarginBottomTablet,
		listMetaMarginLeftTablet,
		listMetaMarginUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listMetaMarginUnitsSyncTablet,
		listMetaMarginTopMobile,
		listMetaMarginRightMobile,
		listMetaMarginBottomMobile,
		listMetaMarginLeftMobile,
		listMetaMarginUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listMetaMarginUnitsSyncMobile,
		listMetaFontFamily,
		listMetaFontSizeUnit,
		listMetaFontSizeUnitTablet,
		listMetaFontSizeUnitMobile,
		listMetaFontSize,
		listMetaFontSizeTablet,
		listMetaFontSizeMobile,
		listMetaFontWeight,
		listMetaLetterSpacing,
		listMetaLetterSpacingTablet,
		listMetaLetterSpacingMobile,
		listMetaLetterSpacingUnit,
		listMetaTextTransform,
		listMetaLineHeight,
		listMetaLineHeightTablet,
		listMetaLineHeightMobile,
		listMetaLineHeightUnit,
		listContentPaddingTop,
		listContentPaddingRight,
		listContentPaddingBottom,
		listContentPaddingLeft,
		listContentPaddingUnit,
		// eslint-disable-next-line no-unused-vars
		listContentPaddingUnitsSync,
		listContentPaddingTopTablet,
		listContentPaddingRightTablet,
		listContentPaddingBottomTablet,
		listContentPaddingLeftTablet,
		listContentPaddingUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listContentPaddingUnitsSyncTablet,
		listContentPaddingTopMobile,
		listContentPaddingRightMobile,
		listContentPaddingBottomMobile,
		listContentPaddingLeftMobile,
		listContentPaddingUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listContentPaddingUnitsSyncMobile,
		listContentMarginTop,
		listContentMarginRight,
		listContentMarginBottom,
		listContentMarginLeft,
		listContentMarginUnit,
		// eslint-disable-next-line no-unused-vars
		listContentMarginUnitsSync,
		listContentMarginTopTablet,
		listContentMarginRightTablet,
		listContentMarginBottomTablet,
		listContentMarginLeftTablet,
		listContentMarginUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listContentMarginUnitsSyncTablet,
		listContentMarginTopMobile,
		listContentMarginRightMobile,
		listContentMarginBottomMobile,
		listContentMarginLeftMobile,
		listContentMarginUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listContentMarginUnitsSyncMobile,
		listContentFontFamily,
		listContentFontSizeUnit,
		listContentFontSizeUnitTablet,
		listContentFontSizeUnitMobile,
		listContentFontSize,
		listContentFontSizeTablet,
		listContentFontSizeMobile,
		listContentFontWeight,
		listContentLetterSpacing,
		listContentLetterSpacingTablet,
		listContentLetterSpacingMobile,
		listContentLetterSpacingUnit,
		listContentTextTransform,
		listContentLineHeight,
		listContentLineHeightTablet,
		listContentLineHeightMobile,
		listContentLineHeightUnit,
		listShowPostContent,
		listContentAlign,
		listContentTextColor,
		listContentLinkColor,
		listContentLinkColorHover,
		listButtonShow,
		listButtonContainerPaddingTop,
		listButtonContainerPaddingRight,
		listButtonContainerPaddingBottom,
		listButtonContainerPaddingLeft,
		listButtonContainerPaddingUnit,
		// eslint-disable-next-line no-unused-vars
		listButtonContainerPaddingUnitsSync,
		listButtonContainerPaddingTopTablet,
		listButtonContainerPaddingRightTablet,
		listButtonContainerPaddingBottomTablet,
		listButtonContainerPaddingLeftTablet,
		listButtonContainerPaddingUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listButtonContainerPaddingUnitsSyncTablet,
		listButtonContainerPaddingTopMobile,
		listButtonContainerPaddingRightMobile,
		listButtonContainerPaddingBottomMobile,
		listButtonContainerPaddingLeftMobile,
		listButtonContainerPaddingUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listButtonContainerPaddingUnitsSyncMobile,
		listButtonContainerMarginTop,
		listButtonContainerMarginRight,
		listButtonContainerMarginBottom,
		listButtonContainerMarginLeft,
		listButtonContainerMarginUnit,
		// eslint-disable-next-line no-unused-vars
		listButtonContainerMarginUnitsSync,
		listButtonContainerMarginTopTablet,
		listButtonContainerMarginRightTablet,
		listButtonContainerMarginBottomTablet,
		listButtonContainerMarginLeftTablet,
		listButtonContainerMarginUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listButtonContainerMarginUnitsSyncTablet,
		listButtonContainerMarginTopMobile,
		listButtonContainerMarginRightMobile,
		listButtonContainerMarginBottomMobile,
		listButtonContainerMarginLeftMobile,
		listButtonContainerMarginUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listButtonContainerMarginUnitsSyncMobile,
		listButtonPaddingTop,
		listButtonPaddingRight,
		listButtonPaddingBottom,
		listButtonPaddingLeft,
		listButtonPaddingUnit,
		// eslint-disable-next-line no-unused-vars
		listButtonPaddingUnitsSync,
		listButtonPaddingTopTablet,
		listButtonPaddingRightTablet,
		listButtonPaddingBottomTablet,
		listButtonPaddingLeftTablet,
		listButtonPaddingUnitTablet,
		// eslint-disable-next-line no-unused-vars
		listButtonPaddingUnitsSyncTablet,
		listButtonPaddingTopMobile,
		listButtonPaddingRightMobile,
		listButtonPaddingBottomMobile,
		listButtonPaddingLeftMobile,
		listButtonPaddingUnitMobile,
		// eslint-disable-next-line no-unused-vars
		listButtonPaddingUnitsSyncMobile,
		listButtonBorderWidth,
		listButtonBorderColor,
		listButtonBorderColorHover,
		listButtonBorderRadiusTopleft,
		listButtonBorderRadiusTopRight,
		listButtonBorderRadiusBottomRight,
		listButtonBorderRadiusBottomLeft,
		listButtonBorderRadiusTopleftTablet,
		listButtonBorderRadiusTopRightTablet,
		listButtonBorderRadiusBottomRightTablet,
		listButtonBorderRadiusBottomLeftTablet,
		listButtonBorderRadiusTopleftMobile,
		listButtonBorderRadiusTopRightMobile,
		listButtonBorderRadiusBottomRightMobile,
		listButtonBorderRadiusBottomLeftMobile,
		listButtonBorderRadiusUnit,
		listButtonFontFamily,
		listButtonFontSizeUnit,
		listButtonFontSizeUnitTablet,
		listButtonFontSizeUnitMobile,
		listButtonFontSize,
		listButtonFontSizeTablet,
		listButtonFontSizeMobile,
		listButtonFontWeight,
		listButtonLetterSpacing,
		listButtonLetterSpacingTablet,
		listButtonLetterSpacingMobile,
		listButtonLetterSpacingUnit,
		listButtonTextTransform,
		listButtonLineHeight,
		listButtonLineHeightTablet,
		listButtonLineHeightMobile,
		listButtonLineHeightUnit,
		listButtonBackgroundType,
		listButtonBackgroundColor,
		listButtonBackgroundColorHover,
		listButtonBackgroundGradient,
		listButtonBackgroundGradientHover,
		listButtonTextColor,
		listButtonTextColorHover,
		listButtonContainerAlign,
		listButtonTextAlign,
		listButtonWidth,
		listButtonReadMoreText,
	} = attributes;

	// Retrieve WPML languages.
	// eslint-disable-next-line no-undef
	const wpmlInstalled = ptam_globals.wpml_installed;
	// eslint-disable-next-line no-undef
	const wpmlLanguages = ptam_globals.wpml_languages;

	const [ loading, setLoading ] = useState( true );
	const [ itemNumberTimer, setItemNumberTimer ] = useState( 0 );
	// eslint-disable-next-line no-unused-vars
	const [ config, setConfig ] = useState( {
		headers: {
			// eslint-disable-next-line no-undef
			'X-WP-Nonce': ptam_globals.rest_nonce,
		},
	} );
	const [ numItems, setNumItems ] = useState( postsPerPage );
	const [ posts, setPosts ] = useState( {} );
	const [
		imageSizes,
		// eslint-disable-next-line no-unused-vars
		setImageSizes,
	] = useState( ptam_globals.image_sizes );
	const [ deviceType, setDeviceType ] = useState( 'Desktop' );

	useEffect( () => {
		// Get unique ID for the block. Props @generateblocks.
		const id = props.clientId.substr( 2, 9 ).replace( '-', '' );
		if ( ! attributes.uniqueId ) {
			setAttributes( {
				uniqueId: id,
			} );
		}
	}, [] );

	// Retrieve the latest posts.
	useEffect( () => {
		getPosts( {} );
	}, [
		postType,
		hierarchy,
		parentItem,
		order,
		orderBy,
		numItems,
		listFallbackImg,
		listImageTypeSize,
	] );

	/**
	 * Set a timer for number of items and expire after one second of inactivity.
	 *
	 * @param {number} value Number of items to display.
	 */
	const itemNumberRender = ( value ) => {
		if ( itemNumberTimer ) {
			clearTimeout( itemNumberTimer );
		}
		setItemNumberTimer(
			setTimeout( () => {
				setNumItems( value );
			}, 1000 )
		);
	};

	/**
	 * Output JSX for WPML languages.
	 *
	 * @param {string} selectedLanguage The language selected.
	 * @return {JSX} Select box with languages.
	 */
	const getLanguages = ( selectedLanguage ) => {
		if ( wpmlInstalled ) {
			return (
				<SelectControl
					label={ __( 'Language', 'post-type-archive-mapping' ) }
					options={ wpmlLanguages }
					value={ selectedLanguage }
					onChange={ ( value ) => {
						setAttributes( { wpmlLanguage: value } );
					} }
				/>
			);
		}
		return <></>;
	};

	/**
	 * Retrieve the items via REST API.
	 */
	const getPosts = async() => {
		setLoading( true );
		try {
			const result = await axios.post(
				// eslint-disable-next-line no-undef
				ptam_globals.rest_url + `ptam/v2/get_hierarchical_posts_extra`,
				{
					post_type: postType,
					order,
					orderby: orderBy,
					posts_per_page: postsPerPage,
					image_size: listImageTypeSize,
					language: wpmlLanguage,
					post_parent: parentItem,
					hierarchy,
					default_image: listFallbackImg,
				},
				config
			);
			setPosts( result.data );
			setLoading( false );
		} catch ( e ) {
			// Error :(
		}
	};

	/**
	 * Retrieve post HTML based on view.
	 *
	 * @return {JSX} List|Grid|Column HTML.
	 */
	const getPostHtml = () => {
		if ( Object.keys( posts ).length === 0 ) {
			return (
				<h2>{ __( 'No items could be found.', 'post-type-archive-mapping' ) }</h2>
			);
		}
		return <> { outputListHtml() } </>;
	};

	/**
	 * Output List HTML.
	 *
	 * @return {JSX} Grid HTML.
	 */
	const outputListHtml = () => {
		const classes = classnames(
			'ptam-hierarchical-list-items',
			`ptam-hierarchical-list-columns-${ parseInt( listNumberColumns ) }`
		);
		return <div className={ classes }>{ outputListItemsHtml() }</div>;
	};

	/**
	 * Output Post list HTML.
	 *
	 * @return {JSX} Grid item HTML.
	 */
	const outputListItemsHtml = () => {
		const htmlToReactParser = new HtmlToReactParser();
		return Object.keys( posts ).map( ( item, i ) => (
			<article key={ i } className="ptam-hierarchical-list-item">
				{ listShowTitle && (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<h2>
						<a
							href={ posts[ i ].link }
							onClick={ ( e ) => {
								e.preventDefault();
							} }
						>
							{ posts[ i ].post_title }
						</a>
					</h2>
				) }
				{ listShowPostMeta && (
					<div
						className={ classnames(
							'ptam-hierarchical-list-item-meta',
							listShowPostMetaAppearance
						) }
					>
						{ listShowPostMetaAuthor && (
							<div className="ptam-author">
								<span>
									<a
										onClick={ ( e ) => {
											e.preventDefault();
										} }
										href={ posts[ i ].author_info.author_link }
									>
										{ posts[ i ].author_info.display_name }
									</a>
								</span>
							</div>
						) }
						{ listShowPostMetaDate && (
							<div className="ptam-date">
								<span>
									<time
										dateTime={ dayjs( posts[ i ].post_date_gmt ).format() }
										className={ 'ptam-block-post-grid-date' }
									>
										{ dayjs( posts[ i ].post_date_gmt ).format( listMetaDateFormat ) }
									</time>
								</span>
							</div>
						) }
						{ listShowPostMetaTerms && posts[ i ].taxonomies && (
							<div className="ptam-terms">
								<span>{ outputPostTerms( posts[ i ] ) }</span>
							</div>
						) }
						{ listShowPostMetaComments && posts[ i ].comment_count > 0 && (
							<div className="ptam-comments">
								<span>
									{ posts[ i ].comment_count }{ ' ' }
									{ _n(
										'Comment',
										'Comments',
										posts[ i ].comment_count,
										'post-type-archive-mapping'
									) }
								</span>
							</div>
						) }
					</div>
				) }
				{ listShowFeaturedImage && '' !== posts[ i ].featured_image_src && (
					<figure>
						<a
							href={ posts[ i ].link }
							onClick={ ( e ) => {
								e.preventDefault();
							} }
						>
							<img src={ posts[ i ].featured_image_src } alt="" />
						</a>
					</figure>
				) }
				{ 'none' !== listShowPostContent &&
					<div className="ptam-hierarchical-list-content">
						{ 'excerpt' === listShowPostContent ? htmlToReactParser.parse( posts[ i ].post_excerpt ) : htmlToReactParser.parse( posts[ i ].post_content ) }
					</div>

				}
				{ listButtonShow &&
					<div className="ptam-hierarchical-list-button-container">
						<a
							href={ posts[ i ].link }
							onClick={ ( e ) => {
								e.preventDefault();
							} }
						>
							{ listButtonReadMoreText }
						</a>
					</div>
				}
			</article>
		) );
	};

	/**
	 * Output the terms in comma-separated format. (Taxonomy: term 1, term 2, term3)
	 *
	 * @param {Object} post The individual post object.
	 * @return {JSX} Taxonomy term list.
	 */
	const outputPostTerms = ( post ) => {
		return Object.values( post.taxonomies ).map( ( taxData, taxKey ) => {
			/* Tag mapping courtesy: @imos https://stackoverflow.com/a/40276830 */
			return (
				<Fragment key={ taxKey }>
					<span className="ptam-hierarchical-list-meta-tax-name">
						{ taxData.label }:&nbsp;
					</span>
					{ Object.values( taxData.terms ).map( ( termData, i ) => [
						i > 0 && ', ',
						<a
							href={ termData.link }
							onClick={ ( e ) => {
								e.preventDefault();
							} }
							key={ i }
						>
							{ termData.label }
						</a>,
					] ) }
				</Fragment>
			);
		} );
	};

	/**
	 * Get the current device type (mobile|desktop|tablet).
	 *
	 * @return {string} Current device.
	 */
	const getDeviceType = () => {
		return props.deviceType ? props.deviceType : deviceType;
	};

	/**
	 * Change the device type.
	 *
	 * @param {string} device The device to change to.
	 */
	const changeDeviceType = ( device ) => {
		if ( props.deviceType ) {
			props.setDeviceType( device );
			setDeviceType( device );
		} else {
			setDeviceType( device );
		}
	};

	// Hierarchical Post Types.
	const postTypeOptions = [];
	// eslint-disable-next-line no-undef
	for ( const postTypeKey in ptam_globals.post_types_hierarchical ) {
		postTypeOptions.push( {
			value: postTypeKey,
			// eslint-disable-next-line no-undef
			label: ptam_globals.post_types_hierarchical[ postTypeKey ],
		} );
	}

	const hierarchyOptions = [
		{
			value: 'parents',
			label: _x(
				'Only Parents',
				'Parent posts in a hierarchy',
				'post-type-archive-mapping'
			),
		},
		{
			value: 'children',
			label: _x(
				'Only Children',
				'Children posts in a hierarchy',
				'post-type-archive-mapping'
			),
		},
	];

	// Order Params.
	const orderOptions = [
		{ value: 'ASC', label: __( 'ASC', 'post-type-archive-mapping' ) },
		{ value: 'DESC', label: __( 'DESC', 'post-type-archive-mapping' ) },
	];

	const orderByOptions = [
		{ value: 'ID', label: __( 'ID', 'post-type-archive-mapping' ) },
		{
			value: 'menu_order',
			label: __( 'Menu Order', 'post-type-archive-mapping' ),
		},
		{
			value: 'author',
			label: __( 'Post Author', 'post-type-archive-mapping' ),
		},
		{ value: 'date', label: __( 'Date', 'post-type-archive-mapping' ) },
		{
			value: 'modified',
			label: __( 'Date Modified', 'post-type-archive-mapping' ),
		},
		{ value: 'name', label: __( 'Post Slug', 'post-type-archive-mapping' ) },
		{ value: 'title', label: __( 'Title', 'post-type-archive-mapping' ) },
		{ value: 'rand', label: __( 'Random', 'post-type-archive-mapping' ) },
	];

	const contentOptions = [
		{ value: 'none', label: __( 'Show No Content', 'post-type-archive-mapping' ) },
		{ value: 'excerpt', label: __( 'Show Excerpt', 'post-type-archive-mapping' ) },
		{ value: 'full', label: __( 'Show Full Content', 'post-type-archive-mapping' ) },
	];

	// List title typography placeholders.
	const listTitleFontParamsDesktop = {
		fontFamily: listTitleFontFamily,
		fontSize: listTitleFontSize,
		fontSizeUnit: listTitleFontSizeUnit,
		fontWeight: listTitleFontWeight,
		letterSpacing: listTitleLetterSpacing,
		letterSpacingUnit: listTitleLetterSpacingUnit,
		textTransform: listTitleTextTransform,
		lineHeight: listTitleLineHeight,
		lineHeightUnit: listTitleLineHeightUnit,
	};
	const listTitleFontParamsTablet = {
		fontFamily: listTitleFontFamily,
		fontSize: listTitleFontSizeTablet,
		fontSizeUnit: listTitleFontSizeUnitTablet,
		fontWeight: listTitleFontWeight,
		letterSpacing: listTitleLetterSpacingTablet,
		letterSpacingUnit: listTitleLetterSpacingUnit,
		textTransform: listTitleTextTransform,
		lineHeight: listTitleLineHeightTablet,
		lineHeightUnit: listTitleLineHeightUnit,
	};
	const listTitleFontParamsMobile = {
		fontFamily: listTitleFontFamily,
		fontSize: listTitleFontSizeMobile,
		fontSizeUnit: listTitleFontSizeUnitMobile,
		fontWeight: listTitleFontWeight,
		letterSpacing: listTitleLetterSpacingMobile,
		letterSpacingUnit: listTitleLetterSpacingUnit,
		textTransform: listTitleTextTransform,
		lineHeight: listTitleLineHeightMobile,
		lineHeightUnit: listTitleLineHeightUnit,
	};

	// List Meta Typography Controls.
	const listMetaFontParamsDesktop = {
		fontFamily: listMetaFontFamily,
		fontSize: listMetaFontSize,
		fontSizeUnit: listMetaFontSizeUnit,
		fontWeight: listMetaFontWeight,
		letterSpacing: listMetaLetterSpacing,
		letterSpacingUnit: listMetaLetterSpacingUnit,
		textTransform: listMetaTextTransform,
		lineHeight: listMetaLineHeight,
		lineHeightUnit: listMetaLineHeightUnit,
	};
	const listMetaFontParamsTablet = {
		fontFamily: listMetaFontFamily,
		fontSize: listMetaFontSizeTablet,
		fontSizeUnit: listMetaFontSizeUnitTablet,
		fontWeight: listMetaFontWeight,
		letterSpacing: listMetaLetterSpacingTablet,
		letterSpacingUnit: listMetaLetterSpacingUnit,
		textTransform: listMetaTextTransform,
		lineHeight: listMetaLineHeightTablet,
		lineHeightUnit: listMetaLineHeightUnit,
	};
	const listMetaFontParamsMobile = {
		fontFamily: listMetaFontFamily,
		fontSize: listMetaFontSizeMobile,
		fontSizeUnit: listMetaFontSizeUnitMobile,
		fontWeight: listMetaFontWeight,
		letterSpacing: listMetaLetterSpacingMobile,
		letterSpacingUnit: listMetaLetterSpacingUnit,
		textTransform: listMetaTextTransform,
		lineHeight: listMetaLineHeightMobile,
		lineHeightUnit: listMetaLineHeightUnit,
	};

	// List Meta Typography Controls.
	const listButtonFontParamsDesktop = {
		fontFamily: listButtonFontFamily,
		fontSize: listButtonFontSize,
		fontSizeUnit: listButtonFontSizeUnit,
		fontWeight: listButtonFontWeight,
		letterSpacing: listButtonLetterSpacing,
		letterSpacingUnit: listButtonLetterSpacingUnit,
		textTransform: listButtonTextTransform,
		lineHeight: listButtonLineHeight,
		lineHeightUnit: listButtonLineHeightUnit,
	};
	const listButtonFontParamsTablet = {
		fontFamily: listButtonFontFamily,
		fontSize: listButtonFontSizeTablet,
		fontSizeUnit: listButtonFontSizeUnitTablet,
		fontWeight: listButtonFontWeight,
		letterSpacing: listButtonLetterSpacingTablet,
		letterSpacingUnit: listButtonLetterSpacingUnit,
		textTransform: listButtonTextTransform,
		lineHeight: listButtonLineHeightTablet,
		lineHeightUnit: listButtonLineHeightUnit,
	};
	const listButtonFontParamsMobile = {
		fontFamily: listButtonFontFamily,
		fontSize: listButtonFontSizeMobile,
		fontSizeUnit: listButtonFontSizeUnitMobile,
		fontWeight: listButtonFontWeight,
		letterSpacing: listButtonLetterSpacingMobile,
		letterSpacingUnit: listButtonLetterSpacingUnit,
		textTransform: listButtonTextTransform,
		lineHeight: listButtonLineHeightMobile,
		lineHeightUnit: listButtonLineHeightUnit,
	};

	// List Content Typography Controls.
	const listContentFontParamsDesktop = {
		fontFamily: listContentFontFamily,
		fontSize: listContentFontSize,
		fontSizeUnit: listContentFontSizeUnit,
		fontWeight: listContentFontWeight,
		letterSpacing: listContentLetterSpacing,
		letterSpacingUnit: listContentLetterSpacingUnit,
		textTransform: listContentTextTransform,
		lineHeight: listContentLineHeight,
		lineHeightUnit: listContentLineHeightUnit,
	};
	const listContentFontParamsTablet = {
		fontFamily: listContentFontFamily,
		fontSize: listContentFontSizeTablet,
		fontSizeUnit: listContentFontSizeUnitTablet,
		fontWeight: listContentFontWeight,
		letterSpacing: listContentLetterSpacingTablet,
		letterSpacingUnit: listContentLetterSpacingUnit,
		textTransform: listContentTextTransform,
		lineHeight: listContentLineHeightTablet,
		lineHeightUnit: listContentLineHeightUnit,
	};
	const listContentFontParamsMobile = {
		fontFamily: listContentFontFamily,
		fontSize: listContentFontSizeMobile,
		fontSizeUnit: listContentFontSizeUnitMobile,
		fontWeight: listContentFontWeight,
		letterSpacing: listContentLetterSpacingMobile,
		letterSpacingUnit: listContentLetterSpacingUnit,
		textTransform: listContentTextTransform,
		lineHeight: listContentLineHeightMobile,
		lineHeightUnit: listContentLineHeightUnit,
	};

	// Image Sizes.
	const imageSizeOptions = [];
	for ( const imageKey in imageSizes ) {
		imageSizeOptions.push( { value: imageKey, label: imageKey } );
	}

	// Background Options.
	const listBackgroundChoices = [
		{
			value: 'gradient',
			label: __( 'Gradient', 'post-type-archive-mapping' ),
		},
		{
			value: 'color',
			label: __( 'Color', 'post-type-archive-mapping' ),
		},
	];

	const postMetaAppearanceOptions = [
		{
			value: 'stacked',
			label: _x(
				'Stacked',
				'Items will be stacked vertically',
				'post-type-archive-mapping'
			),
		},
		{
			value: 'alignleft',
			label: _x(
				'Align Left',
				'Items will be aligned left',
				'post-type-archive-mapping'
			),
		},
		{
			value: 'aligncenter',
			label: _x(
				'Align Center',
				'Items will be aligned center',
				'post-type-archive-mapping'
			),
		},
		{
			value: 'alignright',
			label: _x(
				'Align Right',
				'Items will be aligned right',
				'post-type-archive-mapping'
			),
		},
	];

	// Button Width Style Options.
	const buttonWidthOptions = [
		{
			value: 'full',
			label: _x(
				'Full',
				'Items will be at full width',
				'post-type-archive-mapping'
			),
		},
		{
			value: 'inline',
			label: _x(
				'Inline',
				'Items have inline width',
				'post-type-archive-mapping'
			),
		},
	];

	const currentTime = new Date();
	const postMetaDateFormatOptions = [
		{
			value: 'YYYY-MM-DD',
			label: dayjs( currentTime.getTime() ).format( 'YYYY-MM-DD' ),
		},
		{
			value: 'MMMM DD, YYYY',
			label: dayjs( currentTime.getTime() ).format( 'MMMM DD, YYYY' ),
		},
		{
			value: 'MM/DD/YYYY',
			label: dayjs( currentTime.getTime() ).format( 'MM/DD/YYYY' ),
		},
		{
			value: 'DD/MM/YYYY',
			label: dayjs( currentTime.getTime() ).format( 'DD/MM/YYYY' ),
		},
	];

	const listOptions = (
		<Fragment>
			<ResponsiveTabs
				{ ...props }
				selectedDevice={ getDeviceType() }
				onClick={ ( device ) => {
					changeDeviceType( device );
				} }
			/>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Container', 'post-type-archive-mapping' ) }
			>
				{ 'Desktop' === getDeviceType() && (
					<>
						<UnitPicker
							label={ __( 'Minimum Height', 'post-type-archive-mapping' ) }
							value={ listMinHeightUnit }
							units={ [ 'px', 'em', 'vh' ] }
							onClick={ ( value ) => {
								setAttributes( {
									listMinHeightUnit: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ listMinHeight ? listMinHeight : '' }
							onChange={ ( value ) => {
								setAttributes( {
									listMinHeight: parseFloat( value ),
								} );
							} }
						/>
						<RangeControl
							label={ __( 'Number of Columns', 'post-type-archive-mapping' ) }
							value={ listNumberColumns }
							onChange={ ( value ) => setAttributes( { listNumberColumns: value } ) }
							min={ 1 }
							max={ 4 }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listPaddingTop"
							attrRight="listPaddingRight"
							attrBottom="listPaddingBottom"
							attrLeft="listPaddingLeft"
							attrUnit="listPaddingUnit"
							attrSyncUnits="listPaddingUnitsSync"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Margin', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listMarginTop"
							attrRight="listMarginRight"
							attrBottom="listMarginBottom"
							attrLeft="listMarginLeft"
							attrUnit="listMarginUnit"
							attrSyncUnits="listMarginUnitsSync"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<SelectControl
							label={ __( 'Background Type', 'post-type-archive-mapping' ) }
							options={ listBackgroundChoices }
							value={ listBackgroundType }
							onChange={ ( value ) => {
								setAttributes( {
									listBackgroundType: value,
								} );
							} }
						/>
						{ 'color' === listBackgroundType && (
							<PTAMColorPicker
								value={ listBackgroundColor }
								valueOpacity={ 1 }
								onChange={ ( value ) => {
									setAttributes( { listBackgroundColor: value } );
								} }
								// eslint-disable-next-line no-unused-vars
								onOpacityChange={ ( value ) => {} }
								label={ __( 'Background Color', 'post-type-archive-mapping' ) }
								alpha={ false }
							/>
						) }
						{ 'gradient' === listBackgroundType && (
							<PTAMGradientPicker
								onChange={ ( value ) => {
									setAttributes( {
										listBackgroundGradient: value,
									} );
								} }
								label={ __( 'Background Gradient', 'post-type-archive-mapping' ) }
								value={ listBackgroundGradient }
							/>
						) }
						<PTAMColorPicker
							value={ listBorderColor }
							valueOpacity={ 1 }
							onChange={ ( value ) => {
								setAttributes( { listBorderColor: value } );
							} }
							// eslint-disable-next-line no-unused-vars
							onOpacityChange={ ( value ) => {} }
							label={ __( 'Border Color', 'post-type-archive-mapping' ) }
							alpha={ false }
						/>
						<RangeControl
							label={ __( 'Border Width', 'post-type-archive-mapping' ) }
							value={ listBorderWidth }
							onChange={ ( value ) => setAttributes( { listBorderWidth: value } ) }
							min={ 0 }
							max={ 100 }
						/>
						<DimensionsControl
							label={ __( 'Border Radius', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listBorderRadiusTopleft"
							attrRight="listBorderRadiusTopRight"
							attrBottom="listBorderRadiusBottomLeft"
							attrLeft="listBorderRadiusBottomRight"
							attrUnit="listBorderRadiusUnit"
							attrSyncUnits="listBorderRadiusUnitsSync"
							labelTop={ __( 'T-Left', 'post-type-archive-mapping' ) }
							labelRight={ __( 'T-Right', 'post-type-archive-mapping' ) }
							labelBottom={ __( 'B-Right', 'post-type-archive-mapping' ) }
							labelLeft={ __( 'B-Left', 'post-type-archive-mapping' ) }
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
				{ 'Tablet' === getDeviceType() && (
					<>
						<UnitPicker
							label={ __( 'Minimum Height', 'post-type-archive-mapping' ) }
							value={ listMinHeightUnitTablet }
							units={ [ 'px', 'em', 'vh' ] }
							onClick={ ( value ) => {
								setAttributes( {
									listMinHeightUnitTablet: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ listMinHeightTablet ? listMinHeightTablet : '' }
							onChange={ ( value ) => {
								setAttributes( {
									listMinHeightTablet: parseFloat( value ),
								} );
							} }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listPaddingTopTablet"
							attrRight="listPaddingRightTablet"
							attrBottom="listPaddingBottomTablet"
							attrLeft="listPaddingLeftTablet"
							attrUnit="listPaddingUnitTablet"
							attrSyncUnits="listPaddingUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listMarginTopTablet"
							attrRight="listMarginRightTablet"
							attrBottom="listMarginBottomTablet"
							attrLeft="listMarginLeftTablet"
							attrUnit="listMarginUnitTablet"
							attrSyncUnits="listMarginUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
				{ 'Mobile' === getDeviceType() && (
					<>
						<UnitPicker
							label={ __( 'Minimum Height', 'post-type-archive-mapping' ) }
							value={ listMinHeightUnitMobile }
							units={ [ 'px', 'em', 'vh' ] }
							onClick={ ( value ) => {
								setAttributes( {
									listMinHeightUnitMobile: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ listMinHeightMobile ? listMinHeightMobile : '' }
							onChange={ ( value ) => {
								setAttributes( {
									listMinHeightMobile: parseFloat( value ),
								} );
							} }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listPaddingTopMobile"
							attrRight="listPaddingRightMobile"
							attrBottom="listPaddingBottomMobile"
							attrLeft="listPaddingLeftMobile"
							attrUnit="listPaddingUnitMobile"
							attrSyncUnits="listPaddingUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listMarginTopMobile"
							attrRight="listMarginRightMobile"
							attrBottom="listMarginBottomMobile"
							attrLeft="listMarginLeftMobile"
							attrUnit="listMarginUnitMobile"
							attrSyncUnits="listMarginUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
			</PanelBody>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Title', 'post-type-archive-mapping' ) }
			>
				{ 'Desktop' === getDeviceType() && (
					<ToggleControl
						label={ __( 'Show Title', 'post-type-archive-mapping' ) }
						checked={ listShowTitle }
						onChange={ ( value ) => {
							setAttributes( {
								listShowTitle: value,
							} );
						} }
					/>
				) }

				{ listShowTitle && (
					<>
						{ 'Desktop' === getDeviceType() && (
							<TabPanel
								className="layout-tab-panel ptam-control-tabs"
								activeClass="active-tab"
								tabs={ [
									{
										name: 'list-title-color',
										title: __( 'Normal', 'post-type-archive-mapping' ),
										className: 'list-title-color',
									},
									{
										name: 'list-title-color-hover',
										title: __( 'Hover', 'post-type-archive-mapping' ),
										className: 'list-title-color-hover',
									},
								] }
							>
								{ ( tab ) => {
									const isNormal = tab.name === 'list-title-color';

									return (
										<div>
											{ isNormal ? (
												<PTAMColorPicker
													value={ listTitleColor }
													valueOpacity={ 1 }
													onChange={ ( value ) => {
														setAttributes( { listTitleColor: value } );
													} }
													// eslint-disable-next-line no-unused-vars
													onOpacityChange={ ( value ) => {} }
													label={ __( 'Title Color', 'post-type-archive-mapping' ) }
													alpha={ false }
												/>
											) : (
												<PTAMColorPicker
													value={ listTitleColorHover }
													valueOpacity={ 1 }
													onChange={ ( value ) => {
														setAttributes( { listTitleColorHover: value } );
													} }
													// eslint-disable-next-line no-unused-vars
													onOpacityChange={ ( value ) => {} }
													label={ __( 'Title Color', 'post-type-archive-mapping' ) }
													alpha={ false }
												/>
											) }
										</div>
									);
								} }
							</TabPanel>
						) }
						{ 'Desktop' === getDeviceType() && (
							<>
								<TypographyControls
									label={ __( 'Title Typography', 'post-type-archive-mapping' ) }
									options={ listTitleFontParamsDesktop }
									showFontFamily={ true }
									showFontSize={ true }
									showFontWeight={ true }
									showTextTransform={ true }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											listTitleFontFamily: fontObject.fontFamily,
											listTitleFontSize: fontObject.fontSize,
											listTitleFontSizeUnit: fontObject.fontSizeUnit,
											listTitleFontWeight: fontObject.fontWeight,
											listTitleLetterSpacing: fontObject.letterSpacing,
											listTitleLetterSpacingUnit: fontObject.letterSpacingUnit,
											listTitleLineHeight: fontObject.lineHeight,
											listTitleLineHeightUnit: fontObject.lineHeightUnit,
											listTitleTextTransform: fontObject.textTransform,
										} );
									} }
								/>
								<AlignmentGroup
									onClick={ ( value ) => {
										setAttributes( { listTitleAlign: value } );
									} }
									alignment={ listTitleAlign }
									label={ __(
										'Change Title Alignment',
										'post-type-archive-mapping'
									) }
								/>
								<DimensionsControl
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listTitlePaddingTop"
									attrRight="listTitlePaddingRight"
									attrBottom="listTitlePaddingBottom"
									attrLeft="listTitlePaddingLeft"
									attrUnit="listTitlePaddingUnit"
									attrSyncUnits="listTitlePaddingUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
								<DimensionsControl
									label={ __( 'Margin', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listTitleMarginTop"
									attrRight="listTitleMarginRight"
									attrBottom="listTitleMarginBottom"
									attrLeft="listTitleMarginLeft"
									attrUnit="listTitleMarginUnit"
									attrSyncUnits="listTitleMarginUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
							</>
						) }
						{ 'Tablet' === getDeviceType() && (
							<>
								<TypographyControls
									label={ __( 'Title Typography', 'post-type-archive-mapping' ) }
									options={ listTitleFontParamsTablet }
									showFontFamily={ false }
									showFontSize={ true }
									showFontWeight={ false }
									showTextTransform={ false }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											listTitleFontFamily: fontObject.fontFamily,
											listTitleFontSizeTablet: fontObject.fontSize,
											listTitleFontSizeUnitTablet: fontObject.fontSizeUnit,
											listTitleFontWeight: fontObject.fontWeight,
											listTitleLetterSpacingTablet: fontObject.letterSpacing,
											listTitleLetterSpacingUnit: fontObject.letterSpacingUnit,
											listTitleLineHeightTablet: fontObject.lineHeight,
											listTitleLineHeightUnit: fontObject.lineHeightUnit,
											listTitleTextTransform: fontObject.textTransform,
										} );
									} }
								/>
								<DimensionsControl
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listTitlePaddingTopTablet"
									attrRight="listTitlePaddingRightTablet"
									attrBottom="listTitlePaddingBottomTablet"
									attrLeft="listTitlePaddingLeftTablet"
									attrUnit="listTitlePaddingUnitTablet"
									attrSyncUnits="listTitlePaddingUnitsSyncTablet"
									units={ [ 'px', 'em', 'rem' ] }
								/>
								<DimensionsControl
									label={ __( 'Margin', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listTitleMarginTopTablet"
									attrRight="listTitleMarginRightTablet"
									attrBottom="listTitleMarginBottomTablet"
									attrLeft="listTitleMarginLeftTablet"
									attrUnit="listTitleMarginUnitTablet"
									attrSyncUnits="listTitleMarginUnitsSyncTablet"
									units={ [ 'px', 'em', 'rem' ] }
								/>
							</>
						) }
						{ 'Mobile' === getDeviceType() && (
							<>
								<TypographyControls
									label={ __( 'Title Typography', 'post-type-archive-mapping' ) }
									options={ listTitleFontParamsMobile }
									showFontFamily={ false }
									showFontSize={ true }
									showFontWeight={ false }
									showTextTransform={ false }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											listTitleFontFamily: fontObject.fontFamily,
											listTitleFontSizeMobile: fontObject.fontSize,
											listTitleFontSizeUnitMobile: fontObject.fontSizeUnit,
											listTitleFontWeight: fontObject.fontWeight,
											listTitleLetterSpacingMobile: fontObject.letterSpacing,
											listTitleLetterSpacingUnit: fontObject.letterSpacingUnit,
											listTitleLineHeightMobile: fontObject.lineHeight,
											listTitleLineHeightUnit: fontObject.lineHeightUnit,
											listTitleTextTransform: fontObject.textTransform,
										} );
									} }
								/>
								<DimensionsControl
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listTitlePaddingTopMobile"
									attrRight="listTitlePaddingRightMobile"
									attrBottom="listTitlePaddingBottomMobile"
									attrLeft="listTitlePaddingLeftMobile"
									attrUnit="listTitlePaddingUnitMobile"
									attrSyncUnits="listTitlePaddingUnitsSyncMobile"
									units={ [ 'px', 'em', 'rem' ] }
								/>
								<DimensionsControl
									label={ __( 'Margin', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listTitleMarginTopMobile"
									attrRight="listTitleMarginRightMobile"
									attrBottom="listTitleMarginBottomMobile"
									attrLeft="listTitleMarginLeftMobile"
									attrUnit="listTitleMarginUnitMobile"
									attrSyncUnits="listTitleMarginUnitsSyncMobile"
									units={ [ 'px', 'em', 'rem' ] }
								/>
							</>
						) }
					</>
				) }
			</PanelBody>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Post Meta', 'post-type-archive-mapping' ) }
			>
				{ 'Desktop' === getDeviceType() && (
					<>
						<ToggleControl
							label={ __( 'Show Post Meta', 'post-type-archive-mapping' ) }
							checked={ listShowPostMeta }
							onChange={ ( value ) => {
								setAttributes( {
									listShowPostMeta: value,
								} );
							} }
						/>
						{ listShowPostMeta && 'Desktop' === getDeviceType() && (
							<>
								<ToggleControl
									label={ __( 'Show Author', 'post-type-archive-mapping' ) }
									checked={ listShowPostMetaAuthor }
									onChange={ ( value ) => {
										setAttributes( {
											listShowPostMetaAuthor: value,
										} );
									} }
								/>
								<ToggleControl
									label={ __( 'Show Date', 'post-type-archive-mapping' ) }
									checked={ listShowPostMetaDate }
									onChange={ ( value ) => {
										setAttributes( {
											listShowPostMetaDate: value,
										} );
									} }
								/>
								<ToggleControl
									label={ __( 'Show Taxonomy Terms', 'post-type-archive-mapping' ) }
									checked={ listShowPostMetaTerms }
									onChange={ ( value ) => {
										setAttributes( {
											listShowPostMetaTerms: value,
										} );
									} }
								/>
								<ToggleControl
									label={ __( 'Show Comment Count', 'post-type-archive-mapping' ) }
									checked={ listShowPostMetaComments }
									onChange={ ( value ) => {
										setAttributes( {
											listShowPostMetaComments: value,
										} );
									} }
								/>
								{ listShowPostMetaDate && (
									<SelectControl
										label={ __( 'Date Format', 'post-type-archive-mapping' ) }
										options={ postMetaDateFormatOptions }
										value={ listMetaDateFormat }
										onChange={ ( value ) => {
											setAttributes( {
												listMetaDateFormat: value,
											} );
										} }
									/>
								) }
								<SelectControl
									label={ __( 'Appearance', 'post-type-archive-mapping' ) }
									options={ postMetaAppearanceOptions }
									value={ listShowPostMetaAppearance }
									onChange={ ( value ) => {
										setAttributes( {
											listShowPostMetaAppearance: value,
										} );
									} }
								/>
								<PTAMColorPicker
									value={ listMetaIconColor }
									valueOpacity={ 1 }
									onChange={ ( value ) => {
										setAttributes( { listMetaIconColor: value } );
									} }
									// eslint-disable-next-line no-unused-vars
									onOpacityChange={ ( value ) => {} }
									label={ __( 'Icon Color', 'post-type-archive-mapping' ) }
									alpha={ false }
								/>
								<PTAMColorPicker
									value={ listMetaTextColor }
									valueOpacity={ 1 }
									onChange={ ( value ) => {
										setAttributes( { listMetaTextColor: value } );
									} }
									// eslint-disable-next-line no-unused-vars
									onOpacityChange={ ( value ) => {} }
									label={ __( 'Text Color', 'post-type-archive-mapping' ) }
									alpha={ false }
								/>
								<TabPanel
									className="layout-tab-panel ptam-control-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'list-meta-link-color',
											title: __( 'Normal', 'post-type-archive-mapping' ),
											className: 'list-meta-link-color',
										},
										{
											name: 'list-meta-link-color-hover',
											title: __( 'Hover', 'post-type-archive-mapping' ),
											className: 'list-meta-link-color-hover',
										},
									] }
								>
									{ ( tab ) => {
										const isNormal = tab.name === 'list-meta-link-color';

										return (
											<div>
												{ isNormal ? (
													<PTAMColorPicker
														value={ listMetaLinkColor }
														valueOpacity={ 1 }
														onChange={ ( value ) => {
															setAttributes( { listMetaLinkColor: value } );
														} }
														// eslint-disable-next-line no-unused-vars
														onOpacityChange={ ( value ) => {} }
														label={ __(
															'Link Color',
															'post-type-archive-mapping'
														) }
														alpha={ false }
													/>
												) : (
													<PTAMColorPicker
														value={ listMetaLinkColorHover }
														valueOpacity={ 1 }
														onChange={ ( value ) => {
															setAttributes( { listMetaLinkColorHover: value } );
														} }
														// eslint-disable-next-line no-unused-vars
														onOpacityChange={ ( value ) => {} }
														label={ __(
															'Link Color',
															'post-type-archive-mapping'
														) }
														alpha={ false }
													/>
												) }
											</div>
										);
									} }
								</TabPanel>
								<TypographyControls
									label={ __(
										'Post Meta Typography',
										'post-type-archive-mapping'
									) }
									options={ listMetaFontParamsDesktop }
									showFontFamily={ true }
									showFontSize={ true }
									showFontWeight={ true }
									showTextTransform={ true }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											listMetaFontFamily: fontObject.fontFamily,
											listMetaFontSize: fontObject.fontSize,
											listMetaFontSizeUnit: fontObject.fontSizeUnit,
											listMetaFontWeight: fontObject.fontWeight,
											listMetaLetterSpacing: fontObject.letterSpacing,
											listMetaLetterSpacingUnit: fontObject.letterSpacingUnit,
											listMetaLineHeight: fontObject.lineHeight,
											listMetaLineHeightUnit: fontObject.lineHeightUnit,
											listMetaTextTransform: fontObject.textTransform,
										} );
									} }
								/>
								<DimensionsControl
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listMetaPaddingTop"
									attrRight="listMetaPaddingRight"
									attrBottom="listMetaPaddingBottom"
									attrLeft="listMetaPaddingLeft"
									attrUnit="listMetaPaddingUnit"
									attrSyncUnits="listMetaPaddingUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
								<DimensionsControl
									label={ __( 'Margin', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listMetaMarginTop"
									attrRight="listMetaMarginRight"
									attrBottom="listMetaMarginBottom"
									attrLeft="listMetaMarginLeft"
									attrUnit="listMetaMarginUnit"
									attrSyncUnits="listMetaMarginUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
							</>
						) }
					</>
				) }
				{ 'Tablet' === getDeviceType() && listShowPostMeta && (
					<>
						<TypographyControls
							label={ __( 'Post Meta Typography', 'post-type-archive-mapping' ) }
							options={ listMetaFontParamsTablet }
							showFontFamily={ false }
							showFontSize={ true }
							showFontWeight={ false }
							showTextTransform={ false }
							showLineHeight={ true }
							showLetterSpacing={ true }
							onChange={ ( fontObject ) => {
								setAttributes( {
									listMetaFontFamily: fontObject.fontFamily,
									listMetaFontSizeTablet: fontObject.fontSize,
									listMetaFontSizeUnitTablet: fontObject.fontSizeUnit,
									listMetaFontWeight: fontObject.fontWeight,
									listMetaLetterSpacingTablet: fontObject.letterSpacing,
									listMetaLetterSpacingUnit: fontObject.letterSpacingUnit,
									listMetaLineHeightTablet: fontObject.lineHeight,
									listMetaLineHeightUnit: fontObject.lineHeightUnit,
									listMetaTextTransform: fontObject.textTransform,
								} );
							} }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listMetaPaddingTopTablet"
							attrRight="listMetaPaddingRightTablet"
							attrBottom="listMetaPaddingBottomTablet"
							attrLeft="listMetaPaddingLeftTablet"
							attrUnit="listMetaPaddingUnitTablet"
							attrSyncUnits="listMetaPaddingUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Margin', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listMetaMarginTopTablet"
							attrRight="listMetaMarginRightTablet"
							attrBottom="listMetaMarginBottomTablet"
							attrLeft="listMetaMarginLeftTablet"
							attrUnit="listMetaMarginUnitTablet"
							attrSyncUnits="listMetaMarginUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
				{ 'Mobile' === getDeviceType() && listShowPostMeta && (
					<>
						<TypographyControls
							label={ __( 'Post Meta Typography', 'post-type-archive-mapping' ) }
							options={ listMetaFontParamsMobile }
							showFontFamily={ false }
							showFontSize={ true }
							showFontWeight={ false }
							showTextTransform={ false }
							showLineHeight={ true }
							showLetterSpacing={ true }
							onChange={ ( fontObject ) => {
								setAttributes( {
									listMetaFontFamily: fontObject.fontFamily,
									listMetaFontSizeMobile: fontObject.fontSize,
									listMetaFontSizeUnitMobile: fontObject.fontSizeUnit,
									listMetaFontWeight: fontObject.fontWeight,
									listMetaLetterSpacingMobile: fontObject.letterSpacing,
									listMetaLetterSpacingUnit: fontObject.letterSpacingUnit,
									listMetaLineHeightMobile: fontObject.lineHeight,
									listMetaLineHeightUnit: fontObject.lineHeightUnit,
									listMetaTextTransform: fontObject.textTransform,
								} );
							} }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listMetaPaddingTopMobile"
							attrRight="listMetaPaddingRightMobile"
							attrBottom="listMetaPaddingBottomMobile"
							attrLeft="listMetaPaddingLeftMobile"
							attrUnit="listMetaPaddingUnitMobile"
							attrSyncUnits="listMetaPaddingUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Margin', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listMetaMarginTopMobile"
							attrRight="listMetaMarginRightMobile"
							attrBottom="listMetaMarginBottomMobile"
							attrLeft="listMetaMarginLeftMobile"
							attrUnit="listMetaMarginUnitMobile"
							attrSyncUnits="listMetaMarginUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
			</PanelBody>
			{ 'Desktop' === getDeviceType() && (
				<PanelBody
					initialOpen={ false }
					title={ __( 'Featured Image', 'post-type-archive-mapping' ) }
				>
					<ToggleControl
						label={ __( 'Show Featured Image', 'post-type-archive-mapping' ) }
						checked={ listShowFeaturedImage }
						onChange={ ( value ) => {
							setAttributes( {
								listShowFeaturedImage: value,
							} );
						} }
					/>
					{ listShowFeaturedImage && (
						<Fragment>
							<MediaUpload
								onSelect={ ( imageObject ) => {
									props.setAttributes( { listFallbackImg: imageObject } );
								} }
								type="image"
								value={ listFallbackImg.url }
								render={ ( { open } ) => (
									<Fragment>
										<button
											className="ptam-media-alt-upload components-button is-button is-secondary"
											onClick={ open }
										>
											{ __(
												'Fallback Featured Image',
												'post-type-archive-mapping'
											) }
										</button>
										{ listFallbackImg && (
											<Fragment>
												<div>
													<img
														src={ listFallbackImg.url }
														alt={ __(
															'Featured Image',
															'post-type-archive-mapping'
														) }
														width="250"
														height="250"
													/>
												</div>
												<div>
													<button
														className="ptam-media-alt-reset components-button is-button is-secondary"
														// eslint-disable-next-line no-unused-vars
														onClick={ ( event ) => {
															setAttributes( { listFallbackImg: '' } );
														} }
													>
														{ __( 'Reset Image', 'post-type-archive-mapping' ) }
													</button>
												</div>
											</Fragment>
										) }
									</Fragment>
								) }
							/>

							<SelectControl
								label={ __( 'Featured Image Size', 'post-type-archive-mapping' ) }
								options={ imageSizeOptions }
								value={ listImageTypeSize }
								onChange={ ( value ) => {
									setAttributes( { listImageTypeSize: value } );
								} }
							/>
							<AlignmentGroup
								onClick={ ( value ) => {
									setAttributes( { listFeaturedImageAlign: value } );
								} }
								alignment={ listFeaturedImageAlign }
								label={ __(
									'Change Featured Image Alignment',
									'post-type-archive-mapping'
								) }
							/>
						</Fragment>
					) }
				</PanelBody>
			) }
			<PanelBody
				initialOpen={ false }
				title={ __( 'Post Content', 'post-type-archive-mapping' ) }
			>
				{ 'Desktop' === getDeviceType() && (
					<>
						<SelectControl
							label={ __( 'Post Content Display', 'post-type-archive-mapping' ) }
							options={ contentOptions }
							value={ listShowPostContent }
							onChange={ ( value ) => {
								setAttributes( {
									listShowPostContent: value,
								} );
							} }
						/>
						{ 'none' !== listShowPostContent && 'Desktop' === getDeviceType() && (
							<>
								<AlignmentGroup
									onClick={ ( value ) => {
										setAttributes( { listContentAlign: value } );
									} }
									alignment={ listContentAlign }
									label={ __(
										'Change Content Alignment',
										'post-type-archive-mapping'
									) }
								/>
								<PTAMColorPicker
									value={ listContentTextColor }
									valueOpacity={ 1 }
									onChange={ ( value ) => {
										setAttributes( { listContentTextColor: value } );
									} }
									// eslint-disable-next-line no-unused-vars
									onOpacityChange={ ( value ) => {} }
									label={ __( 'Text Color', 'post-type-archive-mapping' ) }
									alpha={ false }
								/>
								<TabPanel
									className="layout-tab-panel ptam-control-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'list-content-link-color',
											title: __( 'Normal', 'post-type-archive-mapping' ),
											className: 'list-content-link-color',
										},
										{
											name: 'list-content-link-color-hover',
											title: __( 'Hover', 'post-type-archive-mapping' ),
											className: 'list-content-link-color-hover',
										},
									] }
								>
									{ ( tab ) => {
										const isNormal = tab.name === 'list-content-link-color';

										return (
											<div>
												{ isNormal ? (
													<PTAMColorPicker
														value={ listContentLinkColor }
														valueOpacity={ 1 }
														onChange={ ( value ) => {
															setAttributes( { listContentLinkColor: value } );
														} }
														// eslint-disable-next-line no-unused-vars
														onOpacityChange={ ( value ) => {} }
														label={ __(
															'Link Color',
															'post-type-archive-mapping'
														) }
														alpha={ false }
													/>
												) : (
													<PTAMColorPicker
														value={ listContentLinkColorHover }
														valueOpacity={ 1 }
														onChange={ ( value ) => {
															setAttributes( { listContentLinkColorHover: value } );
														} }
														// eslint-disable-next-line no-unused-vars
														onOpacityChange={ ( value ) => {} }
														label={ __(
															'Link Color',
															'post-type-archive-mapping'
														) }
														alpha={ false }
													/>
												) }
											</div>
										);
									} }
								</TabPanel>
								<TypographyControls
									label={ __(
										'Post Content Typography',
										'post-type-archive-mapping'
									) }
									options={ listContentFontParamsDesktop }
									showFontFamily={ true }
									showFontSize={ true }
									showFontWeight={ true }
									showTextTransform={ true }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											listContentFontFamily: fontObject.fontFamily,
											listContentFontSize: fontObject.fontSize,
											listContentFontSizeUnit: fontObject.fontSizeUnit,
											listContentFontWeight: fontObject.fontWeight,
											listContentLetterSpacing: fontObject.letterSpacing,
											listContentLetterSpacingUnit: fontObject.letterSpacingUnit,
											listContentLineHeight: fontObject.lineHeight,
											listContentLineHeightUnit: fontObject.lineHeightUnit,
											listContentTextTransform: fontObject.textTransform,
										} );
									} }
								/>
								<DimensionsControl
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listContentPaddingTop"
									attrRight="listContentPaddingRight"
									attrBottom="listContentPaddingBottom"
									attrLeft="listContentPaddingLeft"
									attrUnit="listContentPaddingUnit"
									attrSyncUnits="listContentPaddingUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
								<DimensionsControl
									label={ __( 'Margin', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listContentMarginTop"
									attrRight="listContentMarginRight"
									attrBottom="listContentMarginBottom"
									attrLeft="listContentMarginLeft"
									attrUnit="listContentMarginUnit"
									attrSyncUnits="listContentMarginUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
							</>
						) }
					</>
				) }
				{ 'Tablet' === getDeviceType() && listShowPostMeta && (
					<>
						<TypographyControls
							label={ __( 'Post Content Typography', 'post-type-archive-mapping' ) }
							options={ listContentFontParamsTablet }
							showFontFamily={ false }
							showFontSize={ true }
							showFontWeight={ false }
							showTextTransform={ false }
							showLineHeight={ true }
							showLetterSpacing={ true }
							onChange={ ( fontObject ) => {
								setAttributes( {
									listContentFontFamily: fontObject.fontFamily,
									listContentFontSizeTablet: fontObject.fontSize,
									listContentFontSizeUnitTablet: fontObject.fontSizeUnit,
									listContentFontWeight: fontObject.fontWeight,
									listContentLetterSpacingTablet: fontObject.letterSpacing,
									listContentLetterSpacingUnit: fontObject.letterSpacingUnit,
									listContentLineHeightTablet: fontObject.lineHeight,
									listContentLineHeightUnit: fontObject.lineHeightUnit,
									listContentTextTransform: fontObject.textTransform,
								} );
							} }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listContentPaddingTopTablet"
							attrRight="listContentPaddingRightTablet"
							attrBottom="listContentPaddingBottomTablet"
							attrLeft="listContentPaddingLeftTablet"
							attrUnit="listContentPaddingUnitTablet"
							attrSyncUnits="listContentPaddingUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Margin', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listContentMarginTopTablet"
							attrRight="listContentMarginRightTablet"
							attrBottom="listContentMarginBottomTablet"
							attrLeft="listContentMarginLeftTablet"
							attrUnit="listContentMarginUnitTablet"
							attrSyncUnits="listContentMarginUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
				{ 'Mobile' === getDeviceType() && listShowPostMeta && (
					<>
						<TypographyControls
							label={ __( 'Post Content Typography', 'post-type-archive-mapping' ) }
							options={ listContentFontParamsMobile }
							showFontFamily={ false }
							showFontSize={ true }
							showFontWeight={ false }
							showTextTransform={ false }
							showLineHeight={ true }
							showLetterSpacing={ true }
							onChange={ ( fontObject ) => {
								setAttributes( {
									listContentFontFamily: fontObject.fontFamily,
									listContentFontSizeMobile: fontObject.fontSize,
									listContentFontSizeUnitMobile: fontObject.fontSizeUnit,
									listContentFontWeight: fontObject.fontWeight,
									listContentLetterSpacingMobile: fontObject.letterSpacing,
									listContentLetterSpacingUnit: fontObject.letterSpacingUnit,
									listContentLineHeightMobile: fontObject.lineHeight,
									listContentLineHeightUnit: fontObject.lineHeightUnit,
									listContentTextTransform: fontObject.textTransform,
								} );
							} }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listContentPaddingTopMobile"
							attrRight="listContentPaddingRightMobile"
							attrBottom="listContentPaddingBottomMobile"
							attrLeft="listContentPaddingLeftMobile"
							attrUnit="listContentPaddingUnitMobile"
							attrSyncUnits="listContentPaddingUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Margin', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listContentMarginTopMobile"
							attrRight="listContentMarginRightMobile"
							attrBottom="listContentMarginBottomMobile"
							attrLeft="listContentMarginLeftMobile"
							attrUnit="listContentMarginUnitMobile"
							attrSyncUnits="listContentMarginUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
			</PanelBody>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Read More Button', 'post-type-archive-mapping' ) }
			>
				{ 'Desktop' === getDeviceType() && (
					<>
						<ToggleControl
							label={ __( 'Show Read More Button', 'post-type-archive-mapping' ) }
							checked={ listButtonShow }
							onChange={ ( value ) => {
								setAttributes( {
									listButtonShow: value,
								} );
							} }
						/>
						{ listButtonShow && 'Desktop' === getDeviceType() && (
							<>
								<TextControl
									label={ __(
										'Read More Label',
										'post-type-archive-mapping'
									) }
									type="text"
									value={ listButtonReadMoreText }
									onChange={ ( value ) => {
										setAttributes( { listButtonReadMoreText: value } );
									} }
								/>
								<SelectControl
									label={ __( 'Button Width', 'post-type-archive-mapping' ) }
									options={ buttonWidthOptions }
									value={ listButtonWidth }
									onChange={ ( value ) => {
										setAttributes( {
											listButtonWidth: value,
										} );
									} }
								/>
								<AlignmentGroup
									onClick={ ( value ) => {
										setAttributes( { listButtonContainerAlign: value } );
									} }
									alignment={ listButtonContainerAlign }
									label={ __(
										'Button Alignment',
										'post-type-archive-mapping'
									) }
								/>
								<AlignmentGroup
									onClick={ ( value ) => {
										setAttributes( { listButtonTextAlign: value } );
									} }
									alignment={ listButtonTextAlign }
									label={ __(
										'Button Text Alignment',
										'post-type-archive-mapping'
									) }
								/>
								<TabPanel
									className="layout-tab-panel ptam-control-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'list-button-text-color',
											title: __( 'Normal', 'post-type-archive-mapping' ),
											className: 'list-button-text-color',
										},
										{
											name: 'list-button-text-color-hover',
											title: __( 'Hover', 'post-type-archive-mapping' ),
											className: 'list-button-text-color-hover',
										},
									] }
								>
									{ ( tab ) => {
										const isNormal = tab.name === 'list-button-text-color';

										return (
											<div>
												{ isNormal ? (
													<PTAMColorPicker
														value={ listButtonTextColor }
														valueOpacity={ 1 }
														onChange={ ( value ) => {
															setAttributes( { listButtonTextColor: value } );
														} }
														// eslint-disable-next-line no-unused-vars
														onOpacityChange={ ( value ) => {} }
														label={ __(
															'Button Text Color',
															'post-type-archive-mapping'
														) }
														alpha={ false }
													/>
												) : (
													<PTAMColorPicker
														value={ listButtonTextColorHover }
														valueOpacity={ 1 }
														onChange={ ( value ) => {
															setAttributes( { listButtonTextColorHover: value } );
														} }
														// eslint-disable-next-line no-unused-vars
														onOpacityChange={ ( value ) => {} }
														label={ __(
															'Button Text Color',
															'post-type-archive-mapping'
														) }
														alpha={ false }
													/>
												) }
											</div>
										);
									} }
								</TabPanel>
								<SelectControl
									label={ __( 'Background Type', 'post-type-archive-mapping' ) }
									options={ listBackgroundChoices }
									value={ listButtonBackgroundType }
									onChange={ ( value ) => {
										setAttributes( {
											listButtonBackgroundType: value,
										} );
									} }
								/>
								{ 'color' === listButtonBackgroundType && (
									<TabPanel
										className="layout-tab-panel ptam-control-tabs"
										activeClass="active-tab"
										tabs={ [
											{
												name: 'list-button-background-color',
												title: __( 'Normal', 'post-type-archive-mapping' ),
												className: 'list-button-background-color',
											},
											{
												name: 'list-button-background-color-hover',
												title: __( 'Hover', 'post-type-archive-mapping' ),
												className: 'list-button-background-color-hover',
											},
										] }
									>
										{ ( tab ) => {
											const isNormal = tab.name === 'list-button-background-color';

											return (
												<div>
													{ isNormal ? (
														<PTAMColorPicker
															value={ listButtonBackgroundColor }
															valueOpacity={ 1 }
															onChange={ ( value ) => {
																setAttributes( { listButtonBackgroundColor: value } );
															} }
															// eslint-disable-next-line no-unused-vars
															onOpacityChange={ ( value ) => {} }
															label={ __(
																'Button Background Color',
																'post-type-archive-mapping'
															) }
															alpha={ false }
														/>
													) : (
														<PTAMColorPicker
															value={ listButtonBackgroundColorHover }
															valueOpacity={ 1 }
															onChange={ ( value ) => {
																setAttributes( { listButtonBackgroundColorHover: value } );
															} }
															// eslint-disable-next-line no-unused-vars
															onOpacityChange={ ( value ) => {} }
															label={ __(
																'Button Background Color',
																'post-type-archive-mapping'
															) }
															alpha={ false }
														/>
													) }
												</div>
											);
										} }
									</TabPanel>
								) }
								{ 'gradient' === listButtonBackgroundType && (
									<>
										<TabPanel
											className="layout-tab-panel ptam-control-tabs"
											activeClass="active-tab"
											tabs={ [
												{
													name: 'list-button-background-gradient',
													title: __( 'Normal', 'post-type-archive-mapping' ),
													className: 'list-button-background-gradient',
												},
												{
													name: 'list-button-background-gradient-hover',
													title: __( 'Hover', 'post-type-archive-mapping' ),
													className: 'list-button-background-gradient-hover',
												},
											] }
										>
											{ ( tab ) => {
												const isNormal = tab.name === 'list-button-background-gradient';

												return (
													<div>
														{ isNormal ? (
															<PTAMGradientPicker
																onChange={ ( value ) => {
																	setAttributes( {
																		listButtonBackgroundGradient: value,
																	} );
																} }
																label={ __( 'Button Background Gradient', 'post-type-archive-mapping' ) }
																value={ listButtonBackgroundGradient }
															/>
														) : (
															<PTAMGradientPicker
																onChange={ ( value ) => {
																	setAttributes( {
																		listButtonBackgroundGradientHover: value,
																	} );
																} }
																label={ __( 'Button Background Gradient', 'post-type-archive-mapping' ) }
																value={ listButtonBackgroundGradientHover }
															/>
														) }
													</div>
												);
											} }
										</TabPanel>
									</>
								) }
								<TypographyControls
									label={ __(
										'Button Typography',
										'post-type-archive-mapping'
									) }
									options={ listButtonFontParamsDesktop }
									showFontFamily={ true }
									showFontSize={ true }
									showFontWeight={ true }
									showTextTransform={ true }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											listButtonFontFamily: fontObject.fontFamily,
											listButtonFontSize: fontObject.fontSize,
											listButtonFontSizeUnit: fontObject.fontSizeUnit,
											listButtonFontWeight: fontObject.fontWeight,
											listButtonLetterSpacing: fontObject.letterSpacing,
											listButtonLetterSpacingUnit: fontObject.letterSpacingUnit,
											listButtonLineHeight: fontObject.lineHeight,
											listButtonLineHeightUnit: fontObject.lineHeightUnit,
											listButtonTextTransform: fontObject.textTransform,
										} );
									} }
								/>
								<DimensionsControl
									label={ __( 'Container Padding', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listButtonContainerPaddingTop"
									attrRight="listButtonContainerPaddingRight"
									attrBottom="listButtonContainerPaddingBottom"
									attrLeft="listButtonContainerPaddingLeft"
									attrUnit="listButtonContainerPaddingUnit"
									attrSyncUnits="listButtonContainerPaddingUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
								<DimensionsControl
									label={ __( 'Container Margin', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listButtonContainerMarginTop"
									attrRight="listButtonContainerMarginRight"
									attrBottom="listButtonContainerMarginBottom"
									attrLeft="listButtonContainerMarginLeft"
									attrUnit="listButtonContainerMarginUnit"
									attrSyncUnits="listButtonContainerMarginUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
								<DimensionsControl
									label={ __( 'Button Padding', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listButtonPaddingTop"
									attrRight="listButtonPaddingRight"
									attrBottom="listButtonPaddingBottom"
									attrLeft="listButtonPaddingLeft"
									attrUnit="listButtonPaddingUnit"
									attrSyncUnits="listButtonPaddingUnitsSync"
									units={ [ 'px', 'em', 'rem' ] }
								/>
								<RangeControl
									label={ __( 'Border Width', 'post-type-archive-mapping' ) }
									value={ listButtonBorderWidth }
									onChange={ ( value ) => setAttributes( { listButtonBorderWidth: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<TabPanel
									className="layout-tab-panel ptam-control-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'list-button-border-color',
											title: __( 'Normal', 'post-type-archive-mapping' ),
											className: 'list-button-border-color',
										},
										{
											name: 'list-button-border-color-hover',
											title: __( 'Hover', 'post-type-archive-mapping' ),
											className: 'list-button-border-color-hover',
										},
									] }
								>
									{ ( tab ) => {
										const isNormal = tab.name === 'list-button-border-color';

										return (
											<div>
												{ isNormal ? (
													<PTAMColorPicker
														value={ listButtonBorderColor }
														valueOpacity={ 1 }
														onChange={ ( value ) => {
															setAttributes( { listButtonBorderColor: value } );
														} }
														// eslint-disable-next-line no-unused-vars
														onOpacityChange={ ( value ) => {} }
														label={ __(
															'Button Border Color',
															'post-type-archive-mapping'
														) }
														alpha={ false }
													/>
												) : (
													<PTAMColorPicker
														value={ listButtonBorderColorHover }
														valueOpacity={ 1 }
														onChange={ ( value ) => {
															setAttributes( { listButtonBorderColorHover: value } );
														} }
														// eslint-disable-next-line no-unused-vars
														onOpacityChange={ ( value ) => {} }
														label={ __(
															'Button Border Color',
															'post-type-archive-mapping'
														) }
														alpha={ false }
													/>
												) }
											</div>
										);
									} }
								</TabPanel>
								<DimensionsControl
									label={ __( 'Border Radius', 'post-type-archive-mapping' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
									allowNegatives={ false }
									attrTop="listButtonBorderRadiusTopleft"
									attrRight="listButtonBorderRadiusTopRight"
									attrBottom="listButtonBorderRadiusBottomLeft"
									attrLeft="listButtonBorderRadiusBottomRight"
									attrUnit="listButtonBorderRadiusUnit"
									attrSyncUnits="listButtonBorderRadiusUnitsSync"
									labelTop={ __( 'T-Left', 'post-type-archive-mapping' ) }
									labelRight={ __( 'T-Right', 'post-type-archive-mapping' ) }
									labelBottom={ __( 'B-Right', 'post-type-archive-mapping' ) }
									labelLeft={ __( 'B-Left', 'post-type-archive-mapping' ) }
									units={ [ 'px', 'em', 'rem' ] }
								/>
							</>
						) }
					</>
				) }
				{ 'Tablet' === getDeviceType() && listButtonShow && (
					<>
						<TypographyControls
							label={ __(
								'Button Typography',
								'post-type-archive-mapping'
							) }
							options={ listButtonFontParamsTablet }
							showFontFamily={ false }
							showFontSize={ true }
							showFontWeight={ false }
							showTextTransform={ false }
							showLineHeight={ true }
							showLetterSpacing={ true }
							onChange={ ( fontObject ) => {
								setAttributes( {
									listButtonFontSizeTablet: fontObject.fontSize,
									listButtonFontSizeUnitTablet: fontObject.fontSizeUnit,
									listButtonLetterSpacingTablet: fontObject.letterSpacing,
									listButtonLetterSpacingUnitTablet: fontObject.letterSpacingUnit,
									listButtonLineHeightTablet: fontObject.lineHeight,
									listButtonLineHeightUnitTablet: fontObject.lineHeightUnit,
								} );
							} }
						/>
						<DimensionsControl
							label={ __( 'Container Padding', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listButtonContainerPaddingTopTablet"
							attrRight="listButtonContainerPaddingRightTablet"
							attrBottom="listButtonContainerPaddingBottomTablet"
							attrLeft="listButtonContainerPaddingLeftTablet"
							attrUnit="listButtonContainerPaddingUnitTablet"
							attrSyncUnits="listButtonContainerPaddingUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Container Margin', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listButtonContainerMarginTopTablet"
							attrRight="listButtonContainerMarginRightTablet"
							attrBottom="listButtonContainerMarginBottomTablet"
							attrLeft="listButtonContainerMarginLeftTablet"
							attrUnit="listButtonContainerMarginUnitTablet"
							attrSyncUnits="listButtonContainerMarginUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Button Padding', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listButtonPaddingTopTablet"
							attrRight="listButtonPaddingRightTablet"
							attrBottom="listButtonPaddingBottomTablet"
							attrLeft="listButtonPaddingLeftTablet"
							attrUnit="listButtonPaddingUnitTablet"
							attrSyncUnits="listButtonPaddingUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Border Radius', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listButtonBorderRadiusTopleftTablet"
							attrRight="listButtonBorderRadiusTopRightTablet"
							attrBottom="listButtonBorderRadiusBottomLeftTablet"
							attrLeft="listButtonBorderRadiusBottomRightTablet"
							attrUnit="listButtonBorderRadiusUnit"
							attrSyncUnits="listButtonBorderRadiusUnitsSync"
							labelTop={ __( 'T-Left', 'post-type-archive-mapping' ) }
							labelRight={ __( 'T-Right', 'post-type-archive-mapping' ) }
							labelBottom={ __( 'B-Right', 'post-type-archive-mapping' ) }
							labelLeft={ __( 'B-Left', 'post-type-archive-mapping' ) }
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
				{ 'Mobile' === getDeviceType() && listButtonShow && (
					<>
						<TypographyControls
							label={ __(
								'Button Typography',
								'post-type-archive-mapping'
							) }
							options={ listButtonFontParamsMobile }
							showFontFamily={ false }
							showFontSize={ true }
							showFontWeight={ false }
							showTextTransform={ false }
							showLineHeight={ true }
							showLetterSpacing={ true }
							onChange={ ( fontObject ) => {
								setAttributes( {
									listButtonFontSizeMobile: fontObject.fontSize,
									listButtonFontSizeUnitMobile: fontObject.fontSizeUnit,
									listButtonLetterSpacingMobile: fontObject.letterSpacing,
									listButtonLetterSpacingUnitMobile: fontObject.letterSpacingUnit,
									listButtonLineHeightMobile: fontObject.lineHeight,
									listButtonLineHeightUnitMobile: fontObject.lineHeightUnit,
								} );
							} }
						/>
						<DimensionsControl
							label={ __( 'Container Padding', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listButtonContainerPaddingTopMobile"
							attrRight="listButtonContainerPaddingRightMobile"
							attrBottom="listButtonContainerPaddingBottomMobile"
							attrLeft="listButtonContainerPaddingLeftMobile"
							attrUnit="listButtonContainerPaddingUnitMobile"
							attrSyncUnits="listButtonContainerPaddingUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Container Margin', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listButtonContainerMarginTopMobile"
							attrRight="listButtonContainerMarginRighMobilet"
							attrBottom="listButtonContainerMarginBottomMobile"
							attrLeft="listButtonContainerMarginLeftMobile"
							attrUnit="listButtonContainerMarginUnitMobile"
							attrSyncUnits="listButtonContainerMarginUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Button Padding', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listButtonPaddingTopMobile"
							attrRight="listButtonPaddingRightMobile"
							attrBottom="listButtonPaddingBottomMobile"
							attrLeft="listButtonPaddingLeftMobile"
							attrUnit="listButtonPaddingUnitMobile"
							attrSyncUnits="listButtonPaddingUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
						<DimensionsControl
							label={ __( 'Border Radius', 'post-type-archive-mapping' ) }
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="listButtonBorderRadiusTopleftMobile"
							attrRight="listButtonBorderRadiusTopRightMobile"
							attrBottom="listButtonBorderRadiusBottomLeftMobile"
							attrLeft="listButtonBorderRadiusBottomRightMobile"
							attrUnit="listButtonBorderRadiusUnit"
							attrSyncUnits="listButtonBorderRadiusUnitsSync"
							labelTop={ __( 'T-Left', 'post-type-archive-mapping' ) }
							labelRight={ __( 'T-Right', 'post-type-archive-mapping' ) }
							labelBottom={ __( 'B-Right', 'post-type-archive-mapping' ) }
							labelLeft={ __( 'B-Left', 'post-type-archive-mapping' ) }
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				) }
			</PanelBody>
		</Fragment>
	);

	const inspectorControls = (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Query', 'post-type-archive-mapping' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Post Type', 'post-type-archive-mapping' ) }
						options={ postTypeOptions }
						value={ postType }
						onChange={ ( value ) => {
							setAttributes( {
								postType: value,
							} );
						} }
					/>
					<SelectControl
						label={ __( 'Hierarchy', 'post-type-archive-mapping' ) }
						options={ hierarchyOptions }
						value={ hierarchy }
						onChange={ ( value ) => {
							setAttributes( {
								hierarchy: value,
							} );
						} }
					/>
					{ 'children' === hierarchy && (
						<HierarchicalItems
							label={ __( 'Select a Parent Item', 'post-type-archive-mapping' ) }
							postType={ postType }
							selectedItem={ parentItem }
							onChange={ ( parent ) => {
								setAttributes( {
									parentItem: parent,
								} );
							} }
							loadingText={ __( 'Retrieving items…', 'post-type-archive-mapping' ) }
						/>
					) }
					<SelectControl
						label={ __( 'Order', 'post-type-archive-mapping' ) }
						options={ orderOptions }
						value={ order }
						onChange={ ( value ) => {
							setAttributes( { order: value } );
						} }
					/>
					{ getLanguages() }
					<SelectControl
						label={ __( 'Order By', 'post-type-archive-mapping' ) }
						options={ orderByOptions }
						value={ orderBy }
						onChange={ ( value ) => {
							setAttributes( { orderBy: value } );
						} }
					/>
					<RangeControl
						label={ __( 'Number of Items', 'post-type-archive-mapping' ) }
						value={ postsPerPage }
						onChange={ ( value ) => {
							setAttributes( { postsPerPage: value } );
							itemNumberRender( value );
						} }
						min={ 1 }
						max={ 100 }
					/>
					<ToggleControl
						label={ __( 'Enable Pagination', 'post-type-archive-mapping' ) }
						checked={ pagination }
						onChange={ ( value ) => {
							setAttributes( {
								pagination: value,
							} );
						} }
					/>
				</PanelBody>
				{ <>{ listOptions }</> }
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={ __( 'Disable Styles', 'post-type-archive-mapping' ) }
					checked={ disableStyles }
					onChange={ ( value ) => {
						setAttributes( {
							disableStyles: value,
						} );
					} }
				/>
			</InspectorAdvancedControls>
		</>
	);

	/**
	 * Wrapper class for styling.
	 */
	const wrapperClass = classnames( {
		'ptam-hierarchy-wrapper': true,
		[ `ptam-hierarchy-wrapper-${ uniqueId }` ]: true,
	} );

	if ( loading ) {
		return (
			<Fragment>
				{ inspectorControls }
				<Placeholder>
					<div className="ptam-term-list-loading">
						<h1>
							<Loading /> { __( 'Child Posts Grid', 'post-type-archive-mapping' ) }
						</h1>
						<h2>{ __( 'Loading…', 'post-type-archive-mapping' ) }</h2>
					</div>
				</Placeholder>
			</Fragment>
		);
	}

	// Begin building CSS.
	const builder = new CSSBuilder( `ptam-hierarchy-wrapper-${ uniqueId }` );
	// Grid CSS.
	builder.addCSS(
		'.ptam-hierarchical-list-items',
		`
		display: grid;
		grid-template-columns: 1fr;
		column-gap: 20px;
		row-gap: 20px;
		background-repeat: no-repeat;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-items.ptam-hierarchical-list-columns-1',
		`
		grid-template-columns: 1fr;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-items.ptam-hierarchical-list-columns-2',
		`
		grid-template-columns: 1fr 1fr;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-items.ptam-hierarchical-list-columns-3',
		`
		grid-template-columns: 1fr 1fr 1fr;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-items.ptam-hierarchical-list-columns-4',
		`
		grid-template-columns: 1fr 1fr 1fr 1fr;
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-items.ptam-hierarchical-list-columns-4, .ptam-hierarchical-list-items.ptam-hierarchical-list-columns-3, .ptam-hierarchical-list-items.ptam-hierarchical-list-columns-2',
			`
			grid-template-columns: 1fr 1fr !important;
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-items.ptam-hierarchical-list-columns-4, .ptam-hierarchical-list-items.ptam-hierarchical-list-columns-3, .ptam-hierarchical-list-items.ptam-hierarchical-list-columns-2',
			`
			grid-template-columns: 1fr !important;
			`
		);
	}

	// List Item Flex goodness.
	builder.addCSS(
		'.ptam-hierarchical-list-item',
		`
		min-height: ${ valueWithUnit( listMinHeight, listMinHeightUnit ) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			min-height: ${ valueWithUnit( listMinHeightTablet, listMinHeightUnitTablet ) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			min-height: ${ valueWithUnit( listMinHeightMobile, listMinHeightUnitMobile ) };
			`
		);
	}

	// List item figure reset.
	builder.addCSS(
		'.ptam-hierarchical-list-item figure',
		`
		margin: 0;
		`
	);

	// List Item Background styles.
	if ( 'gradient' === listBackgroundType ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			background: ${ listBackgroundGradient };
			`
		);
	} else {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			background: ${ hexToRgba( listBackgroundColor, 1 ) };
			`
		);
	}

	// List Padding.
	builder.addCSS(
		'.ptam-hierarchical-list-item',
		`
		padding: ${ shorthandCSS(
		listPaddingTop,
		listPaddingRight,
		listPaddingBottom,
		listPaddingLeft,
		listPaddingUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			padding: ${ shorthandCSS(
		listPaddingTopTablet,
		listPaddingRightTablet,
		listPaddingBottomTablet,
		listPaddingLeftTablet,
		listPaddingUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			padding: ${ shorthandCSS(
		listPaddingTopMobile,
		listPaddingRightMobile,
		listPaddingBottomMobile,
		listPaddingLeftMobile,
		listPaddingUnitMobile
	) };
			`
		);
	}

	// List Margin.
	builder.addCSS(
		'.ptam-hierarchical-list-item',
		`
		margin: ${ shorthandCSS(
		listMarginTop,
		listMarginRight,
		listMarginBottom,
		listMarginLeft,
		listMarginUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			margin: ${ shorthandCSS(
		listMarginTopTablet,
		listMarginRightTablet,
		listMarginBottomTablet,
		listMarginLeftTablet,
		listMarginUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			margin: ${ shorthandCSS(
		listMarginTopMobile,
		listMarginRightMobile,
		listMarginBottomMobile,
		listMarginLeftMobile,
		listMarginUnitMobile
	) };
			`
		);
	}

	// List Item Border Styles.
	builder.addCSS(
		'.ptam-hierarchical-list-item',
		`
		border-radius: ${ shorthandCSS(
		listBorderRadiusTopleft,
		listBorderRadiusTopRight,
		listBorderRadiusBottomRight,
		listBorderRadiusBottomLeft,
		listBorderRadiusUnit
	) };
		`
	);
	if ( '' !== listBorderColor ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			border-color: ${ hexToRgba( listBorderColor, 1 ) };
			`
		);
	}
	if ( 0 < listBorderWidth ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item',
			`
			border: ${ valueWithUnit( listBorderWidth, 'px' ) } solid ${ hexToRgba(
	listBorderColor,
	1
) };
			`
		);
	}

	// Title Styles.
	builder.addCSS(
		'.ptam-hierarchical-list-item > h2',
		`
		font-family: ${ listTitleFontFamily ? listTitleFontFamily : 'inherit' };
		font-size: ${ valueWithUnit( listTitleFontSize, listTitleFontSizeUnit ) };
		font-weight: ${ listTitleFontWeight };
		letter-spacing: ${ valueWithUnit(
		listTitleLetterSpacing,
		listTitleLetterSpacingUnit
	) };
		line-height: ${ valueWithUnit( listTitleLineHeight, listTitleLineHeightUnit ) };
		text-transform: ${ listTitleTextTransform };
		text-align: ${ listTitleAlign };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item > h2',
			`
			font-size: ${ valueWithUnit(
		listTitleFontSizeTablet,
		listTitleFontSizeUnitTablet
	) };
			letter-spacing: ${ valueWithUnit(
		listTitleLetterSpacingTablet,
		listTitleLetterSpacingUnit
	) };
			line-height: ${ valueWithUnit(
		listTitleLineHeightTablet,
		listTitleLineHeightUnit
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item > h2',
			`
			font-size: ${ valueWithUnit(
		listTitleFontSizeMobile,
		listTitleFontSizeUnitMobile
	) };
			letter-spacing: ${ valueWithUnit(
		listTitleLetterSpacingMobile,
		listTitleLetterSpacingUnit
	) };
			line-height: ${ valueWithUnit(
		listTitleLineHeightMobile,
		listTitleLineHeightUnit
	) };
			`
		);
	}
	builder.addCSS(
		'.ptam-hierarchical-list-item > h2 a',
		`
		color: ${ hexToRgba( listTitleColor, 1 ) };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-item > h2 a:hover',
		`
		color: ${ hexToRgba( listTitleColorHover, 1 ) };
		`
	);
	// Title Padding.
	builder.addCSS(
		'.ptam-hierarchical-list-item > h2',
		`
		padding: ${ shorthandCSS(
		listTitlePaddingTop,
		listTitlePaddingRight,
		listTitlePaddingBottom,
		listTitlePaddingLeft,
		listTitlePaddingUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item > h2',
			`
			padding: ${ shorthandCSS(
		listTitlePaddingTopTablet,
		listTitlePaddingRightTablet,
		listTitlePaddingBottomTablet,
		listTitlePaddingLeftTablet,
		listTitlePaddingUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item > h2',
			`
			padding: ${ shorthandCSS(
		listTitlePaddingTopMobile,
		listTitlePaddingRightMobile,
		listTitlePaddingBottomMobile,
		listTitlePaddingLeftMobile,
		listTitlePaddingUnitMobile
	) };
			`
		);
	}

	// List Title Margin.
	builder.addCSS(
		'.ptam-hierarchical-list-item > h2',
		`
		margin: ${ shorthandCSS(
		listTitleMarginTop,
		listTitleMarginRight,
		listTitleMarginBottom,
		listTitleMarginLeft,
		listTitleMarginUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item > h2',
			`
			margin: ${ shorthandCSS(
		listTitleMarginTopTablet,
		listTitleMarginRightTablet,
		listTitleMarginBottomTablet,
		listTitleMarginLeftTablet,
		listTitleMarginUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item > h2',
			`
			margin: ${ shorthandCSS(
		listTitleMarginTopMobile,
		listTitleMarginRightMobile,
		listTitleMarginBottomMobile,
		listTitleMarginLeftMobile,
		listTitleMarginUnitMobile
	) };
			`
		);
	}

	// Featured Image Styles.
	builder.addCSS(
		'.ptam-hierarchical-list-item > figure',
		`
		text-align: ${ listFeaturedImageAlign };
		`
	);

	// Post Meta Styles.
	if ( 'stacked' === listShowPostMetaAppearance ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			display: block;
			`
		);
	}
	if ( 'alignleft' === listShowPostMetaAppearance ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			justify-content: flex-start;
			`
		);
	}
	if ( 'alignright' === listShowPostMetaAppearance ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			justify-content: flex-end;
			`
		);
	}
	if ( 'aligncenter' === listShowPostMetaAppearance ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			justify-content: space-evenly;
			`
		);
	}
	builder.addCSS(
		'.ptam-hierarchical-list-item-meta',
		`
		color: ${ hexToRgba( listMetaTextColor, 1 ) };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-item-meta > div:before',
		`
		color: ${ hexToRgba( listMetaIconColor, 1 ) };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-item-meta > div a',
		`
		color: ${ hexToRgba( listMetaLinkColor, 1 ) };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-item-meta > div a:hover',
		`
		color: ${ hexToRgba( listMetaLinkColorHover, 1 ) };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-item-meta',
		`
		font-family: ${ listMetaFontFamily ? listMetaFontFamily : 'inherit' };
		font-size: ${ valueWithUnit( listMetaFontSize, listMetaFontSizeUnit ) };
		font-weight: ${ listMetaFontWeight };
		letter-spacing: ${ valueWithUnit(
		listMetaLetterSpacing,
		listMetaLetterSpacingUnit
	) };
		line-height: ${ valueWithUnit( listMetaLineHeight, listMetaLineHeightUnit ) };
		text-transform: ${ listMetaTextTransform };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			font-size: ${ valueWithUnit( listMetaFontSizeTablet, listMetaFontSizeUnitTablet ) };
			letter-spacing: ${ valueWithUnit(
		listMetaLetterSpacingTablet,
		listMetaLetterSpacingUnit
	) };
			line-height: ${ valueWithUnit( listMetaLineHeightTablet, listMetaLineHeightUnit ) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			font-size: ${ valueWithUnit( listMetaFontSizeMobile, listMetaFontSizeUnitMobile ) };
			letter-spacing: ${ valueWithUnit(
		listMetaLetterSpacingMobile,
		listMetaLetterSpacingUnit
	) };
			line-height: ${ valueWithUnit( listMetaLineHeightMobile, listMetaLineHeightUnit ) };
			`
		);
	}
	builder.addCSS(
		'.ptam-hierarchical-list-item-meta',
		`
		padding: ${ shorthandCSS(
		listMetaPaddingTop,
		listMetaPaddingRight,
		listMetaPaddingBottom,
		listMetaPaddingLeft,
		listMetaPaddingUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			padding: ${ shorthandCSS(
		listMetaPaddingTopTablet,
		listMetaPaddingRightTablet,
		listMetaPaddingBottomTablet,
		listMetaPaddingLeftTablet,
		listMetaPaddingUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			padding: ${ shorthandCSS(
		listMetaPaddingTopMobile,
		listMetaPaddingRightMobile,
		listMetaPaddingBottomMobile,
		listMetaPaddingLeftMobile,
		listMetaPaddingUnitMobile
	) };
			`
		);
	}

	// Meta Margin.
	builder.addCSS(
		'.ptam-hierarchical-list-item-meta',
		`
		margin: ${ shorthandCSS(
		listMetaMarginTop,
		listMetaMarginRight,
		listMetaMarginBottom,
		listMetaMarginLeft,
		listMetaMarginUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			margin: ${ shorthandCSS(
		listMetaMarginTopTablet,
		listMetaMarginRightTablet,
		listMetaMarginBottomTablet,
		listMetaMarginLeftTablet,
		listMetaMarginUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-item-meta',
			`
			margin: ${ shorthandCSS(
		listMetaMarginTopMobile,
		listMetaMarginRightMobile,
		listMetaMarginBottomMobile,
		listMetaMarginLeftMobile,
		listMetaMarginUnitMobile
	) };
			`
		);
	}

	// List content styles.
	builder.addCSS(
		'.ptam-hierarchical-list-content',
		`
		color: ${ hexToRgba( listContentTextColor, 1 ) };
		text-align: ${ listContentAlign };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-content a',
		`
		color: ${ hexToRgba( listContentLinkColor, 1 ) };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-content a:hover',
		`
		color: ${ hexToRgba( listContentLinkColorHover, 1 ) };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-content',
		`
		font-family: ${ listContentFontFamily ? listContentFontFamily : 'inherit' };
		font-size: ${ valueWithUnit( listContentFontSize, listContentFontSizeUnit ) };
		font-weight: ${ listContentFontWeight };
		letter-spacing: ${ valueWithUnit(
		listContentLetterSpacing,
		listContentLetterSpacingUnit
	) };
		line-height: ${ valueWithUnit( listContentLineHeight, listContentLineHeightUnit ) };
		text-transform: ${ listContentTextTransform };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-content',
			`
			font-size: ${ valueWithUnit( listContentFontSizeTablet, listContentFontSizeUnitTablet ) };
			letter-spacing: ${ valueWithUnit(
		listContentLetterSpacingTablet,
		listContentLetterSpacingUnit
	) };
			line-height: ${ valueWithUnit( listContentLineHeightTablet, listContentLineHeightUnit ) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-content',
			`
			font-size: ${ valueWithUnit( listContentFontSizeMobile, listContentFontSizeUnitMobile ) };
			letter-spacing: ${ valueWithUnit(
		listContentLetterSpacingMobile,
		listContentLetterSpacingUnit
	) };
			line-height: ${ valueWithUnit( listContentLineHeightMobile, listContentLineHeightUnit ) };
			`
		);
	}
	builder.addCSS(
		'.ptam-hierarchical-list-content',
		`
		padding: ${ shorthandCSS(
		listContentPaddingTop,
		listContentPaddingRight,
		listContentPaddingBottom,
		listContentPaddingLeft,
		listContentPaddingUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-content',
			`
			padding: ${ shorthandCSS(
		listContentPaddingTopTablet,
		listContentPaddingRightTablet,
		listContentPaddingBottomTablet,
		listContentPaddingLeftTablet,
		listContentPaddingUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-content',
			`
			padding: ${ shorthandCSS(
		listContentPaddingTopMobile,
		listContentPaddingRightMobile,
		listContentPaddingBottomMobile,
		listContentPaddingLeftMobile,
		listContentPaddingUnitMobile
	) };
			`
		);
	}

	// Meta Margin.
	builder.addCSS(
		'.ptam-hierarchical-list-content',
		`
		margin: ${ shorthandCSS(
		listContentMarginTop,
		listContentMarginRight,
		listContentMarginBottom,
		listContentMarginLeft,
		listContentMarginUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-content',
			`
			margin: ${ shorthandCSS(
		listContentMarginTopTablet,
		listContentMarginRightTablet,
		listContentMarginBottomTablet,
		listContentMarginLeftTablet,
		listContentMarginUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-content',
			`
			margin: ${ shorthandCSS(
		listContentMarginTopMobile,
		listContentMarginRightMobile,
		listContentMarginBottomMobile,
		listContentMarginLeftMobile,
		listContentMarginUnitMobile
	) };
			`
		);
	}

	// Button Styles.
	builder.addCSS(
		'.ptam-hierarchical-list-button-container',
		`
	text-align: ${ listButtonContainerAlign };
	padding: ${ shorthandCSS(
		listButtonContainerPaddingTop,
		listButtonContainerPaddingRight,
		listButtonContainerPaddingBottom,
		listButtonContainerPaddingLeft,
		listButtonContainerPaddingUnit
	) };
	`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container',
			`
		padding: ${ shorthandCSS(
		listButtonContainerPaddingTopTablet,
		listButtonContainerPaddingRightTablet,
		listButtonContainerPaddingBottomTablet,
		listButtonContainerPaddingLeftTablet,
		listButtonContainerPaddingUnitTablet
	) };
		`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container',
			`
		padding: ${ shorthandCSS(
		listButtonContainerPaddingTopMobile,
		listButtonContainerPaddingRightMobile,
		listButtonContainerPaddingBottomMobile,
		listButtonContainerPaddingLeftMobile,
		listButtonContainerPaddingUnitMobile
	) };
		`
		);
	}

	// Button Container Margin.
	builder.addCSS(
		'.ptam-hierarchical-list-button-container',
		`
	margin: ${ shorthandCSS(
		listButtonContainerMarginTop,
		listButtonContainerMarginRight,
		listButtonContainerMarginBottom,
		listButtonContainerMarginLeft,
		listButtonContainerMarginUnit
	) };
	`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container',
			`
		margin: ${ shorthandCSS(
		listButtonContainerMarginTopTablet,
		listButtonContainerMarginRightTablet,
		listButtonContainerMarginBottomTablet,
		listButtonContainerMarginLeftTablet,
		listButtonContainerMarginUnitTablet
	) };
		`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container',
			`
		margin: ${ shorthandCSS(
		listButtonContainerMarginTopMobile,
		listButtonContainerMarginRightMobile,
		listButtonContainerMarginBottomMobile,
		listButtonContainerMarginLeftMobile,
		listButtonContainerMarginUnitMobile
	) };
		`
		);
	}

	// Button Border Styles.
	builder.addCSS(
		'.ptam-hierarchical-list-button-container a',
		`
	text-align: ${ listButtonTextAlign };
	display: inline-block;
	border-radius: ${ shorthandCSS(
		listButtonBorderRadiusTopleft,
		listButtonBorderRadiusTopRight,
		listButtonBorderRadiusBottomRight,
		listButtonBorderRadiusBottomLeft,
		listButtonBorderRadiusUnit
	) };
` );

	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
		border-radius: ${ shorthandCSS(
		listButtonBorderRadiusTopleftTablet,
		listButtonBorderRadiusTopRightTablet,
		listButtonBorderRadiusBottomRightTablet,
		listButtonBorderRadiusBottomLeftTablet,
		listButtonBorderRadiusUnit
	) };
	`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
		border-radius: ${ shorthandCSS(
		listButtonBorderRadiusTopleftMobile,
		listButtonBorderRadiusTopRightMobile,
		listButtonBorderRadiusBottomRightMobile,
		listButtonBorderRadiusBottomLeftMobile,
		listButtonBorderRadiusUnit
	) };
	`
		);
	}

	if ( 'full' === listButtonWidth ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
		display: block;
	` );
	}

	if ( '' !== listButtonBorderColor ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
		border-color: ${ hexToRgba( listButtonBorderColor, 1 ) };
		`
		);
	}
	if ( '' !== listButtonBorderColorHover ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a:hover',
			`
		border-color: ${ hexToRgba( listButtonBorderColorHover, 1 ) };
		`
		);
	}
	if ( 0 < listButtonBorderWidth ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
		border: ${ valueWithUnit( listButtonBorderWidth, 'px' ) } solid ${ hexToRgba(
	listButtonBorderColor,
	1
) };
`
		);
	}

	// Button Font Styles.
	builder.addCSS(
		'.ptam-hierarchical-list-button-container a',
		`
		font-family: ${ listButtonFontFamily ? listButtonFontFamily : 'inherit' };
		font-size: ${ valueWithUnit( listButtonFontSize, listButtonFontSizeUnit ) };
		font-weight: ${ listButtonFontWeight };
		letter-spacing: ${ valueWithUnit(
		listButtonLetterSpacing,
		listButtonLetterSpacingUnit
	) };
		line-height: ${ valueWithUnit( listButtonLineHeight, listButtonLineHeightUnit ) };
		text-transform: ${ listButtonTextTransform };
		text-align: ${ listButtonTextAlign };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
			font-size: ${ valueWithUnit(
		listButtonFontSizeTablet,
		listButtonFontSizeUnitTablet
	) };
			letter-spacing: ${ valueWithUnit(
		listButtonLetterSpacingTablet,
		listButtonLetterSpacingUnit
	) };
			line-height: ${ valueWithUnit(
		listButtonLineHeightTablet,
		listButtonLineHeightUnit
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
			font-size: ${ valueWithUnit(
		listButtonFontSizeMobile,
		listButtonFontSizeUnitMobile
	) };
			letter-spacing: ${ valueWithUnit(
		listButtonLetterSpacingMobile,
		listButtonLetterSpacingUnit
	) };
			line-height: ${ valueWithUnit(
		listButtonLineHeightMobile,
		listButtonLineHeightUnit
	) };
			`
		);
	}

	// Button Padding.
	builder.addCSS(
		'.ptam-hierarchical-list-button-container a',
		`
		padding: ${ shorthandCSS(
		listButtonPaddingTop,
		listButtonPaddingRight,
		listButtonPaddingBottom,
		listButtonPaddingLeft,
		listButtonPaddingUnit
	) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
			padding: ${ shorthandCSS(
		listButtonPaddingTopTablet,
		listButtonPaddingRightTablet,
		listButtonPaddingBottomTablet,
		listButtonPaddingLeftTablet,
		listButtonPaddingUnitTablet
	) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
			padding: ${ shorthandCSS(
		listButtonPaddingTopMobile,
		listButtonPaddingRightMobile,
		listButtonPaddingBottomMobile,
		listButtonPaddingLeftMobile,
		listButtonPaddingUnitMobile
	) };
			`
		);
	}

	builder.addCSS(
		'.ptam-hierarchical-list-button-container a',
		`
		text-align: ${ listButtonTextAlign };
		`
	);

	// Button colors.
	builder.addCSS(
		'.ptam-hierarchical-list-button-container a',
		`
		color: ${ hexToRgba( listButtonTextColor, 1 ) };
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-list-button-container a:hover',
		`
		color: ${ hexToRgba( listButtonTextColorHover, 1 ) };
		`
	);
	if ( 'color' === listButtonBackgroundType ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
			background: ${ hexToRgba( listButtonBackgroundColor, 1 ) };
			`
		);
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a:hover',
			`
			background: ${ hexToRgba( listButtonBackgroundColorHover, 1 ) };
			`
		);
	}
	if ( 'gradient' === listButtonBackgroundType ) {
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a',
			`
			background: ${ listButtonBackgroundGradient };
			`
		);
		builder.addCSS(
			'.ptam-hierarchical-list-button-container a:hover',
			`
			background: ${ listButtonBackgroundGradientHover };
			`
		);
	}

	return (
		<>
			{ inspectorControls }
			{ ! disableStyles ? builder.printCSS() : '' }
			{ listTitleFontFamily && listTitleFontFamily in GoogleFonts && (
				<link
					rel="stylesheet"
					href={ `https://fonts.googleapis.com/css?family=${ listTitleFontFamily.replace(
						/ /g,
						'+'
					) }` }
				/>
			) }
			<div className={ wrapperClass }>{ getPostHtml() }</div>
		</>
	);
};

export default compose( [
	withDispatch( ( dispatch ) => ( {
		setDeviceType( type ) {
			const {
				__experimentalSetPreviewDeviceType: setPreviewDeviceType,
			} = dispatch( 'core/edit-post' );

			if ( ! setPreviewDeviceType ) {
				return;
			}

			setPreviewDeviceType( type );
		},
	} ) ),
	withSelect( ( select ) => {
		const { __experimentalGetPreviewDeviceType: getPreviewDeviceType } = select(
			'core/edit-post'
		);

		if ( ! getPreviewDeviceType ) {
			return {
				deviceType: null,
			};
		}

		return {
			deviceType: getPreviewDeviceType(),
		};
	} ),
] )( PTAMHierarchyChildPostsList );
