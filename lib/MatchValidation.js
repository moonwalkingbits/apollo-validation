/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ValidationError } from "@moonwalkingbits/apollo-validation";

/**
 * Validation validating that a value matches the given pattern.
 */
class MatchValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier.
     */
    getIdentifier() {
        return "match";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {*} value Value to validate.
     * @param {(RegExp|string)} pattern Pattern to match against.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value, pattern) {
        if (!(pattern instanceof RegExp) && typeof pattern !== "string") {
            throw Error("Expects parameter to be a regular expression or a string");
        }

        if (!String(value).match(pattern)) {
            throw new ValidationError(`Must match: ${pattern}`);
        }
    }
}

export default MatchValidation;
