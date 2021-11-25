import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/authentication/Login"
import Logout from "../pages/authentication/Logout"
//import ForgetPasswordPage from "../pages/authentication/newforgotpassword"

// Dashboard
import ApiModule from "../pages/ApiModule/crud"
import Role from "../pages/role/list"
import Category from "../pages/Category/list"

const authProtectedRoutes = [
  { path: "/logout", component: Logout },
  { path: "/api-module", component: ApiModule },
  { path: "/role", component: Role },
  { path: "/category", component: Category },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
  //{ path: "/forgot-password", component: ForgetPasswordPage },
]

export { authProtectedRoutes, publicRoutes }
