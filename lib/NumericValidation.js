/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ValidationError from "./ValidationError.js";

/**
 * Validation validating that a value is numeric.
 */
class NumericValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier;
     */
    getIdentifier() {
        return "numeric";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {*} value Value to validate.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value) {
        if (isNaN(parseFloat(value))) {
            throw new ValidationError("Must be numeric");
        }
    }
}

export default NumericValidation;
