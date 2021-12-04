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
import { category } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { ApiModuleValidation } from "../../helpers/validations"
import { Message } from "../../helpers/language_helper"

function Product() {
    const columns = [
        {
            name: "Name",
            selector: "name",
            sortable: false,
            cell: row => <span>{row.name ? row.name : ""}</span>,
        }, {
            name: "Price",
            selector: "price",
            sortable: false,
            cell: row => <span>{row.price ? row.price : ""}</span>,
        },{
            name: "Stock",
            selector: "stock",
            sortable: false,
            cell: row => <span>{row.stock ? row.stock : ""}</span>,
        },{
            name: "Descripition",
            selector: "descripition",
            sortable: false,
            cell: row => <span>{row.descripition ? row.descripition : ""}</span>,
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
    const [categoryList, setCategoryList] = useState([{name:"silk saree",price:"1000",stock:"15",descripition:"asdf"},{name:"saree",price:"100",stock:"15",descripition:"1234"}]);
    const [listRequestModel, setListRequestModel] = useState([]);
    const keyField = "id"
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllCategories();
    }, []);
    const getAllCategories = () => {
        alert("1")
        CallService(
            category.GetAll,
            MethodType.POST,
            false,
            listRequestModel,
            "",
            getAllCategoriesResponse
        )
    }
    const getAllCategoriesResponse = (data) => {
        setIsLoading(false)
        if (data.pagination && data.result) {
            setTotalPage(data.pagination.totalCount / data.pagination.pageLimit)
            setCategoryList(data.result)
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
                        heading={"Home.Product"}
                        buttonClick={addBtnClick}
                        onTextChange={handleSearch}
                    />
                    <ListPage
                        columns={columns}
                        data={categoryList}
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

export default Product