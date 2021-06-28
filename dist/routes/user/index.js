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
const user_auth_1 = require("./user-auth");
const route = express_1.default.Router();
/**
 * 1) TypeScript giving error about: allowing top-level "await" only when the module it's set to esnext or system
 *  and the target should be es2017 and above
 *
 * 2) TypeScript giving error about: setted above, and changed all imports to require
 *  express it's not no more recognized.
 *
 * 3) For those reasons i'm using the jwt methods synch
 *
 * 4) Adding  the algorithm opt i receive a strange error: Error: error:0909006C:PEM routines:get_name:no start line
 */
//Registration
route.post("/register", user_validation_1.default(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userRegistrationReq = lodash_1.default.pick(req.body, Object.keys(new user_to_1.UserRegistrationReq()));
        //check if the email it's already stored
        const isMatchEmail = yield schema_1.default.findOne({
            email: req.body.email,
        });
        if (isMatchEmail) {
            res
                .status(400)
                .send("Sorry but this email it's already in use. Please choose another one.");
        }
        const userDoc = new schema_1.default(userRegistrationReq);
        const savedNewUser = yield userDoc.save();
        const userRegistrationRes = lodash_1.default.pick(savedNewUser, Object.keys(new user_to_1.UserRegistrationRes()));
        next();
        res.status(201).send(userRegistrationRes);
    }
    catch (error) {
        console.log(error);
        next(error);
        res.status(500).send("Generic Server Error");
    }
}));
//Login
route.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const userFound = yield schema_1.default.findByCredentials(email, password);
            const newUserFound = userFound.toJSON();
            if (userFound) {
                const { email } = userFound;
                const token = user_auth_1.genToken({ email });
                res.status(200).send(token);
                next();
            }
            else {
                res
                    .status(400)
                    .send("no user found with this match or the passward it's incorrect");
            }
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
route.get("/me", user_auth_1.autho, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        res.status(200).send(user);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
exports.default = route;
//
//# sourceMappingURL=index.js.map