
/**
 * CSS Builder Helper.
 */
export default class CSSBuilder {
	wrapperClass = '';
	cssRules = [];

	/**
	 *
	 * @param {string} wrapperClass The wrapper class for the CSS.
	 */
	constructor( wrapperClass ) {
		this.wrapperClass = wrapperClass;
	}

	/**
	 *
	 * @param {string} selector The CSS Selector.
	 * @param {string} rule     CSS string.
	 */
	addCSS = ( selector, rule ) => {
		if ( selector in this.cssRules ) {
			this.cssRules[ selector ].push( rule );
		} else {
			this.cssRules[ selector ] = [];
			this.cssRules[ selector ].push( rule );
		}
	};

	/**
	 * Print out the CSS based on passed input.
	 *
	 * @return {JSX} Style output.
	 */
	printCSS = () => {
		let output = '';
		for ( const selector of Object.keys( this.cssRules ) ) {
			output += `.${ this.wrapperClass } ${ selector } {`;
			for ( const rule of this.cssRules[ selector ] ) {
				output += rule;
			}
			output += '}';
		}

		return (
			<>
				<style>{ output }</style>
			</>
		);
	};
}
