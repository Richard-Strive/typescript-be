"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const valideMid = () => {
    return [
        express_validator_1.check("firstName", "Please the field shouldn't be empty").not().isEmpty(),
        express_validator_1.check("surname", "Please the field shouldn't be empty").not().isEmpty(),
        express_validator_1.check("title", "Please the field shouldn't be empty or it should contain letters")
            .not()
            .isEmpty()
            .isAlpha(),
        express_validator_1.check("email", "Please choose a valid email").isEmail(),
        express_validator_1.check("phoneNumber", "Please choose a IT format phone number").isMobilePhone(["it-IT"]),
        express_validator_1.check("locationOfRecidence", "This field shouldn't be Empty")
            .not()
            .isEmpty()
            .isLength({
            min: 5,
        }),
        express_validator_1.check("password", "Please make sure to add special chars and numbers to your password").isStrongPassword(),
    ];
};
exports.default = valideMid;
//# sourceMappingURL=user-validation.js.map