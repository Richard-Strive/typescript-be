import { check } from "express-validator";

const valideMid = () => {
  return [
    check("firstName", "Please the field shouldn't be empty").not().isEmpty(),
    check("surname", "Please the field shouldn't be empty").not().isEmpty(),
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

export default valideMid;
