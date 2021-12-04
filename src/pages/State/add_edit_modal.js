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
import { stateValidation } from "../../helpers/validations"

function StateAddEditModal(props) {
  const formik = useFormik({
    initialValues: props.state,
    validationSchema: stateValidation,
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
        {props.state&& props.state.id
          ? "Update State"
          : "Add State"}
      </ModalHeader>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2 ">
          <ModalBody>
            <Fragment>
              <Row>
                <Col xs="12" sm="12" md="12" lg="12">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Name</Label>
                    <Input
                      className="form-control"
                      name="name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.name}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </Fragment>
          </ModalBody>

          <ModalFooter>
            <FormGroup className="float-sm-right ">
              {props.state?.id ? (
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

export default StateAddEditModal
