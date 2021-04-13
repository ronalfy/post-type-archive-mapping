/**
 * Color and Gradient Picker.
 *
 * Credit: Forked from @post-type-archive-mapping
 */

import classnames from 'classnames';

const { useState } = wp.element;

const { __ } = wp.i18n;

const { Tooltip, BaseControl, Popover } = wp.components;

const { __experimentalGradientPickerControl } = wp.blockEditor;

const PTAMGradientPicker = ( props ) => {
	const [ isVisible, setIsVisible ] = useState( false );

	const { value, onChange, label } = props;

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
		<BaseControl className="ptam-component-color-picker-wrapper ptam-component-gradient-picker-wrapper">
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
									'Gradient Color Picker',
									'post-type-archive-mapping'
								) }
								style={ {
									backgroundImage: value ? value : 'none',
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
									backgroundImage: value ? value : 'none',
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
						className="ptam-component-gradient-picker"
						onClose={ toggleClose }
					>
						<BaseControl>
							{ __experimentalGradientPickerControl && (
								<__experimentalGradientPickerControl
									label={ __(
										'Choose a Background Gradient',
										'post-type-archive-mapping'
									) }
									value={ value }
									onChange={ ( gradientvalue ) => {
										onChange( gradientvalue );
									} }
								/>
							) }
						</BaseControl>
					</Popover>
				) }
			</div>
		</BaseControl>
	);
};

export default PTAMGradientPicker;
