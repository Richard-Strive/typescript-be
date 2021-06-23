"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const express_validator_1 = require("express-validator");
const user_validation_1 = __importDefault(require("./user-validation"));
const schema_1 = __importDefault(require("./schema"));
const user_to_1 = require("./user-to");
const route = express_1.default.Router();
//Registration
route.post("/register", user_validation_1.default(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userRegistrationReq = lodash_1.default.pick(req.body, Object.keys(new user_to_1.UserRegistrationReq()));
        const savedNewUser = new schema_1.default(userRegistrationReq);
        console.log("This is the cool thing that i've learned");
        yield savedNewUser.save();
        const userRegistrationRes = lodash_1.default.pick(savedNewUser, Object.keys(new user_to_1.UserRegistrationRes()));
        next();
        res.status(201).send(userRegistrationRes);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
//Login
route.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const userFound = yield schema_1.default.findByCredentials(email, password);
            if (userFound) {
                res.status(200).send(userFound);
                next();
            }
            else {
                res.status(400).send("no user found");
            }
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
exports.default = route;
//# sourceMappingURL=index.js.map