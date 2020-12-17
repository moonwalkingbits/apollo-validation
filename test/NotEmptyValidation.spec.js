/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { NotEmptyValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("NotEmptyValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new NotEmptyValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("not_empty");
        });
    });

    describe("#validate", () => {
        it("should validate non empty values", () => {
            validation.validate("not empty");
            validation.validate([1, 2, 3]);
            validation.validate(new Set([1, 2, 3]));
            validation.validate(new Map(Object.entries({key: "value"})));
        });

        it("should throw error for empty values", () => {
            expect(() => validation.validate("")).to.throw(ValidationError);
            expect(() => validation.validate([])).to.throw(ValidationError);
            expect(() => validation.validate(new Set())).to.throw(ValidationError);
            expect(() => validation.validate(new Map())).to.throw(ValidationError);
        });

        it("should throw error for invalid type", () => {
            expect(() => validation.validate(0)).to.throw(Error);
            expect(() => validation.validate(null)).to.throw(Error);
            expect(() => validation.validate(void 0)).to.throw(Error);
            expect(() => validation.validate({})).to.throw(Error);
        });
    });
});
