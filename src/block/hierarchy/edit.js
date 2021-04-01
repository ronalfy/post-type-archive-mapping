/**
 * External dependencies
 */
import classnames from 'classnames';
import axios from 'axios';
import { SearchListControl } from '@woocommerce/components/build/search-list-control';
import Loading from '../../components/Loading';
import hexToRgba from 'hex-to-rgba';
import ListIcon from './list-icon';
import GridIcon from './grid-icon';
import FullIcon from './full-icon';
import HierarchicalItems from '../../components/hierarchical-items';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { Component, Fragment, useState, useEffect } = wp.element;

const { __, _n, _x } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
	ToolbarGroup,
	PanelRow,
} = wp.components;

const {
	__experimentalGradientPickerControl,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
	BlockControls,
} = wp.blockEditor;

const PTAMHierarchy = ( props ) => {

	// Shortcuts.
	const { attributes, setAttributes } = props;

	// Get attributes from props.
	const {
		uniqueId,
		view,
		postType,
		hierarchy,
		parentItem,
		order,
		orderBy,
		postsPerPage,
		wpmlLanguage,
	} = attributes;

	// Retrieve WPML languages.
	// eslint-disable-next-line no-undef
	const wpmlInstalled = ptam_globals.wpml_installed;
	// eslint-disable-next-line no-undef
	const wpmlLanguages = ptam_globals.wpml_languages;

	const [ loading, setLoading ] = useState( true );
	const [ itemNumberTimer, setItemNumberTimer ] = useState( 0 );
	const [ config, setConfig ] = useState( {
		headers: {
			// eslint-disable-next-line no-undef
			'X-WP-Nonce': ptam_globals.rest_nonce,
		},
	} );
	const [ posts, setPosts ] = useState( {} );

	useEffect(() => {
		// Get unique ID for the block. Props @generateblocks.
		const id = props.clientId.substr( 2, 9 ).replace( '-', '' );
		if ( ! attributes.uniqueId ) {
			setAttributes( {
				uniqueId: id,
			} );
		}
	}, [] );

	// Retrieve the latest posts.
	useEffect(() => {
		getPosts( {} );
	}, [ postType, hierarchy, parentItem, order, orderBy ] );

	/**
	 *
	 * @return {JSX} Current selected view.
	 */
	const selectedView = () => {
		switch ( view ) {
			case 'grid':
				return <GridIcon />;
			case 'full':
				return <FullIcon />;
			case 'list':
			default:
				return <ListIcon />;
		}
	};

	const itemNumberRender = ( value ) => {
		if ( itemNumberTimer ) {
			clearTimeout( itemNumberTimer );
		}
		setItemNumberTimer(
			setTimeout( () => {
				// Get new items.
			}, 1000 )
		);
	};

	/**
	 *
	 * @param {string} selectedLanguage The language selected.
	 * @return {JSX} Select box with languages.
	 */
	const getLanguages = ( selectedLanguage ) => {
		if ( wpmlInstalled ) {
			return(
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
		return (
			<>
			</>
		);
	};

	const getPosts = async( object = {} ) => {
		setLoading(true);
		try {
			const result = await axios.post(
				// eslint-disable-next-line no-undef
				ptam_globals.rest_url + `ptam/v2/get_hierarchical_posts`,
				{
					post_type: postType,
					order,
					orderby: orderBy,
					posts_per_page: postsPerPage,
					image_size: 'medium',
					language: wpmlLanguage,
					post_parent: parentItem,
				},
				config
			);
			setPosts( result.data );
			setLoading( false );
		} catch ( e ) {
			// Error :(
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

	const inspectorControls = (
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
				{getLanguages()}
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
			</PanelBody>
		</InspectorControls>
	);

	// Toolbar option group.
	const viewOptions = [
		[
			{
				icon: <ListIcon />,
				title: __( 'View as a List', 'post-type-archive-mapping' ),
				isActive: 'list' === view,
				onClick: () => setAttributes( { view: 'list' } ),
			},
		],
		[
			{
				icon: <GridIcon />,
				title: __( 'View as a Grid', 'post-type-archive-mapping' ),
				isActive: 'grid' === view,
				onClick: () => setAttributes( { view: 'grid' } ),
			},
		],
		[
			{
				icon: <FullIcon />,
				title: __( 'View as Full Content', 'post-type-archive-mapping' ),
				isActive: 'full' === view,
				onClick: () => setAttributes( { view: 'full' } ),
			},
		],
	];

	const toolbar = (
		<BlockControls>
			<ToolbarGroup
				isCollapsed={ true }
				icon={ selectedView() }
				label={ __(
					'Change the layout of the hierarchy.',
					'post-type-archive-mapping'
				) }
				controls={ viewOptions }
			/>
		</BlockControls>
	);
	return (
		<>
			{ inspectorControls }
			{ toolbar }
			<h2>{ view }</h2>
		</>
	);
};
export default PTAMHierarchy;
