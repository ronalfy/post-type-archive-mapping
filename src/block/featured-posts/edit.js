/**
 * External dependencies
 */
import axios from 'axios';
import dayjs from 'dayjs';
import classnames from 'classnames';
import hexToRgba from "hex-to-rgba";
import Loading from '../../components/Loading';
const HtmlToReactParser = require( 'html-to-react' ).Parser;
import CSSBuilder from '../../utilities/css-builder';
import valueWithUnit from '../../utilities/value-with-unit';
import shorthandCSS from '../../utilities/shorthand-css';

const { Fragment, useState, useEffect } = wp.element;

const { __, _n } = wp.i18n;

const {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} = wp.components;

const { MediaUpload, InspectorControls, PanelColorSettings } = wp.blockEditor;

const PTAM_Featured_Posts = ( props ) => {
	const [ loading, setLoading ] = useState( true );
	const [ imageSizes, setImageSizes ] = useState( ptam_globals.image_sizes );
	const [ taxonomyList, setTaxonomyList ] = useState( [] );
	const [ termList, setTermList ] = useState( [] );
	const [ itemNumberTimer, setItemNumberTimer ] = useState( 0 );
	const [ latestPosts, setLatestPosts ] = useState( {} );
	const [ config, setConfig ] = useState( {
		headers: {
			// eslint-disable-next-line no-undef
			'X-WP-Nonce': ptam_globals.rest_nonce,
		},
	} );

	useEffect(() => {
		setLoading( true );
		getLatestData( {} );

		// Get unique ID for the block. Props @generateblocks.
		const id = props.clientId.substr( 2, 9 ).replace( '-', '' );
		if ( ! props.attributes.uniqueId ) {
			props.setAttributes( {
				uniqueId: id,
			} );
		}
	}, [] );

	/**
	 *
	 * @param {string} excerpt The excerpt to parse down.
	 * @return {JSX} React HTML.
	 */
	const excerptParse = ( excerpt ) => {
		const htmlToReactParser = new HtmlToReactParser();
		const { excerptLength } = props.attributes;

		excerpt = excerpt.split( ' ' ).slice( 0, excerptLength );
		excerpt = excerpt.join( ' ' );

		return htmlToReactParser.parse( excerpt );
	};

	// Get a list of the current terms.
	const getTermList = async( object = {} ) => {
		const termListArr = [];
		const { postType, taxonomy } = jQuery.extend( {}, props.attributes, object );

		try {
			const result = await axios.post(
				ptam_globals.rest_url + `ptam/v2/get_terms`,
				{
					taxonomy,
					post_type: postType,
				},
				config
			);
			if ( Object.keys( result.data ).length > 0 ) {
				termListArr.push( {
					value: 0,
					label: __( 'All', 'post-type-archive-mapping' ),
				} );
				jQuery.each( result.data, function( key, value ) {
					termListArr.push( { value: value.term_id, label: value.name } );
				} );
				props.setAttributes({term: 'all' } );
			}
			setTermList( termListArr );
			setLoading( false );
		} catch ( e ) {
			// Error :(
		}
	};

	const getLatestPosts = async( object = {} ) => {
		const {
			postType,
			order,
			orderBy,
			avatarSize,
			imageType,
			imageTypeSize,
			taxonomy,
			term,
			postsToShow,
			imageCrop,
			fallbackImg,
		} = jQuery.extend( {}, props.attributes, object );

		setLoading(true);

		try {
			const result = await axios.post(
				ptam_globals.rest_url + `ptam/v2/get_posts`,
				{
					post_type: postType,
					order,
					orderby: orderBy,
					taxonomy,
					term,
					posts_per_page: postsToShow,
					avatar_size: avatarSize,
					image_type: imageType,
					image_size: imageTypeSize,
					default_image: fallbackImg,
				},
				config
			);
			setLatestPosts( result.data.posts );
			setLoading( false );
		} catch ( e ) {
			// Error :(
		}
	};

	const getLatestData = async( object = {} ) => {
		setLoading(true);

		const taxonomyListArr = [];
		const termsListArr = [];

		try {
			const [
				restFeaturedPosts,
				restGetTerms,
				restGetTaxonomies,
			] = await axios.all( [ getFeaturedPosts(), getTerms(), getTaxonomies() ] );
			if ( Object.keys( restGetTerms.data ).length > 0 ) {
				termsListArr.push( {
					value: 0,
					label: __( 'All', 'post-type-archive-mapping' ),
				} );
				jQuery.each( restGetTerms.data, function( key, value ) {
					termsListArr.push( { value: value.term_id, label: value.name } );
				} );
			}

			if ( Object.keys( restGetTaxonomies.data ).length > 0 ) {
				taxonomyListArr.push( {
					value: 'none',
					label: __( 'Select a Taxonomy', 'post-type-archive-mapping' ),
				} );
				jQuery.each( restGetTaxonomies.data, function( key, value ) {
					taxonomyListArr.push( { value: key, label: value.label } );
				} );
			}
			setTaxonomyList( taxonomyListArr );

			setLatestPosts( restFeaturedPosts.data.posts );
			setTermList( termsListArr );
			setLoading( false );
		} catch ( e ) {
		}
	};

	// Get the current list of featured posts.
	const getFeaturedPosts = () => {
		return axios.post( ptam_globals.rest_url + `ptam/v2/get_featured_posts`, {
			post_type: props.attributes.postType,
			order: props.attributes.order,
			orderby: props.attributes.orderBy,
			taxonomy: props.attributes.taxonomy,
			term: props.attributes.term,
			posts_per_page: props.attributes.postsToShow,
			image_size: props.attributes.imageCrop,
			avatar_size: props.attributes.avatarSize,
			image_type: props.attributes.imageType,
			image_size: props.attributes.imageTypeSize,
			default_image: props.attributes.fallbackImg,
		}, config );
	};

	// Retrieve a list of terms by taxonomy and post type.
	const getTerms = () => {
		return axios.post( ptam_globals.rest_url + `ptam/v2/get_terms`, {
			taxonomy: props.attributes.taxonomy,
			post_type: props.attributes.postType,
		}, config );
	};

	// Retrieve a list of all taxonomies by post type.
	const getTaxonomies = () => {
		return axios.post( ptam_globals.rest_url + `ptam/v2/get_taxonomies`, {
			post_type: props.attributes.postType,
		}, config );
	};

	const getPostHtml = () => {
		const posts = latestPosts;
		const htmlToReactParser = new HtmlToReactParser();
		const {
			disableStyles,
			titleFont,
			titleFontSize,
			titleColor,
			showMeta,
			showMetaAuthor,
			showMetaDate,
			showMetaComments,
			showFeaturedImage,
			showReadMore,
			showExcerpt,
			excerptFont,
			excerptFontSize,
			excerptTextColor,
			readMoreButtonText,
			readMoreButtonFont,
			readMoreButtonTextColor,
			readMoreButtonBackgroundColor,
			readMoreButtonBorder,
			readMoreButtonBorderColor,
			readMoreButtonBorderRadius,
		} = props.attributes;
		if ( Object.keys( posts ).length === 0 ) {
			return (
				<h2>{ __( 'No posts could be found.', 'post-type-archive-mapping' ) }</h2>
			);
		}

		return Object.keys( posts ).map( ( term, i ) => (
			<Fragment key={ i }>
				<div className="ptam-featured-post-item">
					<div className="ptam-featured-post-meta">
						<h3 className="entry-title">
							<a href={ posts[ i ].link }>
								{ posts[ i ].post_title }
							</a>
						</h3>
						{ showMeta && (
							<Fragment>
								<div className="entry-meta">
									{ showMetaAuthor && (
										<span className="author-name">
											<a href={ posts[ i ].author_info.author_link }>
												{ posts[ i ].author_info.display_name }
											</a>
										</span>
									) }
									{ showMetaDate && (
										<span className="post-date">
											<time
												dateTime={ dayjs( posts[ i ].post_date_gmt ).format() }
												className={ 'ptam-block-post-grid-date' }
											>
												{ dayjs( posts[ i ].post_date_gmt ).format( 'MMMM DD, YYYY' ) }
											</time>
										</span>
									) }
									{ showMetaComments && (
										<span className="post-comments">
											{ posts[ i ].comment_count }{ ' ' }
											{ _n(
												'Comment',
												'Comments',
												posts[ i ].comment_count,
												'post-type-archive-mapping'
											) }
										</span>
									) }
								</div>
							</Fragment>
						) }
					</div>
					{ posts[ i ].featured_image_src && showFeaturedImage && (
						<Fragment>
							<div className="ptam-featured-post-image">
								<a href={ posts[ i ].link }>
									{ htmlToReactParser.parse( posts[ i ].featured_image_src ) }
								</a>
							</div>
						</Fragment>
					) }
					{ showExcerpt && (
						<div className="ptam-featured-post-content">
							{ excerptParse( posts[ i ].post_excerpt ) }
						</div>
					) }
					{ showReadMore && (
						<div className="ptam-featured-post-button">
							<a
								className="btn btn-primary"
								href={ posts[ i ].link }
							>
								{ readMoreButtonText }
							</a>
						</div>
					) }
				</div>
			</Fragment>
		) );
	};

	const itemNumberRender = ( value ) => {
		if ( itemNumberTimer ) {
			clearTimeout( itemNumberTimer );
		}
		setItemNumberTimer(
			setTimeout( () => {
				getLatestData( { value } );
			}, 1000 )
		);
	};
	const trimWords = ( value ) => {
		const { setAttributes } = props;
		setAttributes( { excerptLength: value } );
	};

	// Render a preview.
	if ( props.attributes.preview ) {
		return (
			<Fragment>
				<img src={ ptam_globals.featured_posts_block_preview } />
			</Fragment>
		);
	}

	const { attributes, setAttributes } = props;
	const {
		postType,
		imageTypeSize,
		postsToShow,
		fallbackImg,
		term,
		taxonomy,
		order,
		orderBy,
		termDisplayPaddingBottom,
		termDisplayPaddingTop,
		termDisplayPaddingLeft,
		termDisplayPaddingRight,
		termBackgroundColor,
		termTextColor,
		termFont,
		termFontSize,
		termTitle,
		titleFont,
		titleFontSize,
		titleColor,
		titleColorHover,
		disableStyles,
		showMeta,
		showMetaAuthor,
		showMetaDate,
		showMetaComments,
		showFeaturedImage,
		showReadMore,
		showExcerpt,
		excerptLength,
		excerptFont,
		excerptFontSize,
		excerptTextColor,
		readMoreButtonText,
		readMoreButtonFont,
		readMoreButtonTextColor,
		readMoreButtonTextHoverColor,
		readMoreButtonBackgroundColor,
		readMoreButtonBackgroundHoverColor,
		readMoreButtonBorder,
		readMoreButtonBorderColor,
		readMoreButtonBorderRadius,
		showPagination,
		uniqueId,
	} = attributes;

	// Fonts
	const fontOptions = [];
	for ( const fontKey in ptam_globals.fonts ) {
		fontOptions.push( { value: fontKey, label: ptam_globals.fonts[ fontKey ] } );
	}

	// Post Types.
	const postTypeOptions = [];
	for ( const postTypeKey in ptam_globals.post_types ) {
		postTypeOptions.push( { value: postTypeKey, label: ptam_globals.post_types[ postTypeKey ] } );
	}

	// Image Sizes.
	const imageSizeOptions = [];
	for ( const imageKey in imageSizes ) {
		imageSizeOptions.push( { value: imageKey, label: imageKey } );
	}

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

	// Get the term label.
	let selectedTerm = 0;
	for ( const termKey in termList ) {
		if ( termList[ termKey ].value == term ) {
			selectedTerm = termList[ termKey ].label;
			break;
		}
	}

	// Custom term title.
	if ( termTitle !== '' ) {
		selectedTerm = termTitle;
	}

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Query', 'post-type-archive-mapping' ) }
			>
				<SelectControl
					label={ __( 'Post Type', 'post-type-archive-mapping' ) }
					options={ postTypeOptions }
					value={ postType }
					onChange={ ( value ) => {
						props.setAttributes( {
							postType: value,
							taxonomy: 'none',
							term: 0,
						} );
						getLatestData( {
							postType: value,
							taxonomy: 'none',
							term: 0,
						} );
					} }
				/>
				<SelectControl
					label={ __( 'Taxonomy', 'post-type-archive-mapping' ) }
					options={ taxonomyList }
					value={ taxonomy }
					onChange={ ( value ) => {
						if ( 'none' !== value ) {
							props.setAttributes( { taxonomy: value, term: 0 } );
							getTermList( { taxonomy: value } );
							getLatestPosts( { taxonomy: value, term: 0 } );
						}
					} }
				/>
				<SelectControl
					label={ __( 'Terms', 'post-type-archive-mapping' ) }
					options={ termList }
					value={ term }
					onChange={ ( value ) => {
						props.setAttributes( { term: value } );
						getLatestPosts( { term: value } );
					} }
				/>
				<SelectControl
					label={ __( 'Order', 'post-type-archive-mapping' ) }
					options={ orderOptions }
					value={ order }
					onChange={ ( value ) => {
						props.setAttributes( { order: value } );
						getLatestPosts( { order: value } );
					} }
				/>
				<SelectControl
					label={ __( 'Order By', 'post-type-archive-mapping' ) }
					options={ orderByOptions }
					value={ orderBy }
					onChange={ ( value ) => {
						props.setAttributes( { orderBy: value } );
						getLatestPosts( { orderBy: value } );
					} }
				/>
				<RangeControl
					label={ __( 'Number of Items', 'post-type-archive-mapping' ) }
					value={ postsToShow }
					onChange={ ( value ) => {
						props.setAttributes( { postsToShow: value } );
						itemNumberRender( value );
					} }
					min={ 1 }
					max={ 100 }
				/>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title={ __( 'Container', 'post-type-archive-mapping' ) }
			>
				<ToggleControl
					label={ __( 'Disable Styles', 'post-type-archive-mapping' ) }
					checked={ disableStyles }
					onChange={ ( value ) => {
						props.setAttributes( {
							disableStyles: value,
						} );
					} }
				/>
				<ToggleControl
					label={ __( 'Show Post Meta', 'post-type-archive-mapping' ) }
					checked={ showMeta }
					onChange={ ( value ) => {
						props.setAttributes( {
							showMeta: value,
						} );
					} }
				/>
				{ showMeta && (
					<Fragment>
						<ToggleControl
							label={ __( 'Show Author', 'post-type-archive-mapping' ) }
							checked={ showMetaAuthor }
							onChange={ ( value ) => {
								props.setAttributes( {
									showMetaAuthor: value,
								} );
							} }
						/>
						<ToggleControl
							label={ __( 'Show Date', 'post-type-archive-mapping' ) }
							checked={ showMetaDate }
							onChange={ ( value ) => {
								props.setAttributes( {
									showMetaDate: value,
								} );
							} }
						/>
						<ToggleControl
							label={ __( 'Show Comments', 'post-type-archive-mapping' ) }
							checked={ showMetaComments }
							onChange={ ( value ) => {
								props.setAttributes( {
									showMetaComments: value,
								} );
							} }
						/>
					</Fragment>
				) }
				<ToggleControl
					label={ __( 'Show Featured Image', 'post-type-archive-mapping' ) }
					checked={ showFeaturedImage }
					onChange={ ( value ) => {
						props.setAttributes( {
							showFeaturedImage: value,
						} );
					} }
				/>
				<ToggleControl
					label={ __( 'Show The Excerpt', 'post-type-archive-mapping' ) }
					checked={ showExcerpt }
					onChange={ ( value ) => {
						props.setAttributes( {
							showExcerpt: value,
						} );
					} }
				/>
				<ToggleControl
					label={ __( 'Show Read More Button', 'post-type-archive-mapping' ) }
					checked={ showReadMore }
					onChange={ ( value ) => {
						props.setAttributes( {
							showReadMore: value,
						} );
					} }
				/>
				<ToggleControl
					label={ __( 'Show Pagination', 'post-type-archive-mapping' ) }
					help={ __(
						'Not recommended if you have more than one of these blocks on the same page.',
						'post-type-archive-mapping'
					) }
					checked={ showPagination }
					onChange={ ( value ) => {
						props.setAttributes( {
							showPagination: value,
						} );
					} }
				/>
			</PanelBody>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Term Display', 'post-type-archive-mapping' ) }
			>
				<TextControl
					label={ __( 'Term Title', 'post-type-archive-mapping' ) }
					type="text"
					value={ termTitle }
					onChange={ ( value ) => props.setAttributes( { termTitle: value } ) }
				/>
				<RangeControl
					label={ __( 'Padding Top', 'post-type-archive-mapping' ) }
					value={ termDisplayPaddingTop }
					onChange={ ( value ) =>
						props.setAttributes( { termDisplayPaddingTop: value } )
					}
					min={ 1 }
					max={ 100 }
				/>
				<RangeControl
					label={ __( 'Padding Right', 'post-type-archive-mapping' ) }
					value={ termDisplayPaddingRight }
					onChange={ ( value ) =>
						props.setAttributes( { termDisplayPaddingRight: value } )
					}
					min={ 1 }
					max={ 100 }
				/>
				<RangeControl
					label={ __( 'Padding Bottom', 'post-type-archive-mapping' ) }
					value={ termDisplayPaddingBottom }
					onChange={ ( value ) =>
						props.setAttributes( { termDisplayPaddingBottom: value } )
					}
					min={ 1 }
					max={ 100 }
				/>
				<RangeControl
					label={ __( 'Padding Left', 'post-type-archive-mapping' ) }
					value={ termDisplayPaddingLeft }
					onChange={ ( value ) =>
						props.setAttributes( { termDisplayPaddingLeft: value } )
					}
					min={ 1 }
					max={ 100 }
				/>
				<PanelColorSettings
					title={ __( 'Term Colors', 'post-type-archive-mapping' ) }
					initialOpen={ true }
					colorSettings={ [
						{
							value: termBackgroundColor,
							onChange: ( value ) => {
								setAttributes( { termBackgroundColor: value } );
							},
							label: __( 'Background Color', 'post-type-archive-mapping' ),
						},
						{
							value: termTextColor,
							onChange: ( value ) => {
								setAttributes( { termTextColor: value } );
							},
							label: __( 'Text Color', 'post-type-archive-mapping' ),
						},
					] }
				></PanelColorSettings>
				<SelectControl
					label={ __( 'Term Typography', 'post-type-archive-mapping' ) }
					options={ fontOptions }
					value={ termFont }
					onChange={ ( value ) => {
						props.setAttributes( { termFont: value } );
					} }
				/>
				<RangeControl
					label={ __( 'Font Size', 'post-type-archive-mapping' ) }
					value={ termFontSize }
					onChange={ ( value ) => props.setAttributes( { termFontSize: value } ) }
					min={ 10 }
					max={ 60 }
				/>
			</PanelBody>
			<PanelBody
				initialOpen={ false }
				title={ __( 'Post Title', 'post-type-archive-mapping' ) }
			>
				<PanelColorSettings
					title={ __( 'Title Colors', 'post-type-archive-mapping' ) }
					initialOpen={ true }
					colorSettings={ [
						{
							value: titleColor,
							onChange: ( value ) => {
								setAttributes( { titleColor: value } );
							},
							label: __( 'Title Color', 'post-type-archive-mapping' ),
						},
						{
							value: titleColorHover,
							onChange: ( value ) => {
								setAttributes( { titleColorHover: value } );
							},
							label: __( 'Title Color on Hover', 'post-type-archive-mapping' ),
						},
					] }
				></PanelColorSettings>
				<SelectControl
					label={ __( 'Title Typography', 'post-type-archive-mapping' ) }
					options={ fontOptions }
					value={ titleFont }
					onChange={ ( value ) => {
						props.setAttributes( { titleFont: value } );
					} }
				/>
				<RangeControl
					label={ __( 'Title Font Size', 'post-type-archive-mapping' ) }
					value={ titleFontSize }
					onChange={ ( value ) => props.setAttributes( { titleFontSize: value } ) }
					min={ 10 }
					max={ 60 }
				/>
			</PanelBody>
			{ showFeaturedImage && (
				<PanelBody
					initialOpen={ false }
					title={ __( 'Featured Image', 'post-type-archive-mapping' ) }
				>
					<Fragment>
						<MediaUpload
							onSelect={ ( imageObject ) => {
								props.setAttributes( { fallbackImg: imageObject } );
								getLatestPosts( { fallbackImg: imageObject } );
							} }
							type="image"
							value={ fallbackImg.url }
							render={ ( { open } ) => (
								<Fragment>
									<button
										className="ptam-media-alt-upload components-button is-button is-secondary"
										onClick={ open }
									>
										{ __( 'Fallback Featured Image', 'post-type-archive-mapping' ) }
									</button>
									{ fallbackImg && (
										<Fragment>
											<div>
												<img
													src={ fallbackImg.url }
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
													onClick={ ( event ) => {
														props.setAttributes( { fallbackImg: '' } );
														getLatestPosts( { fallbackImg: 0 } );
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
							value={ imageTypeSize }
							onChange={ ( value ) => {
								props.setAttributes( { imageTypeSize: value } );
								getLatestPosts( { imageTypeSize: value } );
							} }
						/>
					</Fragment>
				</PanelBody>
			) }
			{ showExcerpt && (
				<PanelBody
					initialOpen={ false }
					title={ __( 'Post Excerpt', 'post-type-archive-mapping' ) }
				>
					<TextControl
						label={ __(
							'Maximum Word Length of Excerpt',
							'post-type-archive-mapping'
						) }
						type="number"
						value={ excerptLength }
						onChange={ ( value ) => trimWords( value ) }
					/>
					<PanelColorSettings
						title={ __( 'Excerpt Colors', 'post-type-archive-mapping' ) }
						initialOpen={ true }
						colorSettings={ [
							{
								value: excerptTextColor,
								onChange: ( value ) => {
									setAttributes( { excerptTextColor: value } );
								},
								label: __( 'Text Color', 'post-type-archive-mapping' ),
							},
						] }
					></PanelColorSettings>
					<SelectControl
						label={ __( 'Excerpt Typography', 'post-type-archive-mapping' ) }
						options={ fontOptions }
						value={ excerptFont }
						onChange={ ( value ) => {
							props.setAttributes( { excerptFont: value } );
						} }
					/>
					<RangeControl
						label={ __( 'Excerpt Font Size', 'post-type-archive-mapping' ) }
						value={ excerptFontSize }
						onChange={ ( value ) =>
							props.setAttributes( { excerptFontSize: value } )
						}
						min={ 10 }
						max={ 60 }
					/>
				</PanelBody>
			) }
			{ showReadMore && (
				<Fragment>
					<PanelBody
						initialOpen={ false }
						title={ __( 'Button', 'post-type-archive-mapping' ) }
					>
						<TextControl
							label={ __( 'Button Text', 'post-type-archive-mapping' ) }
							type="text"
							value={ readMoreButtonText }
							onChange={ ( value ) =>
								props.setAttributes( { readMoreButtonText: value } )
							}
						/>
						<SelectControl
							label={ __( 'Button Typography', 'post-type-archive-mapping' ) }
							options={ fontOptions }
							value={ readMoreButtonFont }
							onChange={ ( value ) => {
								props.setAttributes( { readMoreButtonFont: value } );
							} }
						/>
						<PanelColorSettings
							title={ __( 'Button Colors', 'post-type-archive-mapping' ) }
							initialOpen={ true }
							colorSettings={ [
								{
									value: readMoreButtonTextColor,
									onChange: ( value ) => {
										setAttributes( { readMoreButtonTextColor: value } );
									},
									label: __( 'Text Color', 'post-type-archive-mapping' ),
								},
								{
									value: readMoreButtonTextHoverColor,
									onChange: ( value ) => {
										setAttributes( { readMoreButtonTextHoverColor: value } );
									},
									label: __( 'Text Color on Hover', 'post-type-archive-mapping' ),
								},
								{
									value: readMoreButtonBackgroundColor,
									onChange: ( value ) => {
										setAttributes( { readMoreButtonBackgroundColor: value } );
									},
									label: __( 'Background Color', 'post-type-archive-mapping' ),
								},
								{
									value: readMoreButtonBackgroundHoverColor,
									onChange: ( value ) => {
										setAttributes( {
											readMoreButtonBackgroundHoverColor: value,
										} );
									},
									label: __(
										'Background Color on Hover',
										'post-type-archive-mapping'
									),
								},
								{
									value: readMoreButtonBorderColor,
									onChange: ( value ) => {
										setAttributes( { readMoreButtonBorderColor: value } );
									},
									label: __( 'Border Color', 'post-type-archive-mapping' ),
								},
							] }
						></PanelColorSettings>
						<RangeControl
							label={ __( 'Border Width', 'post-type-archive-mapping' ) }
							value={ readMoreButtonBorder }
							onChange={ ( value ) =>
								setAttributes( { readMoreButtonBorder: value } )
							}
							min={ 0 }
							max={ 50 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Border Radius', 'post-type-archive-mapping' ) }
							value={ readMoreButtonBorderRadius }
							onChange={ ( value ) =>
								setAttributes( { readMoreButtonBorderRadius: value } )
							}
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
					</PanelBody>
				</Fragment>
			) }
		</InspectorControls>
	);

	if ( loading ) {
		return (
			<Fragment>
				{ inspectorControls }
				<Placeholder>
					<div className="ptam-term-grid-loading">
						<h1>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 315.23 341.25"
								width="42"
								height="42"
							>
								<polygon
									points="315.23 204.75 315.23 68.25 197.02 0 197.02 136.5 315.23 204.75"
									style={ { fill: '#ffdd01', opacity: 0.8 } }
								/>
								<polygon
									points="0 204.75 0 68.25 118.21 0 118.21 136.5 0 204.75"
									style={ { fill: '#2e3192', opacity: 0.8 } }
								/>
								<polygon
									points="157.62 159.25 275.83 91 157.62 22.75 39.4 91 157.62 159.25"
									style={ { fill: '#86cedc', opacity: 0.8 } }
								/>
								<polygon
									points="157.62 341.25 275.83 273 157.62 204.75 39.4 273 157.62 341.25"
									style={ { fill: '#f07f3b', opacity: 0.8 } }
								/>
								<polygon
									points="177.32 170.62 295.53 102.37 295.53 238.87 177.32 307.12 177.32 170.62"
									style={ { fill: '#c10a26', opacity: 0.8 } }
								/>
								<polygon
									points="137.91 170.62 19.7 102.37 19.7 238.87 137.91 307.12 137.91 170.62"
									style={ { fill: '#662583', opacity: 0.8 } }
								/>
							</svg>{ ' ' }
							{ __( 'Featured Posts by Category', 'post-type-archive-mapping' ) }
						</h1>
						<h2>
							<Loading cssClass="ptam-term-grid-loading-animation" />
						</h2>
					</div>
				</Placeholder>
			</Fragment>
		);
	}
	if ( ! term ) {
		if ( 0 === termList.length) {
			return (
				<Fragment>
					{ inspectorControls }
					<h2 style={ { textAlign: 'center' } }>
						{ __( 'Please select a different taxonomy. No terms were found.', 'post-type-archive-mapping' ) }
					</h2>
				</Fragment>
			);
		}
		return (
			<Fragment>
				{ inspectorControls }
				<h2 style={ { textAlign: 'center' } }>
					{ __( 'Please select a term to begin.', 'post-type-archive-mapping' ) }
				</h2>
			</Fragment>
		);
	}
	if ( ! loading ) {
		const wrapperClass = classnames( {
			'ptam-fp-wrapper': true,
			[ `ptam-fp-wrapper-${ uniqueId }` ]: true,
		} );

		const builder = new CSSBuilder( `ptam-fp-wrapper-${ uniqueId }` );
		builder.addCSS(
			'.ptam-featured-post-item .entry-title a',
			`
			font-family: ${ titleFont };
			font-size: ${ valueWithUnit( titleFontSize ) };
			color: ${ hexToRgba( titleColor, 1 ) };
			`
		);
		builder.addCSS(
			'.ptam-featured-post-content',
			`
			font-family: ${ excerptFont };
			font-size: ${ valueWithUnit( excerptFontSize ) };
			color: ${ hexToRgba( excerptTextColor, 1 ) };
			`
		);
		builder.addCSS(
			'.ptam-featured-post-button a',
			`
			color: ${ hexToRgba( readMoreButtonTextColor ) };
			background-color: ${ hexToRgba( readMoreButtonBackgroundColor ) };
			border-width: ${ valueWithUnit( readMoreButtonBorder ) };
			border-color: ${ hexToRgba( readMoreButtonBorderColor, 1 ) };
			border-radius: ${ valueWithUnit( readMoreButtonBorderRadius ) };
			font-family: ${ readMoreButtonFont };
			border-style: solid;
			`
		);
		builder.addCSS(
			'.entry-title a:hover',
			`
			color: ${ hexToRgba( titleColorHover )} !important;
			`
		);
		builder.addCSS(
			'.ptam-featured-post-button a:hover',
			`
			color: ${ hexToRgba( readMoreButtonTextHoverColor, 1 ) } !important;
			background-color: ${ hexToRgba( readMoreButtonBackgroundHoverColor, 1 ) } !important;
			`
		);
		builder.addCSS(
			'.ptam-fp-term',
			`
			border-bottom: 2px solid ${ hexToRgba( termBackgroundColor, 1 ) };
			margin-bottom: 20px;
			`
		);
		builder.addCSS(
			'.ptam-fp-term span',
			`
			padding-top: ${ valueWithUnit( termDisplayPaddingTop ) };
			padding-bottom: ${ valueWithUnit( termDisplayPaddingBottom ) };
			padding-left: ${ valueWithUnit( termDisplayPaddingLeft ) };
			padding-right: ${ valueWithUnit( termDisplayPaddingRight ) };
			background-color: ${ hexToRgba( termBackgroundColor, 1 ) };
			color: ${ hexToRgba( termTextColor, 1 ) };
			font-family: ${ termFont };
			font-size: ${ valueWithUnit( termFontSize ) };
			`
		);

		return (
			<Fragment>
				{ inspectorControls }
				{ ! disableStyles &&
					builder.printCSS()
				}
				<div className={wrapperClass}>
					<h4 className="ptam-fp-term">
						<span>{ selectedTerm ? selectedTerm : __( 'All', 'post-type-archive-mapping' ) }</span>
					</h4>
					{ getPostHtml() }
				</div>
			</Fragment>
		);
	}
};

export default PTAM_Featured_Posts;
