/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class ValidatorError extends Error {
    constructor(message, property, previous) {
        super(message);

        this.property = property;
        this.previous = previous;
    }

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
