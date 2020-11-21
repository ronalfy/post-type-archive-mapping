/**
 * External dependencies
 */
import dayjs from "dayjs";
import classnames from "classnames";
import axios from "axios";
var HtmlToReactParser = require("html-to-react").Parser;
import TermSelect from '../components/TermSelect';

const { Component, Fragment, useState, useEffect} = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	TextareaControl,
	ToggleControl,
	Toolbar,
	Button,
} = wp.components;

const {
	MediaUpload,
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
	PanelColorSettings,
} = wp.blockEditor;

const MAX_POSTS_COLUMNS = 6;

const AdvancedCustomPosts = (props) => {
	const [showQueryEditor, setShowQueryEditor] = useState(true);
	const [ postTypeData, setPostTypeData ] = useState([]);
	const [ taxonomyData, setTaxonomyData ] = useState([]);

	const ptamGlobalPostTypeData = ptam_globals.post_type_meta;

	useEffect(()=> {

		let postTypes = [];
		let taxes = [];

		// Set post type data and taxonomies.
		for (const key in ptamGlobalPostTypeData) {
			if (ptamGlobalPostTypeData.hasOwnProperty(key)) {
				postTypes.push( { value: ptamGlobalPostTypeData[ key ].post_type.name, label: ptamGlobalPostTypeData[ key ].post_type.label } );
				for( const tax in ptamGlobalPostTypeData[ key ].taxonomies ) {
					taxes.push( {
						value: ptamGlobalPostTypeData[ key ].taxonomies[tax].name,
						label: ptamGlobalPostTypeData[ key ].taxonomies[tax].label,
					});
				}
			}
		}
		setPostTypeData(postTypes);
		setTaxonomyData(taxes);
	},[]);

	const { attributes, setAttributes } = props;

	const { align, postType, taxonomies, wpmlLanguage } = attributes;
	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={__("Query", "post-type-archive-mapping")}
				initialOpen={false}
			>
				<Button label={__("Edit Query", "post-type-archive-mapping")} />
			</PanelBody>
		</InspectorControls>
	);
	const layoutControls = [
		{
			icon: "database",
			title: __("Edit Query", "post-type-archive-mapping"),
			onClick: () => {
				setShowQueryEditor(true);
			},
			label: __('Edit Query', 'post-type-archive-mapping'),
		},
		{
			icon: "grid-view",
			title: __("Grid View", "post-type-archive-mapping"),
			label: __('Edit Query', 'post-type-archive-mapping'),
		},
		{
			icon: "list-view",
			title: __("List View", "post-type-archive-mapping"),
			label: __('Edit Query', 'post-type-archive-mapping'),
		},
		{
			icon: "admin-page",
			title: __("Full Content View", "post-type-archive-mapping"),
			label: __('Edit Query', 'post-type-archive-mapping'),
		},
	];

	const termControls = [
		{
			value: 'all',
			label: __('All Terms', 'post-type-archive-mapping'),
		},
		{
			value: 'all_exclude',
			label: __('All Terms Except...', 'post-type-archive-mapping'),
		},
		{
			value: "none_include",
			label: __('No Terms Except...', 'post-type-archive-mapping'),
		},
	];

	const QueryEditor = (
		<div id="ptam-query-editor-wrapper">Edit Query</div>
	);

	const PostList = () => {
		<div id="ptam-advanced-custom-posts-wrapper">See Posts</div>
	};

	const onTermSelect = ( terms, postType, taxonomy ) => {

	}

	const getTaxonomies = (
		taxonomyData.map((taxData, index) => (
			<Fragment key={index}>
				<TermSelect
					initialTerms={[]}
					heading={taxData.label}
					key={index}
					parent={props}
					onTermSelect={onTermSelect}
				/>
			</Fragment>
		 ) )
	);

	return (
		<Fragment>
			{inspectorControls}
			<BlockControls>
				<BlockAlignmentToolbar value={align} controls={["wide", "full"]} />
				<Toolbar controls={layoutControls}  />
			</BlockControls>
			<Fragment>
				{showQueryEditor &&
					<div id="ptam-query-editor-wrapper">
						<SelectControl
							label={__('Post Type', 'post-type-archive-mapping')}
							value='post'
							options={postTypeData}
							onChange={(value) => {
								setAttributes({fontWeight: value});
							}}
						/>
						{getTaxonomies}
					</div>
				}
			</Fragment>
		</Fragment>
	);
};

export default AdvancedCustomPosts;
