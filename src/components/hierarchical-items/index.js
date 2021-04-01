import axios from 'axios';

const {
	ComboboxControl,
} = wp.components;

const { Fragment, useState, useEffect } = wp.element;

/**
 * Output hierarchical items in a combobox.
 *
 * @param {Object} props The post type to retrieve hierarchical items for.
 *
 * @return {JSX} Comboxbox for the hierarchical items.
 */
const HierarchicalItems = ( props ) => {

	const [ loading, setLoading ] = useState(true);
	const [ items, setItems ] = useState([]);
	const [ filteredItems, setFilteredItems ] = useState([]);

	useEffect(() => {
		setLoading( true );
		retrieveItems( {} );
	}, [] );

	const retrieveItems = async () => {
		const itemList = [];
		const endpoint = ptam_globals.rest_url + `ptam/v2/get_hierarchical_items`;
		const { postType } = props;
		try {
			const result = await axios.post(
				endpoint,
				{
					post_type: postType,
				}
			);
			if ( Object.keys( result.data ).length > 0 ) {
				jQuery.each( result.data, function( key, value ) {
					itemList.push( { value: value.id, label: value.title } );
				} );
				setItems(itemList);
				setLoading( false );
			}

		} catch ( e ) {
			// Error :(
		}

	};

	const {label, selectedItem} = props;

	if ( loading ) {
		return <></>;
	}
	return (
		<>
			<ComboboxControl
				label={ label }
				value={ selectedItem }
				options={items}
				onInputChange={(inputValue) =>
					setFilteredItems(
						items.filter(option =>
							option.label.toLowerCase().startsWith(inputValue.toLowerCase())
						)
					)
				}
				onChange={(value) => {
					props.onChange(value);
				}}
			/>
		</>
	);
};

export default HierarchicalItems;
