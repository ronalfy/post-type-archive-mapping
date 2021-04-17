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
		listMetaLinkColor,
		listMetaLinkColorHover,
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
				{ listShowPostMeta &&
					<div className={ classnames( 'ptam-hierarchical-list-item-meta', listShowPostMetaAppearance ) }>
						{ listShowPostMetaAuthor &&
							<div className="ptam-author"><span><a onClick={ ( e ) => {
								e.preventDefault();
							} } href={ posts[ i ].author_info.author_link }>{ posts[ i ].author_info.display_name }</a></span></div>
						}
						{ listShowPostMetaDate &&
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
						}
						{ listShowPostMetaTerms && posts[ i ].taxonomies &&
							<div className="ptam-terms"><span>{ outputPostTerms( posts[ i ] ) }</span></div>
						}
						{ listShowPostMetaComments && posts[ i ].comment_count > 0 &&
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
						}
					</div>
				}
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
					<span className="ptam-hierarchical-list-meta-tax-name">{ taxData.label }:&nbsp;</span>
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
						{ listShowPostMeta &&
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
								{ listShowPostMetaDate &&
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
								}
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
							</>
						}
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

	// List Margin.
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
