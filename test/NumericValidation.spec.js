/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { NumericValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("NumericValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new NumericValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("numeric");
        });
    });

    describe("#validate", () => {
        it("should validate numeric values", () => {
            validation.validate("1");
            validation.validate(1);
            validation.validate(1.0);
        });

        it("should throw error for non numeric values", () => {
            expect(() => validation.validate(null)).to.throw(ValidationError);
            expect(() => validation.validate("string")).to.throw(ValidationError);
            expect(() => validation.validate([])).to.throw(ValidationError);
        });
    });
});
