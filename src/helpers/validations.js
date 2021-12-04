import * as Yup from "yup"
import { Message } from "../helpers/language_helper"

export const loginValidation = Yup.object().shape({
  Username: Yup.string().required(Message("username.required")),
  Password: Yup.string().required(Message("password.required")),
  // .min(8, Message("password.lengthinvalid"))
  // .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, Message("password.invalid"))
})
export const categoryValidation = Yup.object().shape({
  name: Yup.string().required(Message("Name.required")),
})
export const roleValidation = Yup.object().shape({
  name: Yup.string().required(Message("Name.required")),
})

export const ApiModuleValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
  Route: Yup.string().required(Message("Route.required")),
  Method: Yup.string().required(Message("Method.required")),
})

export const ForgotPasswordValidation = Yup.object().shape({
  Username: Yup.string().required(Message("username.required")),
})
export const vendorValidation = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  phonenumber:Yup.string().required("Phone Number is required"),
})
