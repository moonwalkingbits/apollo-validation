/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import BetweenValidation from "./BetweenValidation.js";
import EmptyValidation from "./EmptyValidation.js";
import InValidation from "./InValidation.js";
import MatchValidation from "./MatchValidation.js";
import MaxValidation from "./MaxValidation.js";
import MinValidation from "./MinValidation.js";
import NotEmptyValidation from "./NotEmptyValidation.js";
import NumericValidation from "./NumericValidation.js";
import ValidationStrategy from "./ValidationStrategy.js";
import Validator from "./Validator.js";

/**
 * Validator factory makes it easy to create validator instances with a
 * plethora of validations.
 */
class ValidatorFactory {
    /**
     * Create a new validator instance with the given validations.
     *
     * If no validations are given the factory will create a validator instance
     * with all standard validations.
     *
     * @public
     * @param {?Array.<string>} validationIdentifiers List of validations to use.
     * @param {?ValidationStrategy} validationIdentifiers List of validations to use.
     * @return {Validator} Validator instance.
     */
    createValidator(validationIdentifiers, validationStrategy = ValidationStrategy.RUN_ALL_VALIDATIONS) {
        if (arguments.length === 0) {
            validationIdentifiers = Object.keys(ValidatorFactory.availableValidations);
        }

        const validations = validationIdentifiers.reduce((validations, identifier) => {
            if (!(identifier in ValidatorFactory.availableValidations)) {
                throw new Error(`Unrecognized validation identifier: ${identifier}`);
            }

            const validation = new ValidatorFactory.availableValidations[identifier]();

            return {...validations, [identifier]: validation.validate.bind(validation)};
        }, {});

        return new Validator(new Map(Object.entries(validations)));
    }
}

/**
 * Set of available validations.
 *
 * @private
 * @type {Object.<string, ValidationInterface>}
 */
ValidatorFactory.availableValidations = {
    "between": BetweenValidation,
    "empty": EmptyValidation,
    "not_empty": NotEmptyValidation,
    "in": InValidation,
    "match": MatchValidation,
    "max": MaxValidation,
    "min": MinValidation,
    "numeric": NumericValidation
};

export default ValidatorFactory;
