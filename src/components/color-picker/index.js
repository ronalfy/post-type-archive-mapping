/**
 * Color Picker.
 *
 * Credit: Forked from @post-type-archive-mapping
 */

import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

const { useState } = wp.element;

const { __ } = wp.i18n;

const {
	Tooltip,
	BaseControl,
	ColorPicker,
	RangeControl,
	Popover,
	Button,
} = wp.components;

const { ColorPalette } = wp.blockEditor;

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
	} = props;

	const opacityIcon = (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fad"
			data-icon="tint"
			className="svg-inline--fa fa-tint fa-w-11"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 352 512"
		>
			<g className="fa-group">
				<path
					className="fa-secondary"
					fill="currentColor"
					d="M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448A112.14 112.14 0 0 1 64 336a16 16 0 0 1 32 0 80.09 80.09 0 0 0 80 80 16 16 0 0 1 0 32z"
					opacity="0.4"
				></path>
				<path
					className="fa-primary"
					fill="currentColor"
					d="M176 448A112.14 112.14 0 0 1 64 336a16 16 0 0 1 32 0 80.09 80.09 0 0 0 80 80 16 16 0 0 1 0 32z"
				></path>
			</g>
		</svg>
	);

	/**
	 * Toggle whether the color popup is showing.
	 */
	const toggleVisible = () => {
		setIsVisible( true );
	};

	/**
	 * Close color popup if visible.
	 */
	const toggleClose = () => {
		if ( isVisible ) {
			setIsVisible( false );
		}
	};

	return (
		<BaseControl className="ptam-component-color-picker-wrapper">
			{ !! label && (
				<div className="ptam-color-component-label">
					<span>{ label }</span>
				</div>
			) }

			<div className="ptam-color-picker-area">
				{ ! isVisible && (
					<div
						className={ classnames(
							'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper',
							value ? '' : 'components-color-palette__custom-color'
						) }
					>
						<Tooltip text={ __( 'Choose Color', 'post-type-archive-mapping' ) }>
							<button
								type="button"
								aria-expanded={ isVisible }
								className="components-color-palette__item components-circular-option-picker__option"
								onClick={ toggleVisible }
								aria-label={ __(
									'Custom color picker',
									'post-type-archive-mapping'
								) }
								style={ {
									color: value ? hexToRgba( value, valueOpacity ) : 'transparent',
								} }
							>
								<span className="components-color-palette__custom-color-gradient" />
							</button>
						</Tooltip>
					</div>
				) }

				{ isVisible && (
					<div
						className={ classnames(
							'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper',
							value ? '' : 'components-color-palette__custom-color'
						) }
					>
						<Tooltip text={ __( 'Choose Color', 'post-type-archive-mapping' ) }>
							<button
								type="button"
								aria-expanded={ isVisible }
								className="components-color-palette__item components-circular-option-picker__option"
								onClick={ toggleClose }
								aria-label={ __(
									'Custom color picker',
									'post-type-archive-mapping'
								) }
								style={ {
									color: value ? hexToRgba( value, valueOpacity ) : 'transparent',
								} }
							>
								<span className="components-color-palette__custom-color-gradient" />
							</button>
						</Tooltip>
					</div>
				) }

				{ isVisible && (
					<Popover
						position="top left"
						className="ptam-component-color-picker"
						onClose={ toggleClose }
					>
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

						{ alpha && (
							<div className="ptam-component-color-opacity">
								<Tooltip text={ __( 'Opacity', 'post-type-archive-mapping' ) }>
									{ opacityIcon }
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
						) }

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

						<BaseControl className="ptam-component-color-picker-palette">
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
				) }
			</div>
		</BaseControl>
	);
};

export default PTAMColorPicker;
