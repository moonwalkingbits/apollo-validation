/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ValidationError, ValidationStrategy, ValidatorError } from "@moonwalkingbits/apollo-validation";

/**
 * An interface representing a validation object.
 *
 * @interface ValidationInterface
 */

/**
 * Get validation identifier.
 *
 * @function
 * @name ValidationInterface#getIdentifier
 * @return {string} Validation identifier.
 */

/**
 * Validate the given value.
 *
 * @function
 * @name ValidationInterface#validate
 * @param {*} value Value to validate.
 * @param {...*} parameters Validation parameters.
 * @throws {ValidationError} When value is invalid.
 */

/**
 * The protagonist of the validation package.
 *
 * We use instances of validator to validate an object against a given set of
 * rules. Catching any validation errors throw if a rule fails.
 */
class Validator {
    /**
     * Create a new validator instance.
     *
     * @public
     * @param {?Map.<string, Function>} validations Available validations.
     * @param {?ValidationStrategy} validationStrategy Validation strategy to use.
     */
    constructor(validations = new Map(), validationStrategy = ValidationStrategy.RUN_ALL_VALIDATIONS) {
        /**
         * Available validations.
         *
         * @private
         * @type {Map.<string, Function>}
         */
        this.validations = validations;

        /**
         * Validation strategy to use.
         *
         * @private
         * @type {ValidationStrategy}
         */
        this.validationStrategy = validationStrategy;

        /**
         * Last encountered error.
         *
         * For every encountered error this gets replaced by a new one, adding
         * this (the now second to last error) to the list of previous errors.
         * This enables a chain of errors thrown in the validation process.
         *
         * @private
         * @type {?ValidatorError}
         */
        this.error = null;
    }

    /**
     * Set validation strategy.
     *
     * @public
     * @param {ValidationStrategy} validationStrategy Validation strategy to use.
     * @return {this} Same instance for method chaining.
     */
    useValidationStrategy(validationStrategy) {
        this.validationStrategy = validationStrategy;

        return this;
    }

    /**
     * Add validation to available validations.
     *
     * @public
     * @param {ValidationInterface} validation Validation instance.
     * @return {this} Same instance for method chaining.
     */
    addValidation(validation) {
        this.validations.set(validation.getIdentifier(), validation.validate.bind(validation));

        return this;
    }

    /**
     * Add validation function to available validations.
     *
     * @public
     * @param {string} identifier Validation identifier.
     * @param {Function} validate Validation function.
     * @return {this} Same instance for method chaining.
     */
    addValidationFunction(identifier, validate) {
        return this.addValidation({getIdentifier: () => identifier, validate});
    }

    /**
     * Validate object against the given rules.
     *
     * @public
     * @param {Object} object Object to validate.
     * @param {Object.<string, string>} rules Rules to validate the object against.
     * @param {boolean} clearPreviousErrors Whether to clear any errors from previous invocations.
     * @throws {ValidatorError} When object is invalid.
     */
    validate(object, rules, clearPreviousErrors = true) {
        if (clearPreviousErrors) {
            this.error = null;
        }

        for (const [property, rule] of Object.entries(rules)) {
            this.validateRule(object, property, rule);

            if (this.validationStrategy === ValidationStrategy.STOP_AT_FIRST_INVALID_PROPERTY && this.error) {
                throw this.error;
            }
        }

        if (this.error !== null) {
            throw this.error;
        }
    }

    /**
     * Validate object property against the given rule.
     *
     * @private
     * @param {Object} object Object to validate.
     * @param {string} property Object property to validate.
     * @param {string} rule Rule to validate the property against.
     * @throws {ValidatorError}
     */
    validateRule(object, property, rule) {
        for (const identifier of rule.split("|")) {
            this.runValidation(object, property, identifier);

            if (this.validationStrategy === ValidationStrategy.STOP_AT_FIRST_INVALID_VALIDATION && this.error) {
                throw this.error;
            }
        }
    }

    /**
     * Validate object property against the given validation.
     *
     * @private
     * @param {Object} object Object to validate.
     * @param {string} property Object property to validate.
     * @param {string} definition Validator definition.
     */
    runValidation(object, property, definition) {
        const [identifier, parameterString = ""] = definition.split(":");
        const parameters = parameterString.split(",")
            .filter(parameter => parameter.length > 0)
            .map(parameter => parameter.trim());

        if (identifier === "present") {
            return this.validatePresence(object, property);
        }

        if (!this.validations.has(identifier)) {
            throw new Error(`Unrecognized validation identifier: ${identifier}`);
        }

        if (!(property in object)) {
            return;
        }

        try {
            this.validations.get(identifier)(object[property], ...parameters);
        } catch (error) {
            if (!(error instanceof ValidationError)) {
                throw error;
            }

            this.error = new ValidatorError(error.message, property, this.error);
        }
    }

    /**
     * Validate the presence of the given property.
     *
     * @private
     * @param {*} object Object to validate.
     * @param {string} property Property to check for.
     */
    validatePresence(object, property) {
        if (!(property in object)) {
            this.error = new ValidatorError("Must be present", property, this.error);
        }
    }
}

export default Validator;
