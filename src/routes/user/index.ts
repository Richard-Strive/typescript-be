import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

import User from "./schema";

const route = express.Router();

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
      return res.status(400).json({ errors: errors.array });
    }

    try {
    } catch (error) {}
  }
);
