export default Vendor
import { useState, useEffect, Fragment } from "react"
import { Row, Button, ButtonGroup, Card, CardBody } from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import noData from "../../assets/images/dribble_no_data.png"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { vendor } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import VendorAddEditModal from "./add_editmodel"
import VendorDeleteModal from "./vendor-delete_model"

function Vendor() {
  const columns = [
    {
      name: "Firstname",
      selector: "Firstname",
      sortable: true,
      cell: row => <span>{row.Firstname ? row.Firstname : ""}</span>,
    },
    {
      name: "Lastname",
      selector: "Lastname",
      sortable: true,
      cell: row => (
        <span>{row.Lastname ? row.Lastname : ""}</span>
      ),
    },
    {
      name: "Phonenumber",
      selector: "Phonenumber",
      sortable: true,
      cell: row => (
        <span>{row.Phonenumber? row.Phonenumber : ""}</span>
      ),
    },
    {
      name: "Email",
      selector: "Email",
      sortable: true,
      cell: row => (
        <span>{row.Email? row.Email: ""}</span>
      ),
    },
    {
      name: "Address",
      selector: "Address",
      sortable: true,
      cell: row => (
        <span>{row.Address? row.Address : ""}</span>
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
  const [vendorList, setVendorList] = useState([
    {
      id: 1,
      Firstname: "selva",
      Lastname: "kumar", Phonenumber: "9786792740", Email: "sekarselvakumar143@gmail.com", Address: " efhouhbibv "
    }, 

  ])
  const [vendor, setVendor] = useState({
    id: "",
    Firstname: "",
    Lastname: "",
    Phonenumber: "",
    Email: "",
    Address:"",

  })
  const [listRequestModel, setListRequestModel] = useState({
    searchString: "",
    sortCondition: null,
    pageNumber: 1,
    pageLimit: 10,
  })
  const keyField = "id"
  const [totalCount, setTotalCount] = useState(0)
  const [vendorOptions, setVendorOptions] = useState([
    { label: "Test", value: 1 },
    { label: "Test1", value: 2 },
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [buttonAction, setButtonAction] = useState(false)
  const [isManageModelOpen, setIsManageModelOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    getAllVendor()
  }, [listRequestModel])

  useEffect(() => {
    if (searchString.length > 2) {
      setListRequestModel({
        ...listRequestModel,
        searchString: searchString,
      })
    }
  }, [searchString])

  const getAllVendor = () => {
    CallService(
    vendor.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      getAllVendorResponse
    )
  }

  const getAllVendorResponse = data => {
    setIsLoading(false)
    if (data.pagination && data.result) {
      setVendorList(data.result)
      setTotalCount(data.pagination.totalCount)
      setVendorOptions(
        data.result.map(vendor => {
          return { label: vendor.name, value: vendor.name }
        })
      )
    }
  }

  const addBtnClick = () => {
    setVendor({
      name: "",
      parentVendor: "",
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
    setVendor(row)
    toggleManageModal()
  }

  const handleDelete = row => {
    setVendor(row)
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
      values.id ? vendor.Update + values.id : vendor.Create,
      values.id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      manageVendorResponse
    )
  }

  const manageVendorResponse = data => {
    setButtonAction(false)
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(
        vendor.id
          ? "Vendor Updated Successfully"
          : "Vendor Added Successfully"
      )
      toggleManageModal()
      getAllVendor()
    } else {
      ErrorMessage("Something Went Wrong")
    }
  }

  const deleteVendor = id => {
    setButtonAction(true)
    setTimeout(() => {
      setButtonAction(false)
    }, 5000)
    CallService(
      vendor.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      deleteVendorResponse
    )
  }

  const deleteVendorResponse = data => {
    setButtonAction(false)
    toggleDeleteModal()
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(" Deleted Successfully")
      getAllVendor()
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
                heading={"Home.Vendor"}
                buttonClick={addBtnClick}
                onTextChange={handleSearch}
                searchValue={searchString}
              />

              {vendorList.length > 0 && !isLoading ? (
                <ListPage
                  columns={columns}
                  data={vendorList}
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

      <VendorAddEditModal
        manageModal={isManageModelOpen}
        vendor={vendor}
        toggleManageModal={toggleManageModal}
        handleSubmit={handleSubmit}
        vendorList={vendorOptions}
        buttonAction={buttonAction}
      />


      <VendorDeleteModal
        deleteModal={isDeleteModelOpen}
        vendor={vendor}
        toggleDeleteModal={toggleDeleteModal}
        deleteVendor={deleteVendor}
        buttonAction={buttonAction}
      />
    </Fragment>
  )
}


