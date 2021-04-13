import axios from 'axios';

const { ComboboxControl } = wp.components;

const { useState, useEffect } = wp.element;

/**
 * Output hierarchical items in a combobox.
 *
 * @param {Object} props The post type to retrieve hierarchical items for.
 *
 * @return {JSX} Combobox for the hierarchical items.
 */
const HierarchicalItems = ( props ) => {
	const { label, selectedItem, postType, loadingText } = props;

	const [ loading, setLoading ] = useState( true );
	const [ items, setItems ] = useState( [] );
	// eslint-disable-next-line no-unused-vars
	const [ filteredItems, setFilteredItems ] = useState( [] );

	useEffect( () => {
		setLoading( true );
	}, [] );

	useEffect( () => {
		retrieveItems( {} );
	}, [ postType ] );

	const retrieveItems = async() => {
		setLoading( true );
		const itemList = [];
		const config = {
			headers: {
				// eslint-disable-next-line no-undef
				'X-WP-Nonce': ptam_globals.rest_nonce,
			},
		};
		// eslint-disable-next-line no-undef
		const endpoint = ptam_globals.rest_url + `ptam/v2/get_hierarchical_items`;
		try {
			const result = await axios.post( endpoint, {
				post_type: postType,
			}, config );
			if ( Object.keys( result.data ).length > 0 ) {
				// eslint-disable-next-line no-undef
				jQuery.each( result.data, function( key, value ) {
					itemList.push( { value: value.id, label: value.title } );
				} );
				setItems( itemList );
				setLoading( false );
			}
		} catch ( e ) {
			// Error :(
		}
	};

	if ( loading ) {
		return (
			<>
				{ loadingText }
			</>
		);
	}
	return (
		<>
			<ComboboxControl
				label={ label }
				value={ selectedItem }
				options={ items }
				onInputChange={ ( inputValue ) =>
					setFilteredItems(
						items.filter( ( option ) =>
							option.label.toLowerCase().startsWith( inputValue.toLowerCase() )
						)
					)
				}
				// eslint-disable-next-line no-unused-vars
				onFilterValueChange={ ( inputValue ) => {} }
				onChange={ ( value ) => {
					props.onChange( value );
				} }
			/>
		</>
	);
};

export default HierarchicalItems;
