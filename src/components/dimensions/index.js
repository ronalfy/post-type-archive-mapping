/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */

/**
 * External dependencies
 */
import './editor.scss';
import UnitPicker from '../unit-picker';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment } = wp.element;
const { Button, Tooltip } = wp.components;

const DimensionsControl = ( props ) => {
	const {
		attributes,
		setAttributes,
		label = __( 'Padding', 'post-type-archive-mapping' ),
		allowNegatives,
		attrTop,
		attrRight,
		attrBottom,
		attrLeft,
		attrSyncUnits,
		attrUnit,
		labelTop = __( 'Top', 'post-type-archive-mapping' ),
		labelRight = __( 'Right', 'post-type-archive-mapping' ),
		labelBottom = __( 'Bottom', 'post-type-archive-mapping' ),
		labelLeft = __( 'Left', 'post-type-archive-mapping' ),
		units,
	} = props;

	/**
	 * Change the top value in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeTopValue = ( value ) => {
		setAttributes( {
			// eslint-disable-next-line dot-notation
			[ props[ 'attrTop' ] ]: value,
		} );
	};

	/**
	 * Change the right value in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeRightValue = ( value ) => {
		setAttributes( {
			// eslint-disable-next-line dot-notation
			[ props[ 'attrRight' ] ]: value,
		} );
	};

	/**
	 * Change the bottom value in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeBottomValue = ( value ) => {
		setAttributes( {
			// eslint-disable-next-line dot-notation
			[ props[ 'attrBottom' ] ]: value,
		} );
	};

	/**
	 * Change the left value in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeLeftValue = ( value ) => {
		setAttributes( {
			// eslint-disable-next-line dot-notation
			[ props[ 'attrLeft' ] ]: value,
		} );
	};

	/**
	 * Change the all values in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeAllValues = ( value ) => {
		setAttributes( {
			// eslint-disable-next-line dot-notation
			[ props[ 'attrTop' ] ]: value,
			// eslint-disable-next-line dot-notation
			[ props[ 'attrRight' ] ]: value,
			// eslint-disable-next-line dot-notation
			[ props[ 'attrBottom' ] ]: value,
			// eslint-disable-next-line dot-notation
			[ props[ 'attrLeft' ] ]: value,
		} );
	};

	/**
	 * Ensures a number is positive if allowNegatives is false.
	 *
	 * @param {number} number Number to sanitize.
	 * @return {number} Sanitized number.
	 */
	const sanitizeNumber = ( number ) => {
		// Ensure number isn't empty.
		if ( '' === number ) {
			number = 0;
		}

		// If negatives are allowed, return number.
		if ( allowNegatives ) {
			return number;
		}

		// Return absolute value of number.
		return Math.abs( number );
	};

	/**
	 * Event for when the top value has been changed.
	 *
	 * @param {Object} event Change event object.
	 */
	const onChangeTopValue = ( event ) => {
		const newValue = sanitizeNumber( event.target.value );

		if ( attributes[ attrSyncUnits ] ) {
			changeAllValues( newValue );
		} else {
			changeTopValue( newValue );
		}
	};

	/**
	 * Event for when the Right value has been changed.
	 *
	 * @param {Object} event Change event object.
	 */
	const onChangeRightValue = ( event ) => {
		const newValue = sanitizeNumber( event.target.value );

		if ( attributes[ attrSyncUnits ] ) {
			changeAllValues( newValue );
		} else {
			changeRightValue( newValue );
		}
	};

	/**
	 * Event for when the bottom value has been changed.
	 *
	 * @param {Object} event Change event object.
	 */
	const onChangeBottomValue = ( event ) => {
		const newValue = sanitizeNumber( event.target.value );

		if ( attributes[ attrSyncUnits ] ) {
			changeAllValues( newValue );
		} else {
			changeBottomValue( newValue );
		}
	};

	/**
	 * Event for when the Left value has been changed.
	 *
	 * @param {Object} event Change event object.
	 */
	const onChangeLeftValue = ( event ) => {
		const newValue = sanitizeNumber( event.target.value );

		if ( attributes[ attrSyncUnits ] ) {
			changeAllValues( newValue );
		} else {
			changeLeftValue( newValue );
		}
	};

	/**
	 * When the sync value is selected, sync all values to the maximum number.
	 */
	const syncUnits = () => {
		const numbers = [
			attributes[ attrTop ],
			attributes[ attrRight ],
			attributes[ attrBottom ],
			attributes[ attrLeft ],
		];
		const syncValue = Math.max.apply( null, numbers );
		setAttributes( {
			// eslint-disable-next-line dot-notation
			[ props[ 'attrSyncUnits' ] ]: ! attributes[ attrSyncUnits ],
		} );
		changeAllValues( syncValue.toString() );
	};

	/**
	 * Change the units.
	 *
	 * @param {string} value Unit changing (px, em, rem, vh).
	 */
	const onChangeUnits = ( value ) => {
		setAttributes( { [ props[ 'attrUnit' ] ]: value } ); // eslint-disable-line dot-notation
	};

	const syncIcon = (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fad"
			data-icon="sync"
			className="svg-inline--fa fa-sync fa-w-16"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
		>
			<g className="fa-group">
				<path
					className="fa-secondary"
					fill="currentColor"
					d="M0 500V299.67a12 12 0 0 1 12-12h200.33a12 12 0 0 1 12 12v47.41a12 12 0 0 1-12.57 12l-101.87-4.88a176.07 176.07 0 0 0 317.25-56.94 12 12 0 0 1 11.67-9.26h49.09a12 12 0 0 1 11.8 14.18C478.07 417.08 377.19 504 256 504a247.43 247.43 0 0 1-188.76-87.17l4.13 82.57a12 12 0 0 1-12 12.6H12a12 12 0 0 1-12-12z"
					opacity="0.4"
				></path>
				<path
					className="fa-primary"
					fill="currentColor"
					d="M12.3 209.82C33.93 94.92 134.81 8 256 8a247.4 247.4 0 0 1 188.9 87.34l-4-82.77A12 12 0 0 1 452.92 0h47.41a12 12 0 0 1 12 12v200.33a12 12 0 0 1-12 12H300a12 12 0 0 1-12-12v-47.41a12 12 0 0 1 12.57-12l101.53 4.88a176.07 176.07 0 0 0-317.24 56.94A12 12 0 0 1 73.19 224H24.1a12 12 0 0 1-11.8-14.18z"
				></path>
			</g>
		</svg>
	);

	return (
		<Fragment>
			<div className="components-base-control components-ptam-dimensions-control">
				<UnitPicker
					label={ label }
					value={
						'undefined' !== typeof attributes[ attrUnit ]
							? attributes[ attrUnit ]
							: 'px'
					}
					units={ units }
					onClick={ ( value ) => {
						if ( 'undefined' !== typeof attributes[ attrUnit ] ) {
							onChangeUnits( value );
						} else {
							return false;
						}
					} }
				/>

				<div className="components-ptam-dimensions-control__inputs">
					<input
						className="components-ptam-dimensions-control__number"
						placeholder="0"
						type="number"
						onChange={ onChangeTopValue }
						aria-label={ sprintf(
							/* translators: Dimension label (padding, margin, border) */
							__( '%s Top', 'post-type-archive-mapping' ),
							label
						) }
						value={ attributes[ attrTop ] ? attributes[ attrTop ] : '' }
						min={ allowNegatives ? undefined : 0 }
						onBlur={ () => {
							if ( '' === attributes[ attrTop ] ) {
								// If we have no value and a default exists, set to 0 to prevent default from coming back.
								if ( props.attributes[ props.attrSyncUnits ] ) {
									changeAllValues( '' );
								} else {
									changeTopValue( '' );
								}
							}
						} }
						onClick={ ( e ) => {
							// Make sure onBlur fires in Firefox.
							e.currentTarget.focus();
						} }
					/>
					<input
						className="components-ptam-dimensions-control__number"
						placeholder="0"
						type="number"
						onChange={ onChangeRightValue }
						aria-label={ sprintf(
							/* translators: Dimension label (padding, margin, border) */
							__( '%s Right', 'post-type-archive-mapping' ),
							label
						) }
						value={ attributes[ attrRight ] ? attributes[ attrRight ] : '' }
						min={ allowNegatives ? undefined : 0 }
						onBlur={ () => {
							if ( '' === attributes[ attrTop ] ) {
								// If we have no value and a default exists, set to 0 to prevent default from coming back.
								if ( props.attributes[ props.attrSyncUnits ] ) {
									changeAllValues( '' );
								} else {
									changeRightValue( '' );
								}
							}
						} }
						onClick={ ( e ) => {
							// Make sure onBlur fires in Firefox.
							e.currentTarget.focus();
						} }
					/>
					<input
						className="components-ptam-dimensions-control__number"
						placeholder="0"
						type="number"
						onChange={ onChangeBottomValue }
						aria-label={ sprintf(
							/* translators: Dimension label (padding, margin, border) */
							__( '%s Bottom', 'post-type-archive-mapping' ),
							label
						) }
						value={ attributes[ attrBottom ] ? attributes[ attrBottom ] : '' }
						min={ allowNegatives ? undefined : 0 }
						onBlur={ () => {
							if ( '' === attributes[ attrTop ] ) {
								// If we have no value and a default exists, set to 0 to prevent default from coming back.
								if ( props.attributes[ props.attrSyncUnits ] ) {
									changeAllValues( '' );
								} else {
									changeBottomValue( '' );
								}
							}
						} }
						onClick={ ( e ) => {
							// Make sure onBlur fires in Firefox.
							e.currentTarget.focus();
						} }
					/>
					<input
						className="components-ptam-dimensions-control__number"
						placeholder="0"
						type="number"
						onChange={ onChangeLeftValue }
						aria-label={ sprintf(
							/* translators: Dimension label (padding, margin, border) */
							__( '%s Left', 'post-type-archive-mapping' ),
							label
						) }
						value={ attributes[ attrLeft ] ? attributes[ attrLeft ] : '' }
						min={ allowNegatives ? undefined : 0 }
						onBlur={ () => {
							if ( '' === attributes[ attrTop ] ) {
								// If we have no value and a default exists, set to 0 to prevent default from coming back.
								if ( props.attributes[ props.attrSyncUnits ] ) {
									changeAllValues( '' );
								} else {
									changeLeftValue( '' );
								}
							}
						} }
						onClick={ ( e ) => {
							// Make sure onBlur fires in Firefox.
							e.currentTarget.focus();
						} }
					/>
					<Tooltip
						text={
							!! attributes[ attrSyncUnits ]
								? __( 'Unsync', 'post-type-archive-mapping' )
								: __( 'Sync', 'post-type-archive-mapping' )
						}
					>
						<Button
							className="components-ptam-dimensions-control_sync"
							aria-label={ __( 'Sync Units', 'generateblocks' ) }
							isPrimary={
								attributes[ attrSyncUnits ] ? attributes[ attrSyncUnits ] : false
							}
							aria-pressed={
								attributes[ attrSyncUnits ] ? attributes[ attrSyncUnits ] : false
							}
							// eslint-disable-next-line no-unused-vars
							onClick={ ( value ) => syncUnits() }
							isSmall
						>
							{ syncIcon }
						</Button>
					</Tooltip>
				</div>

				<div className="components-ptam-dimensions-control__input-labels">
					<span className="components-ptam-dimensions-control__number-label">
						{ labelTop }
					</span>
					<span className="components-ptam-dimensions-control__number-label">
						{ labelRight }
					</span>
					<span className="components-ptam-dimensions-control__number-label">
						{ labelBottom }
					</span>
					<span className="components-ptam-dimensions-control__number-label">
						{ labelLeft }
					</span>
					<span className="components-ptam-dimensions-control__number-label"></span>
				</div>
			</div>
		</Fragment>
	);
};

export default DimensionsControl;
