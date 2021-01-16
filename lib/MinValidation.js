/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ValidationError } from "@moonwalkingbits/apollo-validation";

/**
 * Validation validating that a value is above a given limit.
 */
class MinValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier.
     */
    getIdentifier() {
        return "min";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {(number|string|Object)} value Value to validate.
     * @param {(number|string)} min Minimum allowed value.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value, min) {
        if (isNaN(parseFloat(min)) || !isFinite(min)) {
            throw new Error("Expects parameter to be numeric");
        }

        switch (typeof value) {
            case "string":
                this.assertMin(value.length, min);
                break;
            case "number":
                this.assertMin(value, min);
                break;
            case "object":
                if (value !== null && "length" in value) {
                    this.assertMin(value.length, min);
                    break;
                }
            default:
                throw new ValidationError("Unexpected type");
        }
    }

    /**
     * Assert that the value is below the given threshold.
     *
     * @private
     * @param {(number|string|Object)} value Value to validate.
     * @param {(number|string)} threshold Minimum allowed value.
     * @throws {ValidationError} When the value is below the threshold.
     */
    assertMin(value, threshold) {
        if (value < threshold) {
            throw new ValidationError(`Must be larger than ${threshold}`);
        }
    }
}

export default MinValidation;
