import { useState, useEffect, Fragment } from "react"
import { Row, Button, ButtonGroup, Card, CardBody } from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import noData from "../../assets/images/dribble_no_data.png"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { notification } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import NotificationAddEditModal from "./add_edit_modal"
import NotificationDeleteModal from "./delete_modal"

function Notification () {
  const columns = [
    {
      name: "Title",
      selector: "Title",
      sortable: true,
      cell: row => <span>{row.title ? row.title : ""}</span>
      },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      cell: row => <span>{row.description ? row.description : ""}</span>
      
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
              className="mobileViewFonts pl-1 pr-1 ml-2"
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
            <Button
              outline
              color="success"
              className="mobileViewFont  pr-1 ml-2"
              onClick={() => handleSend(row)}
            
              >
              Sent
            </Button>
          </ButtonGroup>
        </Row>
         
         
      ),
    },
  ]
  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      title: "hello",
      description: "aaa",
      },
  ])
  const [notification, setNotification] = useState({
    id: "",
    title: "",
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
  const [notificationOptions, setNotificationOptions] = useState([
    { label: "Test", value: 1 },
    { label: "Test1", value: 2 },
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [buttonAction, setButtonAction] = useState(false)
  const [isManageModelOpen, setIsManageModelOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    getAllNotification()
  }, [listRequestModel])

  useEffect(() => {
    if (searchString.length > 2) {
      setListRequestModel({
        ...listRequestModel,
        searchString: searchString,
      })
    }
  }, [searchString])

  const getAllNotification = () => {
    CallService(
        Notification.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      getAllNotificationResponse
    )
  }

  const getAllNotificationResponse = data => {
    setIsLoading(false)
    if (data.pagination && data.result) {
      setNotificationList(data.result)
      setTotalCount(data.pagination.totalCount)
      setNotificationOptions(
        data.result.map(notification => {
          return { label: notification.name, value: notification.name }
        })
      )
    }
  }

  const addBtnClick = () => {
    setNotification({
      name: "",
      Notification: "",
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
    setNotification(row)
    toggleManageModal()
  }
  const handleSend = row => {
    setNotification(row)
    ErrorMessage(" ")
  }

  const handleDelete = row => {
    setNotification(row)
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
      values.id ? notification.Update + values.id : notification.Create,
      values.id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      manageNotificationResponse
    )
  }

  const manageNotificationResponse = data => {
    setButtonAction(false)
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(
        notification.id
          ? "Notification Updated Successfully"
          : "Notification Added Successfully"
      )
      toggleManageModal()
      getAllNotification()
    } else {
      ErrorMessage("Something Went Wrong")
    }
  }

  const deleteNotification = id => {
    setButtonAction(true)
    setTimeout(() => {
      setButtonAction(false)
    }, 5000)
    CallService(
        notification.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      deleteNotificationResponse
    )
  }

  const deleteNotificationResponse = data => {
    setButtonAction(false)
    toggleDeleteModal()
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage("Notification Deleted Successfully")
      getAllNotification()
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
                heading={"Home.Notification"}
                buttonClick={addBtnClick}
                onTextChange={handleSearch}
                searchValue={searchString}
              />

              {notificationList.length > 0 && !isLoading ? (
                <ListPage
                  columns={columns}
                  data={notificationList}
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
      <NotificationAddEditModal
        manageModal={isManageModelOpen}
        notification={notification}
        toggleManageModal={toggleManageModal}
        handleSubmit={handleSubmit}
        notificationList={notificationOptions}
        buttonAction={buttonAction}
      />

      <NotificationDeleteModal
        deleteModal={isDeleteModelOpen}
        notification={notification}
        toggleDeleteModal={toggleDeleteModal}
        deleteNotification={deleteNotification}
        buttonAction={buttonAction}
      />
    </Fragment>
  )
}

export default Notification
