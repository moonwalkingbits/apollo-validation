/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { GreaterThanOrEqualToValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("GreaterThanOrEqualToValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new GreaterThanOrEqualToValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("gte");
        });
    });

    describe("#validate", () => {
        it("should validate value", () => {
            validation.validate(5, 1);
            validation.validate(5, 5);
            validation.validate("b", "b");
            validation.validate("b", "a");
            validation.validate(new Date("2020-01-01"), new Date("2020-01-01"));
            validation.validate(new Date("2020-01-02"), new Date("2020-01-01"));
        });

        it("should throw error for invalid value", () => {
            expect(() => validation.validate(5, 6)).to.throw(ValidationError);
            expect(() => validation.validate("a", "b")).to.throw(ValidationError);
            expect(() => validation.validate(new Date("2020-01-01"), new Date("2020-01-02"))).to.throw(ValidationError);
        });
    });
});
