/**START OF GENERATED CODE**/
import React, { Component, Fragment } from "react"
import { Colxx } from "../../components/Common/CustomBootstrap"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import { NavLink } from "react-router-dom"
import produce from "immer"
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Dropdown,
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Card,
  CardBody,
  ButtonGroup,
  Table,
} from "reactstrap"
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation"

import { CallService } from "../../helpers/ServiceCall"
import {
  MethodType,
  StatusCodes,
  DeleteStatus,
  ModulesName,
} from "../../constants/defaultValues"
import { area, level, Office, officetype } from "../../constants/config"
import DropDown from "../../components/custom/DropDown"

import { Formik, Form, Field } from "formik"
import { AreaStationOfficeValidation } from "../../helpers/validations"
import noData from "../../assets/images/dribble_no_data.png"

import "react-tagsinput/react-tagsinput.css"
import "react-datepicker/dist/react-datepicker.css"
import "rc-switch/assets/index.css"
import { Message } from "../../helpers/language_helper"
  ;
class AreaManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LevelName: "",
      mapDepartmentModalName: "",
      Depatrtmentmodal: false,
      BulkArea: null,
      BulkData: [],
      AreaName: "",
      dropdownBasicOpen: false,
      levels: [],
      OfficeTypeList: [],
      areaIdDepartmentMapping: null,
      BreadcrumbData: [],
      OfficeList: [],

      Parentarea: {
        Name: "",
        Level: {
          Name: "",
        },
      },
      DistrictDetail: {
        Name: "",
        Level: {
          Name: "",
        },
      },
      DeleteModal: false,
      ForceDeleteModal: false,
      area: {
        Name: "",
        Level: null,
        ParentArea: null,
        AreaType: null,
        ShortCode: "",
      },
      station: {
        Name: "",
        Address: "",
        OfficeTypeID: "",
      },
      modal: false,
      Bulkmodal: false,
      ListRequestModel: {
        pageNumber: 1,
        pageLimit: 999999,
      },
      QueryString: {
        areaid: null,
      },
      AreaByLevelList: [],
      AreaUnmappedLevelList: [],
      AreaTypes: [],
      deleteArea: {
        Name: "",
        Level: {
          Name: "",
        },
      },
      forcedeleteArea: {
        Name: "",
        Level: {
          Name: "",
        },
      },
    }
    this.toggle = this.toggle.bind(this)
    this.toggleBulk = this.toggleBulk.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBulkSubmit = this.handleBulkSubmit.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
    this.toggleForceDelete = this.toggleForceDelete.bind(this)
    this.Depatrtmentmodaltoggle = this.Depatrtmentmodaltoggle.bind(this)

  }

  componentDidMount() {
    this.GetAllOfficeType()
    this.setState(
      {
        QueryString: this.props.match.params,
      },
      () => {
        this.GetAreas()

        if (this.state.QueryString.parentarea) {
          this.GetParentarea(this.state.QueryString.parentarea)


        } else {

          this.GetAllLevel()
        }
      }
    )

  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.parentarea !== prevProps.match.params.parentarea
    ) {
      this.setState({ QueryString: this.props.match.params }, () => {
        this.GetAreas()

        if (this.state.QueryString.parentarea) {
          this.GetParentarea(this.state.QueryString.parentarea)

        } else {
          this.GetAllLevel()
        }
      })
    }
  }

  GetAreas() {
    var url = this.state.QueryString.parentarea
      ? this.state.QueryString.parentarea
      : ""
    const { ListRequestModel } = this.state

    CallService(
      area.GetAll + url,
      MethodType.POST,
      false,
      ListRequestModel,
      "",
      this.GetAreasResponse
    )
  }

  GetAreasResponse = data => {


    if (data.statusCode === StatusCodes.Success) {
      var TotalArray = []
      if (data.result.items.length > 0) {
        var outer = {}
        outer.IsAdministratorHeaderHover = false
        outer.ChildAreas = data.result.items
        outer.Level = data.result.items[0].Level
        TotalArray.push(outer)

        if (TotalArray.length > 0) {
          for (var i = 0; i < TotalArray.length; i++) {
            TotalArray[i].IsAdministratorHeaderHover = false
            for (var j = 0; j < TotalArray[i].ChildAreas.length; j++) {
              TotalArray[i].ChildAreas[j].IsAdministratorHover = false
            }
          }
        }
      }

      var breadcrumb = []
      if (
        data.result &&
        data.result.breadcrumb &&
        data.result.breadcrumb.length > 0
      ) {
        for (var k = data.result.breadcrumb.length; k > 0; k--) {
          breadcrumb.push(data.result.breadcrumb[k - 1])
        }
      }

      this.setState({
        AreaByLevelList: TotalArray,
        BreadcrumbData: breadcrumb,
      })
    }
  }

  GetAllLevel() {
    CallService(
      level.GetAllLevel,
      MethodType.POST,
      false,
      "",
      "",
      this.GetAllLevelResponse
    )
  }

  GetAllLevelResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = {
          Name: value.Name,
          ID: value.ID,
          key: key,
          value: value.ID,
          label: value.Name,
        }
        entityArr.push(entity)
      })
      this.setState({
        levels: entityArr,
        FilterLevelID: data.result.length > 0 && data.result[0].ID,
      })
    }
  }
  toggleBasic = () => {
    this.setState(prevState => ({
      dropdownBasicOpen: !prevState.dropdownBasicOpen,
    }))
  }
  getChildAreaList(area) {

    this.setState(prevState => ({
      QueryString: { ...prevState.QueryString, areaid: area.ID },
    }))
    this.props.history.push("/area-manage/" + area.ID)
  }

  /**Handle Page Mount Start**/

  GetParentarea(id) {
    CallService(
      area.GetOne + id,
      MethodType.GET,
      false,
      "",
      "",
      this.GetParentareaResponse
    )
  }
  GetParentareaResponse = data => {
    if (data.result) {
      this.setState({
        Parentarea: data.result,
      })
      this.GetNextLevel(data.result.LevelID)
    }
  }
  hoveringPosting(i, j) {
    const nextState = produce(this.state.AreaByLevelList, draftState => {
      draftState[i].Level.IsAdministratorHover = false
      for (var k = 0; k < draftState[i].ChildAreas.length; k++) {
        draftState[i].ChildAreas[k].IsAdministratorHover = false
      }
      draftState[i].ChildAreas[j].IsAdministratorHover = true
    })
    this.setState({
      AreaByLevelList: nextState,
    })
  }
  HeaderhoveringPosting(i) {
    const nextState = produce(this.state.AreaByLevelList, draftState => {
      draftState[i].Level.IsAdministratorHover = true
    })

    this.setState({
      AreaByLevelList: nextState,
    })
  }
  HeaderleavingPosting(i) {
    const nextState = produce(this.state.AreaByLevelList, draftState => {
      draftState[i].Level.IsAdministratorHover = false
    })

    this.setState({
      AreaByLevelList: nextState,
    })
  }
  leavingPosting(i, j) {
    const nextState = produce(this.state.AreaByLevelList, draftState => {
      for (var k = 0; k < draftState[i].ChildAreas.length; k++) {
        draftState[i].Level.IsAdministratorHover = false
        draftState[i].ChildAreas[k].IsAdministratorHover = false
      }
      draftState[i].ChildAreas[j].IsAdministratorHover = false
    })

    this.setState({
      AreaByLevelList: nextState,
    })
  }

  GetOnearea(id) {
    CallService(
      area.GetOne + id,
      MethodType.GET,
      false,
      "",
      "",
      this.GetOneareaResponse
    )
  }

  GetOneareaResponse = data => {
    if (data.result) {
      this.setState({
        area: data.result,
        modal: !this.state.modal,
      })
      if (data.result.Level.Name) {
        this.setState({
          LevelName: data.result.Level.Name,
        })
      }
    }
  }
  getAreaDetail(id) {
    CallService(
      area.GetPopulatedAreaDetail + id,
      MethodType.GET,
      false,
      "",
      "",
      this.getAreaDetailResponse
    )
  }

  getAreaDetailResponse = data => {
    if (data.result) {
      this.setState({
        BreadcrumbData: data.result,
      })
    } else {
      this.setState({
        BreadcrumbData: [],
      })
    }
  }

  addLevel(level) {
    var Level = {
      Level: {},
      ChildAreas: [],
    }
    Level.Level = level
    this.setState(prevState => ({
      AreaByLevelList: [...prevState.AreaByLevelList, Level],
    }))
    var array = [...this.state.AreaUnmappedLevelList]
    for (var i = 0; i < array.length; i++) {
      if (array[i].ID === level.ID) {
        array.splice(i, 1)
      }
    }
    this.setState({ AreaUnmappedLevelList: array })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }
  toggleBulk() {
    this.setState({
      Bulkmodal: !this.state.Bulkmodal,
    })
  }
  Depatrtmentmodaltoggle = row => {
    if (row) {
      if (row.Name) {
        this.setState({
          Depatrtmentmodal: !this.state.Depatrtmentmodal,
          mapDepartmentModalName: row.Name + " " + row.Level.Name,
          areaIdDepartmentMapping: row,
        })
      } else {
        this.setState({
          Depatrtmentmodal: !this.state.Depatrtmentmodal,
        })
      }
    } else {
      this.setState({
        Depatrtmentmodal: !this.state.Depatrtmentmodal,
      })
    }
  }
  handleBulkSubmit(event, errors) {
    if (errors.length === 0) {
      var str = this.state.area.Name
      var res = str.split("\n")
      var BulkAreaJSON = {}
      var bulkArea = []
      for (var i = 0; i < res.length; i++) {
        BulkAreaJSON.Name = res[i]
        BulkAreaJSON.Level = this.state.BulkArea.Level
        BulkAreaJSON.ParentArea = this.state.BulkArea.ParentArea
        bulkArea.push(BulkAreaJSON)
        BulkAreaJSON = {}
      }
      this.setState({
        BulkData: bulkArea,
      })
      this.bulkUploadArea()
    } else {
      var element = document.getElementsByName(errors[0])[0]
      var parentId = element.parentNode.parentNode.parentNode.parentNode.id
      this.scrollToRef(element)
      this.toggleTab(parentId)
    }
  }
  handleSubmit(event, errors) {
    if (errors.length === 0) this.Managearea()
    else {
      var element = document.getElementsByName(errors[0])[0]
      var parentId = element.parentNode.parentNode.parentNode.parentNode.id
      this.scrollToRef(element)
      this.toggleTab(parentId)
    }
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      })
    }
  }
  scrollToRef = ref => window.scrollTo(0, ref.offsetTop)
  bulkUploadArea() {
    if (this.state.area._id) {
      CallService(
        area.Update + this.state.area._id,
        MethodType.PATCH,
        false,
        this.state.BulkData,
        "",
        this.bulkUploadAreaResponse
      )
    } else {
      CallService(
        area.Create,
        MethodType.PUT,
        false,
        this.state.BulkData,
        "",
        this.bulkUploadAreaResponse
      )
    }
  }
  bulkUploadAreaResponse = data => {

    if (data.statusCode === StatusCodes.Success) {
      this.GetAreas()
      this.toggleBulk()
      SuccessMessage(Message(level.Level.Name + "update.success"))

    } else {
      ErrorMessage(Message("area.api.error"))
    }
  }
  Managearea() {


    if (this.state.area.ID) {
      var update = {
        Name: this.state.area.Name,
      }
      CallService(
        area.Update + this.state.area.ID,
        MethodType.PATCH,
        false,
        update,
        "",
        this.ManageareaResponse
      )
    } else {
      CallService(
        area.Create,
        MethodType.PUT,
        false,
        {
          Name: this.state.area.Name,
          LevelID: parseInt(this.state.area.LevelID),
          ParentAreaID: this.state.QueryString.parentarea
            ? parseInt(this.state.QueryString.parentarea)
            : null,
        },
        "",
        this.ManageareaResponse
      )
    }
  }
  ManageareaResponse = data => {
    if (data.statusCode === StatusCodes.Success && !data.result) {
      this.GetAreas()
      this.toggle()
      SuccessMessage(Message(`area.update.success`))
    } else if (data.result) {
      this.GetAreas()

      this.toggle()
      SuccessMessage(Message(`${this.state.LevelName} add.success`))
      SuccessMessage(Message("area.add.success"))
    } else {
      ErrorMessage(Message("area.api.error"))
    }
  }
  addLevelArea = level => {

    this.setState({
      area: {
        Name: "",
        LevelID: level.Level.ID,
      },
      LevelName: level.Level.Name,
      modal: true,
    })
  }
  GetNextLevel(id) {
    if (id)
      CallService(
        level.levelnextlevel + id,
        MethodType.GET,
        true,
        "",
        "",
        this.GetNextLevelResponse
      )
  }

  GetNextLevelResponse = data => {

    var result = []
    this.setState({
      levels: [],
    })
    if (data.statusCode === StatusCodes.Success) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = {
          Name: value.Name,
          ID: value.ID,
          key: key,
          value: value.ID,
          label: value.Name,
        }
        entityArr.push(entity)
      })
      this.setState({
        levels: entityArr,
        FilterLevelID: data.result.length > 0 && data.result[0].ID,
      })
    }

    this.state.levels.map(x => {
      let item = this.state.AreaByLevelList.filter(
        a => x.ID.toString() === a.Level.ID.toString()
      )
      if (!item.length) {
        return result.push(x)
      }
      return ""
    })

    this.setState(
      {
        AreaUnmappedLevelList: result,
      },
      () => {

      }
    )
  }
  addBulkLevelArea(level) {

    this.setState({ area: {}, BulkArea: {} })
    this.setState(prevState => ({
      BulkArea: { ...prevState.BulkArea, Level: level.Level._id },
      LevelName: level.Level.Name,
    }))
    this.setState(prevState => ({
      BulkArea: {
        ...prevState.BulkArea,
        ParentArea: this.state.QueryString.parentarea,
        MainArea: this.state.QueryString.areaid,
      },
    }))
    this.toggleBulk()
  }
  toggleDelete = rowId => {
    if (rowId && rowId.ID) {
      this.setState({
        DeleteModal: !this.state.DeleteModal,
        deleteRowId: rowId.ID,
        deleteArea: rowId,
        LevelName: rowId.Level.Name,
      })
    } else {
      this.setState({
        DeleteModal: !this.state.DeleteModal,
      })
    }
  }
  toggleForceDelete = rowId => {
    if (rowId._id) {
      this.setState({
        ForceDeleteModal: !this.state.ForceDeleteModal,
        forcedeleteRowId: rowId._id,
        forcedeleteArea: rowId,
      })
    } else {
      this.setState({
        ForceDeleteModal: !this.state.ForceDeleteModal,
      })
    }
  }
  ForceDeleteArea() {
    CallService(
      area.DeleteAll + this.state.forcedeleteRowId,
      MethodType.DELETE,
      true,
      "",
      "",
      this.DeleteForceAreaResponse
    )
  }
  DeleteForceAreaResponse = () => {
    SuccessMessage(Message(this.state.LevelName + "delete.success"))


    {
      DeleteStatus.deletestatus = true
    }
    this.toggleForceDelete("")
    this.GetAreas()
  }

  DeleteArea() {

    CallService(
      area.Delete + this.state.deleteRowId,
      MethodType.DELETE,
      true,
      "",
      "",
      this.DeleteAreaResponse
    )
  }
  DeleteAreaResponse = data => {


    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(Message("area.delete.success"))
    }
    else if (data.statusCode === StatusCodes.Forbid) {
      WarningMessage(
        Message("area.warning.success" + data.exception.map(area => area))
      )

      {
        DeleteStatus.deletestatus = false
      }
    } else {
      ErrorMessage(Message("area.api.error"))
    }
    this.toggleDelete("")
    this.GetAreas()
  }

  toggleManageModal = () => {
    this.setState({
      manageModal: !this.state.manageModal,
    })

  }

  toggleStationManageModal = () => {
    this.setState({
      manageStationModal: !this.state.manageStationModal,
    })
  }

  HandleRowClicked = () => {
    this.setState({

      manageModal: !this.state.manageModal,
    })
    this.toggleStationManageModal()
  }

  HandleStationRowClicked = row => {
    this.setState({
      selectedArea: row,
      manageStationModal: !this.state.manageStationModal,
    })

    CallService(
      Office.GetAll,
      MethodType.POST,
      true,
      "",
      row.ID,
      this.GetAllOfficeResponse
    )

  }

  GetAllOfficeResponse = data => {
    if (data.result) {
      this.setState({
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        OfficeList: data.result,
        totalCount: data.pagination.totalCount,
        showProcesing: false,
      })
    } else {
      this.setState({
        showProcesing: false,
      })
    }

  }

  handleSubmitStation = values => {
    if (values) {
      values.AreaID = this.state.selectedArea.ID
      this.manageAddOffice(values)
    }
  }
  manageAddOffice = values => {
    CallService(
      Office.Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageAddOfficeResponse
    )
  }
  manageAddOfficeResponse = data => {
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(Message("stationoffice.add.success"))
      this.setState({
        buttonAction: false,
        manageModal: !this.state.manageModal,
      })
    }

    this.toggleStationManageModal()
  }

  GetAllOfficeType() {
    CallService(
      officetype.GetAll,
      MethodType.POST,
      false,
      "",
      "",
      this.GetAllOfficeTypeResponse
    )
  }

  GetAllOfficeTypeResponse = data => {
    if (data.pagination && data.result)
      this.setState({
        OfficeTypeList: data.result.map(function (a) {
          return { value: a.ID, label: a.Name }
        }),
      })
  }

  GetsingleRedirect = data => {
    window.open("/station-details/" + data.ID, "_blank")
  }

  render() {
    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Card>
              <CardBody>
                <div className="page-title-box mb-4 d-flex align-items-center justify-content-between">
                  <h4 className="font-size-18">
                    {ModulesName.Area}{" "}
                  </h4>

                  <Breadcrumb
                    heading="Home.areas"

                  >
                    <BreadcrumbItem>
                      <NavLink to="/dashboard">{ModulesName.Home}</NavLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <NavLink to="/area-manage">{ModulesName.Area}</NavLink>
                    </BreadcrumbItem>
                    {this.state.BreadcrumbData &&
                      this.state.BreadcrumbData.length > 0 &&
                      this.state.BreadcrumbData.map(Breadcrumb => {
                        return (
                          <BreadcrumbItem>
                            <NavLink to={"/area-manage/" + Breadcrumb.ID}>
                              {Breadcrumb.Name}
                            </NavLink>
                          </BreadcrumbItem>
                        )
                      })}
                  </Breadcrumb>


                </div>


                <Row>
                  {/*<Colxx xxs="10">
                    <Fragment>
                      <h3>
                  
                          <span>
                            {this.state.Parentarea &&
                              this.state.Parentarea.Name}{" "}

                          </span>
                  
                      </h3>
                    </Fragment>
                            </Colxx>*/}
                  <Colxx className="ml-5">
                    {this.state.AreaUnmappedLevelList.length !== 0 ? (
                      <Dropdown
                        isOpen={this.state.dropdownBasicOpen}
                        toggle={this.toggleBasic}

                      >
                        <DropdownToggle caret color="secondary" outline>
                          {ModulesName.AddLevel}
                        </DropdownToggle>
                        <DropdownMenu>
                          {this.state.AreaUnmappedLevelList.map(level => {
                            return (
                              <DropdownItem
                                onClick={() => this.addLevel(level)}
                                key={level.ID}
                              >
                                {level.Name}
                              </DropdownItem>
                            )
                          })}
                        </DropdownMenu>
                      </Dropdown>
                    ) : null}
                  </Colxx>

                </Row>{" "}
                <Row>

                  <Colxx xxs="12">
                    <Row>
                      {this.state.AreaByLevelList &&
                        this.state.AreaByLevelList.length > 0 &&
                        this.state.AreaByLevelList.map((level, index) => {
                          return (
                            <Colxx style={{ marginTop: "10px" }} xxs="6">
                              <Card>
                                <CardBody>
                                  <Table>
                                    <tbody>
                                      <tr
                                        style={{ height: "68px" }}

                                      >
                                        <th
                                          scope="row"
                                          style={{ border: "none" }}
                                        >
                                          <div style={{ marginTop: "14px" }}>
                                            {ModulesName.Ash}
                                          </div>
                                        </th>
                                        <th
                                          scope="row"
                                          key={level.Level.ID}
                                          style={{
                                            cursor: "pointer",
                                            border: "none",
                                          }}
                                        >
                                          <div style={{ marginTop: "14px" }}>
                                            {level.Level.Name}
                                          </div>
                                        </th>
                                        <th
                                          style={{
                                            width: "54%",
                                            border: "none",
                                          }}
                                        >
                                          <span>
                                            <Button
                                              title={level.Level.Name}
                                              className={"btn-sm"}
                                              onClick={() =>
                                                this.addLevelArea(level)
                                              }
                                              style={{
                                                float: "right",
                                                width: "124px",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                display: "block",
                                                textOverflow: "ellipsis",
                                              }}
                                              type="submit"
                                              color="primary"
                                            >
                                              {ModulesName.Add} {" "} {level.Level.Name}
                                            </Button>
                                          </span>
                                        </th>
                                      </tr>
                                      {level.ChildAreas &&
                                        level.ChildAreas.length > 0 &&
                                        level.ChildAreas.map((area, i) => {
                                          return (
                                            <tr
                                              style={{ height: "48px" }}
                                              key={i.toString()}
                                            >
                                              <td>{i + 1}</td>
                                              <td
                                                onMouseEnter={() =>
                                                  this.hoveringPosting(index, i)
                                                }
                                                onMouseLeave={() =>
                                                  this.leavingPosting(index, i)
                                                }
                                                onClick={() =>
                                                  this.getChildAreaList(area)
                                                }
                                                key={area.ID}
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                              >
                                                {area.Name}
                                              </td>
                                              <td
                                                style={{
                                                  cursor: "pointer",
                                                }}

                                              >
                                                <div>
                                                  <ButtonGroup
                                                    className="mb-2"
                                                    style={{
                                                      top: "4px",
                                                      float: "right",
                                                    }}
                                                  >
                                                    <Button
                                                      size="sm"
                                                      outline
                                                      color="success"
                                                      onClick={() => {
                                                        this.HandleStationRowClicked(
                                                          area
                                                        )
                                                      }}
                                                    >
                                                      {ModulesName.Stations}
                                                    </Button>
                                                    <Button
                                                      style={{
                                                        marginLeft: "10px",
                                                      }}
                                                      size="sm"
                                                      outline
                                                      color="primary"
                                                      onClick={() =>
                                                        this.setState(
                                                          {
                                                            LevelName:
                                                              level.Level.Name,
                                                          },
                                                          () => {
                                                            this.GetOnearea(
                                                              area.ID
                                                            )
                                                          }
                                                        )
                                                      }
                                                    >
                                                      {ModulesName.Edit}
                                                    </Button>

                                                    <Button
                                                      outline
                                                      style={{
                                                        marginLeft: "10px",
                                                      }}
                                                      size="sm"
                                                      color="danger"
                                                      onClick={() =>
                                                        this.toggleDelete(area)
                                                      }
                                                    >
                                                      {ModulesName.Delete}
                                                    </Button>
                                                  </ButtonGroup>
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        })}
                                    </tbody>

                                  </Table>


                                </CardBody>
                              </Card>
                            </Colxx>
                          )
                        })}
                    </Row>
                    <Button color="primary" className="float-right mr-2"
                      onClick={() => this.props.history.push("/area-manage")}


                    >{ModulesName.Back}</Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>
                        <h7>
                          <span>
                            {this.state.area.ID ? "Update " : "Add "}
                            {this.state.LevelName}{" "}
                          </span>
                        </h7>
                      </ModalHeader>

                      <AvForm onSubmit={this.handleSubmit}>
                        <ModalBody>
                          <Fragment>
                            <Row>
                              <Colxx sm="12" hidden={false}>
                                <Label className="av-label requiredField">
                                  {this.state.LevelName} {ModulesName.Name}
                                </Label>
                                <AvGroup>
                                  <AvInput
                                    className="form-control"
                                    type="text"
                                    autocomplete="off"
                                    required
                                    name="Name"
                                    value={this.state.area.Name}
                                    onChange={({ target }) =>
                                      this.setState(prevState => ({
                                        area: {
                                          ...prevState.area,
                                          Name:
                                            target !== null ? target.value : "",
                                        },
                                      }))
                                    }
                                  />
                                  <AvFeedback>
                                    {ModulesName.ValidName}
                                  </AvFeedback>
                                </AvGroup>

                                <DropDown
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  label="Level"
                                  MobcolSplit={12}
                                  isClearable={false}
                                  labelClassName="requiredField"
                                  isSearchable
                                  options={this.state.levels}
                                  value={
                                    this.state.area &&
                                    this.state.area.LevelID &&
                                    (typeof this.state.area.LevelID === "object"
                                      ? this.state.levels.find(
                                        r =>
                                          r.ID === this.state.area.LevelID.ID
                                      )
                                      : this.state.levels.find(
                                        r => r.ID === this.state.area.LevelID
                                      ))
                                  }
                                  Action={entity => {
                                    if (entity) {
                                      this.setState(prevState => ({
                                        area: {
                                          ...prevState.area,
                                          LevelID:
                                            entity !== null ? entity.ID : "",
                                        },
                                      }))
                                    }
                                  }}
                                />
                              </Colxx>{" "}
                              <Colxx
                                key="5da6b59f760b2d0e7fd764c1"
                                sm="12"
                                hidden={false}
                              ></Colxx>
                            </Row>
                          </Fragment>
                        </ModalBody>

                        <ModalFooter>
                          <FormGroup className="float-sm-right">
                            {this.state.area.ID ? (
                              <Button
                                className={
                                  this.state.buttonAction ? "disabled" : ""
                                }
                                type="submit"
                                outline
                                color="primary"
                              >
                                {ModulesName.Update}
                              </Button>
                            ) : (
                              <Button
                                className={
                                  this.state.buttonAction ? "disabled" : ""
                                }
                                type="submit"
                                outline
                                color="primary"
                              >
                                {ModulesName.Add}
                              </Button>
                            )}

                            <Button
                              style={{ marginLeft: "10px" }}
                              className="form-second-btn"
                              color="danger"
                              outline
                              onClick={this.toggle}
                            >
                              {ModulesName.Cancel}
                            </Button>
                          </FormGroup>
                        </ModalFooter>
                      </AvForm>
                    </Modal>
                    <Modal
                      isOpen={this.state.Bulkmodal}
                      toggle={this.toggleBulk}
                    >
                      <ModalHeader toggle={this.toggleBulk}>
                        <h7>
                          {" "}
                          <span>{this.state.Parentarea.Name}</span>
                        </h7>
                      </ModalHeader>

                      <AvForm onSubmit={this.handleBulkSubmit}>
                        <ModalBody>
                          <Fragment>
                            <Row>
                              <Colxx sm="12" hidden={false}>
                                <AvGroup>
                                  <Label className="av-label">
                                    {this.state.LevelName} {" "} {ModulesName.Name}
                                  </Label>
                                  <textarea
                                    rows="4"
                                    autocomplete="off"
                                    cols="50"
                                    className="form-control"
                                    type="text"
                                    required
                                    name="Name"
                                    value={this.state.area.Name}
                                    onChange={({ target }) =>
                                      this.setState(prevState => ({
                                        area: {
                                          ...prevState.area,
                                          Name:
                                            target !== null ? target.value : "",
                                        },
                                      }))
                                    }
                                  ></textarea>

                                  <AvFeedback>
                                    {ModulesName.ValidName}
                                  </AvFeedback>
                                </AvGroup>
                              </Colxx>{" "}
                              <Colxx
                                key="5da6b59f760b2d0e7fd764c1"
                                sm="12"
                                hidden={false}
                              ></Colxx>
                            </Row>
                          </Fragment>
                        </ModalBody>

                        <ModalFooter>
                          <FormGroup className="float-sm-right">
                            <Button type="submit" outline color="primary">
                              {ModulesName.Add}
                            </Button>
                            <Button
                              style={{ marginLeft: "10px" }}
                              className="form-second-btn"
                              color="danger"
                              onClick={this.toggleBulk}
                              outline
                            >
                              {ModulesName.Cancel}
                            </Button>
                          </FormGroup>
                        </ModalFooter>
                      </AvForm>
                    </Modal>
                    <Row className="col-12">
                      <Modal
                        size="md"
                        isOpen={this.state.DeleteModal}
                        toggle={this.toggleDelete}
                      >
                        <ModalHeader toggle={this.toggleDelete}>
                          {ModulesName.Delete} {" "} {this.state.deleteArea.Level.Name}
                        </ModalHeader>

                        <AvForm>
                          <ModalBody>
                            {/* <AreaDepartmentManage areaId={ this.state.QueryString.areaid} ></AreaDepartmentManage> */}
                            <Label className="av-label">
                              <h5>
                                {ModulesName.DeleteContent}{" "}
                                {this.state.deleteArea.Name}{" "}
                                {this.state.deleteArea.Level.Name}
                                {" ?"}
                              </h5>
                            </Label>
                          </ModalBody>

                          <ModalFooter>
                            <FormGroup className="float-sm-right">
                              <Button
                                type="submit"
                                outline
                                color="primary"
                                onClick={() =>
                                  this.DeleteArea(this.state.deleteRowId)
                                }
                              >
                                {ModulesName.Yes}
                              </Button>
                              <Button
                                className="form-second-btn ml-2"
                                color="danger"
                                onClick={() => this.toggleDelete("")}
                              >
                                {ModulesName.No}
                              </Button>
                            </FormGroup>
                          </ModalFooter>
                        </AvForm>
                      </Modal>

                      <Modal
                        size="lg"
                        isOpen={this.state.ForceDeleteModal}
                        toggle={this.toggleForceDelete}
                      >
                        <ModalHeader toggle={this.toggleForceDelete}>
                          {ModulesName.Delete} {" "} {this.state.forcedeleteArea.Level.Name}
                        </ModalHeader>

                        <AvForm>
                          <ModalBody>
                            {/* <AreaDepartmentManage areaId={ this.state.QueryString.areaid} ></AreaDepartmentManage> */}
                            <Label className="av-label">
                              <br></br> {ModulesName.DeleteContent} {" "}
                              <span style={{ color: "red" }}>
                                {this.state.forcedeleteArea.Name}{" "}
                                {this.state.forcedeleteArea.Level.Name}
                              </span>
                              {"?"}
                            </Label>
                          </ModalBody>

                          <ModalFooter>
                            <FormGroup className="float-sm-right">
                              <Button
                                type="submit"
                                outline
                                color="primary"
                                onClick={() =>
                                  this.ForceDeleteArea(
                                    this.state.forcedeleteRowId
                                  )
                                }
                              >
                                {ModulesName.Yes}
                              </Button>
                              <Button
                                className="form-second-btn ml-2"
                                color="danger"
                                onClick={() => this.toggleForceDelete("")}
                              >
                                {ModulesName.No}
                              </Button>
                            </FormGroup>
                          </ModalFooter>
                        </AvForm>
                      </Modal>
                    </Row>
                  </Colxx>
                </Row>
                <Modal
                  size="lg"
                  isOpen={this.state.Depatrtmentmodal}
                  toggle={this.Depatrtmentmodaltoggle}
                >
                  <ModalHeader toggle={this.Depatrtmentmodaltoggle}>

                  </ModalHeader>

                  <ModalBody>

                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  size="lg"
                  isOpen={this.state.manageStationModal}
                  toggle={this.toggleStationManageModal}
                >
                  <ModalHeader toggle={this.toggleStationManageModal}>
                    {this.state.selectedArea
                      ? this.state.selectedArea.Name
                      : "Details"}
                  </ModalHeader>
                  <ModalBody>
                    {this.state.OfficeList &&
                      this.state.OfficeList.length > 0 ? (
                      <Table>
                        <thead>
                          <tr>
                            <th>{ModulesName.No}</th>
                            <th>{ModulesName.Stations}</th>
                          </tr>
                        </thead>
                        {this.state.OfficeList.map((office, i) => {
                          return (
                            <tbody>
                              <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{office.Name}</td>

                                <td>
                                  <Button
                                    outline
                                    className="mr-2"
                                    size="sm"
                                    color="success"
                                    onClick={() =>
                                      this.GetsingleRedirect(office)
                                    }
                                  >
                                    {ModulesName.View}
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          )
                        })}
                      </Table>
                    ) : (
                      <div>
                        <div className="d-flex justify-content-center mb-2">
                          <img
                            src={noData}
                            alt="img"
                            height="200px"
                            width="200px"
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <h3>
                            {" "}
                            {ModulesName.AddStation} -{" "}
                            {this.state.selectedArea
                              ? this.state.selectedArea.Name
                              : "Details"}

                          </h3>
                        </div>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <div className="container-fluid">
                      <Row>
                        <Col lg={9} />
                        <FormGroup className="float-sm-right ">
                          <Button
                            outline
                            color="primary"
                            onClick={() => {
                              this.HandleRowClicked(area)
                            }}
                          >
                            {ModulesName.AddStation}
                          </Button>

                          <Button
                            outline

                            color="danger"
                            className="ml-2"
                            onClick={() => this.toggleStationManageModal()}
                          >
                            {ModulesName.Cancel}
                          </Button>
                        </FormGroup>
                      </Row>
                    </div>
                  </ModalFooter>
                </Modal>
                <Modal
                  size="lg"
                  isOpen={this.state.manageModal}
                  toggle={this.toggleManageModal}
                >
                  <ModalHeader toggle={this.toggleManageModal}>
                    {ModulesName.AddStationOffice} - {" "}
                    <b> {this.state.selectedArea
                      ? this.state.selectedArea.Name
                      : "Details"}</b>
                  </ModalHeader>
                  <Formik
                    initialValues={this.state.station}
                    validationSchema={AreaStationOfficeValidation}
                    onSubmit={this.handleSubmitStation}
                    validateOnBlur={false}
                    validateOnChange={false}
                  >
                    {({ errors, values, setFieldValue }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <ModalBody>
                          <Fragment>
                            <Row className="mb-10">
                              <Col lg="12" sm="6" md="6" lg="6">
                                <FormGroup className="form-group has-float-label">
                                  <Label className="requiredField">{ModulesName.Name}</Label>
                                  <Field
                                    className="form-control"
                                    name="Name"
                                    autocomplete="off"
                                  />
                                  {errors.Name && (
                                    <div className="invalid-feedback d-block">
                                      {errors.Name}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>

                              <Col lg="12" sm="6" md="6" lg="6">
                                <FormGroup className="form-group has-float-label">
                                  <DropDown
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    label="Office Type"
                                    name=""
                                    MobcolSplit={12}
                                    isClearable

                                    isSearchable
                                    options={this.state.OfficeTypeList}
                                    value={
                                      values &&
                                      values.OfficeTypeID &&
                                      (typeof values.OfficeTypeID === "string"
                                        ? this.state.OfficeTypeList.find(
                                          r => r.value === values.OfficeTypeID
                                        )
                                        : this.state.OfficeTypeList.find(
                                          r => r.value === values.OfficeTypeID
                                        ))
                                    }
                                    ClearAction={() => {
                                      setFieldValue(`OfficeTypeID`, "")
                                    }}
                                    Action={entity => {
                                      if (entity) {
                                        setFieldValue(
                                          "OfficeTypeID",
                                          entity ? entity.value : null
                                        )
                                      }
                                    }}
                                  // errors={errors.Role}
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="12" sm="6" md="6" lg="6">
                                <FormGroup className="form-group has-float-label">
                                  <Label className="requiredField">
                                    {ModulesName.Address}
                                  </Label>
                                  <Field
                                    as="textarea"
                                    className="form-control"
                                    name="Address"
                                  />
                                  {errors.Address && (
                                    <div className="invalid-feedback d-block">
                                      {errors.Address}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                          </Fragment>
                        </ModalBody>
                        <ModalFooter>
                          <div className="container-fluid">
                            <Row>
                              <Col lg="9">
                                <Label>
                                  <span style={{ color: "red" }}>{ModulesName.Star} </span>
                                  {ModulesName.MandatoryFields}
                                </Label>
                              </Col>

                              <FormGroup className="float-sm-right">
                                {this.state.Police && this.state.Police.ID ? (
                                  <Button
                                    className={
                                      this.state.buttonAction ? "disabled" : ""
                                    }
                                    className="ml-5"
                                    type="submit"
                                    outline
                                    color="primary"
                                  >
                                    {ModulesName.Update}
                                  </Button>
                                ) : (
                                  <Button
                                    className={
                                      this.state.buttonAction ? "disabled" : ""
                                    }
                                    type="submit"
                                    outline
                                    color="primary"
                                    className="ml-5"
                                  >
                                    {ModulesName.Add}
                                  </Button>
                                )}
                                <Button
                                  outline
                                  color="danger"
                                  className="ml-3"
                                  onClick={() => this.toggleManageModal()}
                                >
                                  {ModulesName.Cancel}
                                </Button>
                              </FormGroup>
                            </Row>
                          </div>
                        </ModalFooter>
                      </Form>
                    )}
                  </Formik>
                </Modal>
              </CardBody>
            </Card>
          </div>
        </div>
      </Fragment>
    )
  }
  /**Handle Render End**/
}
export default AreaManage

/**END OF GENERATED CODE**/
