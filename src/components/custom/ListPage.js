import React from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody } from "reactstrap";
import { masterListPageTableTheme, defaultPageSizeOptions, defaultPageLimit } from "../../constants/defaultValues";
class ListPage extends React.Component {
  render() {
    return (
      <Card style={{ paddingBottom: "32px" }}>
        <CardBody>
          <DataTable
            customTheme={masterListPageTableTheme}
            striped
            className={this.props.className + " overFlowXRemoval table-responsive overFlowXMobile"}
            columns={this.props.columns}
            progressComponent={
              <div className="spinner-border text-primary m-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            }
            data={this.props.data}
            progressPending={this.props.isDataLoading}
            keyField={this.props.keyField}
            highlightOnHover={true}
            noHeader
            subHeader={this.props.SearchAvailable}
            subHeaderComponent={this.props.SearchComponent}
            onSort={this.props.onSort}
            onRowClicked={this.props.rowClicked}
            pagination={this.props.pagination === "empty" ? null : true}
            paginationServer
            paginationResetDefaultPage={
              this.props.resetPage ? this.props.resetPage : false
            }
            paginationPerPage={this.props.pageLimit ? this.props.pageLimit : defaultPageLimit}
            paginationRowsPerPageOptions={
              this.props.pageSizeOptions
                ? this.props.pageSizeOptions
                : defaultPageSizeOptions
            }
            paginationTotalRows={this.props.totalCount}
            onChangeRowsPerPage={this.props.rowsPerPageOnChange}
            onChangePage={this.props.pageChange}
            conditionalRowStyles={this.props.conditionalRowStyles}
            selectableRows={this.props.selectableRows}
            actions={this.props.actions}
          />
        </CardBody>
      </Card>
    );
  }
}

export default ListPage;
