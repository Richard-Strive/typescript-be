import express, { Request, Response, NextFunction } from "express";
import _, { reject } from "lodash";
import { validationResult } from "express-validator";
import valideMid from "./user-validation";
import User from "./schema";
import { UserRegistrationReq, UserRegistrationRes } from "./user-to";
import { genToken, autho } from "./user-auth";

const route = express.Router();

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
      res.status(201).send(userRegistrationRes);
    } catch (error) {
      console.log(error);
      // next(error);
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
        const newUserFound = userFound.toJSON();
        if (userFound) {
          const { email } = userFound;
          const token = genToken({ email });

          res.status(200).send(token);
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

      res.status(500).send("Generic Server Error");
    }
  }
);

route.get(
  "/me",
  autho,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Generic Server Error");
      // next(error);
    }
  }
);

export default route;

//
