import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/authentication/Login"
import Logout from "../pages/authentication/Logout"
//import ForgetPasswordPage from "../pages/authentication/newforgotpassword"

// Dashboard

import ApiModule from "../pages/ApiModule/crud"
import Role from "../pages/role/list"
import catagaries from "../pages/catagory/list"
import Product from "../pages/product/pro"
import cmscontent from "../pages/Cmscontent/cms"
import district  from "../pages/district/dis"

const authProtectedRoutes = [
 
  { path: "/logout", component: Logout },
  { path: "/api-module", component: ApiModule },
  { path: "/bharathi", component: catagaries },
  { path: "/product", component: Product },
  { path: "/cmscontent", component: cmscontent },
  { path: "/district", component: district },

  
  { path: "/role", component: Role },
  

  { path: "/",exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
  


  //{ path: "/forgot-password", component: ForgetPasswordPage },
]

export { authProtectedRoutes, publicRoutes }