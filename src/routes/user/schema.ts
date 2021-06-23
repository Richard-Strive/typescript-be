import { Schema, model, Model } from "mongoose";

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
    },
    surname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    locationOfRecidence: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
        const isMatch = (await plainPW) == user.password;

        if (isMatch) return user;
        else console.log("Passord incorrect");
      } else {
        console.log("No user with this credentials");
      }
    }
  }
);

export default model<User, UserModel>("User", UserSchema);
