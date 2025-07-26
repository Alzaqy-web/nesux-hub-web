import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  referredBy: Yup.string().optional(),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1)
    .minNumbers(1)
    .minUppercase(1)
    .minSymbols(1),
});
