/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { IncludeValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("IncludeValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new IncludeValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("include");
        });
    });

    describe("#validate", () => {
        it("should validate value", () => {
            validation.validate(5, [1, 2, 3, 4, 5]);
            validation.validate("es", "test");
        });

        it("should throw error for invalid value", () => {
            expect(() => validation.validate(6, [1, 2, 3, 4, 5])).to.throw(ValidationError);
            expect(() => validation.validate("ess", "test")).to.throw(ValidationError);
        });
    });
});
