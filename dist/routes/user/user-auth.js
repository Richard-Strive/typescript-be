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
exports.autho = exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = __importDefault(require("./schema"));
const genToken = (userObj) => jsonwebtoken_1.default.sign(userObj, process.env.SECRET_KEY, {
    expiresIn: "1h",
});
exports.genToken = genToken;
const autho = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = yield schema_1.default.findOne({ email: decoded.email });
        if (decoded) {
            req.user = user;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .send("Invalid token: probably you are using a malformed token or it's expired.");
        next(error);
    }
});
exports.autho = autho;
// jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: '1h' });
// jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
//   console.log(token);
// });
// jwt.verify(token, 'shhhhh', function(err, decoded) {
//   console.log(decoded.foo) // bar
// });
// const generateJWT = (payload: object) => {
// };
// const tokenPromise = new Promise((res, rej) =>
//   jwt.sign(
//     payload,
//     process.env.SECRET_KEY,
//     { expiresIn: "1h" },
//     (err, token) => {
//       if (err) rej(err);
//       res(token);
//     }
//   )
// );
// const tok = tokenPromise
//   .then((data) => {
//     return data;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// let locos: any;
// const tokenz = async () => {
//   try {
//     const token = await tokenPromise;
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const autho = (saveToken: string) => {
//   const decoded = jwt.verify(saveToken, process.env.SECRET_KEY);
// };
//# sourceMappingURL=user-auth.js.map