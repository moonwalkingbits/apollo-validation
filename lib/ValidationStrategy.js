/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Represents a fixed set of validation strategies.
 *
 * @readonly
 * @enum {string}
 */
const ValidationStrategy = {
    /**
     * Runs all validations for a property before throwing an error if any failed.
     */
    STOP_AT_FIRST_INVALID_PROPERTY: "STOP_AT_FIRST_INVALID_PROPERTY",

    /**
     * Throws an error at the first invalid validation.
     */
    STOP_AT_FIRST_INVALID_VALIDATION: "STOP_AT_FIRST_INVALID_VALIDATION",

    /**
     * Runs all validations and throws an error if any of them failed.
     */
    RUN_ALL_VALIDATIONS: "RUN_ALL_VALIDATIONS"
};

export default ValidationStrategy;
