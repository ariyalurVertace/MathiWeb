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

function UserAddEditModal(props) {
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
      size="lg"
      isOpen={props.manageModal}
      toggle={props.toggleManageModal}
    >
      <ModalHeader toggle={props.toggleManageModal}>
        {"View"}
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
                      name="firstname"
                      type="text"
                      readOnly
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.firstname && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.firstname}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                 <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Lastname</Label>
                    <Input
                      className="form-control"
                      name="lastname"
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
                    <Label className="requiredField">phoneNo</Label>
                    <Input
                      className="form-control"
                      name="phoneno"
                      type="number"
                      readOnly
                      value={formik.values.phoneno}
                      onChange={formik.handleChange}
                    />
                     {formik.errors.phoneno && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.phoneno}
                      </div>
                    )}
                    
                    
               
               
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                 <FormGroup className="form-group has-float-label">
                    <Label >Email</Label>
                    <Input
                      className="form-control"
                      name="email"
                      type="text"
                      readOnly
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="12" lg="12">
                 <FormGroup className="form-group has-float-label">
                 <Label className="requiredField">Address</Label>
                    <Input
                      className="form-control"
                      name="address"
                      type="text"
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
               
              </Row>
              
            </Fragment>
          </ModalBody>

          <ModalFooter>
            
              <Button
                color="danger"
                outline
                className="ml-2"
                onClick={() => props.toggleManageModal()}
              >
                Cancel
              </Button>
           
          </ModalFooter>
        </div>
      </form>
    </Modal>
  )
}

export default UserAddEditModal
