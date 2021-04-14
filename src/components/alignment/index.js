const { __ } = wp.i18n;

const { Button, ButtonGroup } = wp.components;

const AlignmentGroup = ( props ) => {
	const { alignment } = props;

	return (
		<ButtonGroup>
			<Button
				isPressed={ 'left' === alignment ? true : false }
				isSecondary
				icon="editor-alignleft"
				label={ __( 'Align Left', 'post-type-archive-mapping' ) }
				onClick={ () => {
					props.onClick( 'left' );
				} }
			/>
			<Button
				isPressed={ 'center' === alignment ? true : false }
				isSecondary
				icon="editor-aligncenter"
				label={ __( 'Align Center', 'post-type-archive-mapping' ) }
				onClick={ () => {
					props.onClick( 'center' );
				} }
			/>
			<Button
				isPressed={ 'right' === alignment ? true : false }
				isSecondary
				icon="editor-alignright"
				label={ __( 'Align Right', 'post-type-archive-mapping' ) }
				onClick={ () => {
					props.onClick( 'right' );
				} }
			/>
		</ButtonGroup>
	);
};

export default AlignmentGroup;
