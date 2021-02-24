/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { TypeValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("TypeValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new TypeValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("type");
        });
    });

    describe("#validate", () => {
        it("should validate matching value types", () => {
            validation.validate("", "string");
            validation.validate(1, "number");
            validation.validate([], "array");
            validation.validate({}, "object");
            validation.validate(true, "boolean");
            validation.validate(() => {}, "function");
            validation.validate(Date.now(), "date");
            validation.validate(new Date(), "date");
            validation.validate(null, "null");
        });

        it("should throw error for non matching value types", () => {
            expect(() => validation.validate("", "number")).to.throw(ValidationError);
            expect(() => validation.validate(1, "string")).to.throw(ValidationError);
            expect(() => validation.validate([], "object")).to.throw(ValidationError);
            expect(() => validation.validate({}, "date")).to.throw(ValidationError);
            expect(() => validation.validate(Date.now(), "object")).to.throw(ValidationError);
            expect(() => validation.validate(new Date(), "object")).to.throw(ValidationError);
            expect(() => validation.validate(null, "object")).to.throw(ValidationError);
        });

        it("should allow multiple types", () => {
            validation.validate("",  "number", "date", "string");
            validation.validate(new Date(),  "number", "date", "string");
        });

        it("should throw error if no types matches", () => {
            expect(() => validation.validate("", "number", "date", "null")).to.throw(ValidationError);
            expect(() => validation.validate([], "number", "date", "null")).to.throw(ValidationError);
        });

        it("should include all type options in error message", () => {
            expect(() => validation.validate("", "number")).to.throw("Must be of type number");
            expect(() => validation.validate("", "number", "date")).to.throw("Must be of type number or date");
            expect(() => validation.validate("", "number", "date", "null")).to.throw("Must be of type number, date or null");
            expect(() => validation.validate("", "number", "date", "null", "array")).to.throw("Must be of type number, date, null or array");
        });
    });
});
