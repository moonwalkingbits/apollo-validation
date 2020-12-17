/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { InValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("InValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new InValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("in");
        });
    });

    describe("#validate", () => {
        it("should validate value", () => {
            validation.validate(5, 1, 2, 3, 4, 5);
        });

        it("should throw error for invalid value", () => {
            expect(() => validation.validate(6, 1, 2, 3, 4, 5)).to.throw(ValidationError);
        });
    });
});
