/* eslint-disable no-undef */
/**
 * Internal dependencies
 */
import googleFonts from './GoogleFonts';
import UnitPicker from '../unit-picker';
import { TypographyIcon } from '../../icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { useState } = wp.element;

const {
	BaseControl,
	SelectControl,
	TextControl,
	ComboboxControl,
	Tooltip,
	Popover,
} = wp.components;

const TypographyControls = ( props ) => {
	// eslint-disable-next-line no-unused-vars
	const [ filteredItems, setFilteredItems ] = useState( [] );
	const [ isVisible, setIsVisible ] = useState( false );

	const {
		options = {},
		label = __( 'Typography Options', 'post-type-archive-mapping' ),
		showFontFamily = false,
		showFontSize = false,
		showFontWeight = false,
		showTextTransform = false,
		showLineHeight = false,
		showLetterSpacing = false,
	} = props;

	// Default Fonts + Google Fonts.
	const fontOptions = [];
	for ( const fontKey in ptam_globals.fonts ) {
		fontOptions.push( { value: fontKey, label: ptam_globals.fonts[ fontKey ] } );
	}
	Object.keys( googleFonts ).forEach( ( k ) => {
		fontOptions.push( { value: k, label: k } );
	} );

	const weight = [
		{ value: '100', label: '100' },
		{ value: '200', label: '200' },
		{ value: '300', label: '300' },
		{ value: '400', label: '400' },
		{ value: '500', label: '500' },
		{ value: '600', label: '600' },
		{ value: '700', label: '700' },
		{ value: '800', label: '800' },
		{ value: '900', label: '900' },
	];

	const transform = [
		{ value: '', label: __( 'Default', 'post-type-archive-mapping' ) },
		{ value: 'uppercase', label: __( 'Uppercase', 'post-type-archive-mapping' ) },
		{ value: 'lowercase', label: __( 'Lowercase', 'post-type-archive-mapping' ) },
		{
			value: 'capitalize',
			label: __( 'Capitalize', 'post-type-archive-mapping' ),
		},
		{ value: 'initial', label: __( 'Normal', 'post-type-archive-mapping' ) },
	];

	const onFontParamChanged = ( object ) => {
		const fontObject = Object.assign( options, object );
		props.onChange( fontObject );
	};

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
			{ ! isVisible && (
				<>
					<div className="ptam-typography-component-label">
						<span>{ label }</span>
					</div>
					<Tooltip text={ __( 'Typography Options', 'post-type-archive-mapping' ) }>
						<button
							type="button"
							aria-expanded={ isVisible }
							className="components-typography__item components-typography-option-picker__option"
							onClick={ () => {
								toggleVisible();
							} }
							aria-label={ __( 'Typography Options', 'post-type-archive-mapping' ) }
						>
							<TypographyIcon />
						</button>
					</Tooltip>
				</>
			) }
			{ isVisible && (
				<>
					<div className="ptam-typography-component-label">
						<span>{ label }</span>
					</div>
					<Tooltip text={ __( 'Typography Options', 'post-type-archive-mapping' ) }>
						<button
							type="button"
							aria-expanded={ isVisible }
							className="components-typography__item components-typography-option-picker__option"
							onClick={ () => {
								toggleClose();
							} }
							aria-label={ __( 'Typography Options', 'post-type-archive-mapping' ) }
						>
							<TypographyIcon />
						</button>
					</Tooltip>
				</>
			) }
			{ isVisible && (
				<Popover
					position="top left"
					className="ptam-component-color-picker"
					onClose={ toggleClose }
				>
					<div className={ 'components-ptam-typography-weight-transform' }>
						{ showFontWeight && 'fontWeight' in options && (
							<SelectControl
								label={ __( 'Weight', 'post-type-archive-mapping' ) }
								value={ options.fontWeight }
								options={ weight }
								onChange={ ( value ) => {
									onFontParamChanged( {
										fontWeight: value,
									} );
								} }
								className="components-base-control"
							/>
						) }

						{ showTextTransform && 'textTransform' in options && (
							<SelectControl
								label={ __( 'Transform', 'post-type-archive-mapping' ) }
								value={ options.textTransform }
								options={ transform }
								onChange={ ( value ) => {
									onFontParamChanged( {
										textTransform: value,
									} );
								} }
								className="components-base-control"
							/>
						) }
					</div>

					{ showFontFamily && 'fontFamily' in options && (
						<BaseControl className={ 'ptam-font-family-shortcuts' }>
							<ComboboxControl
								label={ __( 'Font Family', 'post-type-archive-mapping' ) }
								value={ options.fontFamily }
								options={ fontOptions }
								onInputChange={ ( inputValue ) =>
									setFilteredItems(
										fontOptions.filter( ( option ) =>
											option.label
												.toLowerCase()
												.startsWith( inputValue.toLowerCase() )
										)
									)
								}
								// eslint-disable-next-line no-unused-vars
								onFilterValueChange={ ( inputValue ) => {} }
								onChange={ ( value ) => {
									onFontParamChanged( {
										fontFamily: value,
									} );
								} }
							/>
						</BaseControl>
					) }

					{ showFontSize && 'fontSizeUnit' in options && 'fontSize' in options && (
						<BaseControl>
							<UnitPicker
								label={ __( 'Font Size', 'post-type-archive-mapping' ) }
								value={ options.fontSizeUnit }
								units={ [ 'px', 'em', 'rem' ] }
								onClick={ ( value ) => {
									onFontParamChanged( {
										fontSizeUnit: value,
									} );
								} }
							/>

							<div className="components-ptam-typography-control__inputs">
								<TextControl
									type={ 'number' }
									value={ options.fontSize }
									onChange={ ( value ) => {
										onFontParamChanged( {
											fontSize: value,
										} );
									} }
									min={ 1 }
									autoComplete="off"
								/>
							</div>
						</BaseControl>
					) }

					{ showLineHeight &&
						'lineHeight' in options &&
						'lineHeightUnit' in options && (
						<BaseControl>
							<UnitPicker
								label={ __( 'Line Height', 'post-type-archive-mapping' ) }
								value={ options.lineHeightUnit }
								units={ [ 'px', 'em', 'rem' ] }
								onClick={ ( value ) => {
									onFontParamChanged( {
										lineHeightUnit: value,
									} );
								} }
							/>

							<div className="components-ptam-typography-control__inputs">
								<TextControl
									type={ 'number' }
									value={ options.lineHeight }
									onChange={ ( value ) => {
										onFontParamChanged( {
											lineHeight: value,
										} );
									} }
									min={ 0 }
									step={ 0.1 }
									autoComplete="off"
								/>
							</div>
						</BaseControl>
					) }

					{ showLetterSpacing &&
						'letterSpacing' in options &&
						'letterSpacingUnit' in options && (
						<BaseControl>
							<UnitPicker
								label={ __( 'Letter Spacing', 'post-type-archive-mapping' ) }
								value={ 'em' }
								units={ [ 'em' ] }
								onClick={ () => {
									return false;
								} }
							/>

							<div className="components-ptam-typography-control__inputs">
								<TextControl
									type={ 'number' }
									value={ options.letterSpacing }
									placeholder="0.01"
									onChange={ ( value ) => {
										onFontParamChanged( {
											letterSpacing: value,
										} );
									} }
									min={ -1 }
									step={ 0.01 }
									autoComplete="off"
								/>
							</div>
						</BaseControl>
					) }
				</Popover>
			) }
		</BaseControl>
	);
};

export default TypographyControls;
