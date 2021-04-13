/**
 * Responsive Tabs (forked from @GenerateBlocks).
 */

const { __ } = wp.i18n;

const { Tooltip, Button } = wp.components;

const ResponsiveTabs = ( props ) => {
	const { onClick, selectedDevice } = props;

	return (
		<>
			<div className="ptam-responsive-tabs">
				<Tooltip
					text={ __( 'Show options for all devices', 'post-type-archive-mapping' ) }
				>
					<Button
						isPressed={ 'Desktop' === selectedDevice ? true : false }
						onClick={ () => {
							onClick( 'Desktop' );
						} }
					>
						{ __( 'Desktop', 'post-type-archive-mapping' ) }
					</Button>
				</Tooltip>

				<Tooltip
					text={ __(
						'Show options for tablet devices',
						'post-type-archive-mapping'
					) }
				>
					<Button
						isPressed={ 'Tablet' === selectedDevice ? true : false }
						onClick={ () => {
							onClick( 'Tablet' );
						} }
					>
						{ __( 'Tablet', 'post-type-archive-mapping' ) }
					</Button>
				</Tooltip>

				<Tooltip
					text={ __(
						'Show options for mobile devices',
						'post-type-archive-mapping'
					) }
				>
					<Button
						isPressed={ 'Mobile' === selectedDevice ? true : false }
						onClick={ () => {
							onClick( 'Mobile' );
						} }
					>
						{ __( 'Mobile', 'post-type-archive-mapping' ) }
					</Button>
				</Tooltip>
			</div>
		</>
	);
};

export default ResponsiveTabs;
