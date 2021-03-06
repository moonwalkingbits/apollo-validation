/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { MaxValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("MaxValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new MaxValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("max");
        });
    });

    describe("#validate", () => {
        it("should throw error if too few parameters", () => {
            expect(() => validation.validate(0)).to.throw(Error);
        });

        it("should throw error if invalid parameter type", () => {
            expect(() => validation.validate(0, "string")).to.throw(Error);
        });

        it("should accept integer parameter", () => {
            validation.validate(0, 0);
        });

        it("should accept numeric string parameter", () => {
            validation.validate(0, "0");
        });

        it("should validate number", () => {
            validation.validate(5, 5);
        });

        it("should throw error for invalid number", () => {
            expect(() => validation.validate(5, 4)).to.throw(ValidationError);
        });

        it("should validate string", () => {
            validation.validate("John Smith", 10);
        });

        it("should throw error for invalid string", () => {
            expect(() => validation.validate("John Smith", 9)).to.throw(ValidationError);
        });

        it("should validate array", () => {
            validation.validate([1, 2, 3, 4, 5], 5);
        });

        it("should throw error for invalid array", () => {
            expect(() => validation.validate([1, 2, 3, 4, 5], 4)).to.throw(ValidationError);
        });

        it("should throw error for invalid type", () => {
            expect(() => validation.validate({}, 0)).to.throw(ValidationError);
            expect(() => validation.validate(null, 0)).to.throw(ValidationError);
            expect(() => validation.validate(void 0, 0)).to.throw(ValidationError);
        });
    });
});
