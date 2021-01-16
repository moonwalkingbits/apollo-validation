/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ValidationError } from "@moonwalkingbits/apollo-validation";

/**
 * Validation validating that a value is less than or equal to a given value.
 */
class LessThanOrEqualToValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier.
     */
    getIdentifier() {
        return "lte";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {(number|string|Date)} value Value to validate.
     * @param {(number|string|Date)} threshold Threshold value.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value, threshold) {
        if (value > threshold) {
            throw new ValidationError(`Must be less than or equal to ${threshold}`);
        }
    }
}

export default LessThanOrEqualToValidation;
