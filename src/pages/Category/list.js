import { useState, useEffect, Fragment } from "react"
import { Row, Button, ButtonGroup, Card, CardBody } from "reactstrap"
import { CallService } from "../../helpers/ServiceCall"
import { SuccessMessage, ErrorMessage } from "../../helpers/notifications"
import noData from "../../assets/images/dribble_no_data.png"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { categories } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import CategoryAddEditModal from "./add_edit_modal"
import CategoryDeleteModal from "./delete_modal"

function Category() {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: row => <span>{row.name ? row.name : ""}</span>,
    },
    {
      name: "Parent Category",
      selector: "parentCategory",
      sortable: true,
      cell: row => (
        <span>{row.parentCategory?.name ? row.parentCategory.name : ""}</span>
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
  const [categoryList, setCategoryList] = useState([
    {
      id: 1,
      name: "Testing",
      parentCategory: { id: 1, name: "Test", parentCategory: null },
    },
  ])
  const [category, setCategory] = useState({
    id: "",
    name: "",
    parentCategory: "",
  })
  const [listRequestModel, setListRequestModel] = useState({
    searchString: "",
    sortCondition: null,
    pageNumber: 1,
    pageLimit: 10,
  })
  const keyField = "id"
  const [totalCount, setTotalCount] = useState(0)
  const [categoryOptions, setCategoryOptions] = useState([
    { label: "Test", value: 1 },
    { label: "Test1", value: 2 },
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [buttonAction, setButtonAction] = useState(false)
  const [isManageModelOpen, setIsManageModelOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    getAllCategories()
  }, [listRequestModel])

  useEffect(() => {
    if (searchString.length > 2) {
      setListRequestModel({
        ...listRequestModel,
        searchString: searchString,
      })
    }
  }, [searchString])

  const getAllCategories = () => {
    CallService(
      categories.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      getAllCategoriesResponse
    )
  }

  const getAllCategoriesResponse = data => {
    setIsLoading(false)
    if (data.pagination && data.result) {
      setCategoryList(data.result)
      setTotalCount(data.pagination.totalCount)
      setCategoryOptions(
        data.result.map(category => {
          return { label: category.name, value: category.name }
        })
      )
    }
  }

  const addBtnClick = () => {
    setCategory({
      name: "",
      parentCategory: "",
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
    setCategory(row)
    toggleManageModal()
  }

  const handleDelete = row => {
    setCategory(row)
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
      values.id ? category.Update + values.id : category.Create,
      values.id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      manageCategoryResponse
    )
  }

  const manageCategoryResponse = data => {
    setButtonAction(false)
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage(
        category.id
          ? "Category Updated Successfully"
          : "Category Added Successfully"
      )
      toggleManageModal()
      getAllCategories()
    } else {
      ErrorMessage("Something Went Wrong")
    }
  }

  const deleteCategory = id => {
    setButtonAction(true)
    setTimeout(() => {
      setButtonAction(false)
    }, 5000)
    CallService(
      category.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      deleteCategoryResponse
    )
  }

  const deleteCategoryResponse = data => {
    setButtonAction(false)
    toggleDeleteModal()
    if (data.statusCode === StatusCodes.Success) {
      SuccessMessage("Category Deleted Successfully")
      getAllCategories()
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
                heading={"Home.Category"}
                buttonClick={addBtnClick}
                onTextChange={handleSearch}
                searchValue={searchString}
              />

              {categoryList.length > 0 && !isLoading ? (
                <ListPage
                  columns={columns}
                  data={categoryList}
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

      <CategoryAddEditModal
        manageModal={isManageModelOpen}
        category={category}
        toggleManageModal={toggleManageModal}
        handleSubmit={handleSubmit}
        categoryList={categoryOptions}
        buttonAction={buttonAction}
      />

      <CategoryDeleteModal
        deleteModal={isDeleteModelOpen}
        category={category}
        toggleDeleteModal={toggleDeleteModal}
        deleteCategory={deleteCategory}
        buttonAction={buttonAction}
      />
    </Fragment>
  )
}

export default Category
