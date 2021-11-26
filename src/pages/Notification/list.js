
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
import { notification } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { ApiModuleValidation } from "../../helpers/validations"
import { Message } from "../../helpers/language_helper"

function Notification() {
    const columns = [
        {
            name: "title",
            selector: "title",
            sortable: false,
            cell: row => <span>{row.title ? row.title : ""}</span>,
        },    
        {
            name: "Description",
            selector: "description",
            sortable: false,
            cell: row => <span>{row.description ? row.description : ""}</span>,
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
                    
                        <Button
                            outline
                            color="success"
                            className="mobileViewFont pl-1 pr-2 ml-2"
                            onClick={() => handleSend(row)}
                        >
                            Send
                        </Button>
                    </ButtonGroup>
                </Row>
            ),
        },
    ]
    const [notificationList, setnotificationList] = useState([{title:"today offer",description:"aaaaaaaa"}]);
    const [listRequestModel, setListRequestModel] = useState([]);
    const keyField = "id"
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllNotification();
    }, []);
    const getAllNotification = () => {
        alert("Notification")
        CallService(
            notification.GetAll,
            MethodType.POST,
            false,
            listRequestModel,
            "",
            getAllNotificationResponse
        )
    }
    const getAllNotificationResponse = (data) => {
        setIsLoading(false)
        if (data.pagination && data.result) {
            setTotalPage(data.pagination.totalCount / data.pagination.pageLimit)
            setNotificationList(data.result)
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
        alert("Edit")
    }
    const toggleDeleteModal = () => {
        alert("Delete")
    }
    const toggleManageModal = () => {
        alert("Add")
    }
    const handleSend =()  => {
        alert("Send")
    }
    const handleSearch = () => {
        console.log("hi")
    }
    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <ListPageHeader
                        heading={"Home.Notification"}
                        buttonClick={addBtnClick}
                        onTextChange={handleSearch}
                    />
                    <ListPage
                        columns={columns}
                        data={notificationList}
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

export default Notification