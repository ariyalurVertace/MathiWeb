import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/authentication/Login"
import Logout from "../pages/authentication/Logout"
//import ForgetPasswordPage from "../pages/authentication/newforgotpassword"

// Dashboard

import ApiModule from "../pages/ApiModule/crud"
import Role from "../pages/role/list"
import catagaries from "../pages/catagaries/list"
import banner from "../pages/banner/list1"

const authProtectedRoutes = [
 
  { path: "/logout", component: Logout },
  { path: "/api-module", component: ApiModule },
  { path: "/vengat", component: catagaries },
  { path: "/vengat1", component: banner },

  
  { path: "/role", component: Role },
  

  { path: "/",exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
  


  //{ path: "/forgot-password", component: ForgetPasswordPage },
]

export { authProtectedRoutes, publicRoutes }