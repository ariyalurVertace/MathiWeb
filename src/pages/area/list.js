/**START OF GENERATED CODE**/
import React, { Component, Fragment } from "react"
import { Colxx } from "../../components/Common/CustomBootstrap"
import { Formik, Form, Field } from "formik"
import { AvForm } from "availity-reactstrap-validation"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import { Message } from "../../helpers/language_helper";
import {
  Row,
  Col,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  Card,
  CardBody,
  FormGroup,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import {
  MethodType,
  StatusCodes,
  DeleteStatus,
  ModulesName,
} from "../../constants/defaultValues"
import { area, level, areatype } from "../../constants/config"
import "react-tagsinput/react-tagsinput.css"
import "react-datepicker/dist/react-datepicker.css"
import "rc-switch/assets/index.css"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { AreaValidation } from "../../../src/helpers/validations"
import DropDown from "../../components/custom/DropDown"

class Area extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyField: "_id",
      areaName: "",
      modal: false,
      deleteArea: {
        Name: "",
      },
      forcedeleteArea: {
        Name: "",
      },
      CreateArea: {
        Name: "",
        LevelID: "",
      },
      ListRequestModel: {
        searchString: "",
        sortCondition: { _id: 1 },
        pageNumber: 1,
        pageLimit: 10,
      },

      columns: [
        {
          name: "Name",
          selector: "Name",
          sortable: true,
          cell: row => (
            <span className="cursorPointer">{row.Name ? row.Name : ""}</span>
          ),
        },
        {
          name: "Level",
          selector: "Level",
          sortable: true,
          cell: row => <span>{row.Level ? row.Level.Name : ""}</span>,
        },

        {
          name: "Action",
          selector: "action",
          sortable: false,
          cell: row => (
            <UncontrolledDropdown>
              <DropdownToggle className="card-drop" tag="i">
                <i className="mdi mdi-dots-vertical font-size-18" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.toggle(row)}>
                  <i className="fas fa-pencil-alt text-success mr-1" />
                  <span> {ModulesName.Edit}</span>
                </DropdownItem>

                <DropdownItem onClick={() => this.toggledelete(row)}>
                  <i className="fas fa-trash-alt text-danger mr-1" />
                  <span>{ModulesName.Delete} </span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ),
        },
      ],
      areas: [],
      Levels: [],
      Level: "",
      areatypes: [],
      areatype: "",
      area: "",
      showProcesing: true,
      DeleteModal: false,
      ForceDeleteModal: false,
    }
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggle(row) {

    if (row && row.ID) {
      var prefill = row
      prefill.Name = row.Name
      prefill.LevelID = row.Level.ID
      this.setState({
        LevelName: row && row.Level && row.Level.Name,
        areaName: Message("area.zone"),
        area: row,
        CreateArea: prefill,
        LabelName: Message("area.update"),
        modal: !this.state.modal,
      })
    } else {
      this.setState({
        modal: !this.state.modal,
        LabelName: Message("area.add"),
        CreateArea: {
          Name: "",
          LevelID: "",
        },
      })
    }
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
    this.setState({
      area: data.result,
    })
    if (data.result.Level.Name) {
      this.setState({
        LevelName: data.result.Level.Name,
        areaName: data.result.Name + " " + data.result.Level.Name,
      })
    }
    this.setState({
      modal: !this.state.modal,
    })
  }

  /**Handle Page Mount Start**/

  componentDidMount() {

    this.GetAllLevel()

  }

  /**Handle Page Mount End**/

  /**Handle Table Sorting Start **/
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
  handleSort = (column, sortDirection) => {
    var sortObj = {}
    sortObj[column.selector] = sortDirection === "asc" ? 1 : -1
    this.setState(
      {
        ListRequestModel: {
          ...this.state.ListRequestModel,
          sortCondition: sortObj,
        },
      },
      function () {
        this.GetAreas()
      }
    )
  }
  /**Handle Table Sorting End**/

  /**Handle Rows Per Page Start**/

  handlePerRowsChange = async perPage => {
    this.setState(
      {
        pageLimit: perPage,
        pageNumber: 1,
        ListRequestModel: {
          ...this.state.ListRequestModel,
          pageLimit: perPage,
          pageNumber: 1,
        },
      },
      async function () {
        this.GetAreas()
      }
    )
  }

  /**Handle Rows Per Page End**/

  /**Handle Page Change Start**/
  handlePageChange = async page => {
    this.setState(
      {

        ListRequestModel: {
          ...this.state.ListRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.GetAreas()
      }
    )
  }
  handleSubmit(values) {
    this.Managearea(values)
  }
  Managearea(values) {

    if (values.ID) {
      var areaUpdate = {
        Name: values.Name,
      }
      CallService(
        area.Update + this.state.area.ID,
        MethodType.PATCH,
        false,
        areaUpdate,
        "",
        this.ManageareaResponse
      )
    } else {
      CallService(
        area.Create,
        MethodType.PUT,
        false,
        values,
        "",
        this.ManageareaResponse
      )
    }
  }
  ManageareaResponse = data => {
    if (data.statusCode === StatusCodes.Success && !data.result) {

      SuccessMessage(Message("area.update.success"))
      this.GetAreas()
      this.toggle()
    } else if (data.result) {
      SuccessMessage(Message("area.add.success"))
      this.GetAreas()
      this.toggle()
    } else {
      ErrorMessage(Message("area.api.error"))
    }
  }
  /**Handle Page Change End**/

  /** Handle Area List Start **/

  GetAreas() {
    const { ListRequestModel } = this.state
    CallService(

      area.GetAll,
      MethodType.POST,
      false,
      ListRequestModel,
      "",
      this.GetAreasResponse
    )


  }

  GetAreasResponse = data => {
    if (data.result && data.pagination) {
      this.setState({
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        areas: data.result,
        totalCount: data.pagination.totalCount,
        showProcesing: false,
      })
    } else {
      this.setState({
        showProcesing: false,
      })
    }
  }

  /** Handle Area List End **/

  /** Handle Filter Enity Model Start **/

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
        var entity = { label: value.Name, value: value.ID, key: key }
        entityArr.push(entity)
      })
      this.setState(
        {
          Levels: entityArr,
          FilterLevelID: data.result.length > 0 && data.result[0].ID,
        },
        () => {
          this.GetAreas()
        }
      )
    }
  }
  GetAreaTypes() {
    const { ListRequestModel } = this.state

    CallService(
      areatype.GetAll,
      MethodType.POST,
      false,
      ListRequestModel,
      "",
      this.GetAreaTypesResponse
    )
  }

  GetAreaTypesResponse = data => {
    const entityArr = []
    if (data.result) {
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        areatypes: entityArr,
      })
    }
  }
  GetParentAreas() {
    const { ListRequestModel } = this.state
    CallService(
      area.GetMasterRegions,
      MethodType.GET,
      false,
      ListRequestModel,
      "",
      this.GetParentAreasResponse
    )
  }

  GetParentAreasResponse = data => {
    const entityArr = []
    if (data.result) {
      this.setState({
        areas: data.result,
      })
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        parentareas: entityArr,
      })
    }
  }
  /** Handle Filter Enity Model End **/

  /** Handle Filter Change Start **/

  levelChanged = (entity, { action }) => {
    if (action === "clear") {
      this.setState(
        {
          Level: "",
          ListRequestModel: { ...this.state.ListRequestModel, Level: "" },
        },
        function () {
          this.GetAreas()
        }
      )
    } else {
      this.setState(
        {
          Level: entity,
          ListRequestModel: {
            ...this.state.ListRequestModel,
            Level: entity.value,
          },
        },
        function () {
          this.GetAreas()
        }
      )
    }
  }
  areatypeChanged = (entity, { action }) => {
    if (action === "clear") {
      this.setState(
        {
          AreaType: "",
          ListRequestModel: { ...this.state.ListRequestModel, AreaType: "" },
        },
        function () {
          this.GetAreas()
        }
      )
    } else {
      this.setState(
        {
          AreaType: entity,
          ListRequestModel: {
            ...this.state.ListRequestModel,
            AreaType: entity.value,
          },
        },
        function () {
          this.GetAreas()
        }
      )
    }
  }
  ParenAreaChanged = (entity, { action }) => {
    if (action === "clear") {
      this.setState(
        {
          ParentArea: "",
          ListRequestModel: { ...this.state.ListRequestModel, ParentArea: "" },
        },
        function () {
          this.GetAreas()
        }
      )
    } else {
      this.setState(
        {
          ParentArea: entity,
          ListRequestModel: {
            ...this.state.ListRequestModel,
            ParentArea: entity.value,
          },
        },
        function () {
          this.GetAreas()
        }
      )
    }
  }

  /** Handle Filter Change End **/

  /** Handle Search Change Start **/

  SearchQueryChanged = search => {
    this.setState(
      {
        ListRequestModel: {
          ...this.state.ListRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        if (
          this.state.ListRequestModel.searchString === "" ||
          this.state.ListRequestModel.searchString.length > 2
        ) {
          this.GetAreas()
        }
      }
    )
  }

  /** Handle Search Change End **/

  toggledelete = row => {

    this.setState({
      DeleteModal: !this.state.DeleteModal,
      deleteRowId: row.ID,
      deleteArea: row,
    })
  }

  toggleForceDelete = row => {
    this.setState({
      ForceDeleteModal: !this.state.ForceDeleteModal,
      forcedeleteRowId: row._id,
      forcedeleteArea: row,
    })
  }

  DeleteForceArea() {
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
    SuccessMessage(Message("area.delete.success"))
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
      SuccessMessage(Message("deleted"))
      WarningMessage(
        Message("area.warning.success" + data.exception.map(area => area))
      )

      {
        DeleteStatus.deletestatus = false
      }
    } else if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(Message("deleted"))
    } else {
      ErrorMessage(Message("area.api.error"))
    }

    this.toggledelete("")
    this.GetAreas()
  }
  HandleRowClicked = row => {
    this.props.history.push("/area-manage/" + row.ID + "/" + row.ID)
  }
  addBtnClick = () => {

    this.toggle()
  }
  /**Handle Render Start**/

  render() {
    const initialValues = this.state.CreateArea

    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Card>
              <CardBody>
                <Row>
                  <div className="col-12"></div>
                  <Colxx>
                    <ListPageHeader
                      heading={`${ModulesName.Home}.${ModulesName.Area}`}
                      match={this.props.match}
                      onTextChange={this.SearchQueryChanged}
                      buttonClick={this.addBtnClick}
                      buttonText={`${ModulesName.Add}.${ModulesName.Area}`}
                    />
                  </Colxx>
                </Row>

                <ListPage
                  columns={this.state.columns}
                  data={this.state.areas}
                  keyField={this.state.keyField}
                  totalCount={this.state.totalCount}
                  rowClicked={this.HandleRowClicked}
                  rowsPerPageOnChange={this.handlePerRowsChange}
                  pageChange={this.handlePageChange}
                  onSort={this.handleSort}
                  isDataLoading={this.state.showProcesing}
                />
              </CardBody>
            </Card>

            <Row className="col-12">
              <Modal isOpen={this.state.DeleteModal} toggle={this.toggledelete}>
                <ModalHeader toggle={this.toggledelete}>

                  {ModulesName.Delete}{" "}
                  {this.state.deleteArea ? this.state.deleteArea.Name : ""}{" "}
                  {ModulesName.Area}

                </ModalHeader>

                <AvForm>
                  <ModalBody>
                    <Row className="m-2">
                      <Label className="av-label">
                        <h5>
                          {ModulesName.DeleteContent}{" "}
                          <span className="colorRed">
                            {this.state.deleteArea.Name}
                          </span>{" "}
                          {ModulesName.Area}?
                        </h5>
                      </Label>
                    </Row>
                  </ModalBody>

                  <ModalFooter>
                    <FormGroup className="float-sm-right">
                      <Button
                        type="submit"
                        color="primary"
                        onClick={() => this.DeleteArea(this.state.deleteRowId)}
                      >
                        {ModulesName.Yes}
                      </Button>{" "}
                      <Button
                        outline
                        color="danger"
                        className="form-second-btn"
                        onClick={() => this.toggledelete}
                      >
                        {ModulesName.No}
                      </Button>
                    </FormGroup>
                  </ModalFooter>
                </AvForm>
              </Modal>

              <Modal
                isOpen={this.state.ForceDeleteModal}
                toggle={this.toggleForceDelete}
              >
                <ModalHeader toggle={this.toggleForceDelete}>
                  {ModulesName.DeleteState}
                </ModalHeader>

                <AvForm>
                  <ModalBody>
                    <Row className="mb-4">
                      <Label className="av-label">
                        <br></br>
                        <h4>
                          {" "}
                          {ModulesName.DeleteContent}{" "}
                          <span className="colorRed">
                            {this.state.forcedeleteArea.Name}
                          </span>{" "}
                          {ModulesName.State}?
                        </h4>
                      </Label>
                    </Row>
                  </ModalBody>

                  <ModalFooter>
                    <FormGroup className="float-sm-right">
                      <Button
                        type="submit"
                        color="primary"
                        onClick={() =>
                          this.DeleteForceArea(this.state.forcedeleteRowId)
                        }
                      >
                        {ModulesName.Yes}
                      </Button>{" "}
                      <Button
                        outline
                        color="danger"
                        className="form-second-btn"
                        onClick={() => this.toggleForceDelete("")}
                      >
                        {ModulesName.No}
                      </Button>
                    </FormGroup>
                  </ModalFooter>
                </AvForm>
              </Modal>
            </Row>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                {this.state.LabelName} {" "}  {ModulesName.Area}
              </ModalHeader>

              <Formik
                initialValues={initialValues}
                validationSchema={AreaValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <ModalBody>
                      <Fragment>
                        <Row className="mb-10">
                          <Col lg="12" sm="12" md="12" lg="12">
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
                          {this.state.CreateArea && this.state.CreateArea.ID ? (
                            ""
                          ) : (
                            <Col lg="12" sm="12" md="12" lg="12">
                              <FormGroup className="form-group has-float-label">
                                <DropDown
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  label="Level"
                                  name=""
                                  MobcolSplit={12}
                                  isClearable
                                  labelClassName="requiredField"
                                  isSearchable
                                  options={this.state.Levels}
                                  value={
                                    values &&
                                    values.Level &&
                                    (typeof values.Level === "object"
                                      ? this.state.Levels.find(
                                        r => r.value === values.Level.ID
                                      )
                                      : this.state.Levels.find(
                                        r => r.value === values.Level
                                      ))
                                  }
                                  ClearAction={() => {
                                    setFieldValue(`LevelID`, null)
                                  }}
                                  Action={entity => {
                                    if (entity) {
                                      setFieldValue(
                                        "LevelID",
                                        entity ? entity.value : null
                                      )
                                    }
                                  }}
                                  errors={errors.LevelID}
                                />
                              </FormGroup>
                            </Col>
                          )}
                        </Row>
                      </Fragment>
                    </ModalBody>
                    <ModalFooter>
                      <div className="container-fluid">
                        <Label>
                          <span style={{ color: "red" }}>{ModulesName.Star} </span>
                          {ModulesName.MandatoryFields}
                        </Label>
                        <FormGroup className="float-sm-right ">
                          {this.state.CreateArea && this.state.CreateArea.ID ? (
                            <Button
                              className={
                                this.state.buttonAction ? "disabled" : ""
                              }
                              type="submit"
                              color="primary"
                            >
                              {ModulesName.Add}
                            </Button>
                          ) : (
                            <Button
                              className={
                                this.state.buttonAction ? "disabled" : ""
                              }
                              type="submit"
                              color="primary"
                            >
                              {ModulesName.Update}
                            </Button>

                          )}
                          <Button
                            color="danger"
                            outline
                            className="ml-2"
                            onClick={() => this.toggle()}
                          >
                            {ModulesName.Cancel}
                          </Button>
                        </FormGroup>
                      </div>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </Modal>
            <Modal
              size="lg"
              isOpen={this.state.Depatrtmentmodal}
              toggle={this.Depatrtmentmodaltoggle}
            >
              <ModalHeader toggle={this.Depatrtmentmodaltoggle}>
                {this.state.mapDepartmentModalName}
              </ModalHeader>

              <ModalBody>

              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
          </div>
        </div>
      </Fragment>
    )
  }
  /**Handle Render End**/
}
export default Area

/**END OF GENERATED CODE**/
