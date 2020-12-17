/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Error thrown by the validator if any validations fail.
 *
 * @extends Error
 */
class ValidatorError extends Error {
    /**
     * Create a new error instance.
     *
     * @public
     * @param {string} message Informative error message.
     * @param {string} property Invalid object property.
     * @param {?ValidatorError} previous Previous error.
     */
    constructor(message, property, previous) {
        super(message);

        /**
         * Invalid object property.
         *
         * @private
         * @type {string}
         */
        this.property = property;

        /**
         * Previous error.
         *
         * @private
         * @type {ValidatorError}
         */
        this.previous = previous;
    }

    /**
     * Key/value object containing the failed properties and the validation errors.
     *
     * @public
     * @type {Object.<string, Array.<string>>}
     */
    get errors() {
        const errors = {};
        let error = this;

        do {
            if (!(error.property in errors)) {
                errors[error.property] = [];
            }

            errors[error.property].unshift(error.message);
        } while (error = error.previous);

        return errors;
    }
}

export default ValidatorError;
