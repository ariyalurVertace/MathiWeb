
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
import { user } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { ApiModuleValidation } from "../../helpers/validations"
import { Message } from "../../helpers/language_helper"

function User() {
    const columns = [
        {
            name: "Name",
            selector: "name",
            sortable: false,
            cell: row => <span>{row.name ? row.name : ""}</span>,
        },    
        {
            name: "Phoneno",
            selector: "phoneno",
            sortable: false,
            cell: row => <span>{row.phoneno ? row.phoneno : ""}</span>,
        }, 
        {
            name: "Address",
            selector: "address",
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
                            color="info"
                            className="mobileViewFont"
                            onClick={() => handleView(row)}
                        >
                            View details
                        </Button>

                     
                    </ButtonGroup>
                </Row>
            ),
        },
    ]
    const [userList, setUserList] = useState([{name:"karan",phoneno:"8012261027",address:"Ariyalur"},{name:"bharathi",phoneno:"785847589",address:"Ariyalur"},{name:"Selva kumar",phoneno:"989847589",address:"Ariyalur"}]);
    const [listRequestModel, setListRequestModel] = useState([]);
    const keyField = "id"
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllUser();
    }, []);
    const getAllUser = () => {
        alert("User")
        CallService(
            User.GetAll,
            MethodType.POST,
            false,
            listRequestModel,
            "",
            getAllUserResponse
        )
    }
    const getAllUserResponse = (data) => {
        setIsLoading(false)
        if (data.pagination && data.result) {
            setTotalPage(data.pagination.totalCount / data.pagination.pageLimit)
            setUserList(data.result)
            setTotalCount(data.pagination.totalCount)
          } 
    }
    const addBtnClick = () => {
        toggleManageModal()
    }
    const HandleRowClicked = () => {
        alert("row")
    }
    const handlePageChange = () => {
        alert("change")
    }
    const handlePerRowsChange = () => {
        alert("hi")
    }
    const handleView = () => {
        alert("View details")
    }
    const toggleDeleteModal = () => {
        alert("Delete")
    }
    const toggleManageModal = () => {
        alert("Add")
    }
    const handleSearch = () => {
        console.log("hi")
    }
    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <ListPageHeader
                        heading={"Home.User"}
                        buttonClick={addBtnClick}
                        onTextChange={handleSearch}
                    />
                    <ListPage
                        columns={columns}
                        data={userList}
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

export default User
