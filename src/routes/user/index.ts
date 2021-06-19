import express, { Request, Response, NextFunction } from "express";

import { body, validationResult, check } from "express-validator";

import User from "./schema";

const route = express.Router();

const valideMid = () => {
  return [
    check("firstName", "Please the field shouldn't be empty")
      .not()
      .isEmpty()
      .isAlpha(),
    check("surname", "Please the field shouldn't be empty")
      .not()
      .isEmpty()
      .isAlpha(),
    check(
      "title",
      "Please the field shouldn't be empty or it should contain letters"
    )
      .not()
      .isEmpty()
      .isAlpha(),
    check("email", "Please choose a valid email").isEmail(),
    check(
      "phoneNumber",
      "Please choose a IT format phone number"
    ).isMobilePhone(["it-IT"]),
    check("locationOfRecidence", "This field shouldn't be Empty")
      .not()
      .isEmpty()
      .isLength({
        min: 5,
      }),
    check(
      "password",
      "Please make sure to add special chars and numbers to your password"
    ).isStrongPassword(),
  ];
};

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
