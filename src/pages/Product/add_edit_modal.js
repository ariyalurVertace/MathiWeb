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
import { productValidation } from "../../helpers/validations"

function ProductAddEditModal(props) {
  const formik = useFormik({
    initialValues: props.product,
    validationSchema: productValidation,
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
        {props.product && props.product.id
          ? "Update product"
          : "Add product"}
      </ModalHeader>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2 ">
          <ModalBody>
            <Fragment>
              <Row>
                <Col xs="6" sm="6" md="6" lg="6">
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
                <Col xs="6" sm="6" md="6" lg="6">
                 <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Price</Label>
                    <Input
                      className="form-control"
                      name="price"
                      type="number"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                    />
                     {formik.errors.price && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.price}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                 <FormGroup className="form-group has-float-label">
                    <Label className="requiredField">Stock</Label>
                    <Input
                      className="form-control"
                      name="stock"
                      type="number"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                    />
                     {formik.errors.stock && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.stock}
                      </div>
                    )}
                    
                    
                  </FormGroup>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormGroup className="form-group has-float-label">
                    <DropDown 
                      className="react-select"
                      classNamePrefix="react-select"
                      label="category"
                      name="category"
                      MobcolSplit={12}
                      isClearable
                      labelClassName="requiredField"
                      isSearchable
                      options={props.productList}
                      value={
                        formik.values &&
                        formik.values.parentProduct &&
                        (typeof formik.values.parentProduct === "object"
                          ? props.productList.find(
                              r => r.value === formik.values.parentProduct.id
                            )
                          : props.productList.find(
                              r => r.value === formik.values.parentProduct
                            ))
                      }
                   
                    />
                     {formik.errors.category && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.category}
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
                <Col xs="6" sm="6" md="6" lg="6">
                 <FormGroup className="form-group has-float-label">
                 <Label className="requiredField">Image</Label>
                    <Input
                      className="form-control"
                      name="image"
                      type="file"
                    
                       
                      value={formik.values.image}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.image && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.image}
                      </div>
                    )}
                   
                    
                    
                  </FormGroup>
                </Col>
               
              </Row>
              
            </Fragment>
          </ModalBody>

          <ModalFooter>
            <FormGroup className="float-sm-right ">
              {props.product?.id ? (
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

export default ProductAddEditModal
