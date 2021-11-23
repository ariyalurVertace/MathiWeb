import * as Yup from "yup"
import { Message } from "../helpers/language_helper"

export const loginValidation = Yup.object().shape({
  Username: Yup.string().required(Message("username.required")),
  // Password: Yup.string()
  //   .required(Message("password.required"))
  //   .min(8, Message("password.lengthinvalid"))
  //   .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, Message("password.invalid"))
  // ,
})
export const departmentLevelValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
})


export const LeaveValidation = Yup.object().shape({
  StartTime: Yup.string().required("Please select start date!"),
  EndTime: Yup.string().required("Please select end date!"),
  LeaveType: Yup.string().required("Please select leave type!"),
  Reason: Yup.string().required("Please enter reason!"),
  //Url: Yup.string().required("Please upload valid proof!"),
})
export const leavevalidation = Yup.object().shape({
  StartTime: Yup.string().required("Please select start date!"),
  EndTime: Yup.string().required("Please select end date!"),
  LeaveType: Yup.string().required("Please select leave type!"),
  Reason: Yup.string().required("Please enter reason!"),
  Proof: Yup.string().required("Please upload valid proof!"),
})
export const StationValidation = Yup.object().shape({
  Name: Yup.string().required("Please enter valid Name!"),
  // District: Yup.string().required("Please select district!").nullable(),
  // State: Yup.string().required("Please select state!").nullable(),
  //  Taluk: Yup.string().required("Please select taluk!").nullable(),
  PhoneNumber: Yup.string()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
      Message("PhoneNumber.invalid")
    )
    .required(Message("PhoneNumber.required")),
})

export const PoliceValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
  DesignationID: Yup.string().required(Message("DesignationID.required")),
  MobileNumber1: Yup.string()
    .matches(/^[6789][0-9]{9}$/, Message("MobileNumber1.invalid"))
    .required(Message("MobileNumber1.required")),
  Email: Yup.string().email().required(Message("Email.required")),
})
export const OfficeTypeValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
})
export const DesignationValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
  Rank: Yup.string().matches(/^[0-9\b]+$/, Message("Rank.invalid"))
    .required(Message("Rank.required"))
  ,
})
export const DepartmentDesignationValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
  Rank: Yup.string().matches(/^[0-9\b]+$/, Message("Rank.invalid"))
    .required(Message("Rank.required"))
  ,
})
export const roleValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
})
export const postingValidation = Yup.object().shape({
  Designation: Yup.string().required(Message("Designation.required")),
  Officer: Yup.string().required(Message("Officer.required")),
  Area: Yup.string().required(Message("Area.required")),
})
export const EbeatLocationTypeValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
})
export const StationOfficeValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
  AreaID: Yup.string().required(Message("AreaID.required")),
  Address: Yup.string().required(Message("Address.required")),
})

export const AreaStationOfficeValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
  Address: Yup.string().required(Message("Address.required")),
})

export const DepartmentAreaPostingValidation = Yup.object().shape({
  DepartmentOfficial: Yup.string().required(Message("DepartmentOfficial.required")),
  WelfareDepartmentDesignation: Yup.string().required(Message("WelfareDepartmentDesignation.required")),

})

export const ApiModuleValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
  Route: Yup.string().required(Message("Route.required")),
  Method: Yup.string().required(Message("Method.required")),
})

export const DepartmentValidation = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
})
export const LocationValidation = Yup.object().shape({
  Name: Yup.string().required("Please enter valid Name!"),
  Location: Yup.string().required("Please enter valid Building/Block/Floor!"),
  Room: Yup.string().required("Please enter valid Room Number/Name!"),
})

export const feedbackTypeValidation = Yup.object().shape({
  Name: Yup.string().required(Message("feedbacktype.name.required")),
})

export const ReachmeRequestValidation = Yup.object().shape({
  levelName: Yup.string().required(Message("feedbacktype.name.required")),
})


export const DepartmentLevelValidation = Yup.object().shape({
  levelName: Yup.string().required(Message("DepartmentLevel.name.required")),
})


export const RequestTypeValidation = Yup.object().shape({
  levelName: Yup.string().required(Message("RequestType.name.required")),
  DesignationID: Yup.string().required(Message("DesignationID.name.required")),
})

export const EbeatLocationValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
  EBeatLocationTypeID: Yup.string().required(
    Message("EbeatLoacationTypeId.required")
  ),
  Address: Yup.string().required(Message("Address.required")),
})
export const AreaValidation = Yup.object().shape({
  Name: Yup.string().required(Message("feedbacktype.name.required")),
  LevelID: Yup.string().required(Message("Level.required")),
})
export const levelValidation = Yup.object().shape({
  levelName: Yup.string().required(Message("levelName.name.required")),
  LevelID: Yup.string().required(Message("Level.required")),
})
export const ForgotPasswordValidation = Yup.object().shape({
  Username: Yup.string().required(Message("username.required")),
})

export const EntityStateValidation = Yup.object().shape({
  Name: Yup.string().required(Message("Name.required")),
})
