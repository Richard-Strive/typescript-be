import { Schema, model } from "mongoose";

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

const UserSchema = new Schema<User>({
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
  email: { type: String, required: true },
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
});

UserSchema.statics.findByCredentials = async function (
  email: string,
  plainPW: string
): Promise<void> {
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
};

export default model<User>("User", UserSchema);
