/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ValidationError from "./ValidationError.js";

/**
 * Validation validating that a value is not empty.
 */
class NotEmptyValidation {
    /**
     * Get validation identifier.
     *
     * @public
     * @return {string} Validation identifier.
     */
    getIdentifier() {
        return "not_empty";
    }

    /**
     * Validate the given value.
     *
     * @public
     * @param {*} value Value to validate.
     * @throws {ValidationError} When the value is invalid.
     */
    validate(value) {
        const numberOfItems = value.length ?? value.size;

        if (isNaN(String(numberOfItems))) {
            throw new Error("Unexpected type");
        }

        if (numberOfItems == 0) {
            throw new ValidationError("Must not be empty");
        }
    }
}

export default NotEmptyValidation;
