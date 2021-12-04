import React, { useState } from "react"
import PropTypes from "prop-types"
import { Col, Container, Row, FormGroup, Label, Button } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import LoginCarousel from "../../components/Common/LoginCarousel"

// import images
import logo from "../../assets/images/logo.png"
import { Formik, Form, Field } from "formik"
import { loginValidation } from "../../helpers/validations"
import { Message } from "../../helpers/language_helper"
import { setItemOnLocalStorage } from "../../helpers/utils"
import { authentication } from "../../constants/config"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/ServiceCall"
import footerlogo from "../../assets/images/vertace.png"
import { ErrorMessage } from "../../helpers/notifications"

function Login(props) {
  const [buttonAction, setButtonAction] = useState(false)
  const loginRequestModel = {
    mobileNumber: "",
    password: "",
  }
  const authenticateLogin = values => {
    setButtonAction(true)

    if (values) {
      CallService(
        authentication.login,
        MethodType.POST,
        false,
        values,
        "",
        authenticateUserResponse
      )
    } else {
      toastr.error("", "UserName Password Incorrect")
    }
  }

  const authenticateUserResponse = data => {
    setButtonAction(false)
    if (data.statusCode === StatusCodes.Unauthorized) {
      ErrorMessage(Message("Unauthorized.error"))
    }
    if (data.result) {
      setItemOnLocalStorage("user_id", data.result.UserId)
      setItemOnLocalStorage("user_token", data.result.token)
      setItemOnLocalStorage("user_name", data.result.Username)
      if (data.result.ForcePasswordChange) {
        props.history.push("/change-password")
      } else {
        if (data.statusCode === StatusCodes.Success) {
          props.history.push("/category")
        }
      }
    }
  }

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="no-gutters">
            <LoginCarousel />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-md-5">
                      <Link to="#" className="d-block auth-logo">
                        <img
                          src={logo}
                          alt=""
                          width="150"
                          className="auth-logo-dark m-auto"
                        />
                      </Link>
                      <h3 className="pt-3" style={{ textAlign: "center" }}>
                        Mathi{" "}
                      </h3>
                    </div>
                    <div className="my-auto">
                      <div className="mt-0">
                        <Formik
                          initialValues={loginRequestModel}
                          validationSchema={loginValidation}
                          onSubmit={authenticateLogin}
                          validateOnBlur={false}
                          validateOnChange={false}
                          enableReinitialize={true}
                        >
                          {({ errors }) => (
                            <Form>
                              <FormGroup>
                                <Label for="username">Username</Label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="Username"
                                  placeholder={Message("username.placeholder")}
                                />
                                {errors.Username && (
                                  <div className="invalid-feedback d-block">
                                    {errors.Username}
                                  </div>
                                )}
                              </FormGroup>

                              <FormGroup>
                                <Label for="userpassword">Password</Label>
                                <Field
                                  type="password"
                                  name="Password"
                                  className="form-control"
                                  placeholder={Message("password.placeholder")}
                                />
                                {errors.Password && (
                                  <div className="invalid-feedback d-block">
                                    {errors.Password}
                                  </div>
                                )}
                              </FormGroup>

                              <div className="mt-3">
                                <Button
                                  color="primary"
                                  type="submit"
                                  block
                                  className={`btn-shadow btn-multiple-state ${
                                    buttonAction ? "show-spinner " : ""
                                  }`}
                                >
                                  <span className="spinner d-inline-block">
                                    <span className="bounce1" />
                                    <span className="bounce2" />
                                    <span className="bounce3" />
                                  </span>
                                  <span className="label ">Login</span>
                                </Button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="3mb-0">
                        {/* © {new Date().getFullYear()}  {this.props.t("company.name")}. */}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm-center ">
                    Powered By{" "}
                    <a
                      style={{
                        cursor: "pointer",
                        color: "#007bff",
                        textDecoration: "underline",
                      }}
                      href="https://vertace.com/"
                      target="blank"
                    >
                      <img
                        alt="vertace"
                        src={footerlogo}
                        style={{
                          width: "25px",
                          objectFit: "contain",
                        }}
                      />
                      Vertace
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Login.propTypes = {
  t: PropTypes.any,
}

export default withRouter(Login)