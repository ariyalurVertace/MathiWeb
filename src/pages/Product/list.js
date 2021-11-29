
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
import {product } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { ApiModuleValidation } from "../../helpers/validations"
import { Message } from "../../helpers/language_helper"

function Product() {
    const columns = [
        {
            name: "Id",
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
            name: "Price",
            selector: "price",
            sortable: false,
            cell: row => <span>{row.price ? row.price : ""}</span>,
        },
        {
            name: "Stock",
            selector: "stock",
            sortable: false,
            cell: row => <span>{row.stock ? row.stock : ""}</span>,
        },
        {
            name: "Description",
            selector: "description",
            sortable: false,
            cell: row => <span>{row.description ? row.description : ""}</span>,
        },
        {
            name: "Image",
            selector: "image",
            sortable: false,
            cell: row => <span>{row.image ? row.image : ""}</span>,
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
                            className="mobileViewFonts"
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
    const [productList, setProductList] = useState([{id:"1",name:"silk saree",price:"1000",stock:"177",description:"aaaa",image:"image1"},{id:"2",name:"cotton saree",price:"500",stock:"133",description:"www",image:"image2"}]);
    const [listRequestModel, setListRequestModel] = useState([]);
    const keyField = "id"
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllProduct();
    }, []);
    const getAllProduct = () => {
        alert("Mathi")
        CallService(
            product.GetAll,
            MethodType.POST,
            false,
            listRequestModel,
            "",
            getAllProductResponse
        )
    }
    const getAllProductResponse = (data) => {
        setIsLoading(false)
        if (data.pagination && data.result) {
            setTotalPage(data.pagination.totalCount / data.pagination.pageLimit)
            setProductList(data.result)
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
                        heading={"Home.Product"}
                        buttonClick={addBtnClick}
                        onTextChange={handleSearch}
                    />
                    <ListPage
                        columns={columns}
                        data={productList}
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