<?php
/**
 * PHPStan rule for the WordPress direct file access guard.
 *
 * @package PTAM
 */

namespace PTAM\PHPStan;

use PhpParser\Node;
use PHPStan\Analyser\Scope;
use PHPStan\Node\FileNode;
use PHPStan\Rules\Rule;
use PHPStan\Rules\RuleErrorBuilder;

/**
 * Flag analyzed PHP files that can be requested directly.
 *
 * @implements Rule<FileNode>
 */
class MissingDirectAccessGuardRule implements Rule {

	/**
	 * Node type this rule inspects.
	 */
	public function getNodeType(): string {
		return FileNode::class;
	}

	/**
	 * Report one error when a file has no ABSPATH guard.
	 *
	 * FileNode is visited once per analyzed file, so the source is read once.
	 *
	 * @param FileNode $node  File node.
	 * @param Scope    $scope Current scope.
	 *
	 * @return list<\PHPStan\Rules\IdentifierRuleError>
	 */
	public function processNode( Node $node, Scope $scope ): array {
		if ( ! $node instanceof FileNode ) {
			return array();
		}

		$file = $scope->getFile();
		if ( $this->is_rule_directory( $file ) ) {
			return array();
		}

		$source = file_get_contents( $file );
		if ( is_string( $source ) && $this->has_direct_access_guard( $source ) ) {
			return array();
		}

		return array(
			RuleErrorBuilder::message(
				'Missing direct file access guard. Check defined( \'ABSPATH\' ) and exit before any other code.'
			)->identifier( 'ptam.missingDirectAccessGuard' )->line( 1 )->build(),
		);
	}

	/**
	 * Whether the path is the PHPStan rules directory.
	 *
	 * @param string $file Absolute or relative file path.
	 *
	 * @return bool
	 */
	private function is_rule_directory( $file ) {
		$normalized = str_replace( '\\', '/', $file );

		return false !== strpos( $normalized, '/phpstan/' );
	}

	/**
	 * Whether source contains a direct-access guard.
	 *
	 * @param string $source File source.
	 *
	 * @return bool
	 */
	private function has_direct_access_guard( $source ) {
		if ( false !== strpos( $source, "defined( 'ABSPATH' )" ) ) {
			return true;
		}

		return false !== strpos( $source, "defined('ABSPATH')" );
	}
}
