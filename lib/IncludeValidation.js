/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ValidationError } from "@moonwalkingbits/apollo-validation";

/**
 * Validation validating that a value is the given collection.
 */
class IncludeValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier.
     */
    getIdentifier() {
        return "include";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {*} value Value to validate.
     * @param {(string|Array<*>)} collection Arbitrary collection.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value, collection) {
        if (!collection.includes(value)) {
            throw new ValidationError(
                `Must include: ${Array.isArray(collection) ? collection.join(", ") : collection}`
            );
        }
    }
}

export default IncludeValidation;
