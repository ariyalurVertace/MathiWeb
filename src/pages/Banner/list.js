import { useState, useEffect, Fragment } from "react"
import { Row, Button, ButtonGroup, Card, CardBody } from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import noData from "../../assets/images/dribble_no_data.png"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { banner } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import BannerAddEditModal from "./add_edit_modal"
import BannerDeleteModal from "./delete_modal"

function Banner() {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: row => <span>{row.name ? row.name : ""}</span>,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      cell: row => (
        <span>{row.description? row.description : ""}</span>
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
  const [bannerList, setBannerList] = useState([
    {
      id:1,
      name: "Banner1",
      description:"abc",
    },
    {
      id:2,
      name: "Banner2",
      description:"aaa",
    },
  ])
  const [banner, setBanner] = useState({
    
    name: "",
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
  const [bannerOptions, setBannerOptions] = useState([
    { label: "Test", value: 1 },
    { label: "Test1", value: 2 },
  ]) 
  const [isLoading, setIsLoading] = useState(true)
  const [buttonAction, setButtonAction] = useState(false)
  const [isManageModelOpen, setIsManageModelOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    getAllBanner()
  }, [listRequestModel])

  useEffect(() => {
    if (searchString.length > 2) {
      setListRequestModel({
        ...listRequestModel,
        searchString: searchString,
      })
    }
  }, [searchString])

  const getAllBanner = () => {
    CallService(
      banner.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      getAllBannerResponse
    )
  }

  const getAllBannerResponse = data => {
    setIsLoading(false)
    if (data.pagination && data.result) {
      setBannerList(data.result)
      setTotalCount(data.pagination.totalCount)
      setBannerOptions(
        data.result.map(banner => {
          return { label: banner.name, value: banner.name }
        })
      )
    }
  }

  const addBtnClick = () => {
    setBanner({
      name: "",
      Descrpition : "",
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
    setBanner(row)
    toggleManageModal()
  }

  const handleDelete = row => {
    setBanner(row)
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
      values.id ? banner.Update + values.id : banner.Create,
      values.id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      manageBannerResponse
    )
  }

  const manageBannerResponse = data => {
    setButtonAction(false)
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(
        banner.id
          ? "Banner Updated Successfully"
          : "Banner Added Successfully"
      )
      toggleManageModal()
      getAllBanner()
    } else {
      ErrorMessage("Something Went Wrong")
    }
  }

  const deleteBanner = id => {
    setButtonAction(true)
    setTimeout(() => {
      setButtonAction(false)
    }, 5000)
    CallService(
      banner.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      deleteBannerResponse
    )
  }

  const deleteBannerResponse = data => {
    setButtonAction(false)
    toggleDeleteModal()
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage("Banner Deleted Successfully")
      getAllBanner()
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
                heading={"Home.Banner"}
                buttonClick={addBtnClick}
                onTextChange={handleSearch}
                searchValue={searchString}
              />

              {bannerList.length > 0 && !isLoading ? (
                <ListPage
                  columns={columns}
                  data={bannerList}
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
      <BannerAddEditModal
        manageModal={isManageModelOpen}
        banner={banner}
        toggleManageModal={toggleManageModal}
        handleSubmit={handleSubmit}
        bannerList={bannerOptions}
        buttonAction={buttonAction}
      />
      <BannerDeleteModal
        deleteModal={isDeleteModelOpen}
        banner={banner}
        toggleDeleteModal={toggleDeleteModal}
        deleteBanner={deleteBanner}
        buttonAction={buttonAction}
      />
    </Fragment>
  )
}

export default Banner
