/**
 * External dependencies
 */
import classnames from 'classnames';
import axios from 'axios';
import { SearchListControl } from '@woocommerce/components/build/search-list-control';
import Loading from '../../components/Loading';
import hexToRgba from 'hex-to-rgba';
import ListIcon from './icons/list-icon';
import GridIcon from './icons/grid-icon';
import FullIcon from './icons/full-icon';
import ColumnsIcon from './icons/columns-icon';
import HierarchicalItems from '../../components/hierarchical-items';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { Fragment, useState, useEffect } = wp.element;

const { __, _n, _x } = wp.i18n;

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
	// eslint-disable-next-line no-unused-vars
	const [ config, setConfig ] = useState( {
		headers: {
			// eslint-disable-next-line no-undef
			'X-WP-Nonce': ptam_globals.rest_nonce,
		},
	} );
	const [ numItems, setNumItems ] = useState( postsPerPage );
	const [ posts, setPosts ] = useState( {} );

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
	}, [ postType, hierarchy, parentItem, order, orderBy, numItems ] );

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
			case 'columns':
				return <ColumnsIcon />;
			case 'list':
			default:
				return <ListIcon />;
		}
	};

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
					image_size: 'medium',
					language: wpmlLanguage,
					post_parent: parentItem,
					hierarchy,
				},
				config
			);
			setPosts( result.data );
			setLoading( false );
		} catch ( e ) {
			// Error :(
		}
	};

	const getPostHtml = () => {
		if ( Object.keys( posts ).length === 0 ) {
			return (
				<h2>{ __( 'No items could be found.', 'post-type-archive-mapping' ) }</h2>
			);
		}
		return <ul>{ outputListHtml() }</ul>;
	};

	const outputListHtml = () => {
		return Object.keys( posts ).map( ( item, i ) => (
			<li key={ i } className="ptam-hierarchical-post-item">
				<a
					className="ptam-hierarchical-post-item-link"
					href={ posts[ i ].link }
					onClick={ ( e ) => {
						e.preventDefault();
					} }
				>
					{ posts[ i ].post_title }
				</a>
			</li>
		) );
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
				icon: <ColumnsIcon />,
				title: __( 'View as Columns', 'post-type-archive-mapping' ),
				isActive: 'columns' === view,
				onClick: () => setAttributes( { view: 'columns' } ),
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
				{ toolbar }
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
							{ __( 'Hierarchical Items', 'post-type-archive-mapping' ) }
						</h1>
						<h2>
							<Loading cssClass="ptam-term-grid-loading-animation" />
						</h2>
					</div>
				</Placeholder>
			</Fragment>
		);
	}
	return (
		<>
			{ inspectorControls }
			{ toolbar }
			<div className={ wrapperClass }>{ getPostHtml() }</div>
		</>
	);
};
export default PTAMHierarchy;
