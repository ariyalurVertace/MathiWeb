import React, { Component, Fragment } from "react"
import { AvForm } from "availity-reactstrap-validation"
import { Colxx } from "../../components/Common/CustomBootstrap"
import { Formik, Form, Field } from "formik"
import { withRouter } from "react-router-dom"
import {
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Card,
  CardBody,
  ButtonGroup,
} from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../components/custom/DropDown"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"

import {
  MethodType,
  StatusCodes,
  defaultPageLimit,
  ModulesName,
} from "../../constants/defaultValues"
import { apimodule } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import { ApiModuleValidation } from "../../helpers/validations"
import { Message } from "../../helpers/language_helper"

class ApiModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonAction: false,
      isLoading: true,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",

      ApiModuleList: [],
      Language: sessionStorage.getItem("lng"),
      ListRequestModel: {
        searchString: "",
        sortCondition: { id: 1 },
        pageNumber: 1,
        pageLimit: defaultPageLimit,
      },
      ApiModule: {
        Name: "",
        Route: "",
        Method: "",
      },
      MethodList: [
        { label: "GET", value: "GET" },
        { label: "POST", value: "POST" },
        { label: "PUT", value: "PUT" },
        { label: "PATCH", value: "PATCH" },
      ],
      columns: [
        {
          name: "Name",
          selector: "Name",
          sortable: false,
          cell: row => <span>{row.Name ? row.Name : ""}</span>,
        },
        {
          name: "Method",
          selector: "Method",
          sortable: false,
          cell: row => <span>{row.Method ? row.Method : ""}</span>,
        },

        {
          name: "Action",
          selector: "_id",
          sortable: false,
          cell: row => (
            <Row>
              <ButtonGroup className="mb-2" style={{ top: "4px" }}>
                <Button
                  outline
                  color="primary"
                  className="mobileViewFont"
                  onClick={() => this.HandleRowClicked(row)}
                >
                  {ModulesName.Edit}
                </Button>

                <Button
                  outline
                  color="danger"
                  className="mobileViewFonts pl-1 pr-1 ml-2"
                  onClick={() => this.toggleDeleteModal(row)}
                >
                  {ModulesName.Delete}
                </Button>
              </ButtonGroup>
            </Row>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.GetAllApiModule()
  }
  GetAllApiModule() {
    this.setState({
      isLoading: true,
    })
    const { ListRequestModel } = this.state

    CallService(
      apimodule.GetAll,
      MethodType.POST,
      false,
      ListRequestModel,
      "",
      this.GetAllApiModuleResponse
    )
  }

  GetAllApiModuleResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        ApiModuleList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }

  /** handle list page  start  */
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
        this.GetAllApiModule()
      }
    )
  }

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
        this.GetAllApiModule()
      }
    )
  }

  handlePageChange = async page => {
    this.setState(
      {
        pageNumber: page,
        ListRequestModel: {
          ...this.state.ListRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.GetAllApiModule()
      }
    )
  }

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
          this.GetAllApiModule()
        }
      }
    )
  }

  HandleRowClicked = row => {


    if (row) {
      this.setState({
        ApiModule: row,
        manageModal: !this.state.manageModal,
      })
    }
  }

  /** Submit Function Start */
  handleSubmit = values => {
    delete values.APIModuleParameter,
      this.manageApiModule(values)
  }

  addBtnClick = () => {
    this.setState({
      ApiModule: {
        Name: "",
        Method: "",
        Route: "",
      },
      manageModal: !this.state.manageModal,
    })

  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      ApiModule: row,
    })
  }

  toggleManageModal = () => {
    this.setState({
      ApiModule: {},
      manageModal: !this.state.manageModal,
    })
  }

  deleteApiModule = id => {
    CallService(
      apimodule.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      this.deleteApiModuleResponse
    )
  }

  deleteApiModuleResponse = data => {
    this.setState({
      buttonAction: false,
    })
    this.toggleDeleteModal()
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(Message("apimodule.delete.success"))

      this.GetAllApiModule()
    }
  }
  manageApiModule = values => {
    CallService(
      values.ID ? apimodule.Update + values.ID : apimodule.Create,
      values.ID ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageApiModuleResponse
    )
  }
  manageApiModuleResponse = data => {
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(
        Message(

          this.state.ApiModule.ID
            ? "apimodule.update.success"
            : "apimodule.add.success"
        )
      )
      this.GetAllApiModule()
      this.setState({
        buttonAction: false,
        manageModal: !this.state.manageModal,
      })
    } else if (data.statusCode === "409") {
      ErrorMessage(Message("apimodule.mobilenumber.error"))

      this.setState({
        buttonAction: false,
      })
    } else {
      ErrorMessage(Message("apimodule.api.error"))
      this.setState({
        buttonAction: false,
      })
    }
  }

  handlemobilePageChange = async page => {

    this.setState(
      {
        currentpage: page,
        pageNumber: page,
        ListRequestModel: {
          ...this.state.ListRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.GetAllApiModule()
      }
    )
  }

  render() {
    const initialValues = this.state.ApiModule

    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Card>
              <CardBody>
                <ListPageHeader
                  heading={`${ModulesName.Home}.${ModulesName.Apimodule}`}
                  buttonText={`${ModulesName.Add} ${ModulesName.Apimodule}`}
                  onTextChange={this.SearchQueryChanged}
                  buttonClick={this.addBtnClick}
                  showSearch={false}
                  searchValue={this.state.ListRequestModel.searchString}
                />

                <ListPage
                  columns={this.state.columns}
                  data={this.state.ApiModuleList}
                  keyField={this.state.keyField}
                  totalCount={this.state.totalCount}
                  rowClicked={this.HandleRowClicked}
                  rowsPerPageOnChange={this.handlePerRowsChange}
                  pageChange={this.handlePageChange}
                  isDataLoading={this.state.isLoading}
                  overFlowXRemoval={true}
                />
              </CardBody>
            </Card>

            <Modal
              isOpen={this.state.deleteModal}
              toggle={this.toggleDeleteModal}
            >
              <ModalHeader toggle={this.toggleDeleteModal}>
                {ModulesName.DeleteApiModule}
              </ModalHeader>

              <AvForm
                onSubmit={() => this.deleteApiModule(this.state.ApiModule.ID)}
              >
                <ModalBody>
                  <Fragment>
                    <Row className="mb-4">
                      <Label className="av-label ml-3 mr-2">
                        <h5>
                          {ModulesName.DeleteContent} {" "}
                          {this.state.ApiModule &&
                            this.state.ApiModule.Name}{" "}
                          {ModulesName.Apimodule}?
                        </h5>
                      </Label>
                    </Row>
                  </Fragment>
                </ModalBody>

                <ModalFooter>
                  <FormGroup className="float-sm-right ">
                    <Button type="submit" outline color="primary">
                      {ModulesName.Yes}
                    </Button>
                    <Button
                      color="danger"
                      className="ml-2"
                      onClick={() => this.toggleDeleteModal()}
                    >
                      {ModulesName.No}
                    </Button>
                  </FormGroup>
                </ModalFooter>
              </AvForm>
            </Modal>

            <Modal
              size="lg"
              isOpen={this.state.manageModal}
              toggle={this.toggleManageModal}
            >
              <ModalHeader toggle={this.toggleManageModal}>
                {this.state.ApiModule && this.state.ApiModule.ID
                  ? ModulesName.UpdateApiModule
                  : ModulesName.AddApiModule}
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={ApiModuleValidation}
                onSubmit={this.handleSubmit}

                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <ModalBody>
                      <Fragment>
                        <Row className="mb-10">
                          <Colxx xxs="12" sm="6" md="6" lg="6">
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
                          </Colxx>
                          <Colxx xxs="12" sm="6" md="6" lg="6">
                            <FormGroup className="form-group has-float-label">
                              <Label className="requiredField">{ModulesName.Route}</Label>
                              <Field
                                type="text"
                                className="form-control"
                                autocomplete="off"
                                name="Route"
                              />
                              {errors.Route && (
                                <div className="invalid-feedback d-block">
                                  {errors.Route}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                        </Row>
                        <Row className="mb-10">
                          <Colxx xxs="12" sm="6" md="6" lg="6">
                            <FormGroup className="form-group has-float-label">
                              <DropDown
                                className="react-select"
                                classNamePrefix="react-select"
                                label="Method"
                                name="Method"
                                MobcolSplit={12}
                                isClearable
                                labelClassName="requiredField"
                                isSearchable
                                options={this.state.MethodList}
                                value={
                                  values &&
                                  values.Method &&
                                  (typeof values.Method ===
                                    "string"
                                    ? this.state.MethodList.find(
                                      r =>
                                        r.value ===
                                        values.Method
                                    )
                                    : this.state.MethodList.find(
                                      r =>
                                        r.value ===
                                        values.Method
                                    ))
                                }
                                ClearAction={() => {
                                  setFieldValue(`Method`, "")
                                }}
                                Action={entity => {
                                  if (entity) {
                                    setFieldValue(
                                      "Method",
                                      entity ? entity.value : null
                                    )
                                  }
                                }}
                                errors={errors.Method}
                              />
                            </FormGroup>
                          </Colxx>
                        </Row>
                      </Fragment>
                    </ModalBody>

                    <ModalFooter>
                      <FormGroup className="float-sm-right ">
                        {this.state.ApiModule.ID ? (
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
                          color="danger"
                          outline
                          className="ml-2"
                          onClick={() => this.toggleManageModal()}
                        >
                          {ModulesName.Cancel}
                        </Button>
                      </FormGroup>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </Modal>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default withRouter(ApiModule)
