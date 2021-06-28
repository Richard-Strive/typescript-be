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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        dropDups: true,
        lowercase: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    locationOfRecidence: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    cart: { type: Array, required: false },
    favProd: { type: Array, required: false },
}, {
    timestamps: true,
});
UserSchema.static("findByCredentials", function findByCredentials(email, plainPW) {
    return __awaiter(this, void 0, void 0, function* () {
        if (email && plainPW) {
            const user = yield this.findOne({ email });
            if (user) {
                const isMatch = yield bcrypt_1.default.compare(plainPW, user.password);
                if (isMatch)
                    return user;
                else
                    console.log("Passord incorrect");
            }
            else {
                console.log("No user with this credentials");
            }
        }
    });
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, 10);
        next();
    });
});
exports.default = mongoose_1.model("User", UserSchema);
//module.exports=model("User", UserSchema)
//# sourceMappingURL=schema.js.map