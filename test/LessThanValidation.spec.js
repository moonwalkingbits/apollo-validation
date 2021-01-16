/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { LessThanValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("LessThanValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new LessThanValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("lt");
        });
    });

    describe("#validate", () => {
        it("should validate value", () => {
            validation.validate(5, 6);
            validation.validate("a", "b");
            validation.validate(new Date("2020-01-01"), new Date("2020-01-02"));
        });

        it("should throw error for invalid value", () => {
            expect(() => validation.validate(5, 5)).to.throw(ValidationError);
            expect(() => validation.validate(5, 4)).to.throw(ValidationError);
            expect(() => validation.validate("a", "a")).to.throw(ValidationError);
            expect(() => validation.validate("b", "a")).to.throw(ValidationError);
            expect(() => validation.validate(new Date("2020-01-01"), new Date("2020-01-01"))).to.throw(ValidationError);
            expect(() => validation.validate(new Date("2020-01-02"), new Date("2020-01-01"))).to.throw(ValidationError);
        });
    });
});
