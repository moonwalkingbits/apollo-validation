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
        });

        it("should throw error for non matching value types", () => {
            expect(() => validation.validate("", "number")).to.throw(ValidationError);
            expect(() => validation.validate(1, "string")).to.throw(ValidationError);
            expect(() => validation.validate([], "object")).to.throw(ValidationError);
            expect(() => validation.validate({}, "date")).to.throw(ValidationError);
            expect(() => validation.validate(Date.now(), "object")).to.throw(ValidationError);
            expect(() => validation.validate(new Date(), "object")).to.throw(ValidationError);
        });
    });
});
