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
import PreviewIcon from './preview-icon';
import HierarchicalItems from '../../components/hierarchical-items';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { Component, Fragment } = wp.element;

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
} = wp.components;

const {
	__experimentalGradientPickerControl,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
	BlockControls,
} = wp.blockEditor;

const PTAMHierarchy = ( props ) => {

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
	const { attributes, setAttributes } = props;

	const { uniqueId, view, postType, hierarchy, parentItem } = attributes;

	// Hierarchical Post Types.
	const postTypeOptions = [];
	for ( const postTypeKey in ptam_globals.post_types_hierarchical ) {
		postTypeOptions.push( { value: postTypeKey, label: ptam_globals.post_types_hierarchical[ postTypeKey ] } );
	}

	const hierarchyOptions = [
		{
			value: 'parents',
			label: __( 'Only Parents', 'Parent posts in a hierarchy', 'post-type-archive-mapping' ),

		},
		{
			value: 'children',
			label: __( 'Only Children', 'Children posts in a hierarchy', 'post-type-archive-mapping' ),

		},
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
						setAttributes({
							postType: value,
						});
					} }
				/>
				<SelectControl
					label={ __( 'Hierarchy', 'post-type-archive-mapping' ) }
					options={ hierarchyOptions }
					value={ hierarchy }
					onChange={ ( value ) => {
						setAttributes({
							hierarchy: value,
						});
					} }
				/>
				{ 'children' === hierarchy &&
					<HierarchicalItems
						label={ __( "Select a Parent Item", 'post-type-archive-mapping' ) }
						postType={ postType }
						selectedItem={parentItem}
						onChange={(parent) => {
							setAttributes( {
								parentItem: parent,
							});
						}}
					/>
				}
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
