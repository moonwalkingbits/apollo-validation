/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ValidationError from "./ValidationError.js";

/**
 * Validation validating that a value is below a given limit.
 */
class MaxValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier;
     */
    getIdentifier() {
        return "max";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {(number|string|Object)} value Value to validate.
     * @param {(number|string)} max Maximum allowed value.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value, max) {
        if (isNaN(parseFloat(max)) || !isFinite(max)) {
            throw new Error("Expects parameter to be numeric");
        }

        switch (typeof value) {
            case "string":
                this.assertMax(value.length, max);
                break;
            case "number":
                this.assertMax(value, max);
                break;
            case "object":
                if (value !== null && "length" in value) {
                    this.assertMax(value.length, max);
                    break;
                }
            default:
                throw new ValidationError("Unexpected type");
        }
    }

    /**
     * Assert that the value is above the given threshold.
     *
     * @private
     * @param {(number|string|Object)} value Value to validate.
     * @param {(number|string)} threshold Maximum allowed value.
     * @throws {ValidationError} When the value is above the threshold.
     */
    assertMax(value, threshold) {
        if (value > threshold) {
            throw new ValidationError(`Must be smaller than ${threshold}`);
        }
    }
}

export default MaxValidation;
