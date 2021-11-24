export const BASE_URL = process.env.REACT_APP_BASE_URL
export const ENABLE_MAINTENANCE_MODE = JSON.parse(
  process.env.REACT_APP_ENABLE_MAINTENANCE_MODE
)

export const Login = BASE_URL + "admin/signin"

export const authentication = {
  login: BASE_URL + "api/user/login",
  ChangePassword: BASE_URL + "api/user/changepassword",
}

export const area = {
  GetAll: BASE_URL + "api/area/",
  GetOne: BASE_URL + "api/area/",
  Create: BASE_URL + "api/area/",
  Update: BASE_URL + "/api/area/",
  GetPaginated: BASE_URL + "area",
  Delete: BASE_URL + "api/area/",
  DeleteAll: BASE_URL + "area/deleteall/",
  GetPopulatedAreaDetail: BASE_URL + "area/parents/",
  Areanextlevels: BASE_URL + "area/nextareas/",
  GetMasterRegions: BASE_URL + "area/masterregions",
  //GetPopulatedAreaDetail: BASE_URL + "area/parents/",
  GetOneNextLevel: BASE_URL + "api/level/next/",
  GetPopulatedAreaDetail: BASE_URL + "area/parents/",
  Regionnextlevels: BASE_URL + "area/nextlevelarea/",
  GetChildrenAreas: BASE_URL + "child_areas",
}

export const departmentArea = {
  GetAll: BASE_URL + "api/departmentarea/",
  GetOne: BASE_URL + "api/departmentarea/",
  Create: BASE_URL + "api/departmentarea/",
  Update: BASE_URL + "/api/departmentarea/",
  Delete: BASE_URL + "api/departmentarea/",
  GetPopulatedAreaDetail: BASE_URL + "api/departmentarea/parents/",
}

export const level = {
  GetAll: BASE_URL + "/api/level/",
  GetOne: BASE_URL + "api/level/",
  Create: BASE_URL + "/api/level/",
  Update: BASE_URL + "/api/level/",
  GetPaginated: BASE_URL + "level",
  GetChildernLevel: "level/children/",
  Delete: BASE_URL + "api/level/",
  levelnextlevel: BASE_URL + "/api/level/next/",
  GetAllAreaLevel: BASE_URL + "parentlevel",
  GetAllLevel: BASE_URL + "api/level/",
  CreateLevelPosting: BASE_URL + "posting/update",
  GetAllPostingByLevel: BASE_URL + "posting/getall/",
  Getlevel: BASE_URL + "level",
  MyLeave: BASE_URL + "my_leaves",
}

export const departmentLevel = {
  GetAll: BASE_URL + "api/departmentlevel/",
  GetOne: BASE_URL + "api/departmentlevel/",
  Create: BASE_URL + "api/departmentlevel/",
  Update: BASE_URL + "api/departmentlevel/",
  GetPaginated: BASE_URL + "departmentlevel",
  GetChildernLevel: "departmentlevel/children/",
  Delete: BASE_URL + "api/departmentlevel/",
  levelnextlevel: BASE_URL + "/api/departmentlevel/next/",
  GetAllAreaLevel: BASE_URL + "departmentlevel",
  GetAllLevel: BASE_URL + "api/departmentlevel/",
  CreateLevelPosting: BASE_URL + "posting/update",
  GetAllPostingByLevel: BASE_URL + "posting/getall/",
  Getlevel: BASE_URL + "departmentlevel",
  MyLeave: BASE_URL + "my_leaves",
}

export const requestType = {
  GetAll: BASE_URL + "api/requesttype/all",
  Create: BASE_URL + "api/requesttype",
  Delete: BASE_URL + "api/requesttype/",
  Update: BASE_URL + "api/requesttype/",
  GetOne: BASE_URL + "api/requesttype/",
}


export const reachmeRequestType = {
  GetAll: BASE_URL + "api/reachmerequesttype/all",
  Create: BASE_URL + "api/reachmerequesttype/",
  Delete: BASE_URL + "api/reachmerequesttype/",
  Update: BASE_URL + "api/reachmerequesttype/",
  GetOne: BASE_URL + "api/reachmerequesttype/",
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
export const taluk = {
  GetAll: BASE_URL + "taluk",
  GetAllWithOutPagination: BASE_URL + "taluk",
  Create: BASE_URL + "taluk",
  Delete: BASE_URL + "taluk/",
  Update: BASE_URL + "taluk/",
  GetOne: BASE_URL + "taluk/",
}
export const station = {
  GetAll: BASE_URL + "station",
  GetAllWithOutPagination: BASE_URL + "station",
  Create: BASE_URL + "station",
  Delete: BASE_URL + "station/",
  Update: BASE_URL + "station/",
  GetOne: BASE_URL + "station/",
}

export const policeOfficer = {
  GetAccessibleRules: BASE_URL + "rules",
  GetAll: BASE_URL + "api/officer/",
  Create: BASE_URL + "api/officer/",
  Delete: BASE_URL + "api/officer/",
  Update: BASE_URL + "api/officer/",
  GetOne: BASE_URL + "api/officer/",
}

export const Office = {
  GetAccessibleRules: BASE_URL + "rules",
  GetAll: BASE_URL + "api/office/",
  Create: BASE_URL + "api/office/",
  Delete: BASE_URL + "api/office/",
  Update: BASE_URL + "api/office/",
  GetOne: BASE_URL + "api/office/",
}

export const apimodule = {
  GetAll: BASE_URL + "api/apimodule/",
  Create: BASE_URL + "api/apimodule/",
  Delete: BASE_URL + "api/apimodule/",
  Update: BASE_URL + "api/apimodule/",
  GetOne: BASE_URL + "api/apimodule/",
}

export const gender = {
  GetAll: BASE_URL + "gender",
  GetAllWithOutPagination: BASE_URL + "gender",
  Create: BASE_URL + "gender",
  Delete: BASE_URL + "gender/",
  Update: BASE_URL + "gender/",
  GetOne: BASE_URL + "gender/",
}

export const leave = {
  Approve: BASE_URL + "leave/action",
  GetAll: BASE_URL + "leave",
  Create: BASE_URL + "leave",
  Delete: BASE_URL + "leave/",
  Update: BASE_URL + "leave/",
  GetOne: BASE_URL + "leave/",
  GetEvents: BASE_URL + "leave/get_all",
  CalendarView: BASE_URL + "leave/calendar_view",
  history: BASE_URL + "history",
}
export const leaveType = {
  GetAll: BASE_URL + "leave_type",
  Create: BASE_URL + "leave_type",
  Delete: BASE_URL + "leave_type/",
  Update: BASE_URL + "leave_type/",
  GetOne: BASE_URL + "leave_type/",
  GetAllWithOutPagination: BASE_URL + "leave_type",
}
export const areatype = {
  GetAll: BASE_URL + "area_type",
  GetOne: BASE_URL + "area_type/",
  Create: BASE_URL + "area_type",
  Update: BASE_URL + "area_type",
  GetPaginated: BASE_URL + "area_type",
  Delete: BASE_URL + "area_type/",
}

export const designation = {
  GetAll: BASE_URL + "api/designation/",
  Create: BASE_URL + "api/designation/",
  Delete: BASE_URL + "api/designation/",
  Update: BASE_URL + "api/designation/",
  GetOne: BASE_URL + "api/designation/",
}
export const officetype = {
  GetAll: BASE_URL + "api/officetype/",
  Create: BASE_URL + "api/officetype/",
  Delete: BASE_URL + "api/officetype/",
  Update: BASE_URL + "api/officetype/",
  GetOne: BASE_URL + "api/officetype/",
}
export const fileUpload = {
  upload: "api/fileupload/",
}

export const location = {
  GetAll: BASE_URL + "location",
  Create: BASE_URL + "location",
  Delete: BASE_URL + "location/",
  Update: BASE_URL + "location/",
  GetOne: BASE_URL + "location/",
}

export const department = {
  GetAll: BASE_URL + "api/department/",
  Create: BASE_URL + "api/department/",
  Delete: BASE_URL + "api/department/",
  Update: BASE_URL + "api/department/",
  GetOne: BASE_URL + "api/department/",
}

export const posting = {
  GetAll: BASE_URL + "posting",
  GetOne: BASE_URL + "posting/",
  Create: BASE_URL + "posting",
  Update: BASE_URL + "posting/",
  GetPaginated: BASE_URL + "posting",
  Delete: BASE_URL + "posting/",
  PostingUpdate: BASE_URL + "posting",
  GetPosting: BASE_URL + "posting/get/",
  RemoveLevelPosting: BASE_URL + "posting/delete",
  postingareachangepassword: BASE_URL + "posting_area/changepassword",
}

export const worktype = {
  GetAll: BASE_URL + "work_type",
  GetOne: BASE_URL + "work_type/",
  Create: BASE_URL + "work_type",
  Update: BASE_URL + "work_type/",
  GetPaginated: BASE_URL + "work_type",
  Delete: BASE_URL + "work_type/",
}
export const ebeatLocationType = {
  GetAll: BASE_URL + "api/ebeatlocationtype",
  Create: BASE_URL + "api/ebeatlocationtype",
  Delete: BASE_URL + "api/ebeatlocationtype/",
  Update: BASE_URL + "api/ebeatlocationtype/",
  GetOne: BASE_URL + "api/ebeatlocationtype/",
}
export const ebeatLocation = {
  GetAll: BASE_URL + "api/ebeatlocation",
  Create: BASE_URL + "api/ebeatlocation/",
  Delete: BASE_URL + "api/ebeatlocation/",
  Update: BASE_URL + "api/ebeatlocation/",
  GetOne: BASE_URL + "api/ebeatlocation/",
  GetOneQrDetail: BASE_URL + "api/ebeatlocation/getqrdetails/",

}

export const feedbackType = {
  GetAll: BASE_URL + "api/feedbacktype/",
  Create: BASE_URL + "api/feedbacktype/",
  Delete: BASE_URL + "api/feedbacktype/",
  Update: BASE_URL + "api/feedbacktype/",
  GetOne: BASE_URL + "api/feedbacktype/",
}

export const GetPaginatedFeedbackType = BASE_URL + "feedbacktype"
export const CreateFeedbackType = BASE_URL + "feedbacktype"
export const UpdateFeedbackType = BASE_URL + "feedbacktype/"
export const GetOneFeedbackType = BASE_URL + "feedbacktype/"
export const DeleteFeedbackType = BASE_URL + "feedbacktype/"

export const feedBack = {
  GetAll: BASE_URL + "api/feedback/",
  Create: BASE_URL + "api/feedback/",
  Delete: BASE_URL + "api/feedback/",
  Update: BASE_URL + "api/feedback/",
  GetOne: BASE_URL + "api/feedback/",
  GetFeedbackStatus: BASE_URL + "api/feedback/status/",
}
export const entity_state = {
  GetAll: BASE_URL + "api/entitystate/",
  Create: BASE_URL + "api/entitystate/",
  Delete: BASE_URL + "api/entitystate/",
  Update: BASE_URL + "api/entitystate/",
  GetOne: BASE_URL + "api/entitystate/",
  AssignNextStates: BASE_URL + "api/entitystate/next/",
}

export const departmentDesignation = {
  GetAll: BASE_URL + "api/welfaredepartmentdesignation/",
  Create: BASE_URL + "api/welfaredepartmentdesignation/",
  Delete: BASE_URL + "api/welfaredepartmentdesignation/",
  Update: BASE_URL + "api/welfaredepartmentdesignation/",
  GetOne: BASE_URL + "api/welfaredepartmentdesignation/",
}

export const departmentOfficial = {
  GetAll: BASE_URL + "api/departmentofficial/",
  Create: BASE_URL + "api/departmentofficial/",
  Delete: BASE_URL + "api/departmentofficial/",
  Update: BASE_URL + "api/departmentofficial/",
  GetOne: BASE_URL + "api/departmentofficial/",
}

export const departmentPosting = {
  GetAll: BASE_URL + "api/welfaredepartmentposting/",
  Create: BASE_URL + "api/welfaredepartmentposting/",
  Delete: BASE_URL + "api/welfaredepartmentposting/",
  Update: BASE_URL + "api/welfaredepartmentposting/",
  GetOne: BASE_URL + "api/welfaredepartmentposting/",
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