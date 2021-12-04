import { useState, useEffect, Fragment } from "react"
import { Row, Button, ButtonGroup, Card, CardBody } from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import noData from "../../assets/images/dribble_no_data.png"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { product } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import ProductDeleteModal from "./delete_modal"
import ProductAddEditModal from "./add_edit_modal"
function Product() {
    const columns = [
        {
            name: "Name",
            selector: "name",
            sortable: false,
            cell: row => <span>{row.name ? row.name : ""}</span>,
        },
        {
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
            name: "Category",
            selector: "category",
            sortable: false,
            cell: row => <span>{row.category ? row.category : ""}</span>,
        },
        {
            name: "Description",
            selector: "description",
            sortable: false,
            cell: row => (<span>{row.description ? row.description : ""}</span>
            ),
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
                            Update
            </Button>
                        <Button
                            outline
                            color="danger"
                            className="mobileViewFonts pl-1 pr-1 ml-2"
                            onClick={() => handleDelete(row)}
                        >
                            Delete
            </Button>
                    </ButtonGroup>
                </Row>
            ),
        },
    ]
    const [productList, setProductList] = useState([
        {
            id: 1,
            name: "Product1",
            price: "5000", stock: "400", category:"fashion", description: "aaa" },
        
        {
            id: 2,
            name: "Product2",
            price: "500", stock: "300", category:"fashion", description: "abc" },
    ])
    const [product, setProduct] = useState({
        id: "",
        name: "",
        price: "",
        category: "",
        description: "",
    })
    const [listRequestModel, setListRequestModel] = useState({
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
    })
    const keyField = "id"
    const [totalCount, setTotalCount] = useState(0)
    const [productOptions, setProductOptions] = useState([
        { label: "fashion", value: 1 },
        { label: "electronics", value: 2 },
    ])
    const [isLoading, setIsLoading] = useState(true)
    const [buttonAction, setButtonAction] = useState(false)
    const [isManageModelOpen, setIsManageModelOpen] = useState(false)
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        getAllProduct()
    }, [listRequestModel])

    useEffect(() => {
        if (searchString.length > 2) {
            setListRequestModel({
                ...listRequestModel,
                searchString: searchString,
            })
        }
    }, [searchString])

    const getAllProduct = () => {
        CallService(
            product.GetAll,
            MethodType.POST,
            false,
            listRequestModel,
            "",
            getAllProductResponse
        )
    }

    const getAllProductResponse = data => {
        setIsLoading(false)
        if (data.pagination && data.result) {
            setProductList(data.result)
            setTotalCount(data.pagination.totalCount)
            setProductOptions(
                data.result.map(banner => {
                    return { label: banner.name, value: bannner.name }
                })
            )
        }
    }

    const addBtnClick = () => {
        setProduct({
            name: "",
            parentProduct: "",
        })
        toggleManageModal()
    }

    const handleSort = (column, sortDirection) => {
        var sortObj = {}
        sortObj[column.selector] = sortDirection === "asc" ? "asc" : "desc"

        setListRequestModel({
            ...listRequestModel,
            sortCondition: sortObj,
        })
    }

    const handlePerRowsChange = async perPage => {
        setListRequestModel({
            ...listRequestModel,
            pageLimit: perPage,
            pageNumber: 1,
        })
    }

    const handlePageChange = async page => {
        setListRequestModel({
            ...listRequestModel,
            pageNumber: page,
        })
    }

    const handleRowClicked = row => {
        console.log(row)
    }

    const handleEdit = row => {
        setProduct(row)
        toggleManageModal()
    }

    const handleDelete = row => {
        setProduct(row)
        toggleDeleteModal()
    }

    const toggleDeleteModal = () => {
        setIsDeleteModelOpen(!isDeleteModelOpen)
    }

    const toggleManageModal = () => {
        setIsManageModelOpen(!isManageModelOpen)
    }

    const handleSearch = search => {
        setSearchString(search.target.value)
    }

    const handleSubmit = values => {
        setButtonAction(true)
        setTimeout(() => {
            setButtonAction(false)
        }, 5000)
        CallService(
            values.id ? product.Update + values.id : product.Create,
            values.id ? MethodType.PATCH : MethodType.PUT,
            false,
            values,
            "",
            manageProductResponse
        )
    }

    const manageProductResponse = data => {
        setButtonAction(false)
        if (data.statusCode === StatusCodes.Success) {
            SuccessMessage(
                product.id
                    ? "Product Updated Successfully"
                    : "Product Added Successfully"
            )
            toggleManageModal()
            getAllProduct()
        } else {
            ErrorMessage("Something Went Wrong")
        }
    }

    const deleteProduct = id => {
        setButtonAction(true)
        setTimeout(() => {
            setButtonAction(false)
        }, 5000)
        CallService(
            product.Delete + id,
            MethodType.DELETE,
            false,
            "",
            "",
            deleteProductResponse
        )
    }

    const deleteProductResponse = data => {
        setButtonAction(false)
        toggleDeleteModal()
        if (data.statusCode === StatusCodes.Success) {
            SuccessMessage("Product Deleted Successfully")
            getAllProduct()
        } else {
            ErrorMessage("Something Went Wrong")
        }
    }

    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Card>
                        <CardBody>
                            <ListPageHeader
                                heading={"Home.Product"}
                                buttonClick={addBtnClick}
                                onTextChange={handleSearch}
                                searchValue={searchString}
                            />

                            {productList.length > 0 && !isLoading ? (
                                <ListPage
                                    columns={columns}
                                    data={productList}
                                    keyField={keyField}
                                    totalCount={totalCount}
                                    rowClicked={handleRowClicked}
                                    rowsPerPageOnChange={handlePerRowsChange}
                                    onSort={handleSort}
                                    pageChange={handlePageChange}
                                    isDataLoading={isLoading}
                                    overFlowXRemoval={true}
                                />
                            ) : isLoading ? (
                                <ListPage isDataLoading={isLoading} />
                            ) : (
                                        <div>
                                            <div className="d-flex justify-content-center mb-2">
                                                <img src={noData} alt="img" height="200px" width="200px" />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                No Data Found
                  </div>
                                        </div>
                                    )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        <ProductAddEditModal
        manageModal={isManageModelOpen}
        product={product}
        toggleManageModal={toggleManageModal}
        handleSubmit={handleSubmit}
        productList={productOptions}
        buttonAction={buttonAction}
      />
        <ProductDeleteModal
                deleteModal={isDeleteModelOpen}
                product={product}
                toggleDeleteModal={toggleDeleteModal}
                deleteProduct={deleteProduct}
                buttonAction={buttonAction}
            />
        </Fragment>
    )
}

export default Product
