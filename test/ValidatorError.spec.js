/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ValidatorError } from "@moonwalkingbits/apollo-validation";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");

describe("ValidatorError", () => {
    describe("#errors", () => {
        it("should provide error object for all thrown errors", () => {
            const error1 = new ValidatorError("Error message 1", "property_1", null);
            const error2 = new ValidatorError("Error message 2", "property_3", error1);
            const error3 = new ValidatorError("Error message 3", "property_2", error2);
            const error4 = new ValidatorError("Error message 4", "property_3", error3);

            expect(error4.errors).to.eql({
                property_1: ["Error message 1"],
                property_2: ["Error message 3"],
                property_3: [
                    "Error message 2",
                    "Error message 4"
                ]
            });
        });
    });
});
