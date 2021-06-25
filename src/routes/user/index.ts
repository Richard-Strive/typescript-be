import express, { Request, Response, NextFunction } from "express";
import _, { reject } from "lodash";
import { validationResult } from "express-validator";
import valideMid from "./user-validation";
import User from "./schema";
import { UserRegistrationReq, UserRegistrationRes } from "./user-to";
import jwt from "jsonwebtoken";
import { resolve } from "path/posix";

const route = express.Router();

// jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: '1h' });

// jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
//   console.log(token);
// });

// jwt.verify(token, 'shhhhh', function(err, decoded) {
//   console.log(decoded.foo) // bar
// });

const tokenGen = () => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { foo: "bar" },
      process.env.SECRET_KEY,
      { algorithm: "RS256" },
      function (err, token) {
        resolve(token);
      }
    );
  });
};

const otherToken = async () => {
  try {
    const thaToken = await tokenGen();
    console.log("This is tha token", thaToken);
  } catch (error) {
    console.log(error);
  }
};

otherToken();

//Registration
route.post(
  "/register",
  valideMid(),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userRegistrationReq = _.pick(
        req.body,
        Object.keys(new UserRegistrationReq())
      );

      //check if the email it's already stored
      const isMatchEmail = await User.findOne({
        email: req.body.email,
      });
      if (isMatchEmail) {
        res
          .status(400)
          .send(
            "Sorry but this email it's already in use. Please choose another one."
          );
      }
      const userDoc = new User(userRegistrationReq);
      const savedNewUser = await userDoc.save();
      const userRegistrationRes = _.pick(
        savedNewUser,
        Object.keys(new UserRegistrationRes())
      );
      next();
      res.status(201).send(userRegistrationRes);
    } catch (error) {
      console.log(error);
      next(error);
      res.status(500).send("Generic Server Error");
    }
  }
);

//Login
route.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const userFound = await User.findByCredentials(email, password);

        if (userFound) {
          res.status(200).send(userFound);
          next();
        } else {
          res
            .status(400)
            .send(
              "no user found with this match or the passward it's incorrect"
            );
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default route;
