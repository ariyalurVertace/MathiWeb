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
import Banner from "pages/Banner/list"
import Product from "pages/Product/list"
import Notification from "pages/Notification/list"
import User from "pages/User/list"
import cmscontent from "../pages/Cmscontent/cms"
import district  from "../pages/district/dis"
import Vendor from "../pages/Vendor/list"
import State from "../pages/State/list"

const authProtectedRoutes = [
 
  { path: "/logout", component: Logout },
  { path: "/api-module", component: ApiModule },
  { path: "/cmscontent", component: cmscontent },
  { path: "/district", component: district },
  { path: "/category", component: Category },
  { path: "/banner", component: Banner },
  { path: "/product", component: Product },
  { path: "/notification", component: Notification },
  { path: "/user", component: User },
  { path: "/role", component: Role },
  { path: "/", exact: true, component: () => <Redirect to="/category" /> },

 { path: "/vendor", component: Vendor },
 { path: "/state", component: State },
 
]

const publicRoutes = [
  { path: "/login", component: Login },
  


  //{ path: "/forgot-password", component: ForgetPasswordPage },
]

export { authProtectedRoutes, publicRoutes }