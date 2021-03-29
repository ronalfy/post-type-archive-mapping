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
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { Component, Fragment } = wp.element;

const { __, _n } = wp.i18n;

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
	const { attributes, setAttributes } = props;

	const { uniqueId, view } = attributes;

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

	const selectedView = () => {
		switch( view ) {
			case 'grid':
				return(
					<GridIcon />
				);
			case 'full':
				return(
					<FullIcon />
				);
			case 'list':
			default:
				return(
					<ListIcon />
				);
		}
	}

	const toolbar = (
		<BlockControls>
			<ToolbarGroup
				isCollapsed={ true }
				icon={<PreviewIcon />}
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
			{toolbar}
			<h2>{ view }</h2>
		</>
	);
};
export default PTAMHierarchy;
