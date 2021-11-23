import React, { Component, Fragment } from "react"
import { Colxx } from "../../components/Common/CustomBootstrap"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
} from "reactstrap"
import Select from "react-select"
import { area, level, areatype } from "../../constants/config"
import { BASE_URL } from "../../constants/config"
import { CallService } from "../../helpers/ServiceCall"
import { MethodType, ModulesName } from "../../constants/defaultValues"
import CustomSelectInput from "../../components/Common/CustomSelectInput"
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation"
import "react-tagsinput/react-tagsinput.css"
import "react-datepicker/dist/react-datepicker.css"
import "rc-switch/assets/index.css"
import "rc-slider/assets/index.css"
import { Message } from "../../helpers/language_helper"


class ManageArea extends Component {
  constructor(props) {
    super(props)
    this.Managearea = this.Managearea.bind(this)
    this.CreateRow = this.CreateRow.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      readMode: false,
      AreaTypes: [],
      Levels: [],
      areas: [],
      area: {},
    }
  }
  scrollToRef = ref => window.scrollTo(0, ref.offsetTop)
  componentWillMount() {

    this.GetLevels()
    this.GetParentAreas()

  }
  componentDidMount() {
    const { id } = this.props.match.params

    if (id) {
      this.GetOnearea(id)
      const params = new URLSearchParams(this.props.location.search)
      const mode = params.get("mode")
      if (mode === "read") {
        this.setState({ readMode: true })
      } else {
        this.setState({ readMode: false })
      }
    }
  }
  CreateRow() {

    var AddArea = {
      Name: "",
      Level: null,
      ParentArea: null,
      AreaType: "",
    }
    AddArea.Name = this.state.area.Name
    AddArea.Level = this.state.area.Level
    AddArea.AreaType = this.state.area.AreaType
    AddArea.ParentArea = this.state.area.ParentArea
    CallService(
      area.Create,
      MethodType.PUT,
      false,
      AddArea,
      "",
      this.CreateRowResponse
    )
  }
  CreateRowResponse = data => {
    if (data.result) {
      SuccessMessage(Message("area.add.success"))
    } else {
      ErrorMessage(Message("area.api.error"))
    }
    this.props.history.push("/area")
  }
  UpdateRow() {

  }
  UpdateRowResponse = data => {
    if (data.result) {
      SuccessMessage(Message("area.update.success"))
    } else {
      ErrorMessage(Message("area.api.error"))
    }
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
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
  }

  GetAreaTypes() {
    CallService(
      areatype.GetAll,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 9999999999, OrderByType: "desc" },
      "",
      this.GetAreaTypesResponse
    )
  }

  GetAreaTypesResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        AreaTypes: entityArr,
      })
    }
  }
  GetAllArea() {
    CallService(
      area.GetAll,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 9999999999, OrderByType: "desc" },
      "",
      this.GetAllAreaResponse
    )
  }
  GetAllAreaResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        areas: entityArr,
      })
    }
  }
  GetLevels() {
    CallService(
      level.GetAllLevel,
      MethodType.POST,
      false,
      "",
      "",
      this.GetLevelsResponse
    )
  }

  GetLevelsResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value.ID, key: key }
        entityArr.push(entity)
      })
      this.setState({
        Levels: entityArr,
      })
    }
  }
  GetParentAreas() {

  }

  GetParentAreasResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        ParentAreas: entityArr,
      })
    }
  }
  handleSubmit(event, errors) {
    if (errors.length === 0) {
      if (!this.state.area.LevelID) {
        WarningMessage(Message("area.warning.message"))
      } else {
        this.Managearea()
      }
    } else {
      var element = document.getElementsByName(errors[0])[0]
      var parentId = element.parentNode.parentNode.parentNode.parentNode.id
      this.scrollToRef(element)
      this.toggleTab(parentId)
    }
  }
  Managearea() {

    var dataToPass = this.state.area

    if (this.state.area._id)
      CallService(
        area.Update + this.state.area._id,
        MethodType.PATCH,
        false,
        dataToPass,
        "",
        this.ManageareaResponse
      )
    else
      CallService(
        area.Create,
        MethodType.PUT,
        false,
        dataToPass,
        "",
        this.ManageareaResponse
      )


  }

  ManageareaResponse = data => {
    if (data.statusCode === "200" && !data.result) {
      this.props.history.push("/area")
      SuccessMessage(Message("area.update.success"))
    } else if (data.result) {
      this.props.history.push("/area")
      SuccessMessage(Message("area.add.success"))
    } else {
      ErrorMessage(Message("area.api.error"))
    }
  }

  Deletearea() {
    if (this.state.area._id)
      CallService(
        `${BASE_URL}area/` + this.state.area._id,
        MethodType.DELETE,
        false,
        this.state.area,
        "",
        this.ManageareaResponse
      )
  }

  render() {
    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Row className="mb-4">
              <Colxx xxs="12">
                <Card>
                  <CardBody>
                    <CardTitle>{ModulesName.Zone}</CardTitle>
                    <AvForm onSubmit={this.handleSubmit}>
                      <Row>
                        <Colxx
                          key="5da6b545760b2d0e7fd7646b"
                          sm="12"
                          hidden={false}
                        >
                          <Label className="requiredField">{ModulesName.Name}</Label>

                          <AvGroup>
                            {this.state.readMode ? (
                              <Label
                                className="av-label"
                                for="5da6b545760b2d0e7fd7646b"
                              >
                                {this.state.area.Name}
                              </Label>
                            ) : (
                              <AvInput
                                required
                                className="form-control"
                                name="name"
                                autocomplete="none"
                                id="5da6b545760b2d0e7fd7646b"
                                value={this.state.area.Name}
                                onChange={({ target }) =>
                                  this.setState(prevState => ({
                                    area: {
                                      ...prevState.area,
                                      Name: target !== null ? target.value : "",
                                    },
                                  }))
                                }
                              />
                            )}

                            <AvFeedback>{ModulesName.ValidName}</AvFeedback>
                          </AvGroup>
                        </Colxx>{" "}
                        <Colxx
                          key="5da6b545760b2d0e7fd7646c"
                          sm="12"
                          hidden={false}
                        >
                          {" "}
                          <Label
                            className="requiredField av-label"
                            for="5da6b545760b2d0e7fd7646c"
                          >
                            {ModulesName.Level}
                          </Label>
                          <AvGroup>
                            {this.state.readMode ? (
                              <a
                                href="#"
                                onClick={() => {
                                  this.props.history.push(
                                    "/levelmanage/" +
                                    this.state.area.LevelID._id +
                                    "?mode=read"
                                  )
                                }}
                              >
                                {this.state.area.LevelID}
                              </a>
                            ) : (
                              <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isClearable="true"
                                required
                                name="Level"
                                value={
                                  this.state.area.LevelID !== undefined
                                    ? this.state.area.LevelID.ID !== undefined
                                      ? this.state.Levels.find(
                                        d =>
                                          d.value ===
                                          this.state.area.LevelID.ID
                                      )
                                      : this.state.Levels.find(
                                        d =>
                                          d.value === this.state.area.LevelID
                                      )
                                    : ""
                                }
                                onChange={target => {
                                  const areas = []
                                  if (target)
                                    if (target.key === undefined)
                                      target.forEach(tar => {
                                        areas.push(tar.value)
                                      })
                                  this.setState(prevState => ({
                                    area: {
                                      ...prevState.area,
                                      LevelID:
                                        target !== null ? target.value : "",
                                    },
                                  }))
                                }}
                                options={this.state.Levels}
                              />
                            )}
                            <AvFeedback>{ModulesName.ValidLevel}</AvFeedback>
                          </AvGroup>
                        </Colxx>

                      </Row>

                      <Colxx sm={12}>
                        <FormGroup></FormGroup>
                      </Colxx>
                      <Colxx sm={12}>
                        {this.state.readMode ? (

                          ""
                        ) : (
                          <FormGroup className="float-sm-right">
                            <Button type="submit" outline color="primary">
                              {ModulesName.Add}
                            </Button>
                            <Button
                              outline
                              style={{ marginLeft: "10px" }}
                              className="form-second-btn"
                              type="button"
                              onClick={() => {
                                this.props.history.push("/area")
                              }}

                              color="danger"
                            >
                              {ModulesName.Cancel}
                            </Button>
                          </FormGroup>
                        )}
                      </Colxx>
                    </AvForm>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default ManageArea
