class UserRegistrationReq {
  password: String = undefined;
  firstName: String = undefined;
  email: String = undefined;
  phoneNumber: String = undefined;
  title: String = undefined;
  surname: String = undefined;
  locationOfRecidence: String = undefined;
}

class UserRegistrationRes {
  firstName: String = undefined;
  email: String = undefined;
  locationOfRecidence: String = undefined;
}
export { UserRegistrationReq, UserRegistrationRes };
