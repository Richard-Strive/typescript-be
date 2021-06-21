import express, { Request, Response, NextFunction } from "express";

import { body, validationResult } from "express-validator";

import valideMid from "./user-validation";

import User from "./schema";

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
      const {
        firstName,
        email,
        password,
        phoneNumber,
        title,
        surname,
        locationOfRecidence,
      } = req.body;

      const newUser = new User({
        firstName,
        email,
        password,
        phoneNumber,
        title,
        surname,
        locationOfRecidence,
      });

      await newUser.save();
      const { _id } = newUser;
      next();
      res.status(201).send(_id);
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
