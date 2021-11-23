import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/authentication/Login"
import Logout from "../pages/authentication/Logout"
//import ForgetPasswordPage from "../pages/authentication/newforgotpassword"

// Dashboard
import Dashboard from "../pages/dashboard/index"
// import Leave from "../pages/Leave/crud";
import PoliceOfficer from "../pages/policeofficer/crud"
import OfficeType from "../pages/officeType/crud"
import PoliceOffice from "../pages/policestation/crud"
import Level from "../pages/level/list"
import DepartmentLevel from "../pages/DepartmentLevel/list"
import DepartmentArea from "../pages/DepartmentArea/list"
import Station from "../pages/station/crud"
import Area from "../pages/area/list"
import MangageArea from "../pages/area/managearea"
import AreaManage from "../pages/area/manage"
import AreaManageDepartment from "../pages/DepartmentArea/managedepartmentarea"

import FeedbackType from "../pages/feedbacktype"
import Designation from "../pages/designation/crud"
import ApiModule from "../pages/ApiModule/crud"
import Role from "../pages/role/list"
import postings from "../pages/postings/list"
import EbeatLocationType from "../pages/ebeatlocationtype/crud"
import EbeatLocation from "../pages/ebeatlocation/crud"
import FeedBack from "../pages/feedback/crud"
import manageDepartment from "../pages/department/manage"
import designationDepartment from "../pages/department/designation"
import EntityState from "../pages/Entitystate/crud"
import RequestType from "../pages/requestType/list"
import ReachmeRequestType from "../pages/reachmeRequestType/list"
import Department from "../pages/department/crud"
import StationDetail from "../pages/policestation/stationDetail"
import Privacy from "../pages/privacy/crud"
import UserQR from "../pages/user/crud"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/logout", component: Logout },
  { path: "/area", component: Area },
  { path: "/level", component: Level },
  { path: "/department-level/:id", component: DepartmentLevel },
  { path: "/department-area", component: DepartmentArea },
  { path: "/station", component: Station },
  { path: "/policeOfficer", component: PoliceOfficer },
  { path: "/police-station", component: PoliceOffice },
  { path: "/designation", component: Designation },
  { path: "/mangagearea", component: MangageArea },
  { path: "/e-beat-location-type", component: EbeatLocationType },
  { path: "/e-beat-location", component: EbeatLocation },
  { path: "/entity-state", component: EntityState },
  { path: "/request-type", component: RequestType },
  { path: "/reachme-request-type", component: ReachmeRequestType },

  // { path: "/leave", component: Leave },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "/area-manage/:parentarea?/:areaid?", component: AreaManage },

  { path: "/area-manage-department/:departmentid/:parentarea?/:areaid?", exact: true, component: AreaManageDepartment },
  // { path: "/area-manage-department", exact: true, component: AreaManageDepartment },

  // { path: "/leave", component: Leave },
  { path: "/feedback", component: FeedBack },
  { path: "/feedback-type", component: FeedbackType },
  { path: "/office-type", component: OfficeType },
  { path: "/api-module", component: ApiModule },
  { path: "/role", component: Role },
  { path: "/postings", component: postings },
  { path: "/department", component: Department },
  // { path: "/designation-department", component: designationDepartment },
  {
    path: "/manage-department/:id/designation-department",
    component: designationDepartment,
  },
  {
    path: "/manage-department/:id/department-level",
    component: DepartmentLevel,
  },

  {
    path: "/manage-department/:id/department-area/:parentarea?",
    component: AreaManageDepartment,
  },
  { path: "/designation-department/:id", component: designationDepartment },
  { path: "/manage-department/:id", component: manageDepartment },
  { path: "/manage-department", component: manageDepartment },
  { path: "/station-details/:id", component: StationDetail },
]

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/privacy", component: Privacy },
  { path: "/user/:id", component: UserQR },


  //{ path: "/forgot-password", component: ForgetPasswordPage },
]

export { authProtectedRoutes, publicRoutes }
