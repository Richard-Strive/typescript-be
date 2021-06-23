"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistrationRes = exports.UserRegistrationReq = void 0;
class UserRegistrationReq {
    constructor() {
        this.password = undefined;
        this.firstName = undefined;
        this.email = undefined;
        this.phoneNumber = undefined;
        this.title = undefined;
        this.surname = undefined;
        this.locationOfRecidence = undefined;
    }
}
exports.UserRegistrationReq = UserRegistrationReq;
class UserRegistrationRes {
    constructor() {
        this.firstName = undefined;
        this.email = undefined;
        this.locationOfRecidence = undefined;
    }
}
exports.UserRegistrationRes = UserRegistrationRes;
//# sourceMappingURL=user-to.js.map