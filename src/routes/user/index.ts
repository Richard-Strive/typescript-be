import express, { Request, Response, NextFunction } from "express";

import _ from "lodash";

import { validationResult } from "express-validator";

import valideMid from "./user-validation";

import User from "./schema";

import { UserRegistrationReq, UserRegistrationRes } from "./user-to";

const route = express.Router();

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
      const newObject = _.pick(
        req.body,
        Object.keys(new UserRegistrationReq())
      );

      const newUser = new User(newObject);

      console.log("This is the cool thing that i've learned");

      await newUser.save();

      const newObject2 = _.pick(
        newUser,
        Object.keys(new UserRegistrationRes())
      );

      next();
      res.status(201).send(newObject2);
    } catch (error) {
      console.log(error);
      next(error);
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
          res.status(400).send("no user found");
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default route;
