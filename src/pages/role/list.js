import React, { Fragment, Component } from "react"
import { AvForm } from "availity-reactstrap-validation"
import { Formik, Form, Field } from "formik"

import { withRouter } from "react-router-dom"

import "react-dual-listbox/lib/react-dual-listbox.css"

import DualListBox from "react-dual-listbox"
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
  Col,
  ButtonGroup,
} from "reactstrap"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { CallService } from "../../helpers/ServiceCall"
import {
  MethodType,
  StatusCodes,
  ModulesName,
} from "../../constants/defaultValues"
import ListPage from "../../components/custom/ListPage"
import { role, apimodule, apimoduleroleaccess } from "../../constants/config"

import { roleValidation } from "../../helpers/validations"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import { Message } from "../../helpers/language_helper"

class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentpage: 1,
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      roleList: [],

      ListRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      Role: {
        Name: "",
      },
      RoleApiModule: {
        RoleId: "",
        APIModules: [],
      },
      apimoduleSelected: [],
      RoleApiModuleName: "",
      options: [],

      columns: [
        {
          name: "Name",
          selector: "Name",
          sortable: false,
          cell: row => <span>{row.Name ? row.Name : ""}</span>,
        },

        {
          name: "Action",
          selector: "action",
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
                <Button
                  outline
                  color="success"
                  className="mobileViewFonts pl-1 pr-1 ml-2"
                  onClick={() => this.toggleMappingApiModule(row)}
                >
                  {ModulesName.MappingAPIModule}
                </Button>
              </ButtonGroup>
            </Row>
          ),
        },
      ],
    }
  }
  componentDidMount = () => {
    this.getAllRole()
    this.GetApiModules()


  }

  GetApiModules = () => {
    this.setState({
      isLoading: false,
    })
    CallService(
      apimodule.GetAll,
      MethodType.POST,
      false,
      "",
      "",
      this.GetApiModulesResponse
    )
  }
  GetApiModulesResponse = data => {
    if (data.result) {
      this.setState({
        isLoading: false,
        options: data.result.map(function (a) {
          return { value: a.ID, label: a.Name }
        }),
      })
    } else
      this.setState({
        isLoading: false,
      })
  }

  getAllRole = () => {
    this.setState({
      isLoading: false,
    })
    CallService(
      role.GetAll,
      MethodType.POST,
      false,
      "",
      "",
      this.getAllRoleResponse
    )
  }

  getAllRoleResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        roleList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  HandleRowClicked = row => {

    if (row) {
      this.setState({
        Role: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  addBtnClick = () => {
    this.setState({
      Role: {
        Name: "",
      },
      manageModal: !this.state.manageModal,
    })
  }

  handleSubmit = values => {
    if (!this.state.buttonAction) {
      this.setState({
        buttonAction: true,
      })
      this.manageRole(values)
    }
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
          this.getAllRole()
        }
      }
    )
  }

  manageRole = values => {
    CallService(
      values.ID ? role.Update + values.ID : role.Create,
      values.ID ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageRoleResponse
    )
  }
  manageRoleResponse = data => {
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(
        Message(
          this.state.Role.ID ? "role.update.success" : "role.add.success",
          ""
        )
      )
      this.getAllRole()
      this.setState({
        buttonAction: false,
        manageModal: !this.state.manageModal,
      })
    } else {
      ErrorMessage(Message("role.api.error"))
      this.setState({
        buttonAction: false,
      })
    }
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
        this.getAllRole()
      }
    )
  }
  GetOneApiModule(id) {

    CallService(
      apimoduleroleaccess.GetOne + id,
      MethodType.GET,
      true,
      "",
      "",
      this.GetOneApiModuleResponse
    )
  }


  GetOneApiModuleResponse = data => {
    if (data.result) {
      this.setState({

        apimoduleSelected: data.result.map(function (a) {
          return a.APIModule.ID


        }
        )

      }

      )
    }

  }



  toggleManageModal = () => {
    this.setState({
      manageModal: !this.state.manageModal,
      Role: {},
    })
  }



  toggleMappingApiModule = row => {


    if (row && row.ID) {
      this.GetOneApiModule(row.ID)

      this.setState({
        manageApiModal: !this.state.manageApiModal,
        RoleApiModule: {
          RoleId: row ? row.ID : "",
          RoleName: row ? row.Name : "",
        },





      })

    } else {
      this.setState({
        manageApiModal: !this.state.manageApiModal
      })

    }

  }






  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      Role: row,
    })
  }
  deleteRole = id => {
    CallService(
      role.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      this.deleteRoleResponse
    )
  }
  deleteRoleResponse = data => {
    this.setState({
      buttonAction: false,
    })
    this.toggleDeleteModal()
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(Message("role.delete.success"))

      this.getAllRole()
    } else {
      ErrorMessage(Message("role.api.error"))

    }
  }


  onChange = (apimoduleSelected) => {
    this.setState({
      apimoduleSelected,
      RoleApiModule: {
        RoleId: this.state.RoleApiModule.RoleId,
        APIModules: apimoduleSelected
      }
    })
  }

  saveApiModule = () => {

    CallService(
      apimoduleroleaccess.Create,
      MethodType.PUT,
      false,
      this.state.RoleApiModule,
      "",
      this.apimodulemanageResponse
    )

  }
  apimodulemanageResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(Message("apimodule.add.success"))
      this.toggleMappingApiModule()

    } else {
      ErrorMessage(Message("role.api.error"))

    }

  }

  render() {

    const initialValues = this.state.Role
    const conditionalRowStyles = [
      {
        when: row => row,
        style: {
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ]
    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Card>
              <CardBody>
                <div className="PoliceView">
                  <ListPageHeader
                    heading={`${ModulesName.Home}.${ModulesName.Role}`}
                    buttonText={`${ModulesName.Add} ${ModulesName.Role}`}
                    onTextChange={this.SearchQueryChanged}
                    buttonClick={this.addBtnClick}
                    searchValue={this.state.ListRequestModel.searchString}
                  />
                </div>

                <div className="PoliceView">
                  <ListPage
                    conditionalRowStyles={conditionalRowStyles}
                    columns={this.state.columns}
                    data={this.state.roleList}
                    keyField={this.state.keyField}
                    totalCount={this.state.totalCount}
                    // rowClicked={this.HandleRowClicked}
                    rowsPerPageOnChange={this.handlePerRowsChange}
                    pageChange={this.handlePageChange}
                    isDataLoading={this.state.isLoading}
                    overFlowXRemoval={true}
                  />
                </div>
              </CardBody>
            </Card>

            <Modal
              isOpen={this.state.deleteModal}
              toggle={this.toggleDeleteModal}
            >
              <ModalHeader toggle={this.toggleManageModal}>
                {ModulesName.DeleteRole}
              </ModalHeader>
              <AvForm onSubmit={() => this.deleteRole(this.state.Role.ID)}>
                <ModalBody>
                  <Fragment>
                    <Row className="mb-4">
                      <Label className="av-label ml-3 mr-2">
                        <h5>
                          {ModulesName.DeleteContent}{" "}
                          {this.state.Role ? this.state.Role.Name : ""} {ModulesName.Role} ?
                        </h5>
                      </Label>
                    </Row>
                  </Fragment>
                </ModalBody>
                <ModalFooter>
                  <FormGroup className="float-sm-right">
                    <Button type="submit" outline color="primary">
                      {ModulesName.Yes}
                    </Button>
                    <Button
                      className="ml-2"
                      color="danger"
                      onClick={this.toggleDeleteModal}
                    >
                      {ModulesName.No}
                    </Button>
                  </FormGroup>
                </ModalFooter>
              </AvForm>
            </Modal>

            <Modal size="lg"
              isOpen={this.state.manageApiModal}
              toggle={this.toggleMappingApiModule}
            >
              <ModalHeader toggle={this.toggleMappingApiModule}>
                {ModulesName.MappingAPIModule} For {this.state.RoleApiModule ? this.state.RoleApiModule.RoleName : ""}
              </ModalHeader>
              <AvForm>
                <ModalBody>

                  <DualListBox
                    canFilter
                    filterPlaceholder="Search..."
                    options={this.state.options}

                    selected={this.state.apimoduleSelected}
                    onChange={this.onChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <FormGroup className="float-sm-right">

                    <Button
                      className="float mt-2"
                      outline
                      color="primary"
                      onClick={this.saveApiModule}

                    >
                      {ModulesName.Add}
                    </Button>
                    <Button
                      color="danger"
                      className="ml-2 mt-2"
                      outline
                      onClick={() => this.toggleMappingApiModule()}
                    >
                      {ModulesName.Cancel}
                    </Button>


                  </FormGroup>

                </ModalFooter>
              </AvForm>
            </Modal>

            <Modal
              size="md"
              isOpen={this.state.manageModal}
              toggle={this.toggleManageModal}
            >
              <ModalHeader toggle={this.toggleManageModal}>
                {this.state.Role && this.state.Role.ID
                  ? ModulesName.UpdateRole
                  : ModulesName.AddRole}
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                validationSchema={roleValidation}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors }) => (
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
                        </Row>
                      </Fragment>
                    </ModalBody>
                    <ModalFooter>
                      <div className="container-fluid">
                        <Row>
                          <Col lg="">
                            <Label>
                              <span style={{ color: "red" }}>{ModulesName.Star}</span>
                              {ModulesName.MandatoryFields}
                            </Label>
                          </Col>

                          <FormGroup className="float-right ">
                            {this.state.Role.ID ? (
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
                        </Row>
                      </div>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </Modal>

            <Modal
              size="md"
              isOpen={this.state.manageModal}
              toggle={this.toggleManageModal}
            >
              <ModalHeader toggle={this.toggleManageModal}>
                {this.state.Role && this.state.Role.ID
                  ? ModulesName.UpdateRole
                  : ModulesName.AddRole}
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                validationSchema={roleValidation}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors }) => (
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
                        </Row>
                      </Fragment>
                    </ModalBody>
                    <ModalFooter>
                      <div className="container-fluid">
                        <Row>
                          <Col lg="">
                            <Label>
                              <span style={{ color: "red" }}>{ModulesName.Star}</span>
                              {ModulesName.MandatoryFields}
                            </Label>
                          </Col>

                          <FormGroup className="float-right ">
                            {this.state.Role.ID ? (
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
                        </Row>
                      </div>
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

export default withRouter(Role)