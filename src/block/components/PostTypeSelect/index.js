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

const PostTypes = ( props ) => {
	const [postType, setPostType] = useState( props.selectedPostType );
	const [postTypes, setPostTypes] = useState( ptam_globals.postTypes );

	return(
		<SearchListControl
			label={__('Post Type Select', 'post-type-archive-mapping')}
			onChange={(value) => {
				setPostType( value );
			}}
		/>
	)
}
