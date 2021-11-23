import React, { Component } from "react"
import PropTypes from "prop-types"
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"
import { withRouter, Link } from "react-router-dom"

//i18n
//import { withTranslation } from "react-i18next"

// users
import Logicon from "../../../assets/images/logicon.png"

import { getItemFromLocalStorage } from "../../../helpers/utils"
import { Message } from "../../../helpers/language_helper"

class ProfileMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      name: "Admin",
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }))
  }

  componentDidMount() {
    if (getItemFromLocalStorage("user_id")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(getItemFromLocalStorage("user_id"))
        this.setState({ name: obj.displayName })
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(getItemFromLocalStorage("user_id"))
        this.setState({ name: obj.username })
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
            tag="button"
          >
            <img
              className="rounded-circle header-profile-user"
              src={Logicon}
              alt="Header Avatar"
              hight="15"
              
            />
            <span className="d-none d-xl-inline-block ml-2 mr-1">
              {this.state.name}
            </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          </DropdownToggle>
          <DropdownMenu right>
            <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
              <span>{Message("logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    )
  }
}

ProfileMenu.propTypes = {
  t: PropTypes.any,
}

export default withRouter(ProfileMenu)
