import classnames from "classnames";
import axios from "axios";
import AsyncSelect from "react-select/async";

const { Component, Fragment, useState, useEffect} = wp.element;

const { __, _n } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const {
	PanelBody,
	PanelRow,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
} = wp.components;

const {} = wp.blockEditor;

const TermSelect = (props) => {
	const { setAttributes, attributes } = props.parent;
	const { initialTerms, heading, taxonomy, postType } = props;

	const { mode, setMode } = useState("all");

	const termControls = [
		{
			value: "all",
			label: __("All Terms", "post-type-archive-mapping"),
		},
		{
			value: "all_exclude",
			label: __("All Terms Except...", "post-type-archive-mapping"),
		},
		{
			value: "none_include",
			label: __("No Terms Except...", "post-type-archive-mapping"),
		},
	];

	return (
		<Fragment>
			<PanelBody title={heading} initialOpen={false}>
				<PanelRow>
					<SelectControl
						label={__("Select an Option", "post-type-archive-mapping")}
						value={mode}
						options={termControls}
						onChange={(value) => {
							setMode(value);
						}}
					/>
				</PanelRow>
			</PanelBody>
		</Fragment>
	);
};

export default TermSelect;
