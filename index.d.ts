/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * An interface representing a validation object.
 */
declare interface ValidationInterface {
    /**
     * Get validation identifier.
     *
     * @return Validation identifier.
     */
    getIdentifier(): string;

    /**
     * Validate the given value.
     *
     * @param value Value to validate.
     * @param parameters Validation parameters.
     * @throws When value is invalid.
     */
    validate(value: any, ...parameters: Array<any>): void;
}

/**
 * Represents a fixed set of validation strategies.
 */
declare enum ValidationStrategy {
    /**
     * Runs all validations for a property before throwing an error if any failed.
     */
    STOP_AT_FIRST_INVALID_PROPERTY = "STOP_AT_FIRST_INVALID_PROPERTY",

    /**
     * Throws an error at the first invalid validation.
     */
    STOP_AT_FIRST_INVALID_VALIDATION = "STOP_AT_FIRST_INVALID_VALIDATION",

    /**
     * Runs all validations and throws an error if any of them failed.
     */
    RUN_ALL_VALIDATIONS = "RUN_ALL_VALIDATIONS"
}

declare type ValidationFunction = (value: any, ...parameters: Array<any>) => void;

/**
 * The protagonist of the validation package.
 *
 * We use instances of validator to validate an object against a given set of
 * rules. Catching any validation errors throw if a rule fails.
 */
declare class Validator {
    /**
     * Create a new validator instance.
     *
     * @param validations Available validations.
     * @param validationStrategy Validation strategy to use.
     */
    public constructor(validations?: Map<string, ValidationFunction>, validationStrategy?: ValidationStrategy);

    /**
     * Set validation strategy.
     *
     * @param validationStrategy Validation strategy to use.
     * @return Same instance for method chaining.
     */
    public useValidationStrategy(validationStrategy: ValidationStrategy): this;

    /**
     * Add validation to available validations.
     *
     * @param validation Validation instance.
     * @return Same instance for method chaining.
     */
    public addValidation(validation: ValidationInterface): this;

    /**
     * Add validation function to available validations.
     *
     * @param identifier Validation identifier.
     * @param validate Validation function.
     * @return Same instance for method chaining.
     */
    public addValidationFunction(identifier: string, validate: ValidationFunction): this;

    /**
     * Validate object against the given rules.
     *
     * @param object Object to validate.
     * @param rules Rules to validate the object against.
     * @param clearPreviousErrors Whether to clear any errors from previous invocations.
     * @throws When object is invalid.
     */
    public validate(object: any, rules: {[key: string]: string}, clearPreviousErrors?: boolean): void;
}

/**
 * Validator factory makes it easy to create validator instances with a
 * plethora of validations.
 */
declare class ValidatorFactory {
    /**
     * Create a new validator instance with the given validations.
     *
     * If no validations are given the factory will create a validator instance
     * with all standard validations.
     *
     * @param validationIdentifiers List of validations to use.
     * @param validationIdentifiers List of validations to use.
     * @return Validator instance.
     */
    public createValidator(validationIdentifiers?: Array<string>, validationStrategy?: ValidationStrategy): Validator;
}

/**
 * Error thrown when validation fails.
 */
declare class ValidationError extends Error {}

/**
 * Error thrown by the validator if any validations fail.
 */
declare class ValidatorError extends Error {
    /**
     * Key/value object containing the failed properties and the validation errors.
     */
    public errors: {[key: string]: Array<string>};

    /**
     * Create a new error instance.
     *
     * @param message Informative error message.
     * @param property Invalid object property.
     * @param previous Previous error.
     */
    public constructor(message: string, property: string, previous?: ValidatorError);
}

export {
    ValidationError,
    ValidationInterface,
    ValidationStrategy,
    Validator,
    ValidatorError,
    ValidatorFactory
};
