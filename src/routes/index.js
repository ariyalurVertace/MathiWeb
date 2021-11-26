import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/authentication/Login"
import Logout from "../pages/authentication/Logout"
//import ForgetPasswordPage from "../pages/authentication/newforgotpassword"

// Dashboard
import ApiModule from "../pages/ApiModule/crud"
import Role from "../pages/role/list"
import Vendor from "../pages/Vendor/list"
import State from "../pages/State/list"


const authProtectedRoutes = [
 { path: "/logout", component: Logout },
 { path: "/role", component: Role },
 { path: "/vendor", component: Vendor },
 { path: "/state", component: State },
 { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
]

const publicRoutes = [
  { path: "/login", component: Login },
  //{ path: "/forgot-password", component: ForgetPasswordPage },
]

export { authProtectedRoutes, publicRoutes } 
