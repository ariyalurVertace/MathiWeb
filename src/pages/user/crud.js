import React, { Component, Fragment } from "react"


import { withRouter } from "react-router-dom"
import {
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Card,
  CardBody,
  Col,
  ButtonGroup,
} from "reactstrap"
import ListPageHeader from "../../components/custom/ListPageHeader"
import ListPage from "../../components/custom/ListPage"
import { AvForm } from "availity-reactstrap-validation"
import { Formik, Form, Field } from "formik"

import { CallService } from "../../helpers/ServiceCall"
import {
  MethodType,
  StatusCodes,
  ModulesName,
} from "../../constants/defaultValues"
import { ebeatLocation, ebeatLocationType, GetOneQrDetail } from "../../constants/config"
import { EbeatLocationValidation } from "../../helpers/validations"
import DropDown from "../../components/custom/DropDown"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"

import QRCode from "react-qr-code"
import { jsPDF } from "jspdf"
import logo from "../../assets/images/Daco_5185090.png"
import html2canvas from "html2canvas"
import { Message } from "../../helpers/language_helper"
import Loader from "react-js-loader"




class EbeatLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentpage: 1,
      buttonAction: false,
      isLoading: false,
      ebeatLocationList: [],
      EBeatLocationType: [],
      EbeatLocation: {
        Name: "",
      },

    }
  }

  componentDidMount() {
    this.GetAllEbeatLocation()
  }

  GetAllEbeatLocation() {
    this.setState({
      isLoading: true,
    })

    const Qrvalue = window.location.href
      ? window.location.href.replace(
        window.location.origin + "/user/",
        ""
      )
      : "";


    CallService(
      ebeatLocation.GetOneQrDetail,
      MethodType.GET,
      true,
      "",
      Qrvalue,
      this.GetAllEbeatLocationResponse
    )
  }

  GetAllEbeatLocationResponse = data => {
    if (data.result) {
      this.setState({
        EBeatDetail: data.result,
        isLoading: false,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }


  ViewDetails = () => {

    const domElement = document.getElementById("EbeatQR")
    html2canvas(domElement, {
      onclone: document => {
        document.getElementById("print").style.visibility = "hidden"
      },
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPdf()
      pdf.addImage(imgData, "JPEG", 0, 0, 10, 10)
      pdf.save(`${new Date().toISOString()}.pdf`)
    })
  }

  printDocument() {
    const input = document.getElementById("divToPrint")
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF("")

      var width = pdf.internal.pageSize.getWidth()
      var height = pdf.internal.pageSize.getHeight()
      pdf.addImage(imgData, "JPEG", 0, 20, 0, 0)

      pdf.save("download.pdf")
    })
  }

  render() {

    const initialValues = this.state.EbeatLocation


    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Row>
              <Col lg={2} />
              <Col lg={8}>

                <Card>
                  <CardBody>
                    <div className="PoliceView">


                      <h4>QR Download</h4>
                    </div>

                    <center>

                      <Button
                        id="print"
                        className="default  mb-2 btn-addon"
                        color="primary"
                        onClick={() => this.printDocument()}
                      >
                        {ModulesName.Download}
                      </Button>{" "}
                    </center>



                    {this.state.Loading &&

                      <Loader
                        type="box-rectangular"
                        bgColor={"#556ee6"}
                        color={"#556ee6"}
                        size={100}
                      />
                    }



                    <div
                      id="divToPrint"
                      className="mt-5"
                      style={{
                        minHeight: "220mm",
                        marginTop: "0",
                      }}
                    >
                      <div className="text-sm-center">
                        <img
                          src={logo}
                          alt=""
                          height="150"
                          width="150"
                          className="auth-logo-dark m-auto user-logo"
                        />

                        <Row className="mt-5">
                          <Col xxs="12">
                            <h4><Label>{ModulesName.Name} : </Label> {" "}
                              {this.state.EBeatDetail
                                ? this.state.EBeatDetail.Name
                                : ""}
                            </h4>
                          </Col>
                        </Row>

                        <Row>
                          <Col xxs="12">
                            <h4><Label>{ModulesName.Address} : </Label>  {" "}
                              {this.state.EBeatDetail
                                ? this.state.EBeatDetail.Address
                                : ""}
                            </h4>
                          </Col>
                        </Row>


                        <Row>
                          <Col xxs="12">
                            <h4><Label>{ModulesName.ebeatLocationType} : </Label>  {" "}
                              {this.state.EBeatDetail
                                ? this.state.EBeatDetail?.EBeatLocationType?.Name
                                : ""}
                            </h4>
                          </Col>
                        </Row>
                        <Row>
                          <Col xxs="12" className="mt-5 ml-2">
                            <QRCode value={"UniqueID=" + this.state.EBeatDetail?.EBeatLocationQR} />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={2} />
            </Row>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(EbeatLocation)
