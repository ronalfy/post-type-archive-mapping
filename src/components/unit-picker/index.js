/**
 * Unit Picker Component.
 * Credit: Forked from @GenerateBlocks
 */

// Import CSS
import './editor.scss';

const { __, sprintf, _x } = wp.i18n;
const { ButtonGroup, Button, Tooltip } = wp.components;

const UnitChooser = ( props ) => {
	const { label, value, onClick, units } = props;

	return (
		<div className="components-ptam-units-control-header__units">
			<div className="components-ptam-units-control-label__units">{ label }</div>

			<div className="components-ptam-control__units">
				<ButtonGroup
					className="components-ptam-control-buttons__units"
					aria-label={ __( 'Select Units', 'post-type-archive-mapping' ) }
				>
					{ units.map( ( unit ) => {
						let unitName = unit;

						if ( 'px' === unit ) {
							unitName = _x(
								'Pixel',
								'A size unit for CSS markup',
								'post-type-archive-mapping'
							);
						}

						if ( 'em' === unit ) {
							unitName = _x(
								'Em',
								'A size unit for CSS markup',
								'post-type-archive-mapping'
							);
						}

						if ( '%' === unit ) {
							unitName = _x(
								'Percentage',
								'A size unit for CSS markup',
								'post-type-archive-mapping'
							);
						}

						if ( 'rem' === unit ) {
							unitName = _x(
								'Rem',
								'A size unit for CSS markup',
								'post-type-archive-mapping'
							);
						}

						if ( 'deg' === unit ) {
							unitName = _x(
								'Degree',
								'A size unit for CSS markup',
								'post-type-archive-mapping'
							);
						}

						return (
							<Tooltip
								text={ sprintf(
									/* translators: Unit type (px, em, %) */
									__( '%s Units', 'post-type-archive-mapping' ),
									unitName
								) }
								key={ unit }
							>
								<Button
									key={ unit }
									className={ 'components-ptam-control-button__units--' + unit }
									isSmall
									isPrimary={ value === unit }
									aria-pressed={ value === unit }
									aria-label={ sprintf(
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										__( '%s Units', 'post-type-archive-mapping' ),
										unitName
									) }
									onClick={ () => onClick( unit ) }
								>
									{ unit }
								</Button>
							</Tooltip>
						);
					} ) }
				</ButtonGroup>
			</div>
		</div>
	);
};

export default UnitChooser;
