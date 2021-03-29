/**
 * External dependencies
 */
import classnames from "classnames";
import axios from "axios";
import { SearchListControl } from "@woocommerce/components/build/search-list-control";
import Loading from "../../components/Loading";
import hexToRgba from "hex-to-rgba";
var HtmlToReactParser = require("html-to-react").Parser;

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

const PTAMHierarchy = ( props ) => {
	return(
		<>
		<h2>Hi</h2>
		</>
	)
};
export default PTAMHierarchy;

