import { useState, useEffect, Fragment } from "react"
import { Row, Button, ButtonGroup, Card, CardBody } from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import noData from "../../assets/images/dribble_no_data.png"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { user } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"

import UserAddEditModal from "./view_modal"
function User() {
    const columns = [
        {
            name: "FirstName",
            selector: "firstname",
            sortable: false,
            cell: row => <span>{row.firstname ? row.firstname : ""}</span>,
        },
        {
            name: "LastName",
            selector: "lastname",
            sortable: false,
            cell: row => <span>{row.lastname ? row.lastname : ""}</span>,
        },
        {
            name: "PhoneNumber",
            selector: "phoneno",
            sortable: false,
            cell: row => <span>{row.phoneno ? row.phoneno : ""}</span>,
        },
        {
            name: "Email",
            selector: "email",
            sortable: false,
            cell: row => <span>{row.email ? row.email : ""}</span>,
        },
        {
            name: "Address",
            selector: "address",
            sortable: false,
            cell: row => (<span>{row.address ? row.address : ""}</span>
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
                            View Details
            </Button>
                       
           
                    </ButtonGroup>
                </Row>
            ),
        },
    ]
    const [userList, setUserList] = useState([
        {
            id: 1,
            firstname: "karan",
            lastname: "C", phoneno: "8012261027", email:"karansekar183@gmail.com",address: "aaa" },
        
    ])
    const [user, setUser] = useState({
        id: "",
        firstname: "",
        lastname: "",
        phoneno: "",
        email: "",
        address:"",
    })
    const [listRequestModel, setListRequestModel] = useState({
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
    })
    const keyField = "id"
    const [totalCount, setTotalCount] = useState(0)
    const [userOptions, setUserOptions] = useState([
        { label: "fashion", value: 1 },
        { label: "electronics", value: 2 },
    ])
    const [isLoading, setIsLoading] = useState(true)
    const [buttonAction, setButtonAction] = useState(false)
    const [isManageModelOpen, setIsManageModelOpen] = useState(false)
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        getAllUser()
    }, [listRequestModel])

    useEffect(() => {
        if (searchString.length > 2) {
            setListRequestModel({
                ...listRequestModel,
                searchString: searchString,
            })
        }
    }, [searchString])

    const getAllUser = () => {
        CallService(
            user.GetAll,
            MethodType.POST,
            false,
            listRequestModel,
            "",
            getAllUserResponse
        )
    }

    const getAllUserResponse = data => {
        setIsLoading(false)
        if (data.pagination && data.result) {
            setUserList(data.result)
            setTotalCount(data.pagination.totalCount)
            setUserOptions(
                data.result.map(user => {
                    return { label:user.name, value: user.name }
                })
            )
        }
    }

    const addBtnClick = () => {
        setUser({
            name: "",
            parentUser: "",
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
        setUser(row)
        toggleManageModal()
    }

    const handleDelete = row => {
        setUser(row)
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
            values.id ? user.Update + values.id : user.Create,
            values.id ? MethodType.PATCH : MethodType.PUT,
            false,
            values,
            "",
            manageUserResponse
        )
    }

    const manageUserResponse = data => {
        setButtonAction(false)
        if (data.statusCode === StatusCodes.Success) {
            SuccessMessage(
                user.id
                    ? "User Updated Successfully"
                    : "User Added Successfully"
            )
            toggleManageModal()
            getAllUser()
        } else {
            ErrorMessage("Something Went Wrong")
        }
    }

    const deleteUser = id => {
        setButtonAction(true)
        setTimeout(() => {
            setButtonAction(false)
        }, 5000)
        CallService(
            user.Delete + id,
            MethodType.DELETE,
            false,
            "",
            "",
            deleteUserResponse
        )
    }

    const deleteUserResponse = data => {
        setButtonAction(false)
        toggleDeleteModal()
        if (data.statusCode === StatusCodes.Success) {
            SuccessMessage("User Deleted Successfully")
            getAllUser()
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
                                heading={"Home.User"}
                                showButton={false}
                                onTextChange={handleSearch}
                                searchValue={searchString}
                            />

                            {userList.length > 0 && !isLoading ? (
                                <ListPage
                                    columns={columns}
                                    data={userList}
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
        <UserAddEditModal
        manageModal={isManageModelOpen}
        user={user}
        toggleManageModal={toggleManageModal}
        handleSubmit={handleSubmit}
        userList={userOptions}
        buttonAction={buttonAction}
      />
       
        </Fragment>
    )
}

export default User
