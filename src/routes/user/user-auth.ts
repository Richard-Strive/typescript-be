import jwt from "jsonwebtoken";
import express from "express";
import User from "./schema";

declare module "jsonwebtoken" {
  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions
  ): { email: string };
}

declare global {
  namespace Express {
    interface Request {
      user: object;
    }
  }
}
// declare global {
//   namespace Error {
//     interface Request {
//       user: object;
//     }
//   }
// }

interface Error {
  httpStatusCode: number;
}

const genToken = (userObj: object) =>
  jwt.sign(userObj, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

const autho = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token: string = req.headers.authorization.replace("Bearer ", "");

    const decoded: string | jwt.JwtPayload = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    const user = await User.findOne({ email: decoded.email });

    if (decoded) {
      req.user = user;
    }
    next();
  } catch (error) {
    console.log(error);

    res
      .status(401)
      .send(
        "Invalid token: probably you are using a malformed token or it's expired."
      );
    next(error);
  }
};

export { genToken, autho };

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
