export default class CSSBuilder {
	wrapperClass = '';
	cssRules = [];

	constructor( wrapperClass ) {
		this.wrapperClass = wrapperClass;
	}

	addCSS = ( selector, rule ) => {
		if ( selector in this.cssRules ) {
			this.cssRules[ selector ].push( rule );
		} else {
			this.cssRules[ selector ] = [];
			this.cssRules[ selector ].push( rule );
		}
	};

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
