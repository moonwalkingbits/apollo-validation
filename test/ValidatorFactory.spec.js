/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ValidatorFactory } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("ValidatorFactory", () => {
    let validatorFactory;

    beforeEach(() => {
        validatorFactory = new ValidatorFactory();
    });

    describe("#createValidator", () => {
        it("should create validator without any validations", () => {
            const validator = validatorFactory.createValidator([]);

            expect(() => validator.validate({}, {key: "min"})).to.throw(Error);
        });

        it("should create validator with given validations", () => {
            const validator = validatorFactory.createValidator(["min"]);

            validator.validate({}, {key: "min"});
        });

        it("should throw if non-standard validation", () => {
            expect(() => validatorFactory.createValidator(["dummy"])).to.throw(Error);
        });

        it("should create validator with all available validations", () => {
            const validator = validatorFactory.createValidator();

            validator.validate(
                {},
                {
                    key: "between|empty|not_empty|gt|gte|lt|lte|in|include|match|max|min|numeric|type"
                }
            );
        });
    });
});
