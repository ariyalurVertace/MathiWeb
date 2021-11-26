import React, { useState, useEffect, Fragment } from "react"
import { useFormik, useField, Field } from "formik"
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
    ButtonGroup,
} from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import DropDown from "../../components/custom/DropDown"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"

import {
    MethodType,
    StatusCodes,
    defaultPageLimit,
    ModulesName,
} from "../../constants/defaultValues"
import { vendor } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { ApiModuleValidation } from "../../helpers/validations"
import { Message } from "../../helpers/language_helper"

function Vendor() {
    const columns = [
        {
            name: "Firstname",
            selector: "firstname",
            sortable: false,
            cell: row => <span>{row.firstname ? row.firstname : ""}</span>,
        }, 
        {
            name: "Lastname",
            selector: "lastname",
            sortable: false,
            cell: row => <span>{row.Lastname ? row.Lastname : ""}</span>,
        },
        {
            name: "Phonenumber",
            selector: "Phonenumber",
            sortable: false,
            cell: row => <span>{row.Phonenumber ? row.Phonenumber : ""}</span>,
        },
        {
            name: "EmailId",
            selector: "EmailId",
            sortable: false,
            cell: row => <span>{row.EmailId ? row.EmailId : ""}</span>,
        },
        {
            name: "Address",
            selector: "Address",
            sortable: false,
            cell: row => <span>{row.address ? row.address : ""}</span>,
        },
        {
            name: "Action",
            selector: "_id",
            sortable: false,
            cell: row => (
                <Row>
                    <ButtonGroup className="mb-2" style={{ top: "4px" }}>
                        <Button
                            outline
                            color="primary"
                            className="mobileViewFont"
                            onClick={() => handleEdit(row)}
                        >
                            Edit
                        </Button>

                        <Button
                            outline
                            color="danger"
                            className="mobileViewFonts pl-1 pr-1 ml-2"
                            onClick={() => toggleDeleteModal(row)}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </Row>
            ),
        },
    ]
    const keyField = "id"
    const [vendorList, setVendorList] = useState([{firstname:"karan",Lastname:"xdfsdxa",Phonenumber:"76098",EmailId:"attvrt006@gmail.com",address:"ariyalur"},{firstname:"selvakumar",Lastname:"xdfsdxa",Phonenumber:"76098",EmailId:"attvrt006@gmail.com",address:"ariyalur"}]);
    const [listRequestModel, setListRequestModel] = useState([])
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllVendor();
    }, []);
    const getAllVendor = () => {
        alert("1")
        CallService(
            vendor.GetAll,
            MethodType.POST,
            false,
            listRequestModel,
            "",
            getAllVendorResponse
        )
    }
    const getAllVendorResponse = (data) => {
        setIsLoading(false)
        if (data.pagination && data.result) {
            setTotalPage(data.pagination.totalCount / data.pagination.pageLimit)
            setvendorList(data.result)
            setTotalCount(data.pagination.totalCount)
          } 
    }
    const addBtnClick = () => {
        toggleManageModal()
    }
    const HandleRowClicked = () => {
        alert("hi")
    }
    const handlePageChange = () => {
        alert("hi")
    }
    const handlePerRowsChange = () => {
        alert("hi")
    }
    const handleEdit = () => {
        alert("hi")
    }
    const toggleDeleteModal = () => {
        alert("hi")
    }
    const toggleManageModal = () => {
        alert("hi")
    }
    const handleSearch = () => {
        console.log("hi")
    }
    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <ListPageHeader
                        heading={"Home.Vendor"}
                        buttonClick={addBtnClick}
                        onTextChange={handleSearch}
                    />
                    <ListPage
                        columns={columns}
                        data={vendorList}
                        keyField={keyField}
                        totalCount={totalCount}
                        rowClicked={HandleRowClicked}
                        rowsPerPageOnChange={handlePerRowsChange}
                        pageChange={handlePageChange}
                        isDataLoading={isLoading}
                        overFlowXRemoval={true}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Vendor