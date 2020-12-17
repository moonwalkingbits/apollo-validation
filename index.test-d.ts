/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { expectAssignable, expectType } from "tsd";

import { ValidationInterface, ValidationStrategy, Validator, ValidatorFactory } from ".";

class Validation implements ValidationInterface {
    public getIdentifier(): string {
        return "validation";
    }

    public validate(value: string): void {}
}

const validatorFactory = new ValidatorFactory();
const validator = validatorFactory.createValidator();
const validation = new Validation();

expectType<ValidatorFactory>(validatorFactory);
expectType<Validator>(validator);
expectType<Validation>(validation);
expectAssignable<ValidationInterface>(validation);
expectType<Validator>(validatorFactory.createValidator([]));
expectType<Validator>(validatorFactory.createValidator([], ValidationStrategy.STOP_AT_FIRST_INVALID_VALIDATION));
expectType<Validator>(validator.useValidationStrategy(ValidationStrategy.RUN_ALL_VALIDATIONS));
expectType<Validator>(validator.addValidation(validation));
expectType<Validator>(validator.addValidationFunction("validation", value => {}));
validator.validate({}, {});
validator.validate(new Date(), {getFullYear: "present"});
