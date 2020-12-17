/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { EmptyValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("EmptyValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new EmptyValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("empty");
        });
    });

    describe("#validate", () => {
        it("should validate empty values", () => {
            validation.validate("");
            validation.validate([]);
            validation.validate(new Set());
            validation.validate(new Map());
        });

        it("should throw error for non empty values", () => {
            expect(() => validation.validate("not empty")).to.throw(ValidationError);
            expect(() => validation.validate([1, 2, 3])).to.throw(ValidationError);
            expect(() => validation.validate(new Set([1, 2, 3]))).to.throw(ValidationError);
            expect(() => validation.validate(new Map(Object.entries({key: "value"})))).to.throw(ValidationError);
        });

        it("should throw error for invalid type", () => {
            expect(() => validation.validate(0)).to.throw(Error);
            expect(() => validation.validate(null)).to.throw(Error);
            expect(() => validation.validate(void 0)).to.throw(Error);
            expect(() => validation.validate({})).to.throw(Error);
        });
    });
});
