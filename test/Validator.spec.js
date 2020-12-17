/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Validator, ValidationError, ValidationStrategy, ValidatorError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("Validator", () => {
    let validator;

    beforeEach(() => {
        validator = new Validator();
    });

    describe("#constructor", () => {
        it("should accept validations", () => {
            const validator = new Validator(new Map([
                ["dummy", () => {}]
            ]));

            validator.validate({key: "value"}, {key: "dummy"});
        });
    });

    describe("#addValidation", () => {
        it("should add validation", () => {
            validator.addValidation({
                getIdentifier() {
                    return "dummy";
                },
                validate() {}
            });

            validator.validate({key: "value"}, {key: "dummy"});
        });
    });

    describe("#addValidationFunction", () => {
        it("should add validation function", () => {
            validator.addValidationFunction("dummy", () => {});

            validator.validate({key: "value"}, {key: "dummy"});
        });
    });

    describe("#validate", () => {
        it("should pass if there are no validations", () => {
            validator.validate({}, {});
        });

        it("should throw if unrecognized validation", () => {
            expect(() => validator.validate({}, {key: "unrecognized"})).to.throw();
        });

        it("should have present validation", () => {
            validator.validate({key: "value"}, {key: "present"});
            expect(() => validator.validate({}, {key: "present"})).to.throw(ValidatorError);
        });

        it("should pass if all validations succeeds", () => {
            validator.addValidationFunction("one", () => {});
            validator.addValidationFunction("two", () => {});

            validator.validate({key: "value"}, {key: "present|one|two"});
        });

        it("should fail if any validation fails", () => {
            validator.addValidationFunction("one", () => {});
            validator.addValidationFunction("two", () => { throw new ValidationError("Validation failed") });

            expect(() => validator.validate({key: "value"}, {key: "present|one|two"})).to.throw(ValidatorError);
        });

        it("should invoke validation with value and parameters", () => {
            validator.addValidationFunction("validation", (value, ...parameters) => {
                expect(value).to.eql("value");
                expect(parameters).to.eql(["1", "2", "3"]);
            });

            validator.validate({key: "value"}, {key: "validation:1,2,3"});
        });

        it("should stop at first invalid validation", () => {
            validator.addValidationFunction("validation_1", () => { throw new ValidationError("Validation failed") });
            validator.addValidationFunction("validation_2", () => { throw new Error("This should not run") });
            validator.useValidationStrategy(ValidationStrategy.STOP_AT_FIRST_INVALID_VALIDATION);

            expect(() => {
                validator.validate({
                    key: "",
                    another_key: ""
                }, {
                    key: "validation_1|validation_2",
                    another_key: "validation_2"
                });
            }).to.throw(ValidatorError);
        });

        it("should stop at first invalid property", () => {
            validator.addValidationFunction("validation_1", () => { throw new ValidationError("Validation failed") });
            validator.addValidationFunction("validation_2", () => { throw new Error("This should not run") });
            validator.useValidationStrategy(ValidationStrategy.STOP_AT_FIRST_INVALID_PROPERTY);

            expect(() => {
                validator.validate({
                    key: "",
                    another_key: ""
                }, {
                    key: "validation_1",
                    another_key: "validation_2"
                });
            }).to.throw(ValidatorError);
        });

        it("should run all validations for failed property", () => {
            let secondValidationHasRun = false;

            validator.addValidationFunction("validation_1", () => { throw new ValidationError("Validation failed") });
            validator.addValidationFunction("validation_2", () => { secondValidationHasRun = true });
            validator.addValidationFunction("validation_3", () => { throw new Error("This should not run") });
            validator.useValidationStrategy(ValidationStrategy.STOP_AT_FIRST_INVALID_PROPERTY);

            try {
                validator.validate({
                    key: "",
                    another_key: ""
                }, {
                    key: "validation_1|validation_2",
                    another_key: "validation_3"
                });

                throw new Error("This should not run");
            } catch (_) {}

            expect(secondValidationHasRun).to.be.true;
        });

        it("should run all validations for present properties", () => {
            let validationCount = 0;

            validator.addValidationFunction("validation_1", () => { throw new ValidationError("Validation failed") });
            validator.addValidationFunction("validation_2", () => { validationCount += 1 });

            try {
                validator.validate({
                    key: "",
                    another_key: ""
                }, {
                    key: "validation_1|validation_2",
                    another_key: "present|validation_2",
                    yet_another_key: "present|validation_1|validation_2"
                });

                throw new Error("This should not run");
            } catch (_) {}

            expect(validationCount).to.eql(2);
        });

        it("should provide all property validation errors", () => {
            let error = null;

            validator.addValidationFunction("validation_1", () => { throw new ValidationError("Validation 1 failed") });
            validator.addValidationFunction("validation_2", () => { throw new ValidationError("Validation 2 failed") });
            validator.addValidationFunction("validation_3", () => { throw new ValidationError("Validation 3 failed") });

            try {
                validator.validate({
                    key: "",
                    another_key: ""
                }, {
                    key: "validation_1",
                    another_key: "validation_1|validation_2",
                    yet_another_key: "present|validation_1|validation_2|validation_3"
                });
            } catch (err) {
                error = err;
            }

            expect(error).not.to.be.null;
            expect(error).to.be.instanceOf(ValidatorError);

            let errorCount = 1;

            while (error = error.previous) {
                errorCount += 1;
            }

            expect(errorCount).to.eql(4);
        });

        it("should rethrow any error that is not a ValidationError", () => {
            validator.addValidationFunction("validation_1", () => { throw new Error("Regular error") });
            validator.addValidationFunction("validation_2", () => { throw new Error("This should not run") });

            expect(() => validator.validate({key: "value"}, {key: "validation_1|validation_2"})).to.throw(Error);
        });

        it("should clear errors between validations", () => {
            expect(() => validator.validate({}, {key: "present"})).to.throw(ValidatorError);
            expect(() => validator.validate({}, {key: "present"})).to.throw(ValidatorError);
            validator.validate({key: "value"}, {key: "present"});
        });
    });
});
