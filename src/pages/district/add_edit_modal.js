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
import { districtValidation } from "../../helpers/validations"

function DistrictAddEditModal(props) {
  const formik = useFormik({
    initialValues: props.district,
    validationSchema: districtValidation,
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
        {props.district && props.district.id
          ? "Update District"
          : "Add District"}
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
               <Col xs="12" sm="12" md="12" lg="12">
                  <FormGroup className="form-group has-float-label">
                    <DropDown
                      className="react-select"
                      classNamePrefix="react-select"
                      label="State"
                      name="stateid"
                      MobcolSplit={12}
                      isClearable
                      labelClassName="requiredField"
                      isSearchable
                      options={props.stateList}
                      value={
                        formik.values &&
                        formik.values.stateId &&
                        (typeof formik.values.stateId === "object"
                          ? props.stateList.find(
                              r => r.value === formik.values.stateId.id
                            )
                          : props.stateList.find(
                              r => r.value === formik.values.stateId
                            ))
                      }
                      ClearAction={() => {
                        formik.setFieldValue(`stateId`, null)
                      }}
                      Action={entity => {
                        if (entity) {
                          formik.setFieldValue(
                            "stateId",
                            entity ? entity.value : null
                          )
                        }
                      }}
                      errors={formik.errors.stateId}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Fragment>
          </ModalBody>

          <ModalFooter>
            <FormGroup className="float-sm-right ">
              {props.district?.id ? (
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

export default DistrictAddEditModal
