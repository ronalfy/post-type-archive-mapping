/**
 * Output hierarchical items in a combobox.
 *
 * @param {Object} props The post type to retrieve hierarchical items for.
 *
 * @return {JSX} Comboxbox for the hierarchical items.
 */
const HierarchicalItems = ( props ) => {
	const { postType } = props;
	return (
		<>
			{postType}
		</>
	);
};

export default HierarchicalItems;
