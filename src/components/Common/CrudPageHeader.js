import React, { Component } from "react";
import { Row } from "reactstrap";
//import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../components/Common/CustomBootstrap";
import Breadcrumb from "../Common/Breadcrumb";
//import IntlMessages from "../../helpers/IntlMessages";

class CrudPageHeader extends Component {
  constructor() {
    super();
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false
    };
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };
  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  };

  render() {
    const { match, heading } = this.props;

    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
          {heading}
            </h1>
            <div className="text-zero top-right-button-container">
              {/* <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top searchBoxDiv">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder={messages["menu.search"]}
                  onChange={e => onTextChange(e)}
                />
              </div> */}

              {/* <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => buttonClick()}>
                <IntlMessages id="pages.add-new" />
              </Button> */}
              {"  "}
            </div>
            <Breadcrumb match={match} />
          </div>

          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default (CrudPageHeader);
