import classnames from "classnames";
import axios from "axios";
import { SearchListControl } from "@woocommerce/components/build/search-list-control";

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
} = wp.components;

const {
	__experimentalGradientPickerControl,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
} = wp.blockEditor;

const QueryControl = ( props ) => {


	const onPostTypeSelect = ( postType ) => {

	};
	return(
		<Fragment>
			<PostTypeSelect
				onChange={onPostTypeSelect}
				{...props}
			/>
		</Fragment>
	)
};
