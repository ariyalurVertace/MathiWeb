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
import { notificationValidation } from "../../helpers/validations"

function NotificationAddEditModal(props) {
  const formik = useFormik({
    initialValues: props.notification,
    validationSchema: notificationValidation,
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
        {props.notification && props.notification.id
          ? "Update Notification"
          : " Add Notification"}
      </ModalHeader>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2 ">
          <ModalBody>
            <Fragment>
              <Row>
                <Col xs="12" sm="12" md="12" lg="12">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Title</Label>
                    <Input
                      className="form-control"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.title && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.title}
                      </div>
                    )}
                  
                  </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="12" lg="12">
                  <FormGroup className="form-group has-float-label">
                    <Label >Description</Label>
                    <Input
                      className="form-control"
                      name="description"
                      type="text"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                   
                  
                  </FormGroup>
                </Col>
              </Row>
            </Fragment>
          </ModalBody>

          <ModalFooter>
            <FormGroup className="float-sm-right ">
              {props.notification?.id ? (
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
                  <span className="label ">Update</span>
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
              <Button
                color="danger"
                outline
                className="ml-2"
                onClick={() => props.toggleManageModal()}
              >
                Cancel
              </Button>
            </FormGroup>
          </ModalFooter>
        </div>
      </form>
    </Modal>
  )
}

export default NotificationAddEditModal
