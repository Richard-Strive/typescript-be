import { Schema, model, Model } from "mongoose";
import express from "express";
import bcrypt from "bcrypt";

// trim:true it's used to get rid of redundant white spaces

interface User {
  name: string;
  surname: string;
  title: string;
  email: string;
  phoneNumber: number;
  locationOfRecidence: string;
  password: string;
  cart: Array<string>;
  favProd: Array<string>;
}

const UserSchema = new Schema<User, UserModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

interface UserModel extends Model<User> {
  findByCredentials(email: string, password: string): any;
}

UserSchema.static(
  "findByCredentials",
  async function findByCredentials(email: string, plainPW: string) {
    if (email && plainPW) {
      const user = await this.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(plainPW, user.password);

        if (isMatch) return user;
        else console.log("Passord incorrect");
      } else {
        console.log("No user with this credentials");
      }
    }
  }
);

UserSchema.pre("save", async function (next: express.NextFunction) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

export default model<User, UserModel>("User", UserSchema);
