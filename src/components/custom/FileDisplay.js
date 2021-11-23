import React, { Component, Fragment } from "react";
import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Col
} from "reactstrap";
import { checkIfImage } from "../../helpers/utils";
import loader from "../../assets/images/Loader.gif";

export default class FileDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DocumentViewModal: false,
    };
  }
  ToggleViewModal = (url) => {
    this.setState({
      DocumentViewModal: !this.state.DocumentViewModal,
      DocumentView: url,
    });
  };
  render() {
    return (
      <Fragment>
        <div className={this.props.className}>
          <span
            //style={{ cursor: "Pointer" }}
            className="LinkStyle"
            onClick={() => this.ToggleViewModal(this.props.Value)}
          >
            View
          </span>
          {" | "}
          <a
            className="LinkStyle"
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.Value}
          >
            Download
          </a>
        </div>
        <Modal
          className="viewDocumentModal"
          isOpen={this.state.DocumentViewModal}
          size="lg"
          toggle={this.ToggleViewModal}
        >
          <ModalHeader toggle={this.ToggleViewModal}>
            <b>View</b>
          </ModalHeader>
          <ModalBody>
            <Row>
              {this.state.DocumentView ? (
                checkIfImage(this.state.DocumentView) ? (
                  ""
                ) : (
                  <div id="mydiv">
                    <img alt="loader" src={loader} className="ajax-loader" />
                  </div>
                )
              ) : (
                ""
              )}
              <Col lg="12">
                {this.state.DocumentView ? (
                  checkIfImage(this.state.DocumentView) ? (
                    <img
                      alt="docView"
                      src={this.state.DocumentView}
                      title="documentview"
                      height="600px"
                      width="100%"
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <iframe
                      onLoad={this.hideSpinner}
                      title="documentview"
                      width="100%"
                      height="600px"
                      src={`https://docs.google.com/viewer?url=${this.state.DocumentView}&embedded=true`}
                    ></iframe>
                  )
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <FormGroup>
              <a href={this.state.DocumentView}>
                <Button
                  type="submit"
                  className="default   btn-sm mb-2 btn-addon"
                  color="primary"
                >
                  Download
                </Button>{" "}
              </a>
              <Button
                className="default   btn-sm mb-2 btn-addon"
                color="danger"
                onClick={() => this.ToggleViewModal()}
              >
                Close
              </Button>
            </FormGroup>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
