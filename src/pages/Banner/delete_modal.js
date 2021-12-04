import React, { Fragment } from "react"
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap"

function BannerDeleteModal(props) {
  return (
    <Modal isOpen={props.deleteModal} toggle={props.toggleDeleteModal}>
      <ModalHeader toggle={props.toggleDeleteModal}>
        Delete Banner
      </ModalHeader>

      <ModalBody>
        <Fragment>
          <Row className="mb-4">
            <div className="ml-3 mr-2">
              <p className="h5">
                Are you sure you want to delete this{" "}
                <strong>{props.banner && props.banner.name}</strong>{" "}
                Banner ?
              </p>
            </div>
          </Row>
        </Fragment>
      </ModalBody>

      <ModalFooter>
        <FormGroup className="float-sm-right ">
          <Button
            className={`btn-shadow btn-multiple-state ${
              props.buttonAction ? "disabled show-spinner " : ""
            }`}
            onClick={() => {
              props.deleteBanner(props.banner.id)
            }}
            outline
            color="primary"
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label ">Yes</span>
          </Button>
          <Button
            color="danger"
            className="ml-2"
            outline
            onClick={() => props.toggleDeleteModal()}
          >
            No
          </Button>
        </FormGroup>
      </ModalFooter>
    </Modal>
  )
}

export default BannerDeleteModal