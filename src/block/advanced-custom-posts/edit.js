/**
 * External dependencies
 */
import dayjs from "dayjs";
import classnames from "classnames";
import axios from "axios";
var HtmlToReactParser = require("html-to-react").Parser;

const { Component, Fragment, useState } = wp.element;

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
	const [showQueryEditor, setShowQueryEditor] = useState(false);

	const { attributes, setAttributes } = props;

	const { align, postType } = attributes;
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

	const QueryEditor = (
		<div id="ptam-query-editor-wrapper">Edit Query</div>
	);

	const PostList = () => {
		<div id="ptam-advanced-custom-posts-wrapper">See Posts</div>
	};

	const ptamGlobalPostTypeData = ptam_globals.post_type_meta;

	console.log( ptamGlobalPostTypeData );

	const postTypes = ptamGlobalPostTypeData[ postType ];

	console.log( postTypes );

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
							value={postType}
							options={ptamGlobalPostTypeData}
							onChange={(value) => {
								setAttributes({fontWeight: value});
							}}
						/>
						Edit Query
					</div>
				}
			</Fragment>
		</Fragment>
	);
};

export default AdvancedCustomPosts;
