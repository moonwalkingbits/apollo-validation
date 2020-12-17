/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { MatchValidation, ValidationError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("MatchValidation", () => {
    let validation;

    beforeEach(() => {
        validation = new MatchValidation();
    });

    describe("#getIdentifier", () => {
        it("should provide validation identifier", () => {
            expect(validation.getIdentifier()).to.eql("match");
        });
    });

    describe("#validate", () => {
        it("should throw error if invalid value type", () => {
            expect(() => validation.validate(0)).to.throw(Error);
        });

        it("should throw error if invalid pattern type", () => {
            expect(() => validation.validate("string", 0)).to.throw(Error);
        });

        it("should validate string with string pattern", () => {
            validation.validate("string", "str.{1}ng");
        });

        it("should validate string with regular expression", () => {
            validation.validate("string", /str.{1}ng/);
        });

        it("should throw error if pattern does not match", () => {
            expect(() => validation.validate("string", /str.{2}ng/)).to.throw(ValidationError);
        });
    });
});
