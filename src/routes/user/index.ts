import express, { Request, Response, NextFunction } from "express";

import { body, validationResult } from "express-validator";

import User from "./schema";

const route = express.Router();

// "firstName": "Sky",
// "surname":"Bellomare",
// "title":"Mrs.",
// "email": "cillals@gmail.com",
// "phoneNumber": "3516573795",
// "locationOfRecidence":"Isernia",
// "cart":"One",
// "favProd": "two",
// "password":"123456"

//Registration
route.post(
  "/register",
  body("email").isEmail().withMessage("Please choose a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Please choose a longer password"),
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
      const newUser = new User({
        ...req.body,
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
