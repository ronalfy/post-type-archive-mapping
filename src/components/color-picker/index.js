/**
 * Color and Gradient Picker.
 *
 * Credit: Forked from @post-type-archive-mapping
 */

import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

// Import CSS
import './editor.scss';

const { useState, useEffect } = wp.element;

const { __ } = wp.i18n;

const {
	Tooltip,
	BaseControl,
	ColorPicker,
	RangeControl,
	Popover,
	Button,
} = wp.components;

const {
	ColorPalette,
} = wp.blockEditor;

const PTAMColorPicker = ( props ) => {

	const [ colorKey, setColorKey ] = useState( false );
	const [ isVisible, setIsVisible ] = useState( false );

	const {
		value,
		onChange,
		onOpacityChange,
		label,
		alpha = false,
		valueOpacity,
		isGradient = false,
	} = props;

	/**
	 * Toggle whether the color popup is showing.
	 */
	const toggleVisible = () => {
		setIsVisible( true );
	}

	/**
	 * Close color popup if visible.
	 */
	const toggleClose = () => {
		if ( isVisible ) {
			setIsVisible( false );
		}
	}

	return (
		<BaseControl
			className="ptam-component-color-picker-wrapper"
		>
			{ !! label &&
				<div className="ptam-color-component-label">
					<span>{ label }</span>
				</div>
			}

			<div className="ptam-color-picker-area">
				{ ! isVisible &&
					<div className={ classnames( 'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper', value ? '' : 'components-color-palette__custom-color' ) }>
						<Tooltip text={ __( 'Choose Color', 'post-type-archive-mapping' ) }>
							<button
								type="button"
								aria-expanded={ isVisible }
								className="components-color-palette__item components-circular-option-picker__option"
								onClick={ toggleVisible }
								aria-label={ __( 'Custom color picker', 'post-type-archive-mapping' ) }
								style={ { color: value ? hexToRgba( value, valueOpacity ) : 'transparent' } }
							>
								<span className="components-color-palette__custom-color-gradient" />
							</button>
						</Tooltip>
					</div>
				}

				{ isVisible &&
					<div className={ classnames( 'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper', value ? '' : 'components-color-palette__custom-color' ) }>
						<Tooltip text={ __( 'Choose Color', 'post-type-archive-mapping' ) }>
							<button
								type="button"
								aria-expanded={ isVisible }
								className="components-color-palette__item components-circular-option-picker__option"
								onClick={ toggleClose }
								aria-label={ __( 'Custom color picker', 'post-type-archive-mapping' ) }
								style={ { color: value ? hexToRgba( value, valueOpacity ) : 'transparent' } }
							>
								<span className="components-color-palette__custom-color-gradient" />
							</button>
						</Tooltip>
					</div>
				}

				{ isVisible &&
					<Popover position="top left" className="ptam-component-color-picker" onClose={ toggleClose }>
						<BaseControl key={ colorKey }>
							<ColorPicker
								key={ colorKey }
								color={ value ? value : '' }
								onChangeComplete={ ( color ) => {
									onChange( color.hex );
								} }
								disableAlpha
							/>
						</BaseControl>

						{ alpha &&
							<div className="ptam-component-color-opacity">
								<Tooltip text={ __( 'Opacity', 'post-type-archive-mapping' ) }>
									<h2>Opacity</h2>
								</Tooltip>

								<RangeControl
									value={ valueOpacity ? valueOpacity : 0 }
									onChange={ ( opacityValue ) => onOpacityChange( opacityValue ) }
									min={ 0 }
									max={ 1 }
									step={ 0.01 }
									initialPosition={ 1 }
								/>
							</div>
						}

						<Button
							isSmall
							isSecondary
							className="components-color-clear-color"
							onClick={ () => {
								onChange( '' );
								onOpacityChange( 1 );

								setColorKey( false );
							} }
						>
							{ __( 'Clear Color', 'post-type-archive-mapping' ) }
						</Button>

						<BaseControl
							className="ptam-component-color-picker-palette"
						>
							<ColorPalette
								value={ value }
								onChange={ ( color ) => {
									onChange( color );

									setColorKey( color );
								} }
								disableCustomColors={ true }
								clearable={ false }
							/>
						</BaseControl>
					</Popover>
				}
			</div>
		</BaseControl>
	);
};

export default PTAMColorPicker;
