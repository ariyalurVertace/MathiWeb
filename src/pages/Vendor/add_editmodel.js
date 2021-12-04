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
import { vendorValidation } from "../../helpers/validations"

function VendorAddEditModal(props) {
  const formik = useFormik({
    initialValues: props.vendor,
    validationSchema: vendorValidation,
    onSubmit: values => {
      props.handleSubmit(values)
    },
    enableReinitialize: true,
  })

  return (
    <Modal
      size="lg"
      isOpen={props.manageModal}
      toggle={props.toggleManageModal}
    >
      <ModalHeader toggle={props.toggleManageModal}>
        {props.vendor && props.vendor.id
          ? "Update Vendor"
          : "Add Vendor"}
      </ModalHeader>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2 ">
          <ModalBody>
            <Fragment>
              <Row>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">FirstName</Label>
                    <Input
                      className="form-control"
                      firstname="firstname"
                      type="text"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && (
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
                      name="lastName"
                      type="text"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </FormGroup>
                </Col> 
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Mobile Number</Label>
                    <Input
                      className="form-control"
                      name="mobileNumber"
                      type="text"
                      value={formik.values.mobileNumber}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.mobileNumber && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.mobileNumber}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Email Id</Label>
                    <Input
                      className="form-control"
                      name="email"
                      type="text"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.email}
                      </div>
                    )}

              </FormGroup>
               </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Addressline1</Label>
                    <Input
                      className="form-control"
                      name="Address line1"
                      type="text"
                      value={formik.values.adressline1}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.email}
                      </div>
                    )}
                </FormGroup>     
               </Col>
               <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Address line2</Label>
                    <Input
                      className="form-control"
                      name="Address line2"
                      type="text"
                      value={formik.values.adressline2}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.email}
                      </div>
                    )}
                   
               </FormGroup>     
               </Col>
               <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                  <DropDown
                      className="react-select"
                      classNamePrefix="react-select"
                      label="State"
                      name="state"
                      MobcolSplit={12}
                      isClearable
                      labelClassName=""
                      isSearchable
                      options={props.stateList}
                      value={
                        formik.values &&
                        formik.values.state &&
                        (typeof formik.values.state === "object"
                          ? props.stateList.find(
                              r => r.value === formik.values.state.id
                            )
                          : props.stateList.find(
                              r => r.value === formik.values.state
                            ))
                      }
                      ClearAction={() => {
                        formik.setFieldValue(`state`, null)
                      }}
                      Action={entity => {
                        if (entity) {
                          formik.setFieldValue(
                            "state",
                            entity ? entity.value : null
                          )
                        }
                      }}
                    />
                </FormGroup>
               </Col> 
               <Col><FormGroup>     
               <DropDown
                      className="react-select"
                      classNamePrefix="react-select"
                      label="District"
                      name="District"
                      MobcolSplit={12}
                      isClearable
                      labelClassName=""
                      isSearchable
                      options={props.DistrictList}
                      value={
                        formik.values &&
                        formik.values.district &&
                        (typeof formik.values.district === "object"
                          ? props.districtList.find(
                              r => r.value === formik.values.District.id
                            )
                          : props.districtList.find(
                              r => r.value === formik.values.parentDistrict
                            ))
                      }
                      ClearAction={() => {
                        formik.setFieldValue(`District`, null)
                      }}
                      Action={entity => {
                        if (entity) {
                          formik.setFieldValue(
                            "district",
                            entity ? entity.value : null
                          )
                        }
                      }}
                    />
                </FormGroup>
                </Col>
               <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Pincode</Label>
                    <Input
                      className="form-control"
                      name="Pincode"
                      type="text"
                      value={formik.values.District}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.Pincode && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.Pincode}
                      </div>)}
                </FormGroup>
               </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Landmark</Label>
                    <Input
                      className="form-control"
                      name="Landmark"
                      type="text"
                      value={formik.values.Landmark}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.Landmark && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.Landmark}
                      </div>
                    )}
                </FormGroup>
                </Col>   
              </Row>
            </Fragment>
          </ModalBody>

          <ModalFooter>
            <FormGroup className="float-sm-right ">
              {props.vendor?.id ? (
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

export default VendorAddEditModal
