import { useState, useEffect, Fragment } from "react"
import { Row, Button, ButtonGroup, Card, CardBody } from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import noData from "../../assets/images/dribble_no_data.png"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { districts ,state} from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DistrictAddEditModal from "./add_edit_modal"
import DistrictDeleteModal from "./delete_modal"

function District() {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: row => <span>{row.name ? row.name : ""}</span>,
    },
    {
      name: "state",
      selector: "state",
      sortable: true,
      cell: row => (
        <span>{row.state?.name ? row.state.name : ""}</span>
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
  const [districtList, setDistrictList] = useState([
    {
      id: 1,
      name: "Testing",
      stateId: 1,
      state: { id: 1, name: "Test", },
    },
    {
      id: 2,
      name: "testing2",
      stateId:2,
      state: { id: 2, name: "testing2",  },
    },
  ])
  const [district, setDistrict] = useState({
    id: "",
    name: "",
    state: "",
  })
  const [listRequestModel, setListRequestModel] = useState({
    searchString: "",
    sortCondition: null,
    pageNumber: 1,
    pageLimit: 10,
  })
  const keyField = "id"
  const [totalCount, setTotalCount] = useState(0)
  const [stateOptions, setStateOptions] = useState([
    { label: "Test", value: 1 },
    { label: "Test1", value: 2 },
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [buttonAction, setButtonAction] = useState(false)
  const [isManageModelOpen, setIsManageModelOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    getAllDistricts()
    
  }, [listRequestModel])
  useEffect(() => {
    getAllStates()
    
  }, [])

  useEffect(() => {
    if (searchString.length > 2) {
      setListRequestModel({
        ...listRequestModel,
        searchString: searchString,
      })
    }
  }, [searchString])

  const getAllDistricts = () => {
    CallService(
      districts.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      getAllDistrictsResponse
    )
  }

  const getAllDistrictsResponse = data => {
    setIsLoading(false)
    if (data.pagination && data.result) {
      setDistrictList(data.result)
      setTotalCount(data.pagination.totalCount)
      setDistrictOptions(
        data.result.map(district => {
          return { label: district.name, value: district.id }
        })
      )
    }
  }
  const getAllStates = () => {
    CallService(
      state.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      getAllStatesResponse
    )
  }

  const getAllStatesResponse = data => {
    if (data.pagination && data.result) {
      setStateOptions(
        data.result.map(state => {
          return { label: state.name, value: state.id }
        })
      )
    }
  }

  const addBtnClick = () => {
    setDistrict({
      name: "",
      state: "",
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
    setDistrict(row)
    toggleManageModal()
  }

  const handleDelete = row => {
    setDistrict(row)
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
      values.id ? district.Update + values.id : district.Create,
      values.id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      manageDistrictResponse
    )
  }

  const manageDistrictResponse = data => {
    setButtonAction(false)
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(
        district.id
          ? "District Updated Successfully"
          : "District Added Successfully"
      )
      toggleManageModal()
      getAllDistricts()
    } else {
      ErrorMessage("Something Went Wrong")
    }
  }

  const deleteDistrict = id => {
    setButtonAction(true)
    setTimeout(() => {
      setButtonAction(false)
    }, 5000)
    CallService(
      district.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      deleteDistrictResponse
    )
  }

  const deleteDistrictResponse = data => {
    setButtonAction(false)
    toggleDeleteModal()
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage("District Deleted Successfully")
      getAllDistricts()
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
                heading={"Home.District"}
                buttonClick={addBtnClick}
                onTextChange={handleSearch}
                searchValue={searchString}
              />

              {districtList.length > 0 && !isLoading ? (
                <ListPage
                  columns={columns}
                  data={districtList}
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

      <DistrictAddEditModal
        manageModal={isManageModelOpen}
        district={district}
        toggleManageModal={toggleManageModal}
        handleSubmit={handleSubmit}
        stateList={stateOptions}
        buttonAction={buttonAction}
      />

      <DistrictDeleteModal
        deleteModal={isDeleteModelOpen}
        district={district}
        toggleDeleteModal={toggleDeleteModal}
        deleteDistrict={deleteDistrict}
        buttonAction={buttonAction}
      />
    </Fragment>
  )
}

export default District
