/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ValidationError from "./ValidationError.js";

/**
 * Validation validating that a value is between two given limits.
 */
class BetweenValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier.
     */
    getIdentifier() {
        return "between";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {(number|string|Object)} value Value to validate.
     * @param {(number|string)} min Minimum allowed value.
     * @param {(number|string)} max Maximum allowed value.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value, min, max) {
        if (isNaN(parseFloat(min)) || !isFinite(min) || isNaN(parseFloat(max)) || !isFinite(max)) {
            throw new Error("Expects parameters to be numeric");
        }

        switch (typeof value) {
            case "string":
                this.assertBetween(value.length, min, max);
                break;
            case "number":
                this.assertBetween(value, min, max);
                break;
            case "object":
                if (value !== null && "length" in value) {
                    this.assertBetween(value.length, min, max);
                    break;
                }
            default:
                throw new ValidationError("Unexpected type");
        }
    }

    /**
     * Assert that the value is between the given thresholds.
     *
     * @private
     * @param {(number|string|Object)} value Value to validate.
     * @param {(number|string)} min Maximum allowed value.
     * @param {(number|string)} max Maximum allowed value.
     * @throws {ValidationError} When the value is outside the thresholds.
     */
    assertBetween(value, min, max) {
        if (value < min || value > max) {
            throw new ValidationError(`Must be between ${min} and ${max}`);
        }
    }
}

export default BetweenValidation;
