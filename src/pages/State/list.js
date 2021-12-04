import { useState, useEffect, Fragment } from "react"
import { Row, Button, ButtonGroup, Card, CardBody } from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import noData from "../../assets/images/dribble_no_data.png"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { state } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import StateAddEditModal from "./add_edit_modal"
import StateDeleteModal from "./delete_modal"

function State() {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: row => <span>{row.name ? row.name : ""}</span>,
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
  const [stateList, setStateList] = useState([
    {
      id:1,
      name: "Tamilnadu",
     
    },
   
  ])
  const [state, setState] = useState({
    
    name: "",
    
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
    getAllState()
  }, [listRequestModel])

  useEffect(() => {
    if (searchString.length > 2) {
      setListRequestModel({
        ...listRequestModel,
        searchString: searchString,
      })
    }
  }, [searchString])

  const getAllState = () => {
    CallService(
      state.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      getAllStateResponse
    )
  }

  const getAllStateResponse = data => {
    setIsLoading(false)
    if (data.pagination && data.result) {
      setStateList(data.result)
      setTotalCount(data.pagination.totalCount)
      setStateOptions(
        data.result.map(state => {
          return { label: state.name, value: state.name }
        })
      )
    }
  }

  const addBtnClick = () => {
    setState({
      name: "",
      
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
    setState(row)
    toggleManageModal()
  }

  const handleDelete = row => {
    setState(row)
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
      values.id ? state.Update + values.id : state.Create,
      values.id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      manageStateResponse
    )
  }

  const manageStateResponse = data => {
    setButtonAction(false)
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(
        state.id
          ? "State Updated Successfully"
          : "State Added Successfully"
      )
      toggleManageModal()
      getAllState()
    } else {
      ErrorMessage("Something Went Wrong")
    }
  }

  const deleteState = id => {
    setButtonAction(true)
    setTimeout(() => {
      setButtonAction(false)
    }, 5000)
    CallService(
      state.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      deleteStateResponse
    )
  }

  const deleteStateResponse = data => {
    setButtonAction(false)
    toggleDeleteModal()
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage("State Deleted Successfully")
      getAllState()
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
                heading={"Home.State"}
                buttonClick={addBtnClick}
                onTextChange={handleSearch}
                searchValue={searchString}
              />

              {stateList.length > 0 && !isLoading ? (
                <ListPage
                  columns={columns}
                  data={stateList}
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
      <StateAddEditModal
        manageModal={isManageModelOpen}
        state={state}
        toggleManageModal={toggleManageModal}
        handleSubmit={handleSubmit}
        stateList={stateOptions}
        buttonAction={buttonAction}
      />
      <StateDeleteModal
        deleteModal={isDeleteModelOpen}
        state={state}
        toggleDeleteModal={toggleDeleteModal}
        deleteState={deleteState}
        buttonAction={buttonAction}
      />
    </Fragment>
  )
}

export default State
