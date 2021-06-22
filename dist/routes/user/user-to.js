"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginReq = exports.UserRegistrationReq = void 0;
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
class UserLoginReq {
    constructor() {
        this.password = undefined;
        this.email = undefined;
    }
}
exports.UserLoginReq = UserLoginReq;
//# sourceMappingURL=user-to.js.map