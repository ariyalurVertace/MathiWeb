
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
import { banner } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { ApiModuleValidation } from "../../helpers/validations"
import { Message } from "../../helpers/language_helper"

function Banner() {
    const columns = [
        {
            name: "S.no",
            selector: "id",
            sortable: false,
            cell: row => <span>{row.id ? row.id : ""}</span>,
        },

        {
            name: "Name",
            selector: "name",
            sortable: false,
            cell: row => <span>{row.name ? row.name : ""}</span>,
        }, {
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
                    </ButtonGroup>
                </Row>
            ),
        },
    ]
    const [bannerList, setBannerList] = useState([{id:"1",name:"bannerimage 1",description:"silk saree"},{id:"2",name:"bannerimage 2",description:"cotton saree"},
    {id:"3",name:"bannerimage 3",description:"saree"}]);
    const [listRequestModel, setListRequestModel] = useState([]);
    const keyField = "id"
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllBanner();
    }, []);
    const getAllBanner = () => {
        alert("Banner")
        CallService(
            banner.GetAll,
            MethodType.POST,
            false,
            listRequestModel,
            "",
            getAllBannerResponse
        )
    }
    const getAllBannerResponse = (data) => {
        setIsLoading(false)
        if (data.pagination && data.result) {
            setTotalPage(data.pagination.totalCount / data.pagination.pageLimit)
            setBannerList(data.result)
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
    const handleSearch = () => {
        console.log("hi")
    }
    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <ListPageHeader
                        heading={"Home.Banner"}
                        buttonClick={addBtnClick}
                        onTextChange={handleSearch}
                    />
                    <ListPage
                        columns={columns}
                        data={bannerList}
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

export default Banner