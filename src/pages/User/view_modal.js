import React, { Fragment } from "react"
import { useFormik } from "formik"
import {
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Input,
} from "reactstrap"
import DropDown from "../../components/custom/DropDown"
import { userValidation } from "../../helpers/validations"

function userAddEditModal(props) {
  const formik = useFormik({
    initialValues: props.user,
    validationSchema: userValidation,
    onSubmit: values => {
      props.handleSubmit(values)
    },
    enableReinitialize: true,
  })

  return (
    <Modal
      size="md"
      isOpen={props.manageModal}
      toggle={props.toggleManageModal}
    >
      <ModalHeader toggle={props.toggleManageModal}>
        View User
      </ModalHeader>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2 ">
          <ModalBody>
            <Fragment>
              <Row>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">First Name</Label>
                    <Input
                      className="form-control"
                      firstname="first name"
                      type="text"
                      readOnly
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.firstname && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.name}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Last Name</Label>
                    <Input
                      className="form-control"
                      lastname="last name"
                      type="text"
                      readOnly
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastname && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.lastname}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Address</Label>
                    <Input
                      className="form-control"
                      name="adress"
                      type="text,number"
                      readOnly
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.address && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.address}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className>Mail Id</Label>
                    <Input
                      className="form-control"
                      lastname="mailid"
                      type="text,number"
                      readOnly
                      value={formik.values.mailid}
                      onChange={formik.handleChange}
                    />
                    
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Mobile Number</Label>
                    <Input
                      className="form-control"
                     mobile number="mobile number"
                      type="number"
                      readOnly
                      value={formik.values.mobilenumber}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.mobilenumber && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.mobilenumber}
                      </div>
                    )}
                  </FormGroup>
                </Col>
               
              </Row>
            </Fragment>
          </ModalBody>

          <ModalFooter>
            <FormGroup className="float-sm-right ">
              {props.user?.id ? (
                <Button
                  className={`btn-shadow btn-multiple-state ${
                    props.buttonAction ? "disabled show-spinner " : ""
                  }`}
                  type="submit"
                  outline
                  color="primary"
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label ">cancel</span>
                </Button>
              ) : (
                <Button
                  className={`btn-shadow btn-multiple-state ${
                    props.buttonAction ? "disabled show-spinner " : ""
                  }`}
                  type="submit"
                  outline
                  color="primary"
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label ">Add</span>
                </Button>
              )}
              
            </FormGroup>
          </ModalFooter>
        </div>
      </form>
    </Modal>
  )
}

export default userAddEditModal
