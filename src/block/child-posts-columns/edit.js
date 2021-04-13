/* eslint-disable no-undef */
/**
 * External dependencies
 */
import classnames from 'classnames';
import axios from 'axios';
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

const { MediaUpload, InspectorControls, InspectorAdvancedControls } = wp.blockEditor;

const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

const PTAMHierarchyChildPostsColumns = ( props ) => {
	// Shortcuts.
	const { attributes, setAttributes } = props;

	// Get attributes from props.
	const {
		uniqueId,
		// eslint-disable-next-line no-unused-vars
		align,
		view,
		postType,
		hierarchy,
		parentItem,
		order,
		orderBy,
		postsPerPage,
		wpmlLanguage,
		disableStyles,
		pagination,
		gridPaddingTop,
		gridPaddingRight,
		gridPaddingBottom,
		gridPaddingLeft,
		gridPaddingUnit,
		// eslint-disable-next-line no-unused-vars
		gridPaddingUnitsSync,
		gridPaddingTopTablet,
		gridPaddingRightTablet,
		gridPaddingBottomTablet,
		gridPaddingLeftTablet,
		gridPaddingUnitTablet,
		// eslint-disable-next-line no-unused-vars
		gridPaddingUnitsSyncTablet,
		gridPaddingTopMobile,
		gridPaddingRightMobile,
		gridPaddingBottomMobile,
		gridPaddingLeftMobile,
		gridPaddingUnitMobile,
		// eslint-disable-next-line no-unused-vars
		gridPaddingUnitsSyncMobile,
		gridBackgroundType,
		gridFallbackImg,
		gridImageTypeSize,
		gridBackgroundGradient,
		gridBackgroundGradientHover,
		gridBackgroundColor,
		gridBackgroundColorHover,
		gridMinHeight,
		gridMinHeightTablet,
		gridMinHeightMobile,
		gridMinHeightUnit,
		gridMinHeightUnitTablet,
		gridMinHeightUnitMobile,
		gridNumberColumns,
		gridBorderWidth,
		// eslint-disable-next-line no-unused-vars
		gridBorderRadiusTopleft,
		// eslint-disable-next-line no-unused-vars
		gridBorderRadiusTopRight,
		// eslint-disable-next-line no-unused-vars
		gridBorderRadiusBottomLeft,
		// eslint-disable-next-line no-unused-vars
		gridBorderRadiusBottomRight,
		// eslint-disable-next-line no-unused-vars
		gridBorderRadiusUnitsSync,
		// eslint-disable-next-line no-unused-vars
		gridBorderRadiusUnit,
		gridBorderColor,
		gridBorderColorHover,
		gridOverlay,
		gridOverlayBackgroundColor,
		// eslint-disable-next-line no-unused-vars
		gridOverlayBackgroundColorOpacity,
		// eslint-disable-next-line no-unused-vars
		gridOverlayBackgroundColorHover,
		// eslint-disable-next-line no-unused-vars
		gridOverlayBackgroundColorHoverOpacity,
		gridShowTitle,
		gridTitleColor,
		gridTitleColorHover,
		gridTitleFontFamily,
		gridTitleFontSizeUnit,
		gridTitleFontSizeUnitTablet,
		gridTitleFontSizeUnitMobile,
		gridTitleFontSize,
		gridTitleFontSizeTablet,
		gridTitleFontSizeMobile,
		gridTitleFontWeight,
		gridTitleLetterSpacing,
		gridTitleLetterSpacingTablet,
		gridTitleLetterSpacingMobile,
		gridTitleLetterSpacingUnit,
		gridTitleTextTransform,
		gridTitleLineHeight,
		gridTitleLineHeightTablet,
		gridTitleLineHeightMobile,
		gridTitleLineHeightUnit,
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
		gridFallbackImg,
		gridImageTypeSize,
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
				ptam_globals.rest_url + `ptam/v2/get_hierarchical_posts`,
				{
					post_type: postType,
					order,
					orderby: orderBy,
					posts_per_page: postsPerPage,
					image_size: gridImageTypeSize,
					language: wpmlLanguage,
					post_parent: parentItem,
					hierarchy,
					default_image: gridFallbackImg,
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
		switch ( view ) {
			case 'grid':
				return <>{ outputGridHtml() }</>;
				// eslint-disable-next-line no-unreachable
				break;
		}
		return <></>;
	};

	/**
	 * Output Grid HTML.
	 *
	 * @return {JSX} Grid HTML.
	 */
	const outputGridHtml = () => {
		const classes = classnames(
			'ptam-hierarchical-grid-items',
			`ptam-hierarchical-grid-columns-${ parseInt( gridNumberColumns ) }`,
		);
		return (
			<div className={ classes }>
				{ outputGridItemsHtml() }
			</div>
		);
	};

	/**
	 * Output Grid item HTML.
	 *
	 * @return {JSX} Grid item HTML.
	 */
	const outputGridItemsHtml = () => {
		return Object.keys( posts ).map( ( item, i ) => (
			<article
				key={ i }
				className="ptam-hierarchical-grid-item"
				style={ {
					backgroundImage:
						'featured_image' === gridBackgroundType
							? `url(${ posts[ i ].featured_image_src })`
							: false,
				} }
			>
				{ gridShowTitle &&
					<div className="ptam-hierarchical-grid-item-content">
						<h2>{ posts[ i ].post_title }</h2>
					</div>
				}
			</article>
		) );
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
			label: __(
				'Only Parents',
				'Parent posts in a hierarchy',
				'post-type-archive-mapping'
			),
		},
		{
			value: 'children',
			label: __(
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

	const gridTitleFontParamsDesktop = {
		fontFamily: gridTitleFontFamily,
		fontSize: gridTitleFontSize,
		fontSizeUnit: gridTitleFontSizeUnit,
		fontWeight: gridTitleFontWeight,
		letterSpacing: gridTitleLetterSpacing,
		letterSpacingUnit: gridTitleLetterSpacingUnit,
		textTransform: gridTitleTextTransform,
		lineHeight: gridTitleLineHeight,
		lineHeightUnit: gridTitleLineHeightUnit,
	};
	const gridTitleFontParamsTablet = {
		fontFamily: gridTitleFontFamily,
		fontSize: gridTitleFontSizeTablet,
		fontSizeUnit: gridTitleFontSizeUnitTablet,
		fontWeight: gridTitleFontWeight,
		letterSpacing: gridTitleLetterSpacingTablet,
		letterSpacingUnit: gridTitleLetterSpacingUnit,
		textTransform: gridTitleTextTransform,
		lineHeight: gridTitleLineHeightTablet,
		lineHeightUnit: gridTitleLineHeightUnit,
	};
	const gridTitleFontParamsMobile = {
		fontFamily: gridTitleFontFamily,
		fontSize: gridTitleFontSizeMobile,
		fontSizeUnit: gridTitleFontSizeUnitMobile,
		fontWeight: gridTitleFontWeight,
		letterSpacing: gridTitleLetterSpacingMobile,
		letterSpacingUnit: gridTitleLetterSpacingUnit,
		textTransform: gridTitleTextTransform,
		lineHeight: gridTitleLineHeightMobile,
		lineHeightUnit: gridTitleLineHeightUnit,
	};

	// Image Sizes.
	const imageSizeOptions = [];
	for ( const imageKey in imageSizes ) {
		imageSizeOptions.push( { value: imageKey, label: imageKey } );
	}

	// Background Options.
	const gridBackgroundChoices = [
		{
			value: 'featured_image',
			label: __( 'Featured Image', 'post-type-archive-mapping' ),
		},
		{
			value: 'gradient',
			label: __( 'Gradient', 'post-type-archive-mapping' ),
		},
		{
			value: 'color',
			label: __( 'Color', 'post-type-archive-mapping' ),
		},
	];

	const gridOptions = (
		<Fragment>
			<ResponsiveTabs { ...props }
				selectedDevice={ getDeviceType() }
				onClick={ ( device ) => {
					changeDeviceType( device );
				} }
			/>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Container', 'post-type-archive-mapping' ) }
			>
				{
					'Desktop' === getDeviceType() &&
						<>
							<UnitPicker
								label={ __( 'Minimum Height', 'post-type-archive-mapping' ) }
								value={ gridMinHeightUnit }
								units={ [ 'px', 'em', 'vh' ] }
								onClick={ ( value ) => {
									setAttributes( {
										gridMinHeightUnit: value,
									} );
								} }
							/>

							<TextControl
								type={ 'number' }
								value={ gridMinHeight ? gridMinHeight : '' }
								onChange={ ( value ) => {
									setAttributes( {
										gridMinHeight: parseFloat( value ),
									} );
								} }
							/>
							<RangeControl
								label={ __( 'Number of Columns', 'post-type-archive-mapping' ) }
								value={ gridNumberColumns }
								onChange={ ( value ) => setAttributes( { gridNumberColumns: value } ) }
								min={ 1 }
								max={ 4 }
							/>
							<DimensionsControl
								attributes={ attributes }
								setAttributes={ setAttributes }
								allowNegatives={ false }
								attrTop="gridPaddingTop"
								attrRight="gridPaddingRight"
								attrBottom="gridPaddingBottom"
								attrLeft="gridPaddingLeft"
								attrUnit="gridPaddingUnit"
								attrSyncUnits="gridPaddingUnitsSync"
								units={ [ 'px', 'em', 'rem' ] }
							/>
						</>
				}
				{ 'Tablet' === getDeviceType() &&
					<>
						<UnitPicker
							label={ __( 'Minimum Height', 'post-type-archive-mapping' ) }
							value={ gridMinHeightUnitTablet }
							units={ [ 'px', 'em', 'vh' ] }
							onClick={ ( value ) => {
								setAttributes( {
									gridMinHeightUnitTablet: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ gridMinHeightTablet ? gridMinHeightTablet : '' }
							onChange={ ( value ) => {
								setAttributes( {
									gridMinHeightTablet: parseFloat( value ),
								} );
							} }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="gridPaddingTopTablet"
							attrRight="gridPaddingRightTablet"
							attrBottom="gridPaddingBottomTablet"
							attrLeft="gridPaddingLeftTablet"
							attrUnit="gridPaddingUnitTablet"
							attrSyncUnits="gridPaddingUnitsSyncTablet"
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				}
				{ 'Mobile' === getDeviceType() &&
					<>
						<UnitPicker
							label={ __( 'Minimum Height', 'post-type-archive-mapping' ) }
							value={ gridMinHeightUnitMobile }
							units={ [ 'px', 'em', 'vh' ] }
							onClick={ ( value ) => {
								setAttributes( {
									gridMinHeightUnitMobile: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ gridMinHeightMobile ? gridMinHeightMobile : '' }
							onChange={ ( value ) => {
								setAttributes( {
									gridMinHeightMobile: parseFloat( value ),
								} );
							} }
						/>
						<DimensionsControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							allowNegatives={ false }
							attrTop="gridPaddingTopMobile"
							attrRight="gridPaddingRightMobile"
							attrBottom="gridPaddingBottomMobile"
							attrLeft="gridPaddingLeftMobile"
							attrUnit="gridPaddingUnitMobile"
							attrSyncUnits="gridPaddingUnitsSyncMobile"
							units={ [ 'px', 'em', 'rem' ] }
						/>
					</>
				}
			</PanelBody>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Background', 'post-type-archive-mapping' ) }
			>
				<SelectControl
					label={ __( 'Background Type', 'post-type-archive-mapping' ) }
					options={ gridBackgroundChoices }
					value={ gridBackgroundType }
					onChange={ ( value ) => {
						setAttributes( {
							gridBackgroundType: value,
						} );
					} }
				/>
				{ 'gradient' === gridBackgroundType && (
					<TabPanel
						className="layout-tab-panel ptam-control-tabs"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'grid-background-gradient',
								title: __( 'Normal', 'post-type-archive-mapping' ),
								className: 'grid-background-gradient',
							},
							{
								name: 'grid-background-gradient-hover',
								title: __( 'Hover', 'post-type-archive-mapping' ),
								className: 'grid-background-gradient-hover',
							},
						] }
					>
						{ ( tab ) => {
							const isNormal = tab.name === 'grid-background-gradient';

							return (
								<div>
									{ isNormal ? (
										<PTAMGradientPicker
											onChange={ ( value ) => {
												setAttributes( {
													gridBackgroundGradient: value,
												} );
											} }
											label={ __(
												'Background Gradient',
												'post-type-archive-mapping'
											) }
											value={ gridBackgroundGradient }
										/>
									) : (
										<PTAMGradientPicker
											onChange={ ( value ) => {
												setAttributes( {
													gridBackgroundGradientHover: value,
												} );
											} }
											label={ __(
												'Background Gradient',
												'post-type-archive-mapping'
											) }
											value={ gridBackgroundGradientHover }
										/>
									) }
								</div>
							);
						} }
					</TabPanel>
				) }
				{ 'color' === gridBackgroundType && (
					<TabPanel
						className="layout-tab-panel ptam-control-tabs"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'grid-background-color',
								title: __( 'Normal', 'post-type-archive-mapping' ),
								className: 'grid-background-color',
							},
							{
								name: 'grid-background-color-hover',
								title: __( 'Hover', 'post-type-archive-mapping' ),
								className: 'grid-background-color-hover',
							},
						] }
					>
						{ ( tab ) => {
							const isNormal = tab.name === 'grid-background-color';

							return (
								<div>
									{ isNormal ? (
										<PTAMColorPicker
											value={ gridBackgroundColor }
											valueOpacity={ 1 }
											onChange={ ( value ) => {
												setAttributes( { gridBackgroundColor: value } );
											} }
											// eslint-disable-next-line no-unused-vars
											onOpacityChange={ ( value ) => { } }
											label={ __(
												'Background Color',
												'post-type-archive-mapping'
											) }
											alpha={ false }
										/>
									) : (
										<PTAMColorPicker
											value={ gridBackgroundColorHover }
											valueOpacity={ 1 }
											onChange={ ( value ) => {
												setAttributes( { gridBackgroundColorHover: value } );
											} }
											// eslint-disable-next-line no-unused-vars
											onOpacityChange={ ( value ) => { } }
											label={ __(
												'Background Color',
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

				{ 'featured_image' === gridBackgroundType && (
					<Fragment>
						<MediaUpload
							onSelect={ ( imageObject ) => {
								props.setAttributes( { gridFallbackImg: imageObject } );
							} }
							type="image"
							value={ gridFallbackImg.url }
							render={ ( { open } ) => (
								<Fragment>
									<button
										className="ptam-media-alt-upload components-button is-button is-secondary"
										onClick={ open }
									>
										{ __( 'Fallback Featured Image', 'post-type-archive-mapping' ) }
									</button>
									{ gridFallbackImg && (
										<Fragment>
											<div>
												<img
													src={ gridFallbackImg.url }
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
														setAttributes( { gridFallbackImg: '' } );
													} }
												>
													{ __( 'Reset Image', 'post-type-archive-mapping' ) }
												</button>
											</div>
										</Fragment>
									) }
									<SelectControl
										label={ __( 'Featured Image Size', 'post-type-archive-mapping' ) }
										options={ imageSizeOptions }
										value={ gridImageTypeSize }
										onChange={ ( value ) => {
											setAttributes( { gridImageTypeSize: value } );
										} }
									/>
									<ToggleControl
										label={ __( 'Enable Overlay', 'post-type-archive-mapping' ) }
										checked={ gridOverlay }
										onChange={ ( value ) => {
											setAttributes( {
												gridOverlay: value,
											} );
										} }
									/>
									{ gridOverlay &&
										<>
											<TabPanel
												className="layout-tab-panel ptam-control-tabs"
												activeClass="active-tab"
												tabs={ [
													{
														name: 'grid-overlay-color',
														title: __( 'Normal', 'post-type-archive-mapping' ),
														className: 'grid-overlay-color',
													},
													{
														name: 'grid-overlay-color-hover',
														title: __( 'Hover', 'post-type-archive-mapping' ),
														className: 'grid-overlay-color-hover',
													},
												] }
											>
												{ ( tab ) => {
													const isNormal = tab.name === 'grid-overlay-color';

													return (
														<div>
															{ isNormal ? (
																<PTAMColorPicker
																	value={ gridOverlayBackgroundColor }
																	valueOpacity={ gridOverlayBackgroundColorOpacity }
																	onChange={ ( value ) => {
																		setAttributes( { gridOverlayBackgroundColor: value } );
																	} }
																	// eslint-disable-next-line no-unused-vars
																	onOpacityChange={ ( value ) => {
																		setAttributes( {
																			gridOverlayBackgroundColorOpacity: value,
																		} );
																	} }
																	label={ __(
																		'Overlay Color',
																		'post-type-archive-mapping'
																	) }
																	alpha={ true }
																/>
															) : (
																<PTAMColorPicker
																	value={ gridOverlayBackgroundColorHover }
																	valueOpacity={ gridOverlayBackgroundColorHoverOpacity }
																	onChange={ ( value ) => {
																		setAttributes( { gridOverlayBackgroundColorHover: value } );
																	} }
																	// eslint-disable-next-line no-unused-vars
																	onOpacityChange={ ( value ) => {
																		setAttributes( {
																			gridOverlayBackgroundColorHoverOpacity: value,
																		} );
																	} }
																	label={ __(
																		'Overlay Color',
																		'post-type-archive-mapping'
																	) }
																	alpha={ true }
																/>
															) }
														</div>
													);
												} }
											</TabPanel>
										</>
									}
								</Fragment>
							) }
						/>
					</Fragment>
				) }
			</PanelBody>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Title', 'post-type-archive-mapping' ) }
			>
				<>
					<ToggleControl
						label={ __( 'Show Title', 'post-type-archive-mapping' ) }
						checked={ gridShowTitle }
						onChange={ ( value ) => {
							setAttributes( {
								gridShowTitle: value,
							} );
						} }
					/>
					{ gridShowTitle &&
						<>
							<TabPanel
								className="layout-tab-panel ptam-control-tabs"
								activeClass="active-tab"
								tabs={ [
									{
										name: 'grid-title-color',
										title: __( 'Normal', 'post-type-archive-mapping' ),
										className: 'grid-title-color',
									},
									{
										name: 'grid-title-color-hover',
										title: __( 'Hover', 'post-type-archive-mapping' ),
										className: 'grid-title-color-hover',
									},
								] }
							>
								{ ( tab ) => {
									const isNormal = tab.name === 'grid-title-color';

									return (
										<div>
											{ isNormal ? (
												<PTAMColorPicker
													value={ gridTitleColor }
													valueOpacity={ 1 }
													onChange={ ( value ) => {
														setAttributes( { gridTitleColor: value } );
													} }
													// eslint-disable-next-line no-unused-vars
													onOpacityChange={ ( value ) => {
													} }
													label={ __(
														'Title Color',
														'post-type-archive-mapping'
													) }
													alpha={ false }
												/>
											) : (
												<PTAMColorPicker
													value={ gridTitleColorHover }
													valueOpacity={ 1 }
													onChange={ ( value ) => {
														setAttributes( { gridTitleColorHover: value } );
													} }
													// eslint-disable-next-line no-unused-vars
													onOpacityChange={ ( value ) => {
													} }
													label={ __(
														'Title Color',
														'post-type-archive-mapping'
													) }
													alpha={ false }
												/>
											) }
										</div>
									);
								} }
							</TabPanel>
							{ 'Desktop' === getDeviceType() &&
								<TypographyControls
									label={ __( 'Title Typography', 'post-type-archive-mapping' ) }
									options={ gridTitleFontParamsDesktop }
									showFontFamily={ true }
									showFontSize={ true }
									showFontWeight={ true }
									showTextTransform={ true }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											gridTitleFontFamily: fontObject.fontFamily,
											gridTitleFontSize: fontObject.fontSize,
											gridTitleFontSizeUnit: fontObject.fontSizeUnit,
											gridTitleFontWeight: fontObject.fontWeight,
											gridTitleLetterSpacing: fontObject.letterSpacing,
											gridTitleLetterSpacingUnit: fontObject.letterSpacingUnit,
											gridTitleLineHeight: fontObject.lineHeight,
											gridTitleLineHeightUnit: fontObject.lineHeightUnit,
											gridTitleTextTransform: fontObject.textTransform,
										} );
									} }
								/>
							}
							{ 'Tablet' === getDeviceType() &&
								<TypographyControls
									label={ __( 'Title Typography', 'post-type-archive-mapping' ) }
									options={ gridTitleFontParamsTablet }
									showFontFamily={ false }
									showFontSize={ true }
									showFontWeight={ false }
									showTextTransform={ false }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											gridTitleFontFamily: fontObject.fontFamily,
											gridTitleFontSizeTablet: fontObject.fontSize,
											gridTitleFontSizeUnitTablet: fontObject.fontSizeUnit,
											gridTitleFontWeight: fontObject.fontWeight,
											gridTitleLetterSpacingTablet: fontObject.letterSpacing,
											gridTitleLetterSpacingUnit: fontObject.letterSpacingUnit,
											gridTitleLineHeightTablet: fontObject.lineHeight,
											gridTitleLineHeightUnit: fontObject.lineHeightUnit,
											gridTitleTextTransform: fontObject.textTransform,
										} );
									} }
								/>
							}
							{ 'Mobile' === getDeviceType() &&
								<TypographyControls
									label={ __( 'Title Typography', 'post-type-archive-mapping' ) }
									options={ gridTitleFontParamsMobile }
									showFontFamily={ false }
									showFontSize={ true }
									showFontWeight={ false }
									showTextTransform={ false }
									showLineHeight={ true }
									showLetterSpacing={ true }
									onChange={ ( fontObject ) => {
										setAttributes( {
											gridTitleFontFamily: fontObject.fontFamily,
											gridTitleFontSizeMobile: fontObject.fontSize,
											gridTitleFontSizeUnitMobile: fontObject.fontSizeUnit,
											gridTitleFontWeight: fontObject.fontWeight,
											gridTitleLetterSpacingMobile: fontObject.letterSpacing,
											gridTitleLetterSpacingUnit: fontObject.letterSpacingUnit,
											gridTitleLineHeightMobile: fontObject.lineHeight,
											gridTitleLineHeightUnit: fontObject.lineHeightUnit,
											gridTitleTextTransform: fontObject.textTransform,
										} );
									} }
								/>
							}
						</>
					}
				</>
			</PanelBody>
			<PanelBody
				title={ __( 'Border', 'post-type-archive-mapping' ) }
				initialOpen={ false }
			>
				<TabPanel
					className="layout-tab-panel ptam-control-tabs"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'grid-border-color',
							title: __( 'Normal', 'post-type-archive-mapping' ),
							className: 'grid-border-color',
						},
						{
							name: 'grid-border-color-hover',
							title: __( 'Hover', 'post-type-archive-mapping' ),
							className: 'grid-border-color-hover',
						},
					] }
				>
					{ ( tab ) => {
						const isNormal = tab.name === 'grid-border-color';

						return (
							<div>
								{ isNormal ? (
									<PTAMColorPicker
										value={ gridBorderColor }
										valueOpacity={ 1 }
										onChange={ ( value ) => {
											setAttributes( { gridBorderColor: value } );
										} }
										// eslint-disable-next-line no-unused-vars
										onOpacityChange={ ( value ) => { } }
										label={ __(
											'Border Color',
											'post-type-archive-mapping'
										) }
										alpha={ false }
									/>
								) : (
									<PTAMColorPicker
										value={ gridBorderColorHover }
										valueOpacity={ 1 }
										onChange={ ( value ) => {
											setAttributes( { gridBorderColorHover: value } );
										} }
										// eslint-disable-next-line no-unused-vars
										onOpacityChange={ ( value ) => { } }
										label={ __(
											'Border Color',
											'post-type-archive-mapping'
										) }
										alpha={ false }
									/>
								) }
							</div>
						);
					} }
				</TabPanel>
				<RangeControl
					label={ __( 'Border Width', 'post-type-archive-mapping' ) }
					value={ gridBorderWidth }
					onChange={ ( value ) => setAttributes( { gridBorderWidth: value } ) }
					min={ 0 }
					max={ 100 }
				/>
				<DimensionsControl
					label={ __( 'Border Radius', 'post-type-archive-mapping' ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					allowNegatives={ false }
					attrTop="gridBorderRadiusTopleft"
					attrRight="gridBorderRadiusTopRight"
					attrBottom="gridBorderRadiusBottomLeft"
					attrLeft="gridBorderRadiusBottomRight"
					attrUnit="gridBorderRadiusUnit"
					attrSyncUnits="gridBorderRadiusUnitsSync"
					labelTop={ __( 'T-Left', 'post-type-archive-mapping' ) }
					labelRight={ __( 'T-Right', 'post-type-archive-mapping' ) }
					labelBottom={ __( 'B-Right', 'post-type-archive-mapping' ) }
					labelLeft={ __( 'B-Left', 'post-type-archive-mapping' ) }
					units={ [ 'px', 'em', 'rem' ] }
				/>
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
				{ 'grid' === view && <>{ gridOptions }</> }
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
					<div className="ptam-term-grid-loading">
						<h1>
							<Loading />
							{ ' ' }
							{ __( 'Child Posts Grid', 'post-type-archive-mapping' ) }
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
		'.ptam-hierarchical-grid-items',
		`
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 20px;
		row-gap: 20px;
		background-repeat: no-repeat;
		word-break: break-all;
		transition: all ease-in-out 0.5s;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-1',
		`
		grid-template-columns: 1fr;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-2',
		`
		grid-template-columns: 1fr 1fr;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-3',
		`
		grid-template-columns: 1fr 1fr 1fr;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-4',
		`
		grid-template-columns: 1fr 1fr 1fr 1fr;
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-4, .ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-3, .ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-2',
			`
			grid-template-columns: 1fr 1fr !important;
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-4, .ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-3, .ptam-hierarchical-grid-items.ptam-hierarchical-grid-columns-2',
			`
			grid-template-columns: 1fr !important;
			`
		);
	}

	// Grid Item Flex goodness.
	builder.addCSS(
		'.ptam-hierarchical-grid-item',
		`
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		min-height: ${ valueWithUnit( gridMinHeight, gridMinHeightUnit ) };
		transition: all ease-in-out 0.5s;
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			min-height: ${ valueWithUnit( gridMinHeightTablet, gridMinHeightUnitTablet ) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			min-height: ${ valueWithUnit( gridMinHeightMobile, gridMinHeightUnitMobile ) };
			`
		);
	}
	// Grid background image styles.
	if ( 'featured_image' === gridBackgroundType ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			z-index: 1;
			position: relative;
			overflow: hidden;
			`
		);
		if ( true === gridOverlay ) {
			builder.addCSS(
				'.ptam-hierarchical-grid-item:after',
				`
				position: absolute;
				content: '';
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: 2;
				background: ${ hexToRgba( gridOverlayBackgroundColor, gridOverlayBackgroundColorOpacity ) };
				`
			);
			if ( '' !== gridOverlayBackgroundColorHover ) {
				builder.addCSS(
					'.ptam-hierarchical-grid-item:hover:after',
					`
					background: ${ hexToRgba( gridOverlayBackgroundColorHover, gridOverlayBackgroundColorHoverOpacity ) };
					`
				);
			}
		}
	} else if ( 'gradient' === gridBackgroundType ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			background: ${ gridBackgroundGradient };
			`
		);
		if ( '' !== gridBackgroundGradientHover ) {
			builder.addCSS(
				'.ptam-hierarchical-grid-item:hover',
				`
				background: ${ gridBackgroundGradientHover };
				`
			);
		}
	} else {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			background: ${ hexToRgba( gridBackgroundColor, 1 ) };
			`
		);
		if ( '' !== gridBackgroundColorHover ) {
			builder.addCSS(
				'.ptam-hierarchical-grid-item:hover',
				`
				background: ${ hexToRgba( gridBackgroundColorHover, 1 ) };
				`
			);
		}
	}
	// Grid Padding.
	builder.addCSS(
		'.ptam-hierarchical-grid-item',
		`
		padding: ${ shorthandCSS( gridPaddingTop, gridPaddingRight, gridPaddingBottom, gridPaddingLeft, gridPaddingUnit ) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			padding: ${ shorthandCSS( gridPaddingTopTablet, gridPaddingRightTablet, gridPaddingBottomTablet, gridPaddingLeftTablet, gridPaddingUnitTablet ) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			padding: ${ shorthandCSS( gridPaddingTopMobile, gridPaddingRightMobile, gridPaddingBottomMobile, gridPaddingLeftMobile, gridPaddingUnitMobile ) };
			`
		);
	}
	// Grid Border.
	builder.addCSS(
		'.ptam-hierarchical-grid-item',
		`
		border-radius: ${ shorthandCSS( gridBorderRadiusTopleft, gridBorderRadiusTopRight, gridBorderRadiusBottomRight, gridBorderRadiusBottomLeft, gridBorderRadiusUnit ) };
		`
	);
	if ( '' !== gridBorderColor ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			border-color: ${ hexToRgba( gridBorderColor, 1 ) };
			`
		);
		if ( '' !== gridBorderColorHover ) {
			builder.addCSS(
				'.ptam-hierarchical-grid-item:hover',
				`
				border-color: ${ hexToRgba( gridBorderColorHover, 1 ) };
				`
			);
		}
	}
	if ( 0 < gridBorderWidth ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item',
			`
			border: ${ valueWithUnit( gridBorderWidth, 'px' ) } solid ${ hexToRgba( gridBorderColor, 1 ) };
			`
		);
	}
	// Grid Title.
	builder.addCSS(
		'.ptam-hierarchical-grid-item-content',
		`
		position: relative;
		z-index: 3;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-grid-item-content h2',
		`
		color: ${ hexToRgba( gridTitleColor, 1 ) };
		font-family: ${ gridTitleFontFamily ? gridTitleFontFamily : 'inherit' };
		font-size: ${ valueWithUnit( gridTitleFontSize, gridTitleFontSizeUnit ) };
		font-weight: ${ gridTitleFontWeight };
		letter-spacing: ${ valueWithUnit( gridTitleLetterSpacing, gridTitleLetterSpacingUnit ) };
		line-height: ${ valueWithUnit( gridTitleLineHeight, gridTitleLineHeightUnit ) };
		text-transform: ${ gridTitleTextTransform };
		z-index: 3;
		`
	);
	builder.addCSS(
		'.ptam-hierarchical-grid-item:hover h2',
		`
		color: ${ hexToRgba( gridTitleColorHover, 1 ) };
		`
	);
	if ( 'Tablet' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item-content h2',
			`
			font-size: ${ valueWithUnit( gridTitleFontSizeTablet, gridTitleFontSizeUnitTablet ) };
			letter-spacing: ${ valueWithUnit( gridTitleLetterSpacingTablet, gridTitleLetterSpacingUnit ) };
			line-height: ${ valueWithUnit( gridTitleLineHeightTablet, gridTitleLineHeightUnit ) };
			`
		);
	}
	if ( 'Mobile' === getDeviceType() ) {
		builder.addCSS(
			'.ptam-hierarchical-grid-item-content h2',
			`
			font-size: ${ valueWithUnit( gridTitleFontSizeMobile, gridTitleFontSizeUnitMobile ) };
			letter-spacing: ${ valueWithUnit( gridTitleLetterSpacingMobile, gridTitleLetterSpacingUnit ) };
			line-height: ${ valueWithUnit( gridTitleLineHeightMobile, gridTitleLineHeightUnit ) };
			`
		);
	}

	return (
		<>
			{ inspectorControls }
			{ ! disableStyles ? builder.printCSS() : '' }
			{ gridTitleFontFamily && ( gridTitleFontFamily in GoogleFonts ) &&
				<link
					rel="stylesheet"
					href={ `https://fonts.googleapis.com/css?family=${ gridTitleFontFamily.replace( / /g, '+' ) }` }
				/>
			}
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
		const {
			__experimentalGetPreviewDeviceType: getPreviewDeviceType,
		} = select( 'core/edit-post' );

		if ( ! getPreviewDeviceType ) {
			return {
				deviceType: null,
			};
		}

		return {
			deviceType: getPreviewDeviceType(),
		};
	} ),
] )( PTAMHierarchyChildPostsColumns );
