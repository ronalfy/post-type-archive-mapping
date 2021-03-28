/**
 * Return a value with unit (e.g., 10px)
 * Credit: @GenerateBlocks
 *
 * @param {number} value The value to output.
 * @param {string}  unit  The unit (px, em, rem).
 * @return {string} The value with unit.
 */

export default function valueWithUnit( value, unit ) {
	if ( ! value && 0 !== value ) {
		return false;
	}

	return value + unit;
}
