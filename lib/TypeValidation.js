/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ValidationError } from "@moonwalkingbits/apollo-validation";

/**
 * Validation validating the type of a value.
 */
class TypeValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier.
     */
    getIdentifier() {
        return "type";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {*} value Value to validate.
     * @param {Array.<string>} types Allowed value types.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value, ...types) {
        if (!types.some(type => this.typeMatches(value, type))) {
            throw new ValidationError(`Must be of type ${this.formatAllowedTypes(types)}`);
        }
    }

    /**
     * Format allowed types for a friendly message.
     *
     * @private
     * @param {Array.<string>} Allowed types.
     * @return {string}
     */
    formatAllowedTypes(types) {
        if (types.length === 1) {
            return types[0];
        }

        return `${types.slice(0, types.length - 1).join(", ")} or ${types[types.length - 1]}`;
    }

    /**
     * Determine if the value is of the given type.
     *
     * @private
     * @param {*} value Value to check.
     * @param {string} type Type to match against.
     * @return True if the value is of the given type.
     */
    typeMatches(value, type) {
        if (type === "array") {
            return Array.isArray(value);
        }

        if (type === "date") {
            return !isNaN(new Date(value));
        }

        if (type === "null") {
            return value === null;
        }

        if (type === "object" && (Array.isArray(value) || !isNaN(new Date(value)))) {
            return false;
        }

        return typeof value === type;
    }
}

export default TypeValidation;
