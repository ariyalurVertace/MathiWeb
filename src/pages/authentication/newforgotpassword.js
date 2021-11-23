import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Label,
  Button,
  FormGroup,
} from "reactstrap"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Formik, Form, Field } from "formik"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// action
import { userForgetPassword } from "../../store/actions"
import { ForgotPasswordValidation } from "../../helpers/validations"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.png"

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    if (values) {
      toastr.success("A Link Has Been Sent To Your Email!")
      this.props.history.push("/login")
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden mt-5">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-12">
                        <div className="text-primary p-4 m-2">
                          <h5 className="text-primary">QBT Triage Tracking</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="70"
                              width="70"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <h5 className="mb-2">Forgot Password</h5>
                      {this.props.forgetError && this.props.forgetError ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {this.props.forgetError}
                        </Alert>
                      ) : null}
                      {this.props.forgetSuccessMsg ? (
                        <Alert color="success" style={{ marginTop: "13px" }}>
                          {this.props.forgetSuccessMsg}
                        </Alert>
                      ) : null}

                      <Formik
                        initialValues={{}}
                        onSubmit={this.handleValidSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validationSchema={ForgotPasswordValidation}
                      >
                        {({ setFieldValue, errors, values }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <Row className="pt-4">
                              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField">
                                    Username
                                  </Label>
                                  <Field
                                    className="form-control"
                                    type="text"
                                    name="Username"
                                  />
                                  {errors.Username && (
                                    <div className="invalid-feedback d-block">
                                      {errors.Username}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Col sm={12} className="text-right">
                              <Button
                                className="btn btn-primary w-md waves-effect waves-light"
                                type="submit"
                                color="primary"
                              >
                                Reset Password
                              </Button>
                            </Col>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Go back to{" "}
                    <Link
                      to="login"
                      className="font-weight-medium text-primary"
                    >
                      Login
                    </Link>{" "}
                  </p>
                  <p>© {new Date().getFullYear()} QBT Triage Tracking</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.func,
  forgetSuccessMsg: PropTypes.func,
  history: PropTypes.object,
  userForgetPassword: PropTypes.any,
}

const mapStateToProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword
  return { forgetError, forgetSuccessMsg }
}

export default withRouter(
  connect(mapStateToProps, { userForgetPassword })(ForgetPasswordPage)
)
