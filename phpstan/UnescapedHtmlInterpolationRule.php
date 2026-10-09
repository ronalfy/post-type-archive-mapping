<?php
/**
 * PHPStan rule for unescaped HTML attribute interpolation.
 *
 * @package PTAM
 */

namespace PTAM\PHPStan;

use PhpParser\Node;
use PhpParser\Node\Expr\FuncCall;
use PhpParser\Node\Name;
use PhpParser\Node\InterpolatedStringPart;
use PhpParser\Node\Scalar\InterpolatedString;
use PHPStan\Analyser\Scope;
use PHPStan\Rules\Rule;
use PHPStan\Rules\RuleErrorBuilder;

/**
 * Flag HTML attributes built from interpolated values that are not escaped.
 *
 * @implements Rule<InterpolatedString>
 */
class UnescapedHtmlInterpolationRule implements Rule {

	/**
	 * Functions that make an interpolated value safe for an HTML attribute.
	 *
	 * @var string[]
	 */
	private $escaping_functions = array(
		'esc_attr',
		'esc_html',
		'esc_url',
		'esc_js',
		'absint',
		'intval',
		'sanitize_hex_color',
		'wp_kses',
		'wp_kses_post',
	);

	/**
	 * Node type this rule inspects.
	 */
	public function getNodeType(): string {
		return InterpolatedString::class;
	}

	/**
	 * Report interpolated HTML attributes that skip escaping.
	 *
	 * @param InterpolatedString $node  Interpolated string node.
	 * @param Scope              $scope Current scope.
	 *
	 * @return list<\PHPStan\Rules\IdentifierRuleError>
	 */
	public function processNode( Node $node, Scope $scope ): array {
		if ( ! $node instanceof InterpolatedString ) {
			return array();
		}

		$literal = '';
		foreach ( $node->parts as $part ) {
			$part_literal = $this->literal_value( $part );
			if ( null !== $part_literal ) {
				$literal .= $part_literal;
			}
		}

		if ( ! $this->contains_html_attribute( $literal ) ) {
			return array();
		}

		foreach ( $node->parts as $part ) {
			if ( null !== $this->literal_value( $part ) ) {
				continue;
			}
			if ( $this->is_escaped( $part ) ) {
				continue;
			}

			return array(
				RuleErrorBuilder::message(
					'Interpolated value in an HTML attribute must be passed through an escaping function such as esc_attr().'
				)->identifier( 'ptam.unescapedHtmlInterpolation' )->build(),
			);
		}

		return array();
	}

	/**
	 * Read a static portion of an interpolated string.
	 *
	 * @param Node $part String part.
	 *
	 * @return string|null Literal text, or null when the part is an expression.
	 */
	private function literal_value( Node $part ) {
		if ( $part instanceof InterpolatedStringPart && is_string( $part->value ) ) {
			return $part->value;
		}

		return null;
	}

	/**
	 * Whether literal text contains an HTML attribute assignment.
	 *
	 * @param string $literal Combined literal parts.
	 *
	 * @return bool
	 */
	private function contains_html_attribute( $literal ) {
		if ( preg_match( '/\b(?:style|href|src|action|formaction|cite|poster|background|class|id|alt|title|name|value|content|datetime|rel|target|type)\s*=/i', $literal ) ) {
			return true;
		}
		if ( preg_match( '/\bon[a-z]+\s*=/i', $literal ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Whether an interpolated expression is wrapped in an escaping function.
	 *
	 * @param Node $part Interpolated expression.
	 *
	 * @return bool
	 */
	private function is_escaped( Node $part ) {
		if ( ! $part instanceof FuncCall ) {
			return false;
		}
		if ( ! $part->name instanceof Name ) {
			return false;
		}

		$name = strtolower( $part->name->toString() );
		return in_array( $name, $this->escaping_functions, true );
	}
}
