export const BASE_URL = process.env.REACT_APP_BASE_URL
export const ENABLE_MAINTENANCE_MODE = JSON.parse(
  process.env.REACT_APP_ENABLE_MAINTENANCE_MODE
)

export const authentication = {
  login: BASE_URL + "api/user/login",
  ChangePassword: BASE_URL + "api/user/changepassword",
}

export const district = {
  GetAllWithOutPagination: BASE_URL + "district",
  GetAll: BASE_URL + "district",
  Create: BASE_URL + "district",
  Delete: BASE_URL + "district/",
  Update: BASE_URL + "district/",
  GetOne: BASE_URL + "district/",
}
export const state = {
  GetAll: BASE_URL + "state",
  GetAllWithOutPagination: BASE_URL + "state",
  Create: BASE_URL + "state",
  Delete: BASE_URL + "state/",
  Update: BASE_URL + "state/",
  GetOne: BASE_URL + "state/",
}

export const categories = {
  GetAll: BASE_URL + "category",
  GetAllWithOutPagination: BASE_URL + "category",
  Create: BASE_URL + "category",
  Delete: BASE_URL + "category/",
  Update: BASE_URL + "category/",
  GetOne: BASE_URL + "category/",
}

export const apimodule = {
  GetAll: BASE_URL + "api/apimodule/",
  Create: BASE_URL + "api/apimodule/",
  Delete: BASE_URL + "api/apimodule/",
  Update: BASE_URL + "api/apimodule/",
  GetOne: BASE_URL + "api/apimodule/",
}


export const product = {
  GetAll: BASE_URL + "product",
  GetAllWithOutPagination: BASE_URL + "product",
  Create: BASE_URL + "product",
  Delete: BASE_URL + "product/",
  Update: BASE_URL + "product/",
  GetOne: BASE_URL + "product/",
}

export const cmscontent= {
  GetAll: BASE_URL + "cmscontent",
  GetAllWithOutPagination: BASE_URL + "cmscontent",
  Create: BASE_URL + "cmscontent",
  Delete: BASE_URL + "cmscontent/",
  Update: BASE_URL + "cmscontent/",
  GetOne: BASE_URL + "cmscontent/",
}
export const fileUpload = {
  upload: "api/fileupload/",
}
export const role = {
  GetAll: BASE_URL + "api/role/",
  Create: BASE_URL + "api/role/",
  Delete: BASE_URL + "api/role/",
  Update: BASE_URL + "api/role/",
  GetOne: BASE_URL + "api/role/",
}
export const apimoduleroleaccess = {
  GetOne: BASE_URL + "api/apimoduleroleaccess/",
  Create: BASE_URL + "api/apimoduleroleaccess/",
}

export const banner = {
  GetAll: BASE_URL + "banner",
  GetAllWithOutPagination: BASE_URL + "banner",
  Create: BASE_URL + "banner",
  Delete: BASE_URL + "banner/",
  Update: BASE_URL + "banner/",
  GetOne: BASE_URL + "banner/",
}
export const notification = {
  GetAll: BASE_URL + "notification",
  GetAllWithOutPagination: BASE_URL + "notification",
  Create: BASE_URL + "notification",
  Delete: BASE_URL + "notification/",
  Update: BASE_URL + "notification/",
  GetOne: BASE_URL + "notification/",
}
export const user = {
  GetAll: BASE_URL + "user",
  GetAllWithOutPagination: BASE_URL + "user",
  Create: BASE_URL + "user",
  Delete: BASE_URL + "user/",
  Update: BASE_URL + "user/",
  GetOne: BASE_URL + "user/",
}
