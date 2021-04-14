/**
 * Alignment Group (Left|Center|Right) with a label and button icons.
 *
 * Pass onClick prop to propagate up to parent. Values are (left|center|right).
 */

const { __, _x } = wp.i18n;

const { Button, ButtonGroup } = wp.components;

const AlignmentGroup = ( props ) => {
	const {
		alignment = 'left',
		label = __( 'Change Alignment', 'post-type-archive-mapping' ),
		alignLeftLabel = _x(
			'Align Left',
			'Align items left',
			'post-type-archive-mapping'
		),
		alignCenterLabel = _x(
			'Align Center',
			'Align items center/middle',
			'post-type-archive-mapping'
		),
		alignRightLabel = _x(
			'Align Right',
			'Align items right',
			'post-type-archive-mapping'
		),
	} = props;

	return (
		<div className="ptam-alignment-component-base">
			<span className="ptam-alignment-component-label">{ label }</span>
			<ButtonGroup>
				<Button
					isPressed={ 'left' === alignment ? true : false }
					isSecondary
					icon="editor-alignleft"
					label={ alignLeftLabel }
					onClick={ () => {
						props.onClick( 'left' );
					} }
				/>
				<Button
					isPressed={ 'center' === alignment ? true : false }
					isSecondary
					icon="editor-aligncenter"
					label={ alignCenterLabel }
					onClick={ () => {
						props.onClick( 'center' );
					} }
				/>
				<Button
					isPressed={ 'right' === alignment ? true : false }
					isSecondary
					icon="editor-alignright"
					label={ alignRightLabel }
					onClick={ () => {
						props.onClick( 'right' );
					} }
				/>
			</ButtonGroup>
		</div>
	);
};

export default AlignmentGroup;
